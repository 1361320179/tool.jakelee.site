import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";
import { LocaleProvider } from "@/components/i18n/locale-context";
import { siteConfig } from "@/config/site";
import {
  getLanguageTag,
  localeInfo,
  locales,
} from "@/i18n/config";
import { getLocaleDictionary, getLocaleAlternates } from "@/i18n/server";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Theme = "light" | "dark" | "system";

const themeInitScript = `
(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const savedTheme = localStorage.getItem(storageKey) || "system";
  const resolvedTheme = savedTheme === "system" ? systemTheme : savedTheme;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
})();
`;

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const url = new URL(siteConfig.url);
  const og = `/api/og?title=${encodeURIComponent(dictionary.site.title)}&subtitle=${encodeURIComponent(dictionary.site.description)}`;

  return {
    metadataBase: url,
    title: {
      default: dictionary.site.title,
      template: dictionary.metadata.titleTemplate,
    },
    description: dictionary.site.description,
    alternates: {
      canonical: new URL(`/${locale}`, siteConfig.url).toString(),
      languages: getLocaleAlternates("/"),
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    },
    openGraph: {
      title: dictionary.site.title,
      description: dictionary.site.description,
      url: new URL(`/${locale}`, url).toString(),
      siteName: siteConfig.name,
      locale: localeInfo[locale].ogLocale,
      type: "website",
      images: [
        { url: og, width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.site.title,
      description: dictionary.site.description,
      images: [og],
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const resolvedThemeClass =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : "";
  const initialTheme = (
    cookieTheme === "light" ||
    cookieTheme === "dark" ||
    cookieTheme === "system"
      ? cookieTheme
      : "system"
  ) as Theme;

  return (
    <html
      lang={getLanguageTag(locale)}
      className={`${sans.variable} ${geistMono.variable} ${resolvedThemeClass} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider initialTheme={initialTheme}>
          <LocaleProvider locale={locale} dictionary={dictionary}>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
