"use client"
import { motion } from "framer-motion";
import { X, Mail, Phone, Calendar, DollarSign, FolderKanban, MessageSquare, FileText } from "lucide-react";

interface ClientDetailPanelProps {
  client: any;
  onClose: () => void;
}

export default function ClientDetailPanel({ client, onClose }: ClientDetailPanelProps) {
  const { client: clientData, activity, projects, stats } = client;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-6 border-b border-[#E5E5E5] sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black">Client Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#E5E5E5]">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold">
              {clientData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">{clientData.name}</h3>
              <p className="text-gray-500">{clientData.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Total Projects</p>
              <p className="text-2xl font-bold text-black">{stats.totalProjects}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-black">
                ${(stats.totalRevenue / 100).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Projects</h4>
            <div className="space-y-2">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="p-4 border border-[#E5E5E5] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderKanban className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-black">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.type}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {project._count.tasks} tasks
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {activity.messages.slice(0, 5).map((msg: any) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-black">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.project?.name} • {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}












