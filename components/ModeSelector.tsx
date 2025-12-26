"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  Video,
  MessagesSquare,
  CalendarClock,
  Sparkles,
} from "lucide-react";

type Mode = "phone" | "video" | "chat" | "schedule";

type Props = {
  active: Mode | null;
  onSelect: (mode: Mode) => void;
};

const modes: { id: Mode; title: string; desc: string; icon: React.ElementType }[] = [
  { id: "phone", title: "Phone Call", desc: "Talk with an expert right now or schedule a callback.", icon: PhoneCall },
  { id: "video", title: "Video Call", desc: "Schedule a video call with our expert team.", icon: Video },
  { id: "chat", title: "Live Chat", desc: "Open the expert chat and stay async if we’re offline.", icon: MessagesSquare },
  { id: "schedule", title: "Schedule for Later", desc: "Book a slot for phone, video, or chat follow-up.", icon: CalendarClock },
];

const cardVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

const ModeSelector = ({ active, onSelect }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {modes.map((mode, idx) => {
      const Icon = mode.icon;
      const selected = active === mode.id;
      return (
        <motion.button
          key={mode.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          onClick={() => onSelect(mode.id)}
          className={`group relative overflow-hidden rounded-2xl border px-4 py-5 text-left transition-all duration-300 ${
            selected
              ? "border-teal-400/60 bg-white/5 shadow-[0_18px_50px_rgba(0,150,136,0.25)]"
              : "border-white/10 bg-white/2 hover:border-teal-300/50 hover:bg-white/4"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-white/0 to-white/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${selected ? "bg-teal-500/20 text-teal-200" : "bg-white/5 text-teal-100"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{mode.title}</p>
                <p className="text-xs text-slate-300/80">{mode.desc}</p>
              </div>
            </div>
            <Sparkles className={`h-4 w-4 transition-colors ${selected ? "text-teal-200" : "text-slate-500"}`} />
          </div>
        </motion.button>
      );
    })}
  </div>
);

export type { Mode };
export default ModeSelector;





