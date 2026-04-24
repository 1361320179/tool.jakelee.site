import type { LucideIcon } from "lucide-react";

export type ToolDefinition = {
  /** URL segment, must match `lib/tools/<slug>/` and panels map */
  slug: string;
  name: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  /** Tool-specific Open Graph subtitle */
  ogSubtitle: string;
  needsServer?: boolean;
};

/** Serializable subset for client `ToolPageShell` (no icon / functions). */
export type ToolPageSummary = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
};
