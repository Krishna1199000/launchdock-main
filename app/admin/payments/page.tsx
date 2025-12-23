"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, DollarSign, Filter, CheckCircle, Clock, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CreateInvoiceModal from "@/components/admin/CreateInvoiceModal";

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("action") === "create-invoice") {
      setShowCreateModal(true);
    }
    fetchPayments();
  }, [statusFilter]);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      if (res.ok) {
        const data = await res.json();
        let filtered = data.payments || [];
        if (statusFilter) {
          filtered = filtered.filter((p: any) => p.status === statusFilter);
        }
        setPayments(filtered);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "PENDING":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "FAILED":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700";
      case "PENDING":
        return "bg-orange-50 text-orange-700";
      case "FAILED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Payments & Invoices</h1>
          <p className="text-muted-foreground">Manage all payments and invoices</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {["", "PENDING", "PAID", "FAILED"].map((status) => (
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

      {/* Payments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {payments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-card border border-border/40 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${((payment.amount || 0) / 100).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {payment.project?.name || "General Payment"}
                  </p>
                </div>
                {getStatusIcon(payment.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Client</span>
                  <span className="font-medium text-foreground">{payment.client.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
                {payment.invoiceUrl && (
                  <a
                    href={payment.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View Invoice
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">No payments found</p>
        </div>
      )}

      <AnimatePresence>
        {showCreateModal && (
          <CreateInvoiceModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              fetchPayments();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}








