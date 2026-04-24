"use client";

import { Sparkles } from "lucide-react";
import { useLocaleContext } from "@/components/i18n/locale-context";

export function MarketingHero() {
  const { dictionary } = useLocaleContext();

  return (
    <section className="page-shell relative py-8 sm:py-10">
      <div className="page-hero relative overflow-hidden px-5 py-10 sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-12 -top-20 size-72 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-8 bottom-0 size-56 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />

        <div className="relative space-y-5">
          <div className="eyebrow gap-2">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            {dictionary.home.eyebrow}
          </div>

          <div className="space-y-3">
            <h1 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {dictionary.site.title}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {dictionary.home.heroBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
