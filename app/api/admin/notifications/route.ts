import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, getAuthUser } from "@/lib/auth";

// GET /api/admin/notifications - Get all notifications (admin sees all)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const unreadOnly = request.nextUrl.searchParams.get("unreadOnly") === "true";

    const where: any = {};
    if (unreadOnly) {
      where.read = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Group by time period
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);

    const grouped = {
      today: notifications.filter(
        (n) => new Date(n.createdAt) >= today
      ),
      thisWeek: notifications.filter(
        (n) =>
          new Date(n.createdAt) >= thisWeek &&
          new Date(n.createdAt) < today
      ),
      earlier: notifications.filter(
        (n) => new Date(n.createdAt) < thisWeek
      ),
    };

    const unreadCount = await prisma.notification.count({
      where: { read: false },
    });

    return NextResponse.json(
      {
        notifications: grouped,
        unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

// PATCH /api/admin/notifications/mark-read - Mark notifications as read
export const PATCH = requireAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { notificationIds } = body;

    if (!notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: "notificationIds array is required" },
        { status: 400 }
      );
    }

    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});














