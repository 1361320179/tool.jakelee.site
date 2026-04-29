import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CssAnimationsShell } from "@/components/css-animations/css-animations-shell";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import {
  CSS_ANIMATIONS_TOOL_BASE,
  cssAnimationsCategoryPath,
  cssAnimationsDetailPath,
} from "@/lib/css-animations/paths";
import { ANIMATION_CATEGORIES, type AnimationCategory } from "@/lib/css-animations/types";
import {
  isAnimationCategory,
  itemDictKey,
  listAnimationsInCategory,
} from "@/lib/css-animations/queries";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ lang: string; category: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    ANIMATION_CATEGORIES.map((category) => ({ lang, category })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, category } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  if (!isAnimationCategory(category)) {
    return { title: "Not found" };
  }
  const cat = category as AnimationCategory;
  const meta = dictionary.cssAnimations.categories[cat];
  const base = new URL(siteConfig.url);
  const path = `/${locale}${cssAnimationsCategoryPath(category)}`;
  const title = meta.title;
  const description = meta.description;
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    alternates: {
      canonical: new URL(path, base).toString(),
      languages: getLocaleAlternates(cssAnimationsCategoryPath(category)),
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

export default async function CssAnimationsCategoryPage({ params }: PageProps) {
  const { lang, category } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  if (!isAnimationCategory(category)) {
    notFound();
  }
  const cat = category as AnimationCategory;
  const c = dictionary.cssAnimations;
  const catMeta = c.categories[cat];
  const items = listAnimationsInCategory(cat);

  return (
    <CssAnimationsShell
      locale={locale}
      crumbs={[
        { label: dictionary.toolPage.breadcrumbTools, href: "/" },
        { label: c.metadata.hubTitle, href: CSS_ANIMATIONS_TOOL_BASE },
        { label: catMeta.title },
      ]}
    >
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {catMeta.title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{catMeta.description}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((a) => {
          const key = itemDictKey(a.category, a.slug);
          const itemMeta = c.items[key];
          if (!itemMeta) return null;
          return (
            <li key={a.slug}>
              <Link
                href={getLocalizedPath(locale, cssAnimationsDetailPath(a.category, a.slug))}
                className={cn(
                  "surface-panel group block h-full p-5 sm:p-6",
                  "hover:border-primary/35 hover:shadow-lg",
                )}
              >
                <h2 className="font-heading text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                  {itemMeta.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{itemMeta.description}</p>
                <p className="pt-2 text-sm font-medium text-primary">{catMeta.open} →</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </CssAnimationsShell>
  );
}
