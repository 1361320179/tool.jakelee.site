import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimationDetailView } from "@/components/tools/css-animations/animation-detail-view";
import { CssAnimationsShell } from "@/components/tools/css-animations/css-animations-shell";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import {
  CSS_ANIMATIONS_TOOL_BASE,
  cssAnimationsCategoryPath,
  cssAnimationsDetailPath,
} from "@/lib/tools/css-animations/paths";
import type { AnimationCategory } from "@/lib/tools/css-animations/types";
import {
  getAllAnimationDetailStaticParams,
  getAnimationByCategoryAndSlug,
  isAnimationCategory,
  itemDictKey,
} from "@/lib/tools/css-animations/queries";

type PageProps = {
  params: Promise<{ lang: string; category: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllAnimationDetailStaticParams().map(({ category, slug }) => ({
      lang,
      category,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const anim = getAnimationByCategoryAndSlug(category, slug);
  if (!anim || !isAnimationCategory(category)) {
    return { title: "Not found" };
  }
  const key = itemDictKey(anim.category, anim.slug);
  const itemMeta = dictionary.cssAnimations.items[key];
  if (!itemMeta) {
    return { title: "Not found" };
  }
  const base = new URL(siteConfig.url);
  const path = `/${locale}${cssAnimationsDetailPath(category, slug)}`;
  const title = itemMeta.title;
  const description = itemMeta.description;
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(itemMeta.ogSubtitle)}`;
  return {
    title: dictionary.cssAnimations.metadata.titleTemplate.replace("%s", title),
    description,
    alternates: {
      canonical: new URL(path, base).toString(),
      languages: getLocaleAlternates(cssAnimationsDetailPath(category, slug)),
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

export default async function CssAnimationDetailPage({ params }: PageProps) {
  const { lang, category, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const anim = getAnimationByCategoryAndSlug(category, slug);
  if (!anim || !isAnimationCategory(category)) {
    notFound();
  }
  const key = itemDictKey(anim.category, anim.slug);
  const itemMeta = dictionary.cssAnimations.items[key];
  if (!itemMeta) {
    notFound();
  }
  const c = dictionary.cssAnimations;
  const catMeta = c.categories[anim.category as AnimationCategory];

  return (
    <CssAnimationsShell
      locale={locale}
      crumbs={[
        { label: dictionary.toolPage.breadcrumbTools, href: "/" },
        { label: c.metadata.hubTitle, href: CSS_ANIMATIONS_TOOL_BASE },
        {
          label: catMeta.title,
          href: cssAnimationsCategoryPath(anim.category),
        },
        { label: itemMeta.breadcrumb },
      ]}
    >
      <AnimationDetailView
        category={anim.category as AnimationCategory}
        slug={anim.slug}
        title={itemMeta.title}
        description={itemMeta.description}
      />
    </CssAnimationsShell>
  );
}
