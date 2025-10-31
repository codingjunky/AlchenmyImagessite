import { NextRequest, NextResponse } from 'next/server';

// Type definitions for the request body
type Body = {
  visualDNA: {
    subject: string;
    lighting?: string;
    colors?: string[];
    camera?: { lens?: string; angle?: string };
    mood?: string;
  };
  selections: {
    style: string;
    aspectRatio: string;
    intensity: number;       // 0..100 (AMP'd Meter value)
    // Identity Controls - USER HAS FULL CONTROL
    gender?: string;
    ethnicity?: string;
    hair?: string;
    eyes?: string;
  };
  // Video-specific fields (if present, generate video prompt)
  videoDirection?: string;
  cameraMotion?: string;
  pace?: string;
  mood?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    // Determine if this is a video or image prompt request
    const isVideoPrompt = !!body.videoDirection;

    // Build identity string from USER'S SELECTIONS
    const identity = [
      body.selections.gender && `${body.selections.gender}`,
      body.selections.ethnicity && `${body.selections.ethnicity}`,
      body.selections.hair && `${body.selections.hair} hair`,
      body.selections.eyes && `${body.selections.eyes} eyes`
    ].filter(Boolean).join(', ');

    // Map intensity to creative language
    const intensityTag =
      body.selections.intensity >= 80 ? 'ultra-detailed, punchy contrast, dramatic transformation' :
      body.selections.intensity >= 50 ? 'cinematic detail, crisp edges, balanced enhancement' :
      'subtle refinement, natural detail, gentle touch';

    let finalPrompt: string;

    if (isVideoPrompt) {
      // VIDEO PROMPT (Sora-style)
      const videoParts: string[] = [];

      videoParts.push(
        `SCENE: ${body.visualDNA.subject}`,
        body.visualDNA.lighting ? `Lighting: ${body.visualDNA.lighting}` : '',
        body.selections.style ? `Style: ${body.selections.style.replace(/_/g, ' ')}` : '',
        ''
      );

      videoParts.push(
        `SUBJECT: ${identity}`,
        ''
      );

      videoParts.push(
        `ACTION: ${body.videoDirection}`,
        ''
      );

      videoParts.push(
        `CAMERA:`,
        body.cameraMotion ? `- Motion: ${body.cameraMotion}` : '- Motion: static',
        body.visualDNA.camera?.angle ? `- Angle: ${body.visualDNA.camera.angle}` : '',
        body.visualDNA.camera?.lens ? `- Lens: ${body.visualDNA.camera.lens}` : '',
        ''
      );

      videoParts.push(
        body.pace ? `PACE: ${body.pace}` : '',
        body.mood ? `MOOD: ${body.mood}` : '',
        ''
      );

      videoParts.push(
        `INTENSITY: ${body.selections.intensity}% (${intensityTag})`,
        body.visualDNA.colors?.length ? `Color palette: ${body.visualDNA.colors.join(', ')}` : '',
        ''
      );

      videoParts.push(
        `Note: Subject identity features (${identity}) maintained throughout motion.`
      );

      finalPrompt = videoParts.filter(Boolean).join('\n');

    } else {
      // IMAGE PROMPT (MidJourney-style)
      const imageParts: string[] = [];

      imageParts.push(
        `${body.visualDNA.subject}, ${identity}`,
        body.visualDNA.mood ? `mood: ${body.visualDNA.mood}` : '',
        body.visualDNA.lighting ? `lighting: ${body.visualDNA.lighting}` : '',
        body.visualDNA.colors?.length ? `palette: ${body.visualDNA.colors.join(', ')}` : '',
        body.visualDNA.camera?.lens ? `lens: ${body.visualDNA.camera.lens}` : '',
        body.visualDNA.camera?.angle ? `camera angle: ${body.visualDNA.camera.angle}` : '',
        `style: ${body.selections.style.replace(/_/g, ' ')}`,
        `aspect ratio: ${body.selections.aspectRatio}`,
        `AMP'd intensity: ${body.selections.intensity}% (${intensityTag})`,
        `clean composition, professional finish, no artifacts`
      );

      finalPrompt = imageParts.filter(Boolean).join(' • ');
    }

    return new NextResponse(finalPrompt, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (e: any) {
    console.error('Prompt generation error:', e);
    return new NextResponse('Prompt build failed', { status: 400 });
  }
}
