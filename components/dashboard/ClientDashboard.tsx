"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: "projects", label: "My Projects", icon: FolderOpen },
    { id: "timeline", label: "Project Timeline", icon: Clock },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
    { id: "files", label: "File Manager", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      type: "Web Development",
      status: "Development",
      progress: 65,
      deadline: "Dec 15, 2024",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Brand Identity",
      type: "Branding",
      status: "Review",
      progress: 90,
      deadline: "Nov 30, 2024",
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Mobile App UI",
      type: "UI/UX Design",
      status: "Design",
      progress: 40,
      deadline: "Jan 20, 2025",
      color: "bg-green-500"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Admin",
      message: "Your website design has been approved! Moving to development phase.",
      time: "2 hours ago",
      isAdmin: true
    },
    {
      id: 2,
      sender: "You",
      message: "Thank you! When can I expect the first development update?",
      time: "1 hour ago",
      isAdmin: false
    },
    {
      id: 3,
      sender: "Admin",
      message: "We'll have the first milestone ready by Friday. I'll send you the preview link.",
      time: "30 min ago",
      isAdmin: true
    }
  ];

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
        <Button variant="hero" size="sm" className="group">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="
              group bg-card border border-border/30 rounded-2xl p-6
              transition-all duration-500
              hover:shadow-xl hover:shadow-foreground/5
              hover:-translate-y-2 hover:border-primary/30
              animate-slide-up
            "
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-3 h-3 rounded-full ${project.color}`} />
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${project.status === 'Development' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'Review' ? 'bg-purple-100 text-purple-700' :
                  project.status === 'Design' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'}
              `}>
                {project.status}
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{project.type}</p>

            {/* Progress Bar */}
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

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due: {project.deadline}</span>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Messages</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>

      <div className="bg-card border border-border/30 rounded-2xl p-6 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`
                max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
                ${msg.isAdmin 
                  ? 'bg-secondary text-foreground' 
                  : 'bg-primary text-primary-foreground'
                }
              `}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="
              flex-1 px-4 py-3 rounded-2xl
              border border-border/30 bg-background
              text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10
              transition-all duration-300
            "
          />
          <Button variant="hero" size="sm">
            Send
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">File Manager</h2>
        <Button variant="hero" size="sm" className="group">
          <Upload className="w-4 h-4" />
          Upload Files
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Brand Guidelines.pdf", size: "2.4 MB", type: "PDF" },
          { name: "Website Mockups.fig", size: "15.8 MB", type: "Figma" },
          { name: "Logo Assets.zip", size: "8.2 MB", type: "Archive" },
          { name: "Content Document.docx", size: "1.1 MB", type: "Word" }
        ].map((file, index) => (
          <div
            key={index}
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
            <h4 className="font-medium text-foreground text-sm mb-1">{file.name}</h4>
            <p className="text-xs text-muted-foreground">{file.size} • {file.type}</p>
          </div>
        ))}
      </div>
    </div>
  );

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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-lg">🚀</span>
            </div>
            {sidebarOpen && (
              <span className="font-display text-lg font-bold text-foreground">
                LaunchDock
              </span>
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
                onClick={() => router.push("/signin")}
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

