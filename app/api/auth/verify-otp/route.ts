import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find the most recent OTP for this email
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        code: otp,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify the user
    await prisma.user.update({
      where: { id: otpRecord.userId! },
      data: { isEmailVerified: true },
    });

    // Delete the used OTP
    await prisma.otp.delete({
      where: { id: otpRecord.id },
    });

    // Delete any other expired OTPs for this user
    await prisma.otp.deleteMany({
      where: {
        userId: otpRecord.userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully. You can now sign in.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

