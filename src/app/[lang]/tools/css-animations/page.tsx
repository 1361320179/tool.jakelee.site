import type { Metadata } from "next";
import Link from "next/link";
import { Loader2, MousePointerClick, Type, CreditCard, TextCursorInput } from "lucide-react";
import { CssAnimationsShell } from "@/components/tools/css-animations/css-animations-shell";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import {
  CSS_ANIMATIONS_TOOL_BASE,
  cssAnimationsCategoryPath,
} from "@/lib/tools/css-animations/paths";
import {
  ANIMATION_CATEGORIES,
  type AnimationCategory,
} from "@/lib/tools/css-animations/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<AnimationCategory, typeof Loader2> = {
  loaders: Loader2,
  "hover-buttons": MousePointerClick,
  text: Type,
  cards: CreditCard,
  inputs: TextCursorInput,
};

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const c = dictionary.cssAnimations;
  const base = new URL(siteConfig.url);
  const path = `/${locale}${CSS_ANIMATIONS_TOOL_BASE}`;
  const title = c.metadata.hubTitle;
  const description = c.metadata.hubDescription;
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    alternates: {
      canonical: new URL(path, base).toString(),
      languages: getLocaleAlternates(CSS_ANIMATIONS_TOOL_BASE),
    },
    openGraph: {
      title: `${title} · ${dictionary.site.shortName}`,
      description,
      url: new URL(path, base).toString(),
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${dictionary.site.shortName}`,
      description,
      images: [og],
    },
  };
}

export default async function CssAnimationsHubPage({ params }: PageProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const c = dictionary.cssAnimations;

  return (
    <CssAnimationsShell
      locale={locale}
      crumbs={[
        { label: dictionary.toolPage.breadcrumbTools, href: "/" },
        { label: c.metadata.hubTitle },
      ]}
    >
      <header className="space-y-3">
        <div className="eyebrow">{c.hub.eyebrow}</div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {c.metadata.hubTitle}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {c.metadata.hubDescription}
        </p>
        <p className="text-sm text-muted-foreground">{c.hub.sub}</p>
      </header>

      <section aria-labelledby="css-anim-cats-heading" className="space-y-4">
        <h2
          id="css-anim-cats-heading"
          className="font-heading text-lg font-semibold"
        >
          {c.hub.browseCategories}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANIMATION_CATEGORIES.map((cat) => {
            const meta = c.categories[cat];
            const Icon = categoryIcons[cat];
            return (
              <li key={cat}>
                <Link
                  href={getLocalizedPath(
                    locale,
                    cssAnimationsCategoryPath(cat),
                  )}
                  className={cn(
                    "surface-panel group flex h-full flex-col gap-3 p-5 sm:p-6",
                    "hover:border-primary/35 hover:shadow-lg",
                  )}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 group-hover:rotate-[5deg]">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                      {meta.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {meta.description}
                    </p>
                    <p className="pt-1 text-sm font-medium text-primary">
                      {meta.open} →
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </CssAnimationsShell>
  );
}
