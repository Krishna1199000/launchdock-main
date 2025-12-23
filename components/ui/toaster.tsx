"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, XCircle, X } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[320px]">
      {toasts.map(function ({ id, title, description, open, onOpenChange, variant, ...props }) {
        const isSuccess = variant === "success"
        const isError = variant === "error"
        
        return (
          <div
            key={id}
            className={`group pointer-events-auto relative flex items-start gap-2 overflow-hidden rounded-lg border p-3 pr-8 shadow-lg transition-all ${
              isSuccess
                ? "border-green-200 bg-green-50 text-green-900"
                : isError
                ? "border-red-200 bg-red-50 text-red-900"
                : "border-border bg-card text-foreground"
            } ${open ? "animate-in slide-in-from-right-full" : "animate-out slide-out-to-right-full"}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              {isError && <XCircle className="h-4 w-4 text-red-600" />}
            </div>
            <div className="flex-1 min-w-0">
              {title && (
                <div className="text-xs font-semibold mb-0.5">{title}</div>
              )}
              {description && (
                <div className={`text-xs ${isSuccess || isError ? "" : "text-muted-foreground"}`}>
                  {description}
                </div>
              )}
            </div>
            <button
              className="absolute right-1 top-1 rounded p-0.5 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none group-hover:opacity-100"
              onClick={() => onOpenChange?.(false)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

