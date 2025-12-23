"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, X } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds: string[]) => {
    try {
      const res = await fetch("/api/admin/notifications/mark-read", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds }),
      });

      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allNotifications = [
    ...(notifications?.today || []),
    ...(notifications?.thisWeek || []),
    ...(notifications?.earlier || []),
  ];

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const unreadIds = allNotifications
                .filter((n: any) => !n.read)
                .map((n: any) => n.id);
              if (unreadIds.length > 0) {
                markAsRead(unreadIds);
              }
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Mark All Read
          </motion.button>
        )}
      </div>

      <div className="space-y-8">
        {/* Today */}
        {notifications?.today && notifications.today.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Today</h2>
            <div className="space-y-3">
              {notifications.today.map((notif: any, index: number) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  index={index}
                  onMarkRead={() => markAsRead([notif.id])}
                />
              ))}
            </div>
          </div>
        )}

        {/* This Week */}
        {notifications?.thisWeek && notifications.thisWeek.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">This Week</h2>
            <div className="space-y-3">
              {notifications.thisWeek.map((notif: any, index: number) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  index={index}
                  onMarkRead={() => markAsRead([notif.id])}
                />
              ))}
            </div>
          </div>
        )}

        {/* Earlier */}
        {notifications?.earlier && notifications.earlier.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Earlier</h2>
            <div className="space-y-3">
              {notifications.earlier.map((notif: any, index: number) => (
                <NotificationCard
                  key={notif.id}
                  notification={notif}
                  index={index}
                  onMarkRead={() => markAsRead([notif.id])}
                />
              ))}
            </div>
          </div>
        )}

        {allNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationCard({
  notification,
  index,
  onMarkRead,
}: {
  notification: any;
  index: number;
  onMarkRead: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 bg-card border border-border/40 rounded-xl ${
        !notification.read ? "bg-primary/10 border-primary/40" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {!notification.read && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
            <h3 className="font-semibold text-foreground">{notification.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{notification.body}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{notification.user?.name || "System"}</span>
            <span>•</span>
            <span>{new Date(notification.createdAt).toLocaleString()}</span>
          </div>
        </div>
        {!notification.read && (
          <button
            onClick={onMarkRead}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            title="Mark as read"
          >
            <X className="w-4 h-4 text-muted-foreground/70" />
          </button>
        )}
      </div>
    </motion.div>
  );
}








