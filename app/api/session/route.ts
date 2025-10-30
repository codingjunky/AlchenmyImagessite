import { NextResponse } from "next/server";

/**
 * GET /api/session?session=<id>
 * Returns placeholder identity lock + context data.
 * Logs each request for visibility in Netlify.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const session = url.searchParams.get("session") || "none";
    console.log("[session] invoked", { session });

    return NextResponse.json({
      identityLocks: {
        ethnicity: "preserve-from-photo",
        hairColor: "preserve-from-photo",
        eyeColor: "preserve-from-photo",
      },
      detectedContext: {
        summary:
          "stub context for testing — this will later be replaced with Claude Vision analysis results.",
      },
      lastImagePrompt: "previous image prompt (stub)",
      session,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[session] error", err);
    return NextResponse.json(
      { error: "Session fetch failed", message: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
