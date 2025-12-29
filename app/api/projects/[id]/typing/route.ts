import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { broadcastTyping } from "@/lib/pusher";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { isTyping } = body;

    await broadcastTyping(params.id, user.id, isTyping);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error broadcasting typing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
















