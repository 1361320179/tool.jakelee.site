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

const JsonFormatterPanel = dynamic(
  () => import("@/lib/tools/json-formatter/tool-panel"),
  { loading: () => panelLoading },
);

const ImageConverterPanel = dynamic(
  () => import("@/lib/tools/image-converter/tool-panel"),
  { loading: () => panelLoading },
);

const QrCodeGeneratorPanel = dynamic(
  () => import("@/lib/tools/qrcode-generator/tool-panel"),
  { loading: () => panelLoading },
);

const ColorConverterPanel = dynamic(
  () => import("@/lib/tools/color-converter/tool-panel"),
  { loading: () => panelLoading },
);

const TextCounterPanel = dynamic(
  () => import("@/lib/tools/text-counter/tool-panel"),
  { loading: () => panelLoading },
);

const UnitConverterPanel = dynamic(
  () => import("@/lib/tools/unit-converter/tool-panel"),
  { loading: () => panelLoading },
);

const CaseConverterPanel = dynamic(
  () => import("@/lib/tools/case-converter/tool-panel"),
  { loading: () => panelLoading },
);

const panels = {
  base64: Base64Panel,
  uuid: UuidPanel,
  "json-formatter": JsonFormatterPanel,
  "image-converter": ImageConverterPanel,
  "qrcode-generator": QrCodeGeneratorPanel,
  "color-converter": ColorConverterPanel,
  "text-counter": TextCounterPanel,
  "unit-converter": UnitConverterPanel,
  "case-converter": CaseConverterPanel,
} as const;

type ToolSlug = keyof typeof panels;

export function DynamicToolPanel({ slug }: { slug: string }) {
  if (slug in panels) {
    const Panel = panels[slug as ToolSlug];
    return <Panel />;
  }
  return null;
}
