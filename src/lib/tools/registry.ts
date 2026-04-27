import { Binary, Braces, Fingerprint } from "lucide-react";
import type { ToolsSiteDictionary } from "@/i18n/types";
import type { ToolDefinition } from "./types";

const staticTools = [
  { slug: "base64" as const, icon: Binary },
  { slug: "uuid" as const, icon: Fingerprint },
  { slug: "json-formatter" as const, icon: Braces },
] as const;

export type ToolSlug = (typeof staticTools)[number]["slug"];

export function getToolRegistry(dict: ToolsSiteDictionary): ToolDefinition[] {
  return staticTools.map((t) => {
    const meta = dict.tools[t.slug];
    return {
      slug: t.slug,
      icon: t.icon,
      name: meta.name,
      description: meta.description,
      tags: meta.tags,
      ogSubtitle: meta.ogSubtitle,
    };
  });
}

const slugSet = new Set<string>(staticTools.map((t) => t.slug));

export function getToolBySlug(
  dict: ToolsSiteDictionary,
  slug: string,
): ToolDefinition | undefined {
  if (!slugSet.has(slug)) return undefined;
  return getToolRegistry(dict).find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return staticTools.map((t) => t.slug);
}
