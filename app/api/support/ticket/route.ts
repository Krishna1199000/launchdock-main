import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmailToAdmins } from "@/lib/email";
import { createAdminNotifications } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, priority, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email content
    const emailText = `New Support Ticket

Priority: ${priority.toUpperCase()}
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This ticket was submitted through the LaunchDock support portal.
Please respond to: ${email}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="cid:logo@launchdock" alt="LaunchDock Logo" style="max-width: 150px; height: auto; margin: 0 auto 20px; display: block;" />
        <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          New Support Ticket
        </h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Priority:</strong> <span style="text-transform: uppercase; color: #3b82f6;">${priority}</span></p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
          <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This ticket was submitted through the LaunchDock support portal.</p>
          <p>Please respond to: <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
        </div>
      </div>
    `;

    // Create notifications for all admins
    await createAdminNotifications(
      "New Support Ticket",
      `${name} submitted a ${priority.toUpperCase()} priority ticket: ${subject}`,
      { name, email, subject, priority, message }
    );

    // Send email notification to admins
    await sendNotificationEmailToAdmins(
      `[Support Ticket - ${priority.toUpperCase()}] ${subject}`,
      emailText,
      emailHtml
    );

    return NextResponse.json(
      { success: true, message: "Ticket submitted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending support ticket email:", error);
    return NextResponse.json(
      { error: "Failed to submit ticket. Please try again." },
      { status: 500 }
    );
  }
}
