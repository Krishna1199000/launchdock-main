"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Link2, CalendarClock } from "lucide-react";

type Props = {
  mode: string;
  summary: {
    when?: string;
    link?: string;
    desc?: string;
  };
  onReset: () => void;
};

const ConfirmationScreen = ({ mode, summary, onReset }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
  >
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-teal-500/20 p-2 text-teal-200">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.18em] text-teal-200">Confirmed</p>
        <p className="text-xl font-semibold">Your {mode} is set</p>
        {summary.desc && <p className="text-sm text-slate-300/80">{summary.desc}</p>}
      </div>
    </div>

    <div className="mt-4 space-y-2 text-sm text-slate-200">
      {summary.when && (
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2">
          <CalendarClock className="h-4 w-4 text-teal-200" />
          <span>{summary.when}</span>
        </div>
      )}
      {summary.link && (
        <a
          href={summary.link}
          className="flex items-center gap-2 rounded-xl border border-teal-400/40 bg-teal-500/10 px-3 py-2 text-teal-100 underline-offset-4 hover:underline"
        >
          <Link2 className="h-4 w-4" />
          <span>Join / View Link</span>
        </a>
      )}
    </div>

    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300/80">
      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-100">We’ll email details and reminders.</span>
      <button
        onClick={onReset}
        className="rounded-full border border-white/15 px-3 py-1 text-white hover:border-teal-300/50 hover:text-teal-100"
      >
        Schedule another
      </button>
    </div>
  </motion.div>
);

export default ConfirmationScreen;







