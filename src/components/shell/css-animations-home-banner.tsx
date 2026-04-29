"use client";

import Link from "next/link";
import { Palette } from "lucide-react";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { getLocalizedPath } from "@/i18n/config";
import { CSS_ANIMATIONS_TOOL_BASE } from "@/lib/css-animations/paths";
import { cn } from "@/lib/utils";

export function CssAnimationsHomeBanner() {
  const { locale, dictionary } = useLocaleContext();
  const cta = dictionary.home.cssAnimationsCta;

  return (
    <section className="page-shell pb-6" aria-label={cta.title}>
      <Link
        href={getLocalizedPath(locale, CSS_ANIMATIONS_TOOL_BASE)}
        className={cn(
          "surface-panel flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6",
          "hover:border-primary/35 hover:shadow-lg",
        )}
      >
        <div className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-accent/20 text-accent-foreground">
            <Palette className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 space-y-1">
            <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">
              {cta.title}
            </h2>
            <p className="text-sm text-muted-foreground">{cta.body}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-primary sm:shrink-0">{cta.linkLabel} →</span>
      </Link>
    </section>
  );
}
