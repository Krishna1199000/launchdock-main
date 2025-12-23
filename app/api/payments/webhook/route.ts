import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("Stripe secret key (STRIPE_SECRET_KEY) is not configured");
  }
  return new (Stripe as any)(secret);
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (err: any) {
    console.error("Stripe configuration error:", err);
    return NextResponse.json(
      { error: "Payment provider is not configured. Webhook disabled." },
      { status: 200 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: session.id } as any,
      });

      if (payment) {
        try {
          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: "PAID",
              invoiceUrl: session.invoice?.hosted_invoice_url || null,
            } as any,
          });
        } catch {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: "PAID" } as any,
          });
        }

        try {
          await prisma.notification.create({
            data: {
              userId: (payment as any).clientId ?? payment.userId,
              title: "Payment Successful",
              body: `Your payment of $${(payment.amount / 100).toFixed(2)} has been processed successfully.`,
              data: {
                paymentId: payment.id,
                amount: payment.amount,
              },
            } as any,
          });
        } catch (err) {
          console.warn("Notification creation failed (non-fatal):", err);
        }
      }
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as any;

      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: paymentIntent.id } as any,
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "FAILED" } as any,
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
