"use client";

import * as React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { getToolRegistry } from "@/lib/tools/registry";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLocalizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { ToolDefinition } from "@/lib/tools/types";

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function isSubsequence(needle: string, haystack: string) {
  let index = 0;

  for (const char of haystack) {
    if (char === needle[index]) {
      index += 1;
      if (index === needle.length) return true;
    }
  }

  return false;
}

function matchesSearchToken(token: string, searchText: string) {
  return searchText.includes(token) || isSubsequence(token, searchText);
}

function matchesToolSearch(tool: ToolDefinition, query: string) {
  const tokens = query.split(/\s+/).map(normalizeSearchValue).filter(Boolean);
  if (tokens.length === 0) return true;

  const searchText = normalizeSearchValue(
    [tool.name, tool.description, ...tool.tags].join(" "),
  );

  return tokens.every((token) => matchesSearchToken(token, searchText));
}

export function ToolCardGrid() {
  const { locale, dictionary } = useLocaleContext();
  const [query, setQuery] = React.useState("");
  const tools = React.useMemo(() => getToolRegistry(dictionary), [dictionary]);
  const filteredTools = React.useMemo(
    () => tools.filter((tool) => matchesToolSearch(tool, query)),
    [query, tools],
  );
  const hasResults = filteredTools.length > 0;

  return (
    <section className="page-shell pb-16" aria-label={dictionary.home.allTools}>
      <div className="mb-6 space-y-4">
        <h2 className="section-heading">{dictionary.home.allTools}</h2>
        <div className="max-w-xl space-y-2">
          <Label htmlFor="tool-search">{dictionary.home.toolSearch.label}</Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.home.toolSearch.placeholder}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {hasResults ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.slug}>
                <Link
                  href={getLocalizedPath(locale, `/tools/${tool.slug}`)}
                  className={cn(
                    "surface-panel group block h-full p-5 sm:p-6",
                    "hover:border-primary/35 hover:shadow-lg",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 group-hover:rotate-[5deg]">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                      <p className="pt-1 text-xs text-muted-foreground/90">
                        {tool.tags.map((t) => `#${t}`).join(" ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="surface-panel p-6 text-sm text-muted-foreground">
          {dictionary.home.toolSearch.noResults}
        </div>
      )}
    </section>
  );
}
