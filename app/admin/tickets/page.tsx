"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Ticket, AlertCircle, AlertTriangle, Info, Zap } from "lucide-react";

const priorityIcons: Record<string, any> = {
  LOW: Info,
  MEDIUM: AlertCircle,
  HIGH: AlertTriangle,
  CRITICAL: Zap,
};

const priorityColors: Record<string, string> = {
  LOW: "bg-primary/10 text-primary-foreground border-primary/20",
  MEDIUM: "bg-amber-500/15 text-amber-100 border-amber-300/40",
  HIGH: "bg-orange-500/15 text-orange-100 border-orange-300/40",
  CRITICAL: "bg-red-500/15 text-red-100 border-red-300/40",
};

const statusColumns = [
  { id: "OPEN", label: "Open" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "RESOLVED", label: "Resolved" },
  { id: "CLOSED", label: "Closed" },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchTickets();
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const getTicketsByStatus = (status: string) => {
    return tickets.filter((ticket) => ticket.status === status);
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Support Tickets</h1>
        <p className="text-muted-foreground">Manage client support tickets</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map((column, colIndex) => {
          const columnTickets = getTicketsByStatus(column.id);
          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              className="bg-card border border-border/40 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{column.label}</h3>
                <span className="text-sm text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                  {columnTickets.length}
                </span>
              </div>
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {columnTickets.map((ticket, index) => {
                  const PriorityIcon = priorityIcons[ticket.priority] || Info;
                  return (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 bg-background/70 border border-border/40 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PriorityIcon
                            className={`w-4 h-4 ${
                              priorityColors[ticket.priority].split(" ")[1]
                            }`}
                          />
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[ticket.priority]}`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{ticket.client.name}</span>
                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      {ticket.project && (
                        <p className="text-xs text-muted-foreground/70 mt-2">
                          Project: {ticket.project.name}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
                {columnTickets.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tickets
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}








