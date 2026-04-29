import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { SiteLocale } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/config";

export type CssAnimationCrumb = {
  label: string;
  href?: string;
};

export function CssAnimationsShell({
  locale,
  crumbs,
  children,
}: {
  locale: SiteLocale;
  crumbs: CssAnimationCrumb[];
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell space-y-8">
      <nav
        className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={`${c.label}-${i}`} className="flex flex-wrap items-center gap-1">
              {i > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
              ) : null}
              {c.href && !isLast ? (
                <Link href={getLocalizedPath(locale, c.href)} className="hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : undefined}>{c.label}</span>
              )}
            </span>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
