"use client";

/** Must stay in sync with `toolPanelLoaders` in @/lib/tools/panels.ts */
import dynamic from "next/dynamic";

const panelLoading = (
  <div
    className="surface-panel h-40 w-full max-w-4xl animate-pulse rounded-3xl bg-muted/40"
    aria-hidden
  />
);

const Base64Panel = dynamic(
  () => import("@/lib/tools/base64/tool-panel"),
  { loading: () => panelLoading },
);

const UuidPanel = dynamic(
  () => import("@/lib/tools/uuid/tool-panel"),
  { loading: () => panelLoading },
);

const panels = {
  base64: Base64Panel,
  uuid: UuidPanel,
} as const;

type ToolSlug = keyof typeof panels;

export function DynamicToolPanel({ slug }: { slug: string }) {
  if (slug in panels) {
    const Panel = panels[slug as ToolSlug];
    return <Panel />;
  }
  return null;
}
