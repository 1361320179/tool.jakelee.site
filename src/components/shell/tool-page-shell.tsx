"use client";

import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocaleContext } from "@/components/i18n/locale-context";
import type { ToolPageSummary } from "@/lib/tools/types";
import { getLocalizedPath } from "@/i18n/config";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function ToolPageShell({
  tool,
  children,
}: {
  tool: ToolPageSummary;
  children: React.ReactNode;
}) {
  const { locale, dictionary } = useLocaleContext();
  const mainWithLocale = `${siteConfig.mainSiteUrl}/${locale}`;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="tool-aurora" aria-hidden />
      <SiteHeader />
      <main className="flex-1 pb-6 pt-6 sm:pt-8">
        <div className="page-shell space-y-8">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link
              href={getLocalizedPath(locale)}
              className="hover:text-foreground"
            >
              {dictionary.toolPage.breadcrumbTools}
            </Link>
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <header className="space-y-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {tool.name}
            </h1>
            <p className="max-w-2xl text-muted-foreground">{tool.description}</p>
            <p className="text-xs text-muted-foreground">
              {tool.tags.map((t) => `#${t}`).join(" ")}
            </p>
            <a
              href={mainWithLocale}
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              {dictionary.toolPage.backToMain}
              <ExternalLink className="size-3.5" />
            </a>
          </header>

          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
