"use client"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard,
  Users,
  FolderOpen,
  MessageSquare,
  CreditCard,
  HelpCircle,
  Bell,
  Settings,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    unreadNotifications: 0,
    openTickets: 0,
    unreadMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentClients, setRecentClients] = useState<any[]>([]);

  // Fetch dashboard data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentProjects(data.recentProjects || []);
        setRecentClients(data.recentClients || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Compute sidebar items with dynamic badge counts
  const sidebarItems = useMemo(() => [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "clients", label: "Clients", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle, badge: stats.openTickets > 0 ? stats.openTickets : undefined },
    { id: "notifications", label: "Notifications", icon: Bell, badge: stats.unreadNotifications > 0 ? stats.unreadNotifications : undefined },
    { id: "settings", label: "Settings", icon: Settings },
  ], [stats]);

  const statCards = [
    {
      title: "Total Clients",
      value: stats.totalClients.toString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: stats.activeProjects.toString(),
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments.toString(),
      icon: CreditCard,
      color: "text-orange-600"
    }
  ];

  const renderOverview = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="
                  bg-card border border-border/30 rounded-2xl p-6
                  transition-all duration-500
                  hover:shadow-xl hover:shadow-foreground/5
                  hover:-translate-y-2
                  animate-slide-up
                "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-card border border-border/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Recent Projects</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/admin/projects")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentProjects.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No projects yet</p>
              ) : (
                recentProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                  >
                    <div>
                      <h4 className="font-medium text-foreground">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client?.name || "Unknown Client"}</p>
                    </div>
                    <div className="text-right">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${project.status === 'DEVELOPMENT' ? 'bg-blue-100 text-blue-700' :
                          project.status === 'REVIEW' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'}
                      `}>
                        {project.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{project.progress}%</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Clients */}
          <div className="bg-card border border-border/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">New Clients</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/admin/clients")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentClients.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No clients yet</p>
              ) : (
                recentClients.slice(0, 3).map((client, index) => (
                  <div
                    key={client.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => router.push(`/admin/clients?clientId=${client.id}`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {client.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.company || "No company"}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${client.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                    `}>
                      {client.isEmailVerified ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClients = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Client Management</h2>
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => router.push("/admin/clients")}
          >
            <Plus className="w-4 h-4" />
            View All Clients
          </Button>
        </div>

        <div className="bg-card border border-border/30 rounded-2xl overflow-hidden">
          {recentClients.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No clients found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Client</th>
                    <th className="text-left p-4 font-medium text-foreground">Company</th>
                    <th className="text-left p-4 font-medium text-foreground">Projects</th>
                    <th className="text-left p-4 font-medium text-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-foreground">Join Date</th>
                    <th className="text-left p-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClients.map((client, index) => (
                    <tr
                      key={client.id}
                      className="border-t border-border/30 hover:bg-secondary/20 transition-colors animate-slide-up cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => router.push(`/admin/clients?clientId=${client.id}`)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {client.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{client.company || "N/A"}</td>
                      <td className="p-4 text-foreground font-medium">{client.projectsCount || 0}</td>
                      <td className="p-4">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${client.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                        `}>
                          {client.isEmailVerified ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/clients?clientId=${client.id}`);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Project Management</h2>
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => router.push("/admin/projects?action=create")}
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project, index) => (
              <div
                key={project.id}
                className="
                  bg-card border border-border/30 rounded-2xl p-6
                  transition-all duration-500
                  hover:shadow-xl hover:shadow-foreground/5
                  hover:-translate-y-2
                  animate-slide-up cursor-pointer
                "
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => router.push(`/admin/projects/${project.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${project.status === 'DEVELOPMENT' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'TESTING' ? 'bg-yellow-100 text-yellow-700' :
                      project.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {project.status}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/admin/projects/${project.id}`);
                    }}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Client: {project.client?.name || "Unknown"}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-border/30 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${project.status === 'DEVELOPMENT' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'TESTING' ? 'bg-purple-100 text-purple-700' :
                      project.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {project.status}
                  </span>
                  {project.deadline && (
                    <span className="text-sm text-muted-foreground">
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "clients":
        return renderClients();
      case "projects":
        return renderProjects();
      case "messages":
        router.push("/admin/messages");
        return null;
      case "payments":
        router.push("/admin/payments");
        return null;
      case "support":
        router.push("/admin/tickets");
        return null;
      case "notifications":
        router.push("/admin/notifications");
        return null;
      case "settings":
        router.push("/admin/settings");
        return null;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-64' : 'w-16'} 
        bg-card border-r border-border/30 
        transition-all duration-300
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-center">
            <Image 
              src="/launchdocklogo1.png" 
              alt="LaunchDock Logo" 
              width={sidebarOpen ? 120 : 32} 
              height={sidebarOpen ? 32 : 32}
              className="object-contain"
              style={{ width: sidebarOpen ? 'auto' : '32px', height: '32px' }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-xl
                      transition-all duration-300
                      ${activeTab === item.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge > 9 ? "9+" : item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <LayoutDashboard className="w-5 h-5" />
              </Button>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="
                    pl-10 pr-4 py-2 rounded-xl
                    border border-border/30 bg-background
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary/50
                    transition-all duration-300
                    w-64
                  "
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => router.push("/signin")}
              >
                Logout
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

