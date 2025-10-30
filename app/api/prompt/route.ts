import { NextRequest, NextResponse } from 'next/server';

// Type definitions for the request body
type Body = {
  visualDNA: {
    subject: string;         // from Claude Vision
    lighting?: string;
    colors?: string[];
    camera?: { lens?: string; angle?: string };
    mood?: string;
  };
  selections: {
    style: string;           // e.g., 'Cinematic Noir'
    aspectRatio: string;     // e.g., '16:9'
    intensity: number;       // 0..100 (AMP'd Meter value)
    // Identity locks - NEVER override these
    gender?: string;
    ethnicity?: string;
    hair?: string;
    eyes?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    // Build a guarded, human-readable prompt string (no JSON exposure)
    const parts: string[] = [];

    // Identity locks (quietly enforced - these are the secret sauce)
    const identity = [
      body.selections.gender && `gender: ${body.selections.gender}`,
      body.selections.ethnicity && `ethnicity: ${body.selections.ethnicity}`,
      body.selections.hair && `hair: ${body.selections.hair}`,
      body.selections.eyes && `eyes: ${body.selections.eyes}`
    ].filter(Boolean).join(', ');

    // Map intensity to creative language
    const intensityTag =
      body.selections.intensity >= 80 ? 'ultra-detailed, punchy contrast, dramatic transformation' :
      body.selections.intensity >= 50 ? 'cinematic detail, crisp edges, balanced enhancement' :
      'subtle refinement, natural detail, gentle touch';

    // Build the prompt parts
    parts.push(
      `${body.visualDNA.subject}`,
      body.visualDNA.mood ? `mood: ${body.visualDNA.mood}` : '',
      body.visualDNA.lighting ? `lighting: ${body.visualDNA.lighting}` : '',
      body.visualDNA.colors?.length ? `palette: ${body.visualDNA.colors.join(', ')}` : '',
      body.visualDNA.camera?.lens ? `lens: ${body.visualDNA.camera.lens}` : '',
      body.visualDNA.camera?.angle ? `camera angle: ${body.visualDNA.camera.angle}` : '',
      identity ? `identity locks → ${identity}` : '',
      `style: ${body.selections.style}`,
      `aspect ratio: ${body.selections.aspectRatio}`,
      `AMP'd intensity: ${body.selections.intensity}% (${intensityTag})`,
      `clean composition, no artifacts, professional finish`
    );

    const prompt = parts.filter(Boolean).join(' • ');

    // Optional: If you want Claude text refinement later, uncomment:
    /*
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const completion = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Tighten this into a single pro image-generation prompt (no JSON, no meta):\n${prompt}`
      }]
    });
    const finalPrompt = completion.content?.[0]?.type === 'text'
      ? completion.content[0].text.trim()
      : prompt;
    */

    const finalPrompt = prompt; // using local build for now
    
    return new NextResponse(finalPrompt, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch (e: any) {
    console.error('Prompt generation error:', e);
    return new NextResponse('Prompt build failed', { status: 400 });
  }
}
