"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, Search, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  user: any;
  onMenuClick: () => void;
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any>(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
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
    }
  };

  const handleLogout = async () => {
    try {
      // Clear auth cookie
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/signin");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        variant: "success",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="h-16 border-b border-border/40 bg-background flex items-center justify-between px-6 text-foreground">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-border/40 rounded-xl bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-xs text-white font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </motion.div>
            )}
          </button>

          {/* Notifications Panel */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-96 bg-card border border-border/40 rounded-2xl shadow-xl shadow-black/30 z-50 max-h-[500px] overflow-y-auto"
              >
                <div className="p-4 border-b border-border/40">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="p-2">
                  {notifications ? (
                    <>
                      {notifications.today.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2 px-2">Today</p>
                          {notifications.today.map((notif: any) => (
                            <NotificationItem key={notif.id} notification={notif} />
                          ))}
                        </div>
                      )}
                      {notifications.thisWeek.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2 px-2">This Week</p>
                          {notifications.thisWeek.map((notif: any) => (
                            <NotificationItem key={notif.id} notification={notif} />
                          ))}
                        </div>
                      )}
                      {notifications.earlier.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-2 px-2">Earlier</p>
                          {notifications.earlier.slice(0, 5).map((notif: any) => (
                            <NotificationItem key={notif.id} notification={notif} />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-border/40">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        p-3 rounded-xl mb-2 cursor-pointer transition-all
        ${notification.read ? "bg-card" : "bg-primary/10"}
        hover:bg-white/5
      `}
    >
      <div className="flex items-start gap-3">
        {!notification.read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{notification.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{notification.body}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}








