import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getCssAnimationSitemapPathnames } from "@/lib/tools/css-animations/queries";
import { getAllToolSlugs } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  const cssAnimPaths = getCssAnimationSitemapPathnames();

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
    const cssAnimEntries: MetadataRoute.Sitemap = cssAnimPaths.map((path) => {
      const parts = path.split("/").filter(Boolean);
      const isDetail = parts.length >= 4;
      return {
        url: `${base}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: isDetail ? 0.75 : 0.78,
      };
    });
    return [home, ...cssAnimEntries, ...toolEntries];
  });
}
