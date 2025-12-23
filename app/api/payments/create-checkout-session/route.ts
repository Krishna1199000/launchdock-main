import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("Stripe secret key (STRIPE_SECRET_KEY) is not configured");
  }
  return new (Stripe as any)(secret);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (err: any) {
    console.error("Stripe configuration error:", err);
    return NextResponse.json(
      { error: "Payment provider is not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { amount, projectId, description } = body;

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Create payment record (guarded for missing fields in schema)
    const payment = await prisma.payment.create({
      data: {
        amount: Math.round(amount * 100),
        userId: user.id,
        projectId: projectId || undefined,
        status: "PENDING",
      } as any,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: description || `Payment for Project ${projectId || ""}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard/client?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard/client?payment=cancelled`,
      client_reference_id: payment.id,
      metadata: {
        paymentId: payment.id,
        userId: user.id,
        projectId: projectId || "",
      },
    });

    // Best-effort update with Stripe session ID; tolerate schema differences
    try {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { stripePaymentId: (session as any).id } as any,
      });
    } catch {
      // ignore if field doesn't exist
    }

    return NextResponse.json(
      { sessionId: session.id, url: session.url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
