import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendSupportEmail } from "@/lib/email";

const SUPPORT = "support@launchdock.me";
const fromSupport = `"LaunchDock" <support@launchdock.me>`;

const ackText = `Thank you for reaching out to LaunchDock!

We've received your message and will respond shortly.

If this is urgent, please reply to this email with any additional details.

— LaunchDock Support`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const kind = body.kind || "email";

    if (kind === "email") {
      const { name, email, phone, message } = body;
      if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const supportText = `New support inquiry
From: ${name} (${email}${phone ? `, ${phone}` : ""})

Message:
${message}`;

      await sendSupportEmail({
        to: SUPPORT,
        subject: "New contact form submission",
        text: supportText,
      });

      await sendSupportEmail({
        to: email,
        subject: "Thanks for contacting LaunchDock",
        text: ackText,
      });

      return NextResponse.json({ ok: true });
    }

    if (kind === "chatStart") {
      const { name, email, phone, message } = body;
      if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const transcript = [
        { from: "user", message, ts: new Date().toISOString() },
      ];

      const record = await prisma.talkRequest.create({
        data: {
          name,
          email,
          phone,
          requirement: message,
          mode: "CHAT",
          immediate: true,
          status: "WAITING",
          transcript,
        },
      });

      await sendSupportEmail({
        to: SUPPORT,
        subject: "New live chat started",
        text: `User: ${name} (${email}${phone ? `, ${phone}` : ""})

Message:
${message}`,
      });

      await sendSupportEmail({
        to: email,
        subject: "We received your chat",
        text: ackText,
      });

      return NextResponse.json({ ok: true, threadId: record.id });
    }

    if (kind === "chatMessage") {
      const { threadId, message } = body;
      if (!threadId || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const existing = await prisma.talkRequest.findUnique({ where: { id: threadId } });
      if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

      const transcript = Array.isArray(existing.transcript) ? existing.transcript : [];
      transcript.push({ from: "user", message, ts: new Date().toISOString() });

      await prisma.talkRequest.update({
        where: { id: threadId },
        data: { transcript },
      });

      await sendSupportEmail({
        to: SUPPORT,
        subject: "New chat message",
        text: `Thread: ${threadId}
Message:
${message}`,
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unsupported kind" }, { status: 400 });
  } catch (error) {
    console.error("chatwidget error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

