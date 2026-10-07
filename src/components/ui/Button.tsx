"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft" | "light" | "flat" | "bordered";
type Kind = "paint" | "outline" | "text" | "danger" | "danger-text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: "primary" | "danger" | "success" | "warning" | "default";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  fullWidth?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  download?: boolean;
  onPress?: () => void;
  className?: string;
  [key: string]: unknown;
}

const SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "h-9 px-4 text-ui-sm",
  md: "h-11 px-5 text-ui-md",
  lg: "h-[52px] px-7 text-step-0",
};

const TEXT_SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "min-h-9 text-ui-sm",
  md: "min-h-11 text-ui-md",
  lg: "min-h-[52px] text-step-0",
};

function resolveKind(variant: Variant, color?: ButtonProps["color"]): Kind {
  if (color === "danger") {
    return variant === "flat" || variant === "light" || variant === "ghost" || variant === "tertiary" || variant === "danger-soft"
      ? "danger-text"
      : "danger";
  }
  switch (variant) {
    case "secondary":
    case "outline":
    case "bordered":
      return "outline";
    case "tertiary":
    case "ghost":
    case "light":
    case "flat":
      return color === "primary" || color === "success" ? "paint" : "text";
    case "danger":
      return "danger";
    case "danger-soft":
      return "danger-text";
    default:
      return "paint";
  }
}

function kindClasses(kind: Kind, size: "sm" | "md" | "lg", disabled: boolean) {
  if (kind === "paint" || kind === "danger") {
    if (disabled) return "bg-surface-1 text-ink-subtle";
    if (kind === "danger") return "bg-danger text-on-danger hover-device:hover:brightness-[0.92] active:translate-y-px";
    return "bg-brand text-on-brand hover-device:hover:bg-brand-hover active:translate-y-px";
  }
  if (kind === "outline") {
    if (disabled) return "border border-line text-ink-subtle";
    return "border border-control text-ink hover-device:hover:border-brand hover-device:hover:bg-brand-soft active:translate-y-px";
  }
  if (kind === "danger-text") {
    if (disabled) return "text-ink-subtle";
    return "text-danger underline decoration-1 underline-offset-4 hover-device:hover:decoration-2";
  }
  if (disabled) return "text-ink-subtle";
  return "text-ink underline decoration-1 underline-offset-4 decoration-line-hover hover-device:hover:decoration-2 hover-device:hover:decoration-brand-2 active:decoration-brand-2";
}

export function ButtonLoader({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 flex items-center justify-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 bg-current [animation:trail-step_640ms_linear_infinite] motion-reduce:animate-none"
          style={{ animationDelay: `${i * 140}ms` }}
        />
      ))}
    </span>
  );
}

export function buttonClasses({
  variant = "primary",
  color,
  size = "md",
  isIconOnly = false,
  fullWidth = false,
  disabled = false,
  className,
}: {
  variant?: Variant;
  color?: ButtonProps["color"];
  size?: "sm" | "md" | "lg";
  isIconOnly?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const kind = resolveKind(variant, color);
  if (isIconOnly) {
    return cn(
      "relative inline-flex shrink-0 items-center justify-center size-10 touch-device:size-11 transition-colors duration-[200ms]",
      disabled
        ? "text-ink-subtle cursor-not-allowed"
        : cn(kind === "danger" || kind === "danger-text" ? "text-danger" : "text-ink", "cursor-pointer hover-device:hover:bg-brand-soft active:bg-brand-soft"),
      className,
    );
  }
  const isText = kind === "text" || kind === "danger-text";
  return cn(
    "relative inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none tracking-[0.01em] whitespace-nowrap select-none",
    "transition-[transform,color,background-color,border-color,filter,text-decoration-thickness,text-decoration-color] duration-[200ms] ease-[var(--ease-press)]",
    "focus-visible:outline-offset-[3px]",
    isText ? TEXT_SIZE[size] : SIZE[size],
    kindClasses(kind, size, disabled),
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant = "primary",
  color,
  size = "md",
  isLoading = false,
  isDisabled = false,
  isIconOnly = false,
  fullWidth = false,
  startContent,
  endContent,
  as,
  href,
  target,
  download,
  onPress,
  children,
  className,
  onClick,
  onMouseDown,
  disabled,
  ...rest
}: ButtonProps) {
  const inert = isDisabled || Boolean(disabled);
  const blocked = inert || isLoading;
  const classes = buttonClasses({ variant, color, size, isIconOnly, fullWidth, disabled: inert, className });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (blocked) {
      e.preventDefault();
      return;
    }
    (onClick as ((event: React.MouseEvent<HTMLElement>) => void) | undefined)?.(e);
    onPress?.();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    (onMouseDown as ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined)?.(e);
    const active = document.activeElement;
    if (!e.defaultPrevented && active instanceof HTMLElement && active.matches("input, textarea, select")) e.preventDefault();
  };

  const content = isIconOnly ? (
    <>
      {startContent}
      {children}
      {endContent}
    </>
  ) : (
    <>
      <span className={cn("inline-flex items-center gap-2 [&_svg]:size-[18px]", isLoading && "invisible")}>
        {startContent}
        {children}
        {endContent}
      </span>
      {isLoading ? <ButtonLoader /> : null}
    </>
  );

  if (as || href) {
    const Component = (as || "a") as React.ElementType;
    return (
      <Component
        href={href}
        target={target}
        download={download}
        className={classes}
        onClick={handleClick}
        aria-disabled={inert || undefined}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {content}
      </Component>
    );
  }

  return (
    <button
      type={(rest.type as "button" | "submit" | "reset" | undefined) || "button"}
      className={classes}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      disabled={inert}
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
