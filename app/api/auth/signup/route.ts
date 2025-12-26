import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { signupSchema } from "@/lib/validation";
import { sendOTPEmail, sendNotificationEmailToAdmins } from "@/lib/email";
import { createAdminNotifications } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = signupSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        phone: validated.phone,
        passwordHash,
        role: "CLIENT",
        isEmailVerified: false,
      },
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otp.create({
      data: {
        email: validated.email,
        code: otp,
        expiresAt,
        userId: user.id,
      },
    });

    // Send OTP email
    await sendOTPEmail(validated.email, otp);

    // Create notifications for all admins
    await createAdminNotifications(
      "New User Signup",
      `${validated.name} (${validated.email}) has signed up.`,
      { userId: user.id, email: validated.email, name: validated.name }
    );

    // Send email notification to admins
    await sendNotificationEmailToAdmins(
      "New User Signup - LaunchDock",
      `A new user has signed up:\n\nName: ${validated.name}\nEmail: ${validated.email}\nPhone: ${validated.phone || "Not provided"}\n\nUser ID: ${user.id}`,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New User Signup</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${validated.name}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          ${validated.phone ? `<p><strong>Phone:</strong> ${validated.phone}</p>` : ""}
          <p><strong>User ID:</strong> ${user.id}</p>
        </div>
      </div>`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Please verify your email.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      const errorMessages = error.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        {
          error: "Validation error",
          details: errorMessages,
          message: errorMessages[0]?.message || "Please check your input",
        },
        { status: 400 }
      );
    }
    
    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    
    console.error("Signup error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error.message || "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
}
