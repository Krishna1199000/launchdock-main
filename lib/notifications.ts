import { prisma } from "./prisma";

/**
 * Create notifications for all admin users
 */
export async function createAdminNotifications(
  title: string,
  body: string,
  data?: any
) {
  try {
    // Get all admin users
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (admins.length === 0) {
      console.warn("No admin users found to create notifications");
      return [];
    }

    // Create notifications for all admins
    const notifications = await Promise.all(
      admins.map((admin) =>
        prisma.notification.create({
          data: {
            userId: admin.id,
            title,
            body,
            data: data || {},
            read: false,
          } as any,
        })
      )
    );

    return notifications;
  } catch (error) {
    console.error("Error creating admin notifications:", error);
    return [];
  }
}



