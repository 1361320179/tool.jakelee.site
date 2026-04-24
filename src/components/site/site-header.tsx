"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Wrench } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  getLocalizedPath,
  locales,
  stripLocaleFromPathname,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, dictionary } = useLocaleContext();
  const pathWithoutLocale = stripLocaleFromPathname(pathname);
  const isHome = pathWithoutLocale === "/";
  const mainSiteWithLocale = `${siteConfig.mainSiteUrl}/${locale}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/92 px-2 pt-1.5 pb-1.5 backdrop-blur-xl sm:px-5 sm:pt-2">
      <div className="page-shell min-w-0">
        <div
          className={cn(
            "surface-panel flex min-h-14 w-full min-w-0 items-center justify-between gap-1.5 rounded-full",
            "px-2.5 py-1.5 sm:min-h-16 sm:gap-3 sm:px-4 sm:py-0 md:px-5",
          )}
        >
          <Link
            href={getLocalizedPath(locale)}
            className={cn(
              "font-heading text-foreground flex min-w-0 flex-1 items-center gap-1.5",
              "text-[0.9375rem] font-semibold leading-tight tracking-tight sm:gap-2 sm:text-lg",
            )}
            title={`${siteConfig.name} · ${dictionary.site.shortName}`}
          >
            <Wrench
              className="size-4 shrink-0 text-primary sm:size-5"
              aria-hidden
            />
            <span className="min-w-0 truncate">
              {siteConfig.name}
              <span className="text-muted-foreground">
                {" "}
                · {dictionary.site.shortName}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/60 p-1 md:flex"
            aria-label={dictionary.nav.ariaMain}
          >
            <Link
              href={getLocalizedPath(locale)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                isHome
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
              )}
            >
              {dictionary.nav.tools}
            </Link>
            <a
              href={mainSiteWithLocale}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "rounded-full px-3 text-sm",
              )}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.nav.mainSite}
              <ExternalLink className="size-3.5" />
            </a>
          </nav>

          <div
            className="hidden items-center gap-1 md:flex"
            aria-label={dictionary.nav.languageSwitcher}
          >
            {locales.map((targetLocale) => (
              <Link
                key={targetLocale}
                href={getLocalizedPath(targetLocale, pathWithoutLocale)}
                className={cn(
                  "inline-flex h-8 min-w-8 select-none items-center justify-center rounded-full px-2 text-[11px] font-medium leading-none transition-colors",
                  targetLocale === locale
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                )}
              >
                {targetLocale === "en" ? "EN" : "中文"}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
            <a
              href={mainSiteWithLocale}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden h-8 min-[400px]:inline-flex md:hidden",
              )}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.nav.mainSite}
            </a>
            <a
              href={mainSiteWithLocale}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-8 md:hidden min-[400px]:hidden",
              )}
              target="_blank"
              rel="noreferrer"
              aria-label={dictionary.nav.mainSite}
            >
              <ExternalLink className="size-3.5" />
            </a>
            <div
              className="flex items-center gap-0.5 rounded-full border border-border/70 bg-background/60 p-0.5 md:hidden"
              aria-label={dictionary.nav.languageSwitcher}
            >
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={getLocalizedPath(targetLocale, pathWithoutLocale)}
                  className={cn(
                    "inline-flex h-7 min-w-8 select-none items-center justify-center rounded-full px-2 text-[11px] font-medium sm:h-8 sm:min-w-8",
                    targetLocale === locale
                      ? "bg-foreground text-background"
                      : "text-muted-foreground",
                  )}
                >
                  {targetLocale === "en" ? "EN" : "中"}
                </Link>
              ))}
            </div>
            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
