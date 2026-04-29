import type { MotionVars } from "./types";

/** Base duration in seconds at speed=1; actual duration shrinks when speed increases */
export function motionDurationSec(vars: MotionVars, baseAtSpeed1: number): string {
  const raw = baseAtSpeed1 / vars.speed;
  const clamped = Math.min(4, Math.max(0.2, raw));
  return `${clamped.toFixed(2)}s`;
}

export function motionSizePx(vars: MotionVars, basePx: number): number {
  const v = Math.round(basePx * vars.size);
  return Math.min(120, Math.max(10, v));
}
