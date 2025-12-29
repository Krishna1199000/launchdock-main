"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  CreditCard,
  Ticket,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ChatWindow from "@/components/dashboard/ChatWindow";
import FileUpload from "@/components/dashboard/FileUpload";
import { Loader2 } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("timeline");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/signin");
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
      } else {
        toast({
          title: "Error",
          description: "Failed to load project",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const tabs = [
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "files", label: "Files", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "tickets", label: "Tickets", icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {project.name}
          </h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-card border border-border/30 rounded-2xl p-6 min-h-[600px]">
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Project Timeline
              </h2>

              {/* Milestones */}
              {project.milestones && project.milestones.length > 0 ? (
                <div className="space-y-4">
                  {project.milestones.map((milestone: any, index: number) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 border border-border/30 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          milestone.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {milestone.description}
                          </p>
                        )}
                        {milestone.dueDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No milestones yet</p>
              )}

              {/* Tasks */}
              {project.tasks && project.tasks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Tasks
                  </h3>
                  <div className="space-y-2">
                    {project.tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 border border-border/30 rounded-lg"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <p
                            className={`${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && user && (
            <ChatWindow projectId={params.id as string} currentUserId={user.id} />
          )}

          {activeTab === "files" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Files</h2>
              </div>
              <FileUpload projectId={params.id as string} />
              {/* File list would go here */}
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Payments
              </h2>
              <p className="text-muted-foreground">Payment history will appear here</p>
            </div>
          )}

          {activeTab === "tickets" && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Support Tickets
              </h2>
              <p className="text-muted-foreground">Tickets will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
















