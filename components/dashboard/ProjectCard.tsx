"use client"
import { motion } from "framer-motion";
import { Calendar, FolderOpen } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    type: string;
    status: string;
    progress: number;
    deadline: string | null;
    _count?: {
      tasks: number;
      messages: number;
      files: number;
    };
  };
  index: number;
}

const statusColors: Record<string, string> = {
  REQUIREMENTS_NEEDED: "bg-gray-100 text-gray-700",
  PLANNING: "bg-blue-100 text-blue-700",
  DESIGN: "bg-purple-100 text-purple-700",
  DEVELOPMENT: "bg-green-100 text-green-700",
  TESTING: "bg-yellow-100 text-yellow-700",
  REVIEW: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-card border border-border/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <Link href={`/dashboard/client/projects/${project.id}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground">{project.type}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[project.status] || statusColors.REQUIREMENTS_NEEDED
            }`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="bg-primary h-2 rounded-full"
            />
          </div>
        </div>

        {/* Stats */}
        {project._count && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{project._count.tasks} tasks</span>
            <span>{project._count.messages} messages</span>
            <span>{project._count.files} files</span>
          </div>
        )}

        {/* Deadline */}
        {project.deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
















