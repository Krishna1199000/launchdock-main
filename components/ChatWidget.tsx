"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Mail, Phone, User } from "lucide-react";

type View = "root" | "email" | "chatting";

const initialChatForm = { name: "", email: "", phone: "", need: "" };

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("root");
  const [emailForm, setEmailForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [chatForm, setChatForm] = useState(initialChatForm);
  const [chatStep, setChatStep] = useState<0 | 1 | 2 | 3>(0);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "user" | "bot"; message: string; ts: string }[]>([
    { from: "bot", message: "Hey! How can I help you today?", ts: new Date().toISOString() },
  ]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setView("root");
      setChatStep(0);
      setChatMessages([{ from: "bot", message: "Hey! How can we help you today?", ts: new Date().toISOString() }]);
      setThreadId(null);
      setChatForm(initialChatForm);
    }
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleEmailSubmit = async () => {
    if (!emailForm.name || !emailForm.email || !emailForm.message) return;
    setSending(true);
    try {
      await fetch("/api/chatwidget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "email", ...emailForm }),
      });
      setView("root");
      setEmailForm({ name: "", email: "", phone: "", message: "" });
      alert("Thanks! We’ve emailed support and sent you a confirmation.");
    } catch (e) {
      alert("Could not send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const startChatWithBackend = async (payload: { name: string; email: string; phone?: string; need: string }) => {
    const res = await fetch("/api/chatwidget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "chatStart", name: payload.name, email: payload.email, phone: payload.phone, message: payload.need }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to start chat");
    setThreadId(data.threadId);
  };

  const handleChatStepSubmit = async (value: string) => {
    const ts = new Date().toISOString();
    if (chatStep === 0) {
      setChatForm((f) => ({ ...f, name: value }));
      setChatMessages((m) => [...m, { from: "user", message: value, ts }, { from: "bot", message: "Thanks! What’s your email or phone?", ts }]);
      setChatStep(1);
      return;
    }
    if (chatStep === 1) {
      setChatForm((f) => ({ ...f, email: value.includes("@") ? value : "", phone: value.includes("@") ? "" : value }));
      setChatMessages((m) => [...m, { from: "user", message: value, ts }, { from: "bot", message: "Got it. What do you need help with?", ts }]);
      setChatStep(2);
      return;
    }
    if (chatStep === 2) {
      const need = value;
      setChatForm((f) => ({ ...f, need }));
      setChatMessages((m) => [
        ...m,
        { from: "user", message: need, ts },
        { from: "bot", message: "Our team will be live shortly. You can keep chatting here.", ts },
      ]);
      setChatStep(3);
      setSending(true);
      try {
        await startChatWithBackend({ name: chatForm.name || "Guest", email: chatForm.email || "support@launchdock.me", phone: chatForm.phone, need });
      } catch (e: any) {
        alert(e.message || "Failed to start chat");
      } finally {
        setSending(false);
      }
      return;
    }
  };

  const handleChatSend = async () => {
    if (!chatForm.need && chatStep < 3) return;
    const msg = chatForm.need;
    if (!msg || !threadId) return;
    const ts = new Date().toISOString();
    setChatMessages((m) => [...m, { from: "user", message: msg, ts }]);
    setChatForm((f) => ({ ...f, need: "" }));
    try {
      await fetch("/api/chatwidget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "chatMessage", threadId, message: msg }),
      });
    } catch {
      // ignore
    }
  };

  const rootOptions = useMemo(
    () => [
      { id: "chatting" as View, title: "Live Chat", desc: "Instant help with an expert", icon: MessageSquare },
      { id: "email" as View, title: "Email Support", desc: "Get a quick reply in your inbox", icon: Mail },
    ],
    []
  );

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
                  <MessageSquare className="h-5 w-5 text-teal-300" />
                  <span className="text-sm font-semibold">LaunchDock Support</span>
                </div>
                <button
                  className="rounded-full p-1 text-slate-300 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">
                {view === "root" && (
                  <div className="grid gap-3">
                    {rootOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setView(opt.id)}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-white hover:border-teal-400/50 hover:bg-white/10 transition"
                        >
                          <div>
                            <p className="text-sm font-semibold">{opt.title}</p>
                            <p className="text-xs text-slate-300">{opt.desc}</p>
                          </div>
                          <div className="rounded-xl bg-teal-500/20 p-2 text-teal-200">
                            <Icon className="h-4 w-4" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {view === "email" && (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-200">Send us a note and we’ll reply in your inbox.</div>
                    {["name", "email", "phone"].map((field) => (
                      <label key={field} className="block space-y-1 text-xs text-slate-200">
                        <span className="capitalize">{field}</span>
                        <input
                          required={field !== "phone"}
                          value={(emailForm as any)[field]}
                          onChange={(e) => setEmailForm({ ...emailForm, [field]: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300/70"
                          placeholder={field === "phone" ? "+1 555 123 4567" : field === "name" ? "your name" : "your@email.com"}
                        />
                      </label>
                    ))}
                    <label className="block space-y-1 text-xs text-slate-200">
                      <span>How can we help?</span>
                      <textarea
                        required
                        value={emailForm.message}
                        onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300/70"
                        rows={3}
                      />
                    </label>
                    <button
                      onClick={handleEmailSubmit}
                      disabled={sending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-sky-500/30 disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      Send email
                    </button>
                  </div>
                )}

                {view === "chatting" && (
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3">
                      <div className="h-64 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                        {chatMessages.map((m, i) => (
                          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                                m.from === "user" ? "bg-teal-500/30 text-white" : "bg-white/10 text-slate-100"
                              }`}
                            >
                              {m.message}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                      {chatStep < 3 ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={
                              chatStep === 0
                                ? chatForm.name
                                : chatStep === 1
                                ? chatForm.email || chatForm.phone
                                : chatForm.need
                            }
                            onChange={(e) => {
                              if (chatStep === 0) setChatForm({ ...chatForm, name: e.target.value });
                              if (chatStep === 1) {
                                const val = e.target.value;
                                setChatForm({ ...chatForm, email: val.includes("@") ? val : "", phone: val.includes("@") ? "" : val });
                              }
                              if (chatStep === 2) setChatForm({ ...chatForm, need: e.target.value });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) handleChatStepSubmit(val);
                              }
                            }}
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300/70"
                            placeholder={
                              chatStep === 0
                                ? "your name"
                                : chatStep === 1
                                ? "your@email.com"
                                : "Tell us what you need"
                            }
                            disabled={sending}
                          />
                          <button
                            onClick={() => {
                              const val =
                                chatStep === 0
                                  ? chatForm.name.trim()
                                  : chatStep === 1
                                  ? (chatForm.email || chatForm.phone || "").trim()
                                  : chatForm.need.trim();
                              if (val) handleChatStepSubmit(val);
                            }}
                            className="rounded-xl bg-teal-500 px-3 py-2 text-white hover:bg-teal-400 transition disabled:opacity-60"
                            disabled={sending}
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            value={chatForm.need}
                            onChange={(e) => setChatForm({ ...chatForm, need: e.target.value })}
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-300/70"
                            placeholder="Type your message..."
                          />
                          <button
                            onClick={handleChatSend}
                            className="rounded-xl bg-teal-500 px-3 py-2 text-white hover:bg-teal-400 transition"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3 text-white shadow-lg shadow-teal-500/40 hover:shadow-xl"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-semibold">{open ? "Close" : "Chat with us"}</span>
        </motion.button>
      </div>
    </>
  );
};

export default ChatWidget;

