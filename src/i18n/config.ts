export const locales = ["en", "zh"] as const;

export type SiteLocale = (typeof locales)[number];

export const defaultLocale: SiteLocale = "en";

export const localeInfo: Record<
  SiteLocale,
  { label: string; languageTag: string; ogLocale: string }
> = {
  en: {
    label: "English",
    languageTag: "en-US",
    ogLocale: "en_US",
  },
  zh: {
    label: "中文",
    languageTag: "zh-CN",
    ogLocale: "zh_CN",
  },
};

export function isLocale(value: string): value is SiteLocale {
  return locales.includes(value as SiteLocale);
}

export function getLanguageTag(locale: SiteLocale) {
  return localeInfo[locale].languageTag;
}

export function getLocalizedPath(locale: SiteLocale, href = "/") {
  if (!href || href === "/") return `/${locale}`;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if (isLocale(maybeLocale)) {
    const nextPath = `/${rest.join("/")}`.replace(/\/+$/, "");
    return nextPath === "" ? "/" : nextPath;
  }
  return pathname || "/";
}

export function detectLocale(input: string | null | undefined): SiteLocale {
  const normalized = input?.toLowerCase() ?? "";

  if (normalized.startsWith("zh")) return "zh";
  if (normalized.startsWith("en")) return "en";

  return defaultLocale;
}
