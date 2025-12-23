import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { deleteFile } from "@/lib/s3";

// GET /api/files/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = await prisma.file.findUnique({
      where: { id: params.id },
      include: {
        uploadedBy: {
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

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check access
    if (file.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: file.projectId },
      });
      if (user.role === "CLIENT" && project?.clientId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (file.uploadedById !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ file }, { status: 200 });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/files/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = await prisma.file.findUnique({
      where: { id: params.id },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check access
    if (file.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: file.projectId },
      });
      if (user.role === "CLIENT" && project?.clientId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (file.uploadedById !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete from S3
    await deleteFile(file.storageKey);

    // Delete from database
    await prisma.file.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}








