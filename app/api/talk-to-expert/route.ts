import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, requireAuth } from "@/lib/auth";
import { sendNotificationEmailToAdmins } from "@/lib/email";
import { createAdminNotifications } from "@/lib/notifications";

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
  // Video meetings are in development, so we don't create meeting links
  return { scheduledFor: immediate ? undefined : scheduledFor };
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
        userId: user?.id || null,
      },
    });

    // Create notifications for all admins
    const modeLabel = parsed.mode.charAt(0).toUpperCase() + parsed.mode.slice(1);
    const timeLabel = parsed.immediate ? "immediate" : `scheduled for ${parsed.scheduledFor?.toLocaleString()}`;
    
    await createAdminNotifications(
      "New Talk to Expert Request",
      `${parsed.name} requested ${modeLabel} consultation (${timeLabel}): ${parsed.requirement}`,
      { 
        talkRequestId: talkRequest.id,
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        mode: parsed.mode,
        requirement: parsed.requirement,
        immediate: parsed.immediate,
        scheduledFor: parsed.scheduledFor,
      }
    );

    // Send email notification to admins
    const emailText = `New Talk to Expert Request

Mode: ${modeLabel}
Name: ${parsed.name}
Email: ${parsed.email || "Not provided"}
Phone: ${parsed.phone || "Not provided"}
Requirement: ${parsed.requirement}
Type: ${parsed.immediate ? "Immediate" : `Scheduled for ${parsed.scheduledFor?.toLocaleString()}`}

Request ID: ${talkRequest.id}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:logo@launchdock" alt="LaunchDock Logo" style="max-width: 150px; height: auto; margin: 0 auto 20px; display: block;" />
        <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Talk to Expert Request</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Mode:</strong> ${modeLabel}</p>
          <p><strong>Name:</strong> ${parsed.name}</p>
          <p><strong>Email:</strong> ${parsed.email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${parsed.phone || "Not provided"}</p>
          <p><strong>Type:</strong> ${parsed.immediate ? "Immediate" : `Scheduled for ${parsed.scheduledFor?.toLocaleString()}`}</p>
          <p><strong>Request ID:</strong> ${talkRequest.id}</p>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Requirement:</h3>
          <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${parsed.requirement}</p>
        </div>
      </div>
    `;

    await sendNotificationEmailToAdmins(
      `New Talk to Expert Request - ${modeLabel}`,
      emailText,
      emailHtml
    );

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





