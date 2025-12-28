"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ChatWidget = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setEmailForm({ name: "", email: "", phone: "", message: "" });
    }
  }, [open]);

  const handleEmailSubmit = async () => {
    if (!emailForm.name || !emailForm.email || !emailForm.message) {
      toast({
        title: "Required fields missing",
        description: "Please fill in name, email, and message.",
        variant: "error",
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/chatwidget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "email", ...emailForm }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We've received your message and will respond within 24 hours.",
          variant: "success",
        });
        setEmailForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setOpen(false), 2000);
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "error",
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Could not send message. Please try again.",
        variant: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mb-3 w-80 sm:w-96 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-xl shadow-black/40 backdrop-blur"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                  <Mail className="h-5 w-5 text-teal-300" />
                  <span className="text-sm font-semibold">Contact Us</span>
                </div>
                <button
                  className="rounded-full p-1 text-slate-300 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-sm text-slate-200">
                  Send us a message and we'll reply in your inbox.
                </div>
                
                {["name", "email", "phone"].map((field) => (
                  <label key={field} className="block space-y-1 text-xs text-slate-200">
                    <span className="capitalize">{field === "phone" ? "Phone (optional)" : field}</span>
                    <input
                      required={field !== "phone"}
                      value={(emailForm as any)[field]}
                      onChange={(e) => setEmailForm({ ...emailForm, [field]: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-teal-300/70 transition-colors"
                      placeholder={field === "phone" ? "+1 555 123 4567" : field === "name" ? "your name" : "your@email.com"}
                      type={field === "email" ? "email" : "text"}
                    />
                  </label>
                ))}
                
                <label className="block space-y-1 text-xs text-slate-200">
                  <span>Message</span>
                  <textarea
                    required
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-teal-300/70 transition-colors resize-none"
                    rows={4}
                    placeholder="How can we help you?"
                  />
                </label>
                
                <button
                  onClick={handleEmailSubmit}
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-sky-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3 text-white shadow-lg shadow-teal-500/40 hover:shadow-xl transition-shadow"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-semibold">{open ? "Close" : "Contact Us"}</span>
        </motion.button>
      </div>
    </>
  );
};

export default ChatWidget;