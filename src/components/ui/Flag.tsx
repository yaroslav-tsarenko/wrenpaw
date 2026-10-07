import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type FlagVariant = "accent" | "neutral" | "success" | "warning" | "danger" | "info" | "on-paint";

const VARIANT: Record<FlagVariant, string> = {
  accent: "bg-brand-2 text-on-brand-2",
  neutral: "bg-surface-1 text-ink",
  success: "bg-success-tint text-success",
  warning: "bg-warning-tint text-warning",
  danger: "bg-danger-tint text-danger",
  info: "bg-info-tint text-info",
  "on-paint": "bg-brand-on-paint text-on-brand-2",
};

export interface FlagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: FlagVariant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Flag({ variant = "accent", size = "md", className, children, ...rest }: FlagProps) {
  return (
    <span
      className={cn(
        "eyebrow tabular inline-flex max-w-full shrink-0 items-center whitespace-nowrap",
        size === "sm" && "h-5 px-1.5 text-[0.6875rem]",
        size === "md" && "h-6 px-2",
        size === "lg" && "h-7 px-2.5",
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}

const ORDER_STATUS_VARIANT: Record<string, FlagVariant> = {
  PENDING: "neutral",
  CONFIRMED: "info",
  PAID: "success",
  PROCESSING: "warning",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "neutral",
  FAILED: "danger",
};

export function statusFlagVariant(status: string): FlagVariant {
  return ORDER_STATUS_VARIANT[status.toUpperCase()] ?? "neutral";
}

export function StatusFlag({ status, label, className }: { status: string; label?: string; className?: string }) {
  const text = label ?? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return (
    <Flag variant={statusFlagVariant(status)} className={className}>
      {text}
    </Flag>
  );
}
