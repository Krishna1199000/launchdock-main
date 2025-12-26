"use client"
import { motion } from "framer-motion";
import { ShieldX, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ShieldX className="w-10 h-10 text-red-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-black mb-4">Access Denied</h1>
        <p className="text-gray-500 mb-8">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        <Link href="/dashboard/client">
          <Button variant="hero" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go to Client Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}












