"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MessageSquare, User } from "lucide-react";
import ChatWindow from "@/components/dashboard/ChatWindow";

export default function MessagesPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserId(user.id);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
        if (data.projects.length > 0 && !selectedProject) {
          setSelectedProject(data.projects[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Projects Sidebar */}
        <div className="bg-card border border-border/40 rounded-2xl p-4 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-4">Projects</h3>
          <div className="space-y-2">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedProject(project.id)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  selectedProject === project.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/60 text-foreground hover:border-primary/40 hover:bg-primary/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs opacity-70">{project.client.name}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          {selectedProject && currentUserId ? (
            <ChatWindow projectId={selectedProject} currentUserId={currentUserId} />
          ) : (
            <div className="h-full bg-card border border-border/40 rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground">Select a project to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}








