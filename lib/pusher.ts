import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "us2",
  useTLS: true,
});

export async function broadcastMessage(projectId: string, message: any) {
  try {
    await pusher.trigger(`project-${projectId}`, "message:new", {
      message,
    });
  } catch (error) {
    console.error("Error broadcasting message:", error);
  }
}

export async function broadcastTyping(projectId: string, userId: string, isTyping: boolean) {
  try {
    await pusher.trigger(`project-${projectId}`, "typing", {
      userId,
      isTyping,
    });
  } catch (error) {
    console.error("Error broadcasting typing:", error);
  }
}

export default pusher;












