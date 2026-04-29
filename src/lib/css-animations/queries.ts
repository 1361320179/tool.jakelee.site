import { CSS_ANIMATIONS_TOOL_BASE } from "./paths";
import { ANIMATION_CATEGORIES, type AnimationCategory } from "./types";
import { animations } from "./manifest";

export function isAnimationCategory(value: string): value is AnimationCategory {
  return (ANIMATION_CATEGORIES as readonly string[]).includes(value);
}

export function listAnimations() {
  return animations;
}

export function listAnimationsInCategory(category: AnimationCategory) {
  return animations.filter((a) => a.category === category);
}

export function getAnimationByCategoryAndSlug(
  category: string,
  slug: string,
) {
  if (!isAnimationCategory(category)) return undefined;
  return animations.find((a) => a.category === category && a.slug === slug);
}

export function getAllAnimationDetailStaticParams() {
  return animations.map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

/** Paths without locale prefix (hub is `/tools/css-animations` via tool registry). */
export function getCssAnimationSitemapPathnames(): string[] {
  const paths: string[] = [];
  for (const cat of ANIMATION_CATEGORIES) {
    paths.push(`${CSS_ANIMATIONS_TOOL_BASE}/${cat}`);
  }
  for (const a of animations) {
    paths.push(`${CSS_ANIMATIONS_TOOL_BASE}/${a.category}/${a.slug}`);
  }
  return paths;
}

export function itemDictKey(category: AnimationCategory, slug: string) {
  return `${category}/${slug}` as const;
}
