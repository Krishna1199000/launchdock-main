import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const invoiceSchema = z.object({
  clientId: z.string().min(1),
  projectId: z.string().optional(),
  amount: z.number().positive(),
  description: z.string().optional(),
  currency: z.string().default("usd"),
});

// POST /api/admin/payments/create-invoice
export const POST = requireAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = invoiceSchema.parse(body);

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: validated.clientId },
    });

    if (!client || client.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    // Verify project if provided
    if (validated.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: validated.projectId },
      });

      if (!project) {
        return NextResponse.json(
          { error: "Invalid project ID" },
          { status: 400 }
        );
      }
    }

    const payment = await prisma.payment.create({
      data: {
        clientId: validated.clientId,
        projectId: validated.projectId || null,
        amount: Math.round(validated.amount * 100), // Convert to cents
        currency: validated.currency,
        status: "PENDING",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        userId: validated.clientId,
        title: "New Invoice",
        body: `A new invoice of $${validated.amount.toFixed(2)} has been created.`,
        data: {
          paymentId: payment.id,
          amount: payment.amount,
        },
      },
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});










