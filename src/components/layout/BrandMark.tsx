import type { SVGProps } from "react";
import { cn } from "@/lib/utils/cn";

type MarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & { title?: string };

export function Trail({ title, className, ...rest }: MarkProps) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...rest}
    >
      <rect x="0" y="17" width="6" height="6" fill="currentColor" />
      <rect x="6" y="11.5" width="6" height="6" fill="currentColor" />
      <rect x="12" y="6" width="6" height="6" fill="currentColor" />
      <rect x="18.75" y="1.75" width="4.5" height="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Monogram({ title, className, size, ...rest }: MarkProps & { size?: number }) {
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...rest}
    >
      <rect width="512" height="512" fill="var(--mark-tile, var(--color-paint))" />
      <g fill="var(--mark-ink, var(--color-accent-on-paint))">
        <rect x="106" y="196" width="56" height="56" />
        <rect x="182" y="138" width="66" height="66" />
        <rect x="264" y="138" width="66" height="66" />
        <rect x="350" y="196" width="56" height="56" />
        <polygon points="198,266 314,266 338,384 174,384" />
        <rect x="56" y="412" width="400" height="18" />
      </g>
    </svg>
  );
}

export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return <Monogram size={size} className={className} />;
}

export function Wordmark({ tone = "ink", className }: { tone?: "ink" | "on-paint"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-display inline-block select-none whitespace-nowrap font-medium leading-none tracking-[-0.02em]",
        tone === "on-paint" ? "text-on-paint" : "text-ink",
        className,
      )}
    >
      Wrenpa
      <span className={tone === "on-paint" ? "text-brand-on-paint" : "text-brand-2"}>w</span>
    </span>
  );
}

export function Lockup({ tone = "ink", className, markSize = 22 }: { tone?: "ink" | "on-paint"; className?: string; markSize?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Trail className={cn("block", tone === "on-paint" ? "text-brand-on-paint" : "text-brand-2")} style={{ width: markSize, height: markSize }} />
      <Wordmark tone={tone} />
    </span>
  );
}
