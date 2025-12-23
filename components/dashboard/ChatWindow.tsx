"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import FileUpload from "./FileUpload";
import Pusher from "pusher-js";

interface ChatWindowProps {
  projectId: string;
  currentUserId: string;
}

export default function ChatWindow({
  projectId,
  currentUserId,
}: ChatWindowProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState<Record<string, boolean>>({});
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pusherRef = useRef<Pusher | null>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/messages?limit=100`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [projectId]);

  // Setup Pusher for real-time
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
      console.warn("Pusher not configured");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2",
    });

    const channel = pusher.subscribe(`project-${projectId}`);

    // Listen for new messages
    channel.bind("message:new", (data: { message: any }) => {
      setMessages((prev) => [...prev, data.message]);
      scrollToBottom();
    });

    // Listen for typing indicators
    channel.bind("typing", (data: { userId: string; isTyping: boolean }) => {
      if (data.userId !== currentUserId) {
        setTyping((prev) => ({
          ...prev,
          [data.userId]: data.isTyping,
        }));

        if (data.isTyping) {
          setTimeout(() => {
            setTyping((prev) => {
              const updated = { ...prev };
              delete updated[data.userId];
              return updated;
            });
          }, 3000);
        }
      }
    });

    pusherRef.current = pusher;

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [projectId, currentUserId]);

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send typing indicator
  const sendTypingIndicator = async (isTyping: boolean) => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return;

    try {
      await fetch(`/api/projects/${projectId}/typing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isTyping }),
      });
    } catch (error) {
      // Silent fail
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    // Send typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    sendTypingIndicator(true);

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(false);
    }, 1000);
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: input.trim(),
          type: "TEXT",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]);
        setInput("");
        sendTypingIndicator(false);
        scrollToBottom();
      } else {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.error || "Failed to send message",
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "error",
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUploadComplete = (file: any) => {
    // Optionally send a message with the file
    setShowFileUpload(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-border/30 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              currentUserId={currentUserId}
              index={index}
            />
          ))}
        </AnimatePresence>

        {/* Typing Indicators */}
        {Object.keys(typing).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span>Someone is typing</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Modal */}
      <AnimatePresence>
        {showFileUpload && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-border/30"
          >
            <FileUpload
              projectId={projectId}
              onUploadComplete={handleFileUploadComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFileUpload(!showFileUpload)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={sending}
            className="flex-1 px-4 py-3 rounded-xl border border-border/30 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}








