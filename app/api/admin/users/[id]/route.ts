import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// NOTE: To unblock production builds while Prisma schema is being simplified,
// this route currently returns a minimal response instead of hitting the DB.
// You can restore the full implementation later when the schema and admin UI are aligned.
export async function GET(
  _request: NextRequest,
  _context: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    {
      error:
        "Detailed client endpoint is temporarily disabled while the backend schema is being refactored.",
    },
    { status: 501 }
  );
}

