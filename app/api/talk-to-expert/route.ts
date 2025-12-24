import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, requireAuth } from "@/lib/auth";
import { randomUUID } from "crypto";

const MEET_BASE_URL = process.env.MEET_BASE_URL || "https://meet.launchdock.me/room";

const parseBody = async (request: NextRequest) => {
  const body = await request.json();
  const mode = (body.mode || "").toLowerCase();
  const name = (body.name || "").trim();
  const requirement = (body.requirement || "").trim();
  const immediate = Boolean(body.immediate);
  const scheduledFor = body.datetime ? new Date(body.datetime) : undefined;
  const email = body.email ? String(body.email).trim() : undefined;
  const phone = body.phone ? String(body.phone).trim() : undefined;

  if (!["phone", "video", "chat", "schedule"].includes(mode)) {
    return { error: "Invalid mode" };
  }
  if (!name || !requirement) {
    return { error: "Name and requirement are required" };
  }
  if (!immediate && !scheduledFor) {
    return { error: "scheduledFor is required when not immediate" };
  }
  if (mode === "chat" && !email) {
    return { error: "Email is required for chat" };
  }

  return { mode, name, requirement, immediate, scheduledFor, email, phone };
};

const toPrismaMode = (mode: string) => {
  switch (mode) {
    case "phone":
      return "PHONE";
    case "video":
      return "VIDEO";
    case "chat":
      return "CHAT";
    case "schedule":
      return "SCHEDULE";
    default:
      return "PHONE";
  }
};

const deriveStatus = (mode: string, immediate: boolean, offline?: boolean, busy?: boolean) => {
  if (mode === "chat" && offline) return "ASYNC";
  if (busy && immediate) return "SCHEDULED";
  if (!immediate) return "SCHEDULED";
  return "WAITING";
};

const buildMeeting = (mode: string, immediate: boolean, scheduledFor?: Date) => {
  if (mode !== "video") return {};
  const roomId = randomUUID();
  const meetingLink = `${MEET_BASE_URL}/${roomId}`;
  return { roomId, meetingLink, scheduledFor: immediate ? undefined : scheduledFor };
};

// POST /api/talk-to-expert - public entry
export async function POST(request: NextRequest) {
  try {
    const parsed = await parseBody(request);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const offline = request.headers.get("x-expert-offline") === "1";
    const busy = request.headers.get("x-expert-busy") === "1";
    const user = await getAuthUser(request);

    const status = deriveStatus(parsed.mode, parsed.immediate, offline, busy);
    const meeting = buildMeeting(parsed.mode, parsed.immediate, parsed.scheduledFor);

    const talkRequest = await prisma.talkRequest.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        requirement: parsed.requirement,
        mode: toPrismaMode(parsed.mode),
        immediate: parsed.immediate,
        scheduledFor: parsed.scheduledFor || null,
        status,
        roomId: meeting.roomId,
        meetingLink: meeting.meetingLink,
        userId: user?.id || null,
      },
    });

    return NextResponse.json({ request: talkRequest }, { status: 201 });
  } catch (error) {
    console.error("talk-to-expert POST error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/talk-to-expert - admin view
export const GET = requireAuth(async (request: NextRequest, user) => {
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const status = request.nextUrl.searchParams.get("status") || undefined;
    const take = Math.min(parseInt(request.nextUrl.searchParams.get("take") || "20"), 50);

    const where: any = {};
    if (status) where.status = status as any;

    const requests = await prisma.talkRequest.findMany({
      where,
      orderBy: [{ scheduledFor: "asc" }, { createdAt: "desc" }],
      take,
    });

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("talk-to-expert GET error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});



