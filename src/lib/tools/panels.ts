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
};

export function getToolPanelLoader(
  slug: string,
):
  | (() => Promise<{ default: ComponentType }>)
  | undefined {
  return toolPanelLoaders[slug];
}
