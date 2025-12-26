import { NextRequest, NextResponse } from "next/server";

// Simple analytics endpoint for "Schedule a Call" CTA clicks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { source, mode } = body || {};

    // In a real setup you might log to a DB or external analytics provider here.
    console.log("[analytics] schedule-call", {
      source: source || "unknown",
      mode: mode || "unknown",
      ua: request.headers.get("user-agent") || "",
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Schedule-call analytics error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}






