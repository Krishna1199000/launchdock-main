"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderKanban,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    activeProjects: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Use the new unified stats API endpoint
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalClients: data.stats.totalClients,
          totalProjects: data.stats.totalProjects,
          totalRevenue: data.stats.totalRevenue,
          pendingPayments: data.stats.pendingPayments,
          activeProjects: data.stats.activeProjects,
          unreadMessages: data.stats.unreadMessages,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "bg-primary/15 text-primary-foreground",
      href: "/admin/clients",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      icon: FolderKanban,
      color: "bg-primary/15 text-primary-foreground",
      href: "/admin/projects",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-primary/15 text-primary-foreground",
      href: "/admin/payments",
    },
    {
      label: "Pending Payments",
      value: stats.pendingPayments,
      icon: Clock,
      color: "bg-primary/15 text-primary-foreground",
      href: "/admin/payments",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-2xl p-6 space-y-4">
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border/40 rounded-2xl p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border border-border/40 rounded-xl space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => router.push(card.href)}
              className="bg-card border border-border/40 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-primary/30 hover:border-primary/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border/40 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/admin/projects?action=create")}
            className="p-4 border border-border/40 rounded-xl text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
          >
            <FolderKanban className="w-6 h-6 text-primary mb-2" />
            <p className="font-semibold text-foreground">Create Project</p>
            <p className="text-sm text-muted-foreground mt-1">Start a new project</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/admin/payments?action=create-invoice")}
            className="p-4 border border-border/40 rounded-xl text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
          >
            <DollarSign className="w-6 h-6 text-primary mb-2" />
            <p className="font-semibold text-foreground">Create Invoice</p>
            <p className="text-sm text-muted-foreground mt-1">Generate new invoice</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/admin/messages")}
            className="p-4 border border-border/40 rounded-xl text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-primary mb-2" />
            <p className="font-semibold text-foreground">View Messages</p>
            <p className="text-sm text-muted-foreground mt-1">Check client messages</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}








