import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, userSelections, output } = body;

    if (!profile || !userSelections || !output) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Merge user selections with profile, respecting identity locks
    const finalProfile = {
      ...profile,
      style_preset: userSelections.preset || profile.style_preset,
      lighting: { ...profile.lighting, type: userSelections.lighting || profile.lighting?.type },
      aspect_ratio: userSelections.aspect_ratio || profile.aspect_ratio,
      camera: { ...profile.camera, angle: userSelections.camera_angle || profile.camera?.angle },
      ampd_meter: userSelections.ampd_meter || profile.ampd_meter,
    };

    // Build the prompt based on output type
    let systemPrompt = "";
    let userPrompt = "";

    if (output === "image_prompt") {
      systemPrompt = `You are an expert at creating Midjourney-style image generation prompts. 
Create a detailed, vivid prompt that captures the essence of the image while respecting identity locks.

CRITICAL RULES:
1. NEVER change or override ethnicity, hair_color, or eye_color from the profile
2. These identity attributes are LOCKED and must appear exactly as provided
3. Focus on style, mood, lighting, and composition enhancements
4. Use the ampd_meter (1-10) to control creative intensity: low=conservative, high=bold transformations
5. Keep prompts under 200 words
6. Use comma-separated descriptors
7. Include technical details (lighting, camera, aspect ratio)`;

      userPrompt = `Generate a Midjourney-style image prompt based on this profile:

Profile:
${JSON.stringify(finalProfile, null, 2)}

User Selections:
- Style Preset: ${userSelections.preset}
- AMP'd Meter: ${userSelections.ampd_meter}/10
- Lighting: ${userSelections.lighting}
- Aspect Ratio: ${userSelections.aspect_ratio}
- Camera Angle: ${userSelections.camera_angle}

LOCKED IDENTITY (must include exactly as-is):
- Ethnicity: ${profile.subjects?.[0]?.ethnicity}
- Hair: ${profile.subjects?.[0]?.hair_color}
- Eyes: ${profile.subjects?.[0]?.eye_color}

Create a compelling image prompt that:
1. Starts with the locked identity attributes
2. Applies the ${userSelections.preset} style
3. Reflects ${userSelections.ampd_meter}/10 creative intensity
4. Includes lighting, camera, and technical details
5. Maintains the subject's identity throughout

Return ONLY the final prompt text, no explanation.`;

    } else if (output === "video_prompt") {
      systemPrompt = `You are an expert at creating Sora-style video generation prompts.
Create a detailed scene description that includes action, camera movement, and atmosphere.

CRITICAL RULES:
1. NEVER change or override ethnicity, hair_color, or eye_color from the profile
2. These identity attributes are LOCKED and must appear exactly as provided
3. Describe what happens, how the camera moves, and the mood
4. Use the ampd_meter (1-10) to control creative intensity
5. Keep prompts under 250 words
6. Focus on temporal elements and motion`;

      userPrompt = `Generate a Sora-style video prompt based on this profile:

Profile:
${JSON.stringify(finalProfile, null, 2)}

User Selections:
- Style Preset: ${userSelections.preset}
- AMP'd Meter: ${userSelections.ampd_meter}/10
- Video Direction: ${userSelections.video_direction || "Subject in scene"}
- Camera Motion: ${userSelections.mode === "video" ? (userSelections.camera_motion || "static") : "static"}
- Pace: ${userSelections.pace || "medium"}
- Mood: ${userSelections.mood || "dramatic"}

LOCKED IDENTITY (must include exactly as-is):
- Ethnicity: ${profile.subjects?.[0]?.ethnicity}
- Hair: ${profile.subjects?.[0]?.hair_color}
- Eyes: ${profile.subjects?.[0]?.eye_color}

Create a compelling video prompt that:
1. Describes the scene with locked identity attributes
2. Incorporates the action: ${userSelections.video_direction || "subtle movement"}
3. Specifies camera motion and movement
4. Applies ${userSelections.preset} style and mood
5. Reflects ${userSelections.ampd_meter}/10 creative intensity
6. Maintains identity throughout the sequence

Return ONLY the final prompt text, no explanation.`;
    }

    // Call Claude API for prompt generation
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const generatedPrompt = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      prompt: generatedPrompt,
      meta: {
        mode: output === "image_prompt" ? "image" : "video",
        ampd_meter: userSelections.ampd_meter,
        preset: userSelections.preset,
      },
    });

  } catch (error) {
    console.error("Prompt generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
