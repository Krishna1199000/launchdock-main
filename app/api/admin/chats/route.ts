import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/chats - Get all chat requests (for admin to see customers who want to chat)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const status = request.nextUrl.searchParams.get("status") || "WAITING";
    const take = Math.min(parseInt(request.nextUrl.searchParams.get("take") || "50"), 100);

    const chatRequests = await prisma.talkRequest.findMany({
      where: {
        mode: "CHAT",
        status: status as any,
      },
      orderBy: { createdAt: "desc" },
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ chats: chatRequests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});





