"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, User, Mail, Phone, Calendar, DollarSign } from "lucide-react";
import ClientDetailPanel from "@/components/admin/ClientDetailPanel";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [search, statusFilter]);

  const fetchClients = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClientClick = async (clientId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${clientId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedClient(data);
        setShowDetailPanel(true);
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage all your clients</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border/40 rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              statusFilter === ""
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border/40 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              statusFilter === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border/40 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              statusFilter === "inactive"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border/40 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background/60 border-b border-border/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <AnimatePresence>
                {clients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "#FAFAFA" }}
                    onClick={() => handleClientClick(client.id)}
                    className="cursor-pointer transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{client.name}</p>
                          {client.isHighValue && (
                            <span className="text-xs text-primary font-medium">High Value</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {client.email}
                        </div>
                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            {client.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">
                        {client._count?.projects || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground/70" />
                        <span className="text-sm font-medium text-foreground">
                          ${((client.totalRevenue || 0) / 100).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(client.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          client.isEmailVerified
                            ? "bg-emerald-500/15 text-emerald-200"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {client.isEmailVerified ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Panel */}
      <AnimatePresence>
        {showDetailPanel && selectedClient && (
          <ClientDetailPanel
            client={selectedClient}
            onClose={() => {
              setShowDetailPanel(false);
              setSelectedClient(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}








