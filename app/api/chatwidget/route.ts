import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmailToAdmins } from "@/lib/email";
import { createAdminNotifications } from "@/lib/notifications";

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

      const supportHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="cid:logo@launchdock" alt="Logo" style="max-width: 150px; height: auto; margin: 0 auto 20px; display: block;" />
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `;

      // Create notifications for all admins
      await createAdminNotifications(
        "New Contact Form Submission",
        `${name} (${email}) submitted a contact form message.`,
        { name, email, phone, message }
      );

      // Send email notification to admins
      await sendNotificationEmailToAdmins(
        "New Contact Form Submission",
        supportText,
        supportHtml
      );

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

      const chatText = `New live chat started
User: ${name} (${email}${phone ? `, ${phone}` : ""})

Message:
${message}

Thread ID: ${record.id}`;

      const chatHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="cid:logo@launchdock" alt="Logo" style="max-width: 150px; height: auto; margin: 0 auto 20px; display: block;" />
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Live Chat Started</h2>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Thread ID:</strong> ${record.id}</p>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `;

      // Create notifications for all admins
      await createAdminNotifications(
        "New Live Chat Started",
        `${name} (${email}) started a live chat.`,
        { talkRequestId: record.id, name, email, phone, message }
      );

      // Send email notification to admins
      await sendNotificationEmailToAdmins(
        "New Live Chat Started",
        chatText,
        chatHtml
      );

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

      const messageText = `New chat message in thread ${threadId}
From: ${existing.name || "User"} (${existing.email || "Unknown"})

Message:
${message}`;

      const messageHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="cid:logo@launchdock" alt="Logo" style="max-width: 150px; height: auto; margin: 0 auto 20px; display: block;" />
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Chat Message</h2>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <p><strong>Thread ID:</strong> ${threadId}</p>
            <p><strong>From:</strong> ${existing.name || "User"} (${existing.email || "Unknown"})</p>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `;

      // Create notifications for all admins
      await createAdminNotifications(
        "New Chat Message",
        `${existing.name || "User"} sent a new chat message in thread ${threadId}.`,
        { threadId, name: existing.name, email: existing.email, message }
      );

      // Send email notification to admins
      await sendNotificationEmailToAdmins(
        `New Chat Message - Thread ${threadId}`,
        messageText,
        messageHtml
      );

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unsupported kind" }, { status: 400 });
  } catch (error) {
    console.error("chatwidget error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}





