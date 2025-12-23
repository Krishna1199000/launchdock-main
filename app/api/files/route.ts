import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { z } from "zod";

const fileSchema = z.object({
  filename: z.string().min(1),
  mime: z.string().min(1),
  size: z.number().int().positive(),
  url: z.string().url(),
  storageKey: z.string().min(1),
  projectId: z.string().optional(),
});

// POST /api/files - Create file record after upload
export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = fileSchema.parse(body);

    // Verify project access if projectId provided
    if (validated.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: validated.projectId },
      });

      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      if (user.role === "CLIENT" && project.clientId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const file = await prisma.file.create({
      data: {
        filename: validated.filename,
        mime: validated.mime,
        size: validated.size,
        url: validated.url,
        storageKey: validated.storageKey,
        projectId: validated.projectId,
        uploadedById: user.id,
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ file }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/files - List files
export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projectId = request.nextUrl.searchParams.get("projectId");
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (projectId) {
      where.projectId = projectId;
      // Verify project access
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      if (user.role === "CLIENT" && project.clientId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      // If no projectId, only show user's files
      where.uploadedById = user.id;
    }

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.file.count({ where }),
    ]);

    return NextResponse.json(
      {
        files,
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
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
