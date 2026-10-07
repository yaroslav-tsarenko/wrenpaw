"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Trail } from "@/components/layout/BrandMark";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  headingLevel?: 1 | 2 | 3;
  align?: "center" | "start";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function EmptyPlate({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex w-[120px] flex-col gap-3", className)}>
      <Trail className="block text-brand-2" style={{ width: 24, height: 24 }} />
      <span className="block h-px w-full bg-rule" />
    </span>
  );
}

export function EmptyState({
  title,
  subtitle,
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  secondaryHref,
  headingLevel = 2,
  align = "center",
  children,
  className,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3";
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-4 px-4 py-16", centered ? "items-center text-center" : "items-start", className)}>
      <EmptyPlate />
      <Heading className="text-step-2 leading-[1.2] text-ink">{title}</Heading>
      {subtitle ? <p className={cn("max-w-[48ch] text-ink-muted", centered && "mx-auto")}>{subtitle}</p> : null}
      {children}
      {(actionLabel && (actionHref || onAction)) || (secondaryLabel && secondaryHref) ? (
        <div className={cn("mt-2 flex flex-wrap items-center gap-x-6 gap-y-3", centered && "justify-center")}>
          {actionLabel && actionHref ? (
            <Button as={Link} href={actionHref} variant="primary">
              {actionLabel}
            </Button>
          ) : actionLabel && onAction ? (
            <Button variant="primary" onPress={onAction}>
              {actionLabel}
            </Button>
          ) : null}
          {secondaryLabel && secondaryHref ? (
            <Button as={Link} href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
