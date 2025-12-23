import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// GET /api/admin/users/:id - Get detailed client info
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const user = await getAuthUser(request);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        company: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!client || client.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Get recent activity
    const [recentMessages, recentFiles, recentPayments, projects] =
      await Promise.all([
        prisma.message.findMany({
          where: { senderId: id },
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.file.findMany({
          where: { uploadedById: id },
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.payment.findMany({
          where: { clientId: id },
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.project.findMany({
          where: { clientId: id },
          include: {
            _count: {
              select: {
                tasks: true,
                messages: true,
                files: true,
              },
            },
          },
        }),
      ]);

    // Calculate total revenue
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        clientId: id,
        status: "PAID",
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json(
      {
        client,
        activity: {
          messages: recentMessages,
          files: recentFiles,
          payments: recentPayments,
        },
        projects,
        stats: {
          totalProjects: projects.length,
          totalRevenue: totalRevenue._sum.amount || 0,
          totalMessages: recentMessages.length,
          totalFiles: recentFiles.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching client details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

