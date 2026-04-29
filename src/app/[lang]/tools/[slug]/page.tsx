import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools/registry";
import { getPanelToolSlugs, getToolPanelLoader } from "@/lib/tools/panels";
import { DynamicToolPanel } from "@/components/shell/dynamic-tool-panel";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getLocaleDictionary, getLocaleAlternates } from "@/i18n/server";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getPanelToolSlugs().map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const tool = getToolBySlug(dictionary, slug);
  if (!tool) {
    return { title: "Not found" };
  }
  const title = tool.name;
  const description = tool.description;
  const base = new URL(siteConfig.url);
  const path = `/${locale}/tools/${slug}`;
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(tool.ogSubtitle)}`;
  return {
    title,
    description,
    alternates: {
      canonical: new URL(path, base).toString(),
      languages: getLocaleAlternates(`/tools/${slug}`),
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

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getToolPanelLoader(slug)) {
    notFound();
  }
  return <DynamicToolPanel slug={slug} />;
}
