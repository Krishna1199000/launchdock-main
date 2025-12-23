"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/10 dark:bg-white/10",
        className
      )}
    />
  );
}

export function SkeletonText({
  lines = 2,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-full" />
      ))}
    </div>
  );
}

export function SkeletonCircle({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      className={cn("rounded-full", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card p-4 space-y-3",
        className
      )}
    >
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-32" />
      <SkeletonText lines={2} />
    </div>
  );
}
