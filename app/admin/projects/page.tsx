"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Calendar, User, Clock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateProjectModal from "@/components/admin/CreateProjectModal";
import ProjectCard from "@/components/admin/ProjectCard";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("action") === "create") {
      setShowCreateModal(true);
    }
    fetchProjects();
  }, [search, statusFilter]);

  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        let filtered = data.projects || [];
        if (search) {
          filtered = filtered.filter(
            (p: any) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.client.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        setProjects(filtered);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    setShowCreateModal(false);
    fetchProjects();
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage all projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Project
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border/40 rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>
        <div className="flex items-center gap-2">
          {["", "REQUIREMENTS_NEEDED", "DEVELOPMENT", "TESTING", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border/40 hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              {status || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => router.push(`/admin/projects/${project.id}`)}
            />
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateProjectModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={handleProjectCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
}








