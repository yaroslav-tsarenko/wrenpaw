import type { MotionEnv } from "../env";

export function mountRule(el: HTMLElement, env: MotionEnv): () => void {
  if (env.reduced) return () => {};
  el.dataset.revealed = "pending";
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "now";
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
