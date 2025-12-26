"use client";

import { motion } from "framer-motion";
import { CalendarClock, MessagesSquare, Video, PhoneCall, Link2 } from "lucide-react";

type Booking = {
  id: string;
  mode: "phone" | "video" | "chat";
  customer: string;
  when: string;
  status: "scheduled" | "waiting" | "active";
  link?: string;
};

type Props = {
  upcoming: Booking[];
  activeChats: { id: string; customer: string; status: "live" | "async" }[];
};

const iconMap = {
  phone: PhoneCall,
  video: Video,
  chat: MessagesSquare,
};

const TalkToExpertAdminPanel = ({ upcoming, activeChats }: Props) => (
  <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-slate-100 shadow-lg shadow-black/40">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-teal-200">Expert Console</p>
        <p className="text-lg font-semibold text-white">Live & upcoming interactions</p>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-white/10 bg-white/3 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
          <CalendarClock className="h-4 w-4" />
          Upcoming
        </div>
        {upcoming.length === 0 && <p className="text-sm text-slate-400">No scheduled sessions.</p>}
        <div className="space-y-2">
          {upcoming.map((item) => {
            const Icon = iconMap[item.mode];
            return (
              <motion.div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-teal-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.customer}</p>
                    <p className="text-xs text-slate-400">{item.when}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] ${
                      item.status === "scheduled"
                        ? "bg-sky-500/20 text-sky-100"
                        : item.status === "waiting"
                        ? "bg-amber-500/20 text-amber-100"
                        : "bg-emerald-500/20 text-emerald-100"
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-1 rounded-full bg-teal-500/15 px-2 py-1 text-[11px] text-teal-100 hover:underline"
                    >
                      <Link2 className="h-3 w-3" />
                      Join
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-white/3 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
          <MessagesSquare className="h-4 w-4" />
          Active chats
        </div>
        {activeChats.length === 0 && <p className="text-sm text-slate-400">No active chats.</p>}
        <div className="space-y-2">
          {activeChats.map((chat) => (
            <motion.div
              key={chat.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <p className="text-sm font-semibold text-white">{chat.customer}</p>
                <p className="text-xs text-slate-400">{chat.status === "live" ? "Live now" : "Async follow-up"}</p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-[11px] ${
                  chat.status === "live" ? "bg-emerald-500/20 text-emerald-100" : "bg-sky-500/20 text-sky-100"
                }`}
              >
                {chat.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TalkToExpertAdminPanel;





