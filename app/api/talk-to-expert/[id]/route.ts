import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

const validStatuses = ["WAITING", "SCHEDULED", "ACTIVE", "COMPLETED", "ASYNC", "CANCELLED"];

export const PATCH = requireAuth(async (request: NextRequest, user) => {
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await request.json();
    const status = body.status?.toUpperCase();
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.talkRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ request: updated }, { status: 200 });
  } catch (error) {
    console.error("talk-to-expert PATCH error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

