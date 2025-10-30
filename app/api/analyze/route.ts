// Force rebuild: 2025-10-30 16:21:25
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_FILE_SIZE = parseInt(process.env.ALLOWED_IMAGE_MAX_MB || "10") * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size must be ${process.env.ALLOWED_IMAGE_MAX_MB || 10}MB or less` },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Always use JPEG media type for maximum compatibility with Anthropic API
    const mediaType: "image/jpeg" = "image/jpeg";

    // Prepare the analysis prompt
    const analysisPrompt = `Analyze this image and extract detailed information about the subject(s) and scene. Return ONLY valid JSON with this exact structure:

{
  "subjects": [{
    "type": "person|animal|object",
    "gender": "female|male|nonbinary|unspecified",
    "ethnicity": "Black|White|Latinx|South Asian|East Asian|Middle Eastern|Indigenous|Mixed|Other",
    "hair_color": "black|brown|blonde|red|white|bold_color",
    "eye_color": "brown|hazel|green|blue|gray|other",
    "age_range": "teen|20s|30s|40s|50s|60+"
  }],
  "environment": { "type": "indoor|outdoor|studio|city|nature|fantasy", "notes": "" },
  "lighting": { "type": "cinematic|natural|soft|hard|neon|studio", "temperature": "warm|neutral|cool" },
  "camera": { "lens": "35mm|50mm|85mm|tele|wide", "angle": "eye|low|high|top", "motion": "static" },
  "color_palette": ["#hexcode", "#hexcode"],
  "style_preset": "cinematic_noir",
  "aspect_ratio": "1:1",
  "ampd_meter": 5,
  "notes": "salient objects, mood words, textures"
}

CRITICAL: ethnicity, hair_color, and eye_color are LOCKED identity attributes that must never be changed.
Be specific and accurate. Return only the JSON, no additional text.`;

    // Call Claude Vision API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
console.log('HARDCODED MEDIA TYPE:', 'image/jpeg');
                media_type: "image/jpeg",
                data: base64Image,
              },
            },
            {
              type: "text",
              text: analysisPrompt,
            },
          ],
        },
      ],
    });

    // Extract the JSON response
    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    
    // Parse JSON from response
    let profile;
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) || responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
      profile = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", responseText);
      return NextResponse.json(
        { error: "Failed to parse analysis results" },
        { status: 500 }
      );
    }

    // Return the profile (in production, you'd also store to Netlify Blobs here)
    return NextResponse.json({
      profile,
      message: "Image analyzed successfully",
    });

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
