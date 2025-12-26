import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/stats
 * 
 * Returns comprehensive dashboard statistics for admin users.
 * All data is fetched from the database dynamically.
 * 
 * Response includes:
 * - Total clients count
 * - Active projects count
 * - Total revenue (sum of all PAID payments)
 * - Pending payments count
 * - Unread notifications count
 * - Unread messages count
 * - Open tickets count
 * - Recent projects (last 5)
 * - Recent clients (last 5)
 */
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    // Fetch all stats in parallel for better performance
    const [
      totalClients,
      totalProjects,
      activeProjects,
      allPayments,
      unreadNotifications,
      allTickets,
      recentProjects,
      recentClients,
    ] = await Promise.all([
      // Count total clients
      prisma.user.count({
        where: { role: "CLIENT" },
      }),

      // Count total projects
      prisma.project.count(),

      // Count active projects (not completed)
      prisma.project.count({
        where: {
          status: {
            not: "COMPLETED",
          },
        },
      }),

      // Get all payments to calculate revenue
      prisma.payment.findMany({
        select: {
          amount: true,
          status: true,
        },
      }),

      // Count unread notifications for admin users only
      prisma.notification.count({
        where: { 
          read: false,
          user: {
            role: "ADMIN",
          },
        },
      }),

      // Get all tickets to count open ones
      prisma.ticket.findMany({
        select: {
          status: true,
        },
      }),

      // Get recent projects
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      // Get recent clients
      prisma.user.findMany({
        take: 5,
        where: { role: "CLIENT" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          isEmailVerified: true,
          createdAt: true,
          _count: {
            select: {
              projects: true,
            },
          },
        },
      }),
    ]);

    // Calculate total revenue from PAID payments (amount is stored in cents)
    const totalRevenue = allPayments
      .filter((p) => p.status === "PAID")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    // Count pending payments
    const pendingPayments = allPayments.filter((p) => p.status === "PENDING").length;

    // Count open tickets
    const openTickets = allTickets.filter(
      (t) => t.status === "OPEN" || t.status === "IN_PROGRESS"
    ).length;

    // Count unread messages (messages from admin to clients that haven't been read)
    // Note: This would require a read status field in Message model for full implementation
    // For now, we'll return 0 as messages don't have read status in the current schema
    const unreadMessages = 0;

    return NextResponse.json(
      {
        stats: {
          totalClients,
          totalProjects,
          activeProjects,
          totalRevenue: totalRevenue / 100, // Convert cents to dollars
          pendingPayments,
          unreadNotifications,
          openTickets,
          unreadMessages,
        },
        recentProjects: recentProjects.map((p) => ({
          id: p.id,
          name: p.name,
          status: p.status,
          progress: p.progress,
          client: p.client,
          deadline: p.deadline,
          createdAt: p.createdAt,
        })),
        recentClients: recentClients.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          company: c.company,
          isEmailVerified: c.isEmailVerified,
          projectsCount: c._count.projects,
          createdAt: c.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

