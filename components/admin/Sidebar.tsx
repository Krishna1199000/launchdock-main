"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  MessageSquare,
  CreditCard,
  Ticket,
  Bell,
  Settings,
} from "lucide-react";

interface SidebarProps {
  currentPath: string;
}

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, badgeKey: null },
  { path: "/admin/clients", label: "Clients", icon: Users, badgeKey: null },
  { path: "/admin/projects", label: "Projects", icon: FolderKanban, badgeKey: null },
  { path: "/admin/messages", label: "Messages", icon: MessageSquare, badgeKey: "unreadMessages" },
  { path: "/admin/payments", label: "Payments", icon: CreditCard, badgeKey: null },
  { path: "/admin/tickets", label: "Tickets", icon: Ticket, badgeKey: "openTickets" },
  { path: "/admin/notifications", label: "Notifications", icon: Bell, badgeKey: "unreadNotifications" },
  { path: "/admin/settings", label: "Settings", icon: Settings, badgeKey: null },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const [badges, setBadges] = useState({
    unreadMessages: 0,
    openTickets: 0,
    unreadNotifications: 0,
  });

  useEffect(() => {
    // Fetch badge counts from stats API
    const fetchBadges = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setBadges({
            unreadMessages: data.stats.unreadMessages || 0,
            openTickets: data.stats.openTickets || 0,
            unreadNotifications: data.stats.unreadNotifications || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching badge counts:", error);
      }
    };

    fetchBadges();
    // Refresh badges every 30 seconds
    const interval = setInterval(fetchBadges, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-full flex flex-col bg-card border-r border-border/40 text-foreground">
      {/* Logo */}
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-center">
          <Image 
            src="/launchdocklogo1.png" 
            alt="LaunchDock Logo" 
            width={128} 
            height={40}
            className="object-contain w-full h-8"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/admin"
              ? currentPath === "/admin"
              : currentPath === item.path || currentPath.startsWith(item.path + "/");

          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-white/5"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.badgeKey && badges[item.badgeKey as keyof typeof badges] > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {badges[item.badgeKey as keyof typeof badges] > 9 
                      ? "9+" 
                      : badges[item.badgeKey as keyof typeof badges]}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/40 text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()}
      </div>
    </div>
  );
}








