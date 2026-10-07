export const MOTION_DURATION = {
  micro: 200,
  ui: 240,
  panel: 280,
  panelClose: 240,
  rule: 560,
  reveal: 700,
  reduced: 120,
  bagFlight: 420,
} as const;

export const MOTION_EASE = {
  press: [0.2, 0.75, 0.25, 1],
  std: [0.4, 0, 0.2, 1],
  inOut: [0.76, 0, 0.24, 1],
  outExpo: [0.16, 1, 0.3, 1],
} as const;

export type MotionEase = keyof typeof MOTION_EASE;

export function cssEase(name: MotionEase): string {
  return `cubic-bezier(${MOTION_EASE[name].join(", ")})`;
}

export const MOTION_SPRING = { stiffness: 220, damping: 26 } as const;

export const MOTION_STAGGER = { rows: 60, entries: 60, words: 40 } as const;

export const MOTION_LIMITS = {
  bagGhost: 36,
  bagGhostOpacity: 0.92,
} as const;

export const MOTION_QUERY = {
  finePointer: "(hover: hover) and (pointer: fine)",
  coarsePointer: "(pointer: coarse)",
} as const;
