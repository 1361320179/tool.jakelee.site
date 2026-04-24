"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/config/site";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getLocalizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { locale, dictionary: d } = useLocaleContext();
  const copy = d.notFound;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="tool-aurora" aria-hidden />
      <SiteHeader />
      <main className="page-shell flex flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-heading mt-4 text-2xl font-semibold sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {copy.description}
        </p>
        <Link
          href={getLocalizedPath(locale)}
          className={cn(buttonVariants({ variant: "default" }), "mt-8")}
        >
          {copy.backHome}
        </Link>
        <a
          href={siteConfig.mainSiteUrl}
          className="mt-4 text-sm text-primary hover:underline"
        >
          jakelee.site
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
