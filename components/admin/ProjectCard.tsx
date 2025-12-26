"use client"
import { motion } from "framer-motion";
import { FolderKanban, User, Calendar, Clock } from "lucide-react";

interface ProjectCardProps {
  project: any;
  index: number;
  onClick: () => void;
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

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="bg-white border border-[#E5E5E5] rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center">
            <FolderKanban className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-black text-lg">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.type}</p>
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
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium text-black">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className="bg-black h-2 rounded-full"
          />
        </div>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <User className="w-4 h-4" />
        <span>{project.client.name}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>{project._count?.tasks || 0} tasks</span>
          <span>{project._count?.messages || 0} messages</span>
        </div>
        {project.deadline && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}












