import type { ReactElement, ReactNode } from "react";
import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { OG_PALETTE as P, OG_SIZE, ogFonts } from "./assets";

export async function ogResponse(element: ReactElement, cacheSeconds = 86400) {
  const fonts = await ogFonts();
  return new ImageResponse(element, {
    ...OG_SIZE,
    fonts,
    headers: { "Cache-Control": `public, max-age=${Math.min(cacheSeconds, 3600)}, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}` },
  });
}

export function Rule({ color, width = "100%", height = 2 }: { color: string; width?: number | string; height?: number }) {
  return <div style={{ display: "flex", width, height, background: color }} />;
}

export function TrailMark({ size, color }: { size: number; color: string }) {
  const unit = Math.round(size * 0.26);
  const step = Math.round(size * 0.3);
  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ display: "flex", position: "absolute", left: i * step, bottom: i * step, width: unit, height: unit, background: color }}
        />
      ))}
    </div>
  );
}

export function Label({ children, fontSize = 26, color = P.accent }: { children: ReactNode; fontSize?: number; color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Schibsted",
        fontWeight: 600,
        fontSize,
        letterSpacing: fontSize * 0.14,
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

export function Wordmark({ size, color, accent }: { size: number; color: string; accent: string }) {
  return (
    <div style={{ display: "flex", fontFamily: "Piazzolla", fontWeight: 500, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.02, color }}>
      <span>Wrenpa</span>
      <span style={{ color: accent }}>w</span>
      <span style={{ display: "none" }}>{BRAND.name}</span>
    </div>
  );
}

export function Packshot({ src, size, background }: { src: string | null; size: number; background: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size, background }}>
        {src ? <img src={src} width={size} height={size} style={{ objectFit: "contain", width: size, height: size }} alt="" /> : null}
      </div>
    </div>
  );
}

export function titleSize(text: string, sizes: [number, number][]): number {
  for (const [max, size] of sizes) if (text.length <= max) return size;
  return sizes[sizes.length - 1][1];
}
