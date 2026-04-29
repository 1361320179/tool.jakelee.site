/** Hub lives under tools; nested routes are category + optional animation slug. */
export const CSS_ANIMATIONS_TOOL_BASE = "/tools/css-animations";

export function cssAnimationsCategoryPath(category: string) {
  return `${CSS_ANIMATIONS_TOOL_BASE}/${category}`;
}

export function cssAnimationsDetailPath(category: string, slug: string) {
  return `${CSS_ANIMATIONS_TOOL_BASE}/${category}/${slug}`;
}
