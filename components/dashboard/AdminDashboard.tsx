"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "clients", label: "Clients", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 5 },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle, badge: 2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "Tech Startup Inc",
      projects: 2,
      status: "Active",
      joinDate: "Nov 15, 2024"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@company.com",
      company: "Wilson Enterprises",
      projects: 1,
      status: "Active",
      joinDate: "Nov 10, 2024"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@business.com",
      company: "Johnson & Co",
      projects: 3,
      status: "Inactive",
      joinDate: "Oct 28, 2024"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      client: "John Doe",
      status: "Development",
      progress: 65,
      deadline: "Dec 15, 2024",
      priority: "High"
    },
    {
      id: 2,
      name: "Brand Identity Design",
      client: "Sarah Wilson",
      status: "Review",
      progress: 90,
      deadline: "Nov 30, 2024",
      priority: "Medium"
    },
    {
      id: 3,
      name: "Mobile App UI",
      client: "Mike Johnson",
      status: "Planning",
      progress: 25,
      deadline: "Jan 20, 2025",
      priority: "Low"
    }
  ];

  const stats = [
    {
      title: "Total Clients",
      value: "24",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: "18",
      change: "+8%",
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: "$127K",
      change: "+23%",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
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
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="text-right">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${project.status === 'Development' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'Review' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {project.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{project.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-card border border-border/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">New Clients</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {clients.slice(0, 3).map((client, index) => (
              <div
                key={client.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{client.name}</h4>
                  <p className="text-sm text-muted-foreground">{client.company}</p>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                `}>
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Client Management</h2>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="hero" size="sm">
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border/30 rounded-2xl overflow-hidden">
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
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className="border-t border-border/30 hover:bg-secondary/20 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{client.company}</td>
                  <td className="p-4 text-foreground font-medium">{client.projects}</td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                    `}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{client.joinDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Project Management</h2>
        <Button variant="hero" size="sm">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="
              bg-card border border-border/30 rounded-2xl p-6
              transition-all duration-500
              hover:shadow-xl hover:shadow-foreground/5
              hover:-translate-y-2
              animate-slide-up
            "
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${project.priority === 'High' ? 'bg-red-100 text-red-700' :
                  project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'}
              `}>
                {project.priority} Priority
              </span>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              {project.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">Client: {project.client}</p>

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
                ${project.status === 'Development' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'Review' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'}
              `}>
                {project.status}
              </span>
              <span className="text-sm text-muted-foreground">Due: {project.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "clients":
        return renderClients();
      case "projects":
        return renderProjects();
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-lg">🚀</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-display text-lg font-bold text-foreground block">
                  LaunchDock
                </span>
                <span className="text-xs text-muted-foreground">Admin Panel</span>
              </div>
            )}
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
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
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

