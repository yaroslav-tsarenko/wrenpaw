import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function SectionOpener({
  index,
  label,
  title,
  titleId,
  standfirst,
  aside,
  tone = "ink",
  className,
}: {
  index: string;
  label: string;
  title: string;
  titleId: string;
  standfirst?: string;
  aside?: ReactNode;
  tone?: "ink" | "on-paint";
  className?: string;
}) {
  const onPaint = tone === "on-paint";
  return (
    <div data-reveal="" className={cn("grid items-end gap-x-10 gap-y-5 lg:grid-cols-12", className)}>
      <div data-reveal-item="" className="min-w-0 lg:col-span-8">
        <p className={cn("ruled-label m-0", onPaint ? "text-on-paint-muted" : "text-ink-subtle")}>
          <span className="index-numeral text-[1.75rem] leading-none">{index}</span>
          <span className="eyebrow">{label}</span>
        </p>
        <h2 id={titleId} className={cn("m-0 mt-5 text-step-4 leading-[1.08]", onPaint ? "text-on-paint" : "text-ink")}>
          {title}
        </h2>
        {standfirst ? <p className={cn("standfirst m-0 mt-3", onPaint && "text-on-paint-muted")}>{standfirst}</p> : null}
      </div>
      {aside ? (
        <div data-reveal-item="" style={{ "--i": 1 } as React.CSSProperties} className="min-w-0 lg:col-span-4 lg:justify-self-end lg:text-right">
          {aside}
        </div>
      ) : null}
    </div>
  );
}
