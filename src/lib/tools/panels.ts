import type { ComponentType } from "react";

/**
 * Explicit map so each tool panel is a separate chunk (code splitting).
 * Add a new entry when you add `lib/tools/<slug>/tool-panel.tsx`.
 */
export const toolPanelLoaders: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  base64: () => import("@/lib/tools/base64/tool-panel"),
  uuid: () => import("@/lib/tools/uuid/tool-panel"),
  "json-formatter": () => import("@/lib/tools/json-formatter/tool-panel"),
  "image-converter": () => import("@/lib/tools/image-converter/tool-panel"),
  "qrcode-generator": () => import("@/lib/tools/qrcode-generator/tool-panel"),
  "color-converter": () => import("@/lib/tools/color-converter/tool-panel"),
  "text-counter": () => import("@/lib/tools/text-counter/tool-panel"),
  "unit-converter": () => import("@/lib/tools/unit-converter/tool-panel"),
  "case-converter": () => import("@/lib/tools/case-converter/tool-panel"),
};

export function getToolPanelLoader(
  slug: string,
):
  | (() => Promise<{ default: ComponentType }>)
  | undefined {
  return toolPanelLoaders[slug];
}

/** Slugs that render `DynamicToolPanel` (excludes hub-only tools like `css-animations`). */
export function getPanelToolSlugs(): string[] {
  return Object.keys(toolPanelLoaders);
}
