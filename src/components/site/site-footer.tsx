"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { getLocalizedPath } from "@/i18n/config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { locale, dictionary } = useLocaleContext();
  const mainWithLocale = `${siteConfig.mainSiteUrl}/${locale}`;

  return (
    <footer className="mt-16 px-3 pb-4 sm:px-5">
      <div className="page-shell space-y-6">
        <div className="flex flex-col gap-4 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">
              {siteConfig.name} · {dictionary.site.shortName}
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {dictionary.site.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a
              href={mainWithLocale}
              className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.site.mainSiteLink}
            </a>
            {siteConfig.links.github ? (
              <a
                href={siteConfig.links.github}
                className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}
            {siteConfig.links.twitter ? (
              <a
                href={siteConfig.links.twitter}
                className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
            ) : null}
            <Link
              href={getLocalizedPath(locale)}
              className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
            >
              {dictionary.nav.tools}
            </Link>
          </div>
        </div>
        <p className="px-1 text-center text-xs text-muted-foreground">
          &copy; {year} {siteConfig.name}. {dictionary.footer.rights}
        </p>
      </div>
    </footer>
  );
}
