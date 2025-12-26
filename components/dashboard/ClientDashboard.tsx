"use client"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard,
  FolderOpen,
  Clock,
  MessageSquare,
  FileText,
  CreditCard,
  HelpCircle,
  Settings,
  User,
  Bell,
  Search,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Play,
  Pause,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProjectCard from "./ProjectCard";

const ClientDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Compute sidebar items with dynamic badge
  const sidebarItems = useMemo(() => [
    { id: "projects", label: "My Projects", icon: FolderOpen },
    { id: "timeline", label: "Project Timeline", icon: Clock },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: messages.filter((m: any) => m.isAdmin).length },
    { id: "files", label: "File Manager", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ], [messages]);

  // Fetch user data on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchDashboardData(parsedUser.id);
    } else {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async (userId: string) => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [projectsRes, messagesRes, filesRes] = await Promise.all([
        fetch(`/api/projects?userId=${userId}`),
        fetch(`/api/messages?userId=${userId}`),
        fetch(`/api/files?userId=${userId}`),
      ]);

      const projectsData = await projectsRes.json();
      const messagesData = await messagesRes.json();
      const filesData = await filesRes.json();

      if (projectsData.success) setProjects(projectsData.projects || []);
      if (messagesData.success) setMessages(messagesData.messages || []);
      if (filesData.success) setFiles(filesData.files || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please refresh the page.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !user) return;

    setSendingMessage(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          content: messageInput,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [data.message, ...prev]);
        setMessageInput("");
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "error",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const renderProjects = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
            <Button variant="hero" size="sm" className="group">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No projects yet. Start by creating a new project!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
          <Button variant="hero" size="sm" className="group">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            // Map API project to ProjectCard format
            const projectCard = {
              id: project.id,
              name: project.name,
              type: project.type,
              status: project.status,
              progress: project.progress,
              deadline: project.deadline,
              _count: project._count,
            };
            return (
              <ProjectCard
                key={project.id}
                project={projectCard}
                index={index}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderMessages = () => {
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
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>

        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Select a project to view messages
          </p>
          <p className="text-sm text-muted-foreground">
            Messages are available in the project detail view
          </p>
        </div>
      </div>
    );
  };

  const renderFiles = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (files.length === 0) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">File Manager</h2>
            <Button variant="hero" size="sm" className="group">
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No files yet. Upload your first file!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">File Manager</h2>
          <Button variant="hero" size="sm" className="group">
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={file.id}
              className="
                bg-card border border-border/30 rounded-2xl p-4
                transition-all duration-300
                hover:shadow-lg hover:shadow-foreground/5
                hover:-translate-y-1
                animate-slide-up
              "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <FileText className="w-8 h-8 text-primary" />
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1 truncate">{file.name}</h4>
              <p className="text-xs text-muted-foreground">{file.size} • {file.type}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return renderProjects();
      case "messages":
        return renderMessages();
      case "files":
        return renderFiles();
      default:
        return renderProjects();
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
                Dashboard
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
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/signin");
                }}
              >
                Logout
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
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

export default ClientDashboard;

