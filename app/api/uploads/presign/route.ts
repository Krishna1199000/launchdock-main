import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { generatePresignedUpload } from "@/lib/s3";
import { z } from "zod";

const presignSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  mimeType: z.string().min(1, "MIME type is required"),
  projectId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = presignSchema.parse(body);

    // If projectId provided, verify access
    if (validated.projectId) {
      const { prisma } = await import("@/lib/prisma");
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

    const result = await generatePresignedUpload(
      validated.filename,
      validated.mimeType,
      validated.projectId
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}












