"use client";

import Link from "next/link";
import { getToolRegistry } from "@/lib/tools/registry";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { getLocalizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function ToolCardGrid() {
  const { locale, dictionary } = useLocaleContext();
  const tools = getToolRegistry(dictionary);

  return (
    <section className="page-shell pb-16" aria-label={dictionary.home.allTools}>
      <h2 className="section-heading mb-6">{dictionary.home.allTools}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
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
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
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
    </section>
  );
}
