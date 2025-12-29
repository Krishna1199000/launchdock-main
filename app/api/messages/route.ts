import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") || request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 }
      );
    }

    // Fetch messages for the user
    const messages = await prisma.message.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to last 50 messages
      select: {
        id: true,
        content: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    // Format messages for frontend
    const formattedMessages = messages.reverse().map((message) => ({
      id: message.id,
      sender: message.isAdmin ? "Admin" : "You",
      message: message.content,
      time: formatTimeAgo(message.createdAt),
      isAdmin: message.isAdmin,
    }));

    return NextResponse.json(
      {
        success: true,
        messages: formattedMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, content, projectId } = body;

    if (!userId || !content) {
      return NextResponse.json(
        { error: "User ID and message content are required" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId,
        projectId: projectId || null,
        isAdmin: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: {
          id: message.id,
          sender: "You",
          message: message.content,
          time: "Just now",
          isAdmin: false,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
















