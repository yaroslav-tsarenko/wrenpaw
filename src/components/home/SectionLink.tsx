import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function SectionLink({ href, children, tone = "default", className }: { href: string; children: React.ReactNode; tone?: "default" | "on-paint"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-ui-md font-semibold underline decoration-1 underline-offset-4 transition-[text-decoration-thickness,text-decoration-color] duration-[200ms] hover-device:hover:decoration-2",
        tone === "on-paint" ? "text-brand-on-paint" : "text-ink hover-device:hover:decoration-brand-2",
        className,
      )}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-[200ms] group-hover:translate-x-1" />
    </Link>
  );
}
