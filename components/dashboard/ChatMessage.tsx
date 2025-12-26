"use client"
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    type: string;
    createdAt: string;
    sender: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string | null;
      role: string;
    };
    file?: {
      id: string;
      filename: string;
      mime: string;
      size: number;
      url: string;
    };
  };
  currentUserId: string;
  index: number;
}

export default function ChatMessage({
  message,
  currentUserId,
  index,
}: ChatMessageProps) {
  const isOwn = message.sender.id === currentUserId;
  const isAdmin = message.sender.role === "ADMIN";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex items-start gap-3 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {message.sender.avatarUrl ? (
            <Image
              src={message.sender.avatarUrl}
              alt={message.sender.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-foreground">
              {isOwn ? "You" : message.sender.name}
            </span>
            {isAdmin && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                Admin
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {formatTime(message.createdAt)}
            </span>
          </div>

          <div
            className={`rounded-2xl px-4 py-3 ${
              isOwn
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
          >
            {message.type === "FILE" && message.file ? (
              <div className="space-y-2">
                <a
                  href={message.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm underline"
                >
                  <span>{message.file.filename}</span>
                  <span className="text-xs">
                    ({(message.file.size / 1024).toFixed(1)} KB)
                  </span>
                </a>
                {message.content && (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}












