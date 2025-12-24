"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mode } from "./ModeSelector";

type FormState = {
  name: string;
  email?: string;
  phone?: string;
  requirement: string;
  datetime?: string;
  mode: Mode;
  immediate?: boolean;
};

type Props = {
  mode: Mode;
  onSubmit: (payload: FormState) => void;
  busy?: boolean;
  offline?: boolean;
};

const ScheduleForm = ({ mode, onSubmit, busy, offline }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");
  const [datetime, setDatetime] = useState("");
  const [immediate, setImmediate] = useState(true);

  const showPhone = mode === "phone" || mode === "schedule";
  const showEmail = mode !== "phone" || offline;
  const showDate = !immediate || mode === "schedule";

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          email: email || undefined,
          phone: phone || undefined,
          requirement,
          datetime: datetime || undefined,
          mode,
          immediate,
        });
      }}
      className="space-y-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-200/90">
          <span>Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-teal-300/70"
            placeholder="Your name"
          />
        </label>
        {showPhone && (
          <label className="space-y-1 text-sm text-slate-200/90">
            <span>Phone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-teal-300/70"
              placeholder="+1 555 123 4567"
            />
          </label>
        )}
        {showEmail && (
          <label className="space-y-1 text-sm text-slate-200/90">
            <span>Email</span>
            <input
              required={mode !== "phone" || offline}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-teal-300/70"
              placeholder="you@company.com"
              type="email"
            />
          </label>
        )}
      </div>

      <label className="space-y-1 text-sm text-slate-200/90">
        <span>What do you need?</span>
        <textarea
          required
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-teal-300/70"
          rows={3}
          placeholder="Briefly describe your project or question."
        />
      </label>

      {(mode === "phone" || mode === "video") && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-200/80">
          <button
            type="button"
            onClick={() => setImmediate(true)}
            className={`rounded-full border px-3 py-1 ${
              immediate ? "border-teal-300/70 bg-teal-500/10 text-teal-100" : "border-white/10 bg-white/5"
            }`}
          >
            {mode === "phone" ? "Call now" : "Join now"}
          </button>
          <button
            type="button"
            onClick={() => setImmediate(false)}
            className={`rounded-full border px-3 py-1 ${
              !immediate ? "border-teal-300/70 bg-teal-500/10 text-teal-100" : "border-white/10 bg-white/5"
            }`}
          >
            Schedule
          </button>
          {busy && <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-1 text-amber-100">Expert busy — suggest scheduling</span>}
          {offline && <span className="ml-2 rounded-full bg-sky-500/20 px-2 py-1 text-sky-100">Expert offline — switch to async</span>}
        </div>
      )}

      {(mode === "schedule" || showDate) && (
        <label className="space-y-1 text-sm text-slate-200/90">
          <span>Preferred time</span>
          <input
            required
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-teal-300/70"
          />
        </label>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-slate-300/80">
          {offline ? "We’ll confirm by email within SLA." : "You’ll get confirmation instantly."}
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/30"
        >
          Continue
        </button>
      </div>
    </motion.form>
  );
};

export type { FormState };
export default ScheduleForm;



