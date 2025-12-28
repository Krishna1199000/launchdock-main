import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { join } from "path";

// Namecheap email configuration
// For Private Email: mail.privateemail.com
// For other Namecheap hosting: check your Namecheap email settings
export const getTransporter = () => {
  const host = process.env.SMTP_HOST || "mail.privateemail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || "support@launchdock.me";
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

  // Debug logging (remove in production)
  console.log("Email Config:", {
    host,
    port,
    user,
    hasPassword: !!pass,
  });

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user,
      pass,
    },
    // Some Namecheap servers require this
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export async function sendOTPEmail(email: string, otp: string) {
  // Create transporter fresh each time to ensure env vars are read
  const currentTransporter = getTransporter();
  const logoAttachment = getLogoAttachment();
  
  const mailOptions = {
    from: `"LaunchDock" <support@launchdock.me>`,
    replyTo: "support@launchdock.me",
    to: email,
    subject: "Verify Your Email - LaunchDock",
    // Text version for better deliverability
    text: `Verify Your Email - LaunchDock

Thank you for signing up with LaunchDock! Please use the following OTP to verify your email address:

${otp}

This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.

Best regards,
The LaunchDock Team
support@launchdock.me`,
    // HTML version
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Verify Your Email - LaunchDock</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; padding: 20px;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto;">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                      <img src="cid:logo@launchdock" alt="Logo" style="max-width: 150px; height: auto; margin: 0 auto; display: block;" />
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #333333; margin-top: 0; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                      <p style="color: #666666; margin: 0 0 20px 0; font-size: 16px;">Thank you for signing up! Please use the following verification code to complete your registration:</p>
                      
                      <!-- OTP Box -->
                      <table role="presentation" style="width: 100%; margin: 30px 0;">
                        <tr>
                          <td align="center" style="border: 2px dashed #667eea; border-radius: 8px; padding: 30px 20px;">
                            <div style="font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #667eea; font-family: 'Courier New', Courier, monospace; line-height: 1.2;">
                              ${otp}
                            </div>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #999999; margin: 20px 0 0 0; font-size: 14px; line-height: 1.5;">This verification code will expire in 10 minutes for security purposes.</p>
                      <p style="color: #999999; margin: 10px 0 0 0; font-size: 14px; line-height: 1.5;">If you didn't create an account, please ignore this email.</p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; border-top: 1px solid #e9ecef;">
                      <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">
                        Best regards,<br>
                        <strong>The Team</strong>
                      </p>
                      <p style="color: #999999; margin: 15px 0 0 0; font-size: 12px; line-height: 1.5;">
                        <a href="mailto:support@launchdock.me" style="color: #667eea; text-decoration: none;">support@launchdock.me</a><br>
                        <a href="https://launchdock.me" style="color: #667eea; text-decoration: none;">launchdock.me</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    // Headers to improve deliverability and reduce spam score
    headers: {
      "Message-ID": `<${Date.now()}-${Math.random().toString(36).substring(7)}@launchdock.me>`,
      "X-Mailer": "LaunchDock Email Service",
      "X-Priority": "1",
      "Importance": "high",
      "List-Unsubscribe": "<mailto:support@launchdock.me?subject=unsubscribe>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    // Additional options for better deliverability
    priority: "high" as const,
    date: new Date(),
    attachments: logoAttachment ? [logoAttachment] : [],
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

type SendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: Array<{ filename: string; path: string } | { filename: string; content: Buffer; cid?: string }>;
};

export function getLogoAttachment() {
  try {
    const logoPath = join(process.cwd(), "public", "launchdocklogo1.png");
    const logoContent = readFileSync(logoPath);
    return {
      filename: "launchdocklogo1.png",
      content: logoContent,
      cid: "logo@launchdock",
    };
  } catch (error) {
    console.error("Error loading logo:", error);
    return null;
  }
}

export async function sendSupportEmail(input: SendEmailInput) {
  const currentTransporter = getTransporter();
  const logoAttachment = getLogoAttachment();
  
  const attachments = logoAttachment 
    ? [...(input.attachments || []), logoAttachment]
    : (input.attachments || []);

  const mailOptions = {
    from: `"LaunchDock" <support@launchdock.me>`,
    to: input.to,
    replyTo: input.replyTo || "support@launchdock.me",
    subject: input.subject,
    text: input.text,
    html: input.html,
    attachments,
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending support email:", error);
    return { success: false, error };
  }
}

export async function sendNotificationEmailToAdmins(
  subject: string,
  text: string,
  html?: string
) {
  const { prisma } = await import("./prisma");
  
  try {
    // Get all admin users
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true, email: true },
    });

    if (admins.length === 0) {
      console.warn("No admin users found to send notification email");
      return { success: false, error: "No admins found" };
    }

    const adminEmails = admins.map(admin => admin.email);
    const logoAttachment = getLogoAttachment();
    
    const mailOptions = {
      from: `"LaunchDock" <support@launchdock.me>`,
      to: adminEmails,
      subject,
      text,
      html,
      attachments: logoAttachment ? [logoAttachment] : [],
    };

    const currentTransporter = getTransporter();
    await currentTransporter.sendMail(mailOptions);
    
    return { success: true };
  } catch (error) {
    console.error("Error sending notification email to admins:", error);
    return { success: false, error };
  }
}

