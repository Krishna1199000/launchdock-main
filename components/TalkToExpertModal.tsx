"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Sparkles } from "lucide-react";
import ModeSelector, { Mode } from "./ModeSelector";
import ScheduleForm, { FormState } from "./ScheduleForm";
import ConfirmationScreen from "./ConfirmationScreen";

type Props = {
  open: boolean;
  onClose: () => void;
  expertOnline?: boolean;
  expertBusy?: boolean;
};

const TalkToExpertModal = ({ open, onClose, expertOnline = true, expertBusy = false }: Props) => {
  const [mode, setMode] = useState<Mode | null>(null);
  const [view, setView] = useState<"select" | "form" | "confirm">("select");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{ mode: string; when?: string; link?: string; desc?: string }>({
    mode: "",
  });

  useEffect(() => {
    if (!open) {
      setMode(null);
      setView("select");
      setLoading(false);
    }
  }, [open]);

  const offline = !expertOnline;
  const busy = expertBusy;

  const headline = useMemo(() => {
    if (view === "confirm") return "You're scheduled";
    if (!mode) return "Talk to an expert";
    switch (mode) {
      case "phone":
        return "Phone call with an expert";
      case "video":
        return "Video call via LaunchDock Meet";
      case "chat":
        return "Live chat with our team";
      case "schedule":
        return "Book a time that works";
      default:
        return "Talk to an expert";
    }
  }, [mode, view]);

  const desc = useMemo(() => {
    if (!mode) return "Pick a channel and we’ll route you instantly or book you in.";
    if (mode === "chat" && offline) return "We’re currently offline. Leave an email to continue async with SLA.";
    if (mode === "phone" && busy) return "Expert is on another call. We suggest scheduling a callback.";
    return "Minimal fields, fast confirmation, no friction.";
  }, [mode, offline, busy]);

  const handleSubmit = async (data: FormState) => {
    try {
      setLoading(true);
      const res = await fetch("/api/talk-to-expert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(offline ? { "x-expert-offline": "1" } : {}),
          ...(busy ? { "x-expert-busy": "1" } : {}),
        },
        body: JSON.stringify({
          ...data,
          datetime: data.datetime,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Unable to schedule");
      }

      const payload = await res.json();
      const request = payload.request;
      setSummary({
        mode: request.mode.toLowerCase(),
        when: request.scheduledFor || (data.immediate ? "Now" : undefined),
        link: request.meetingLink,
        desc:
          request.status === "ASYNC"
            ? "We’re offline; we’ll continue asynchronously and reply within SLA."
            : "We’ve locked your slot and sent details.",
      });
      setView("confirm");
      setLoading(false);

      if (request.meetingLink && data.immediate && data.mode === "video") {
        window.open(request.meetingLink, "_blank", "noopener");
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-slate-200 hover:border-teal-300/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 text-teal-100">
                <Sparkles className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em]">Fast-track your consult</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white md:text-3xl">{headline}</h3>
                <p className="text-sm text-slate-300/80">{desc}</p>
              </div>

              <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  {view === "select" && (
                    <ModeSelector
                      active={mode}
                      onSelect={(m) => {
                        setMode(m);
                        setView("form");
                      }}
                    />
                  )}
                  {view === "form" && mode && (
                    <ScheduleForm mode={mode} onSubmit={handleSubmit} busy={busy} offline={offline} />
                  )}
                  {view === "confirm" && (
                    <ConfirmationScreen
                      mode={summary.mode}
                      summary={summary}
                      onReset={() => {
                        setView("select");
                        setMode(null);
                      }}
                    />
                  )}
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5 text-sm text-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-sky-500/8 to-transparent" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-teal-100">
                      Status & Routing
                    </div>
                    <div className="grid gap-3 text-sm">
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Expert availability</span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            offline
                              ? "bg-amber-500/20 text-amber-100"
                              : busy
                              ? "bg-amber-500/20 text-amber-100"
                              : "bg-emerald-500/20 text-emerald-100"
                          }`}
                        >
                          {offline ? "Offline → async" : busy ? "Busy → schedule" : "Online"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Missed call logic</span>
                        <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs text-sky-100">Auto-reschedule email</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Chat fallback</span>
                        <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs text-teal-100">Offline → async chat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm text-white">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Finalizing your booking...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TalkToExpertModal;

