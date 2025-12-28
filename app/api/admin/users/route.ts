import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/users - List all clients
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
    const status = request.nextUrl.searchParams.get("status") || "";
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {
      role: "CLIENT",
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status === "active") {
      where.isEmailVerified = true;
    } else if (status === "inactive") {
      where.isEmailVerified = false;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatarUrl: true,
          isEmailVerified: true,
          createdAt: true,
          _count: {
            select: {
              projects: true,
              messages: true,
              payments: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Calculate total revenue per client
    const usersWithRevenue = await Promise.all(
      users.map(async (user) => {
        const totalRevenue = await prisma.payment.aggregate({
          where: {
            clientId: user.id,
            status: "PAID",
          },
          _sum: {
            amount: true,
          },
        });

        return {
          ...user,
          totalRevenue: totalRevenue._sum.amount || 0,
        };
      })
    );

    // Mark high-value clients (revenue > $10,000)
    const usersWithHighValue = usersWithRevenue.map((user) => ({
      ...user,
      isHighValue: user.totalRevenue > 1000000, // $10,000 in cents
    }));

    return NextResponse.json(
      {
        users: usersWithHighValue,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});














