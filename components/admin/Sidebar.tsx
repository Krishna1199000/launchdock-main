"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/clients", label: "Clients", icon: Users },
  { path: "/admin/projects", label: "Projects", icon: FolderKanban },
  { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  { path: "/admin/payments", label: "Payments", icon: CreditCard },
  { path: "/admin/tickets", label: "Tickets", icon: Ticket },
  { path: "/admin/notifications", label: "Notifications", icon: Bell },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-card border-r border-border/40 text-foreground">
      {/* Logo */}
      <div className="p-6 border-b border-border/40">
        <h1 className="text-2xl font-bold text-white">LaunchDock</h1>
        <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
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
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/40 text-xs text-muted-foreground">
        © {new Date().getFullYear()} LaunchDock
      </div>
    </div>
  );
}








