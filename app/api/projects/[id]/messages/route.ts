import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { messageSchema } from "@/lib/validation";

// GET /api/projects/:id/messages
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify project access
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (user.role === "CLIENT" && project.clientId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { projectId: params.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              role: true,
            },
          },
          file: {
            select: {
              id: true,
              filename: true,
              mime: true,
              size: true,
              url: true,
            },
          },
        },
      }),
      prisma.message.count({
        where: { projectId: params.id },
      }),
    ]);

    return NextResponse.json(
      {
        messages: messages.reverse(), // Reverse to show oldest first
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
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/projects/:id/messages
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify project access
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (user.role === "CLIENT" && project.clientId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validated = messageSchema.parse(body);

    const message = await prisma.message.create({
      data: {
        projectId: params.id,
        senderId: user.id,
        content: validated.content,
        type: validated.type,
        fileId: validated.fileId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
          },
        },
        file: validated.fileId
          ? {
              select: {
                id: true,
                filename: true,
                mime: true,
                size: true,
                url: true,
              },
            }
          : undefined,
      },
    });

    // Broadcast message via Pusher
    try {
      const { broadcastMessage } = await import("@/lib/pusher");
      await broadcastMessage(params.id, message);
    } catch (error) {
      console.error("Error broadcasting message:", error);
      // Continue even if broadcast fails
    }

    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}








