export const ANIMATION_CATEGORIES = [
  "loaders",
  "hover-buttons",
  "text",
] as const;

export type AnimationCategory = (typeof ANIMATION_CATEGORIES)[number];

export type MotionParamKind = "speed" | "color" | "size";

export type MotionVars = {
  /** 0.5 = slower, 2 = faster (scales animation duration inversely) */
  speed: number;
  /** Accent color (hex) */
  color: string;
  /** Scales structural size (dots, rings, text, etc.) */
  size: number;
};

export const defaultMotionVars: MotionVars = {
  speed: 1,
  color: "#38bdf8",
  size: 1,
};

export type AnimationDefinition = {
  slug: string;
  category: AnimationCategory;
  supportedParams: MotionParamKind[];
  /** Second class on `.ca-scope` (unique per animation) */
  rootClass: string;
  /** Minimal markup users can copy */
  getHtml: () => string;
  /** Full CSS for the demo; must match preview when vars align */
  getCss: (vars: MotionVars) => string;
};
