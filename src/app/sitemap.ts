import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getAllToolSlugs } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return locales.flatMap((locale) => {
    const home: MetadataRoute.Sitemap[0] = {
      url: `${base}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    };
    const toolEntries: MetadataRoute.Sitemap = getAllToolSlugs().map(
      (slug) => ({
        url: `${base}/${locale}/tools/${slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }),
    );
    return [home, ...toolEntries];
  });
}
