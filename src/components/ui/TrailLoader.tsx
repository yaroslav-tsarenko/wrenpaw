import { cn } from "@/lib/utils/cn";

export interface TrailLoaderProps {
  label?: string;
  block?: boolean;
  className?: string;
}

export function TrailLoader({ label = "Loading", block = false, className }: TrailLoaderProps) {
  const loader = (
    <span role="status" className={cn("inline-flex flex-col items-center gap-2", className)}>
      <span aria-hidden="true" className="inline-flex items-end gap-1 motion-reduce:hidden">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block size-2 bg-brand-2 [animation:trail-step_640ms_linear_infinite]"
            style={{ animationDelay: `${i * 140}ms`, marginBottom: i * 3 }}
          />
        ))}
      </span>
      <span className="meta hidden text-ink-muted motion-reduce:inline">{label}…</span>
      <span className="sr-only motion-reduce:hidden">{label}</span>
    </span>
  );
  if (!block) return loader;
  return <div className="flex items-center justify-center px-4 py-20">{loader}</div>;
}

export function SkeletonBar({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-3 bg-surface-2", className)} />;
}
