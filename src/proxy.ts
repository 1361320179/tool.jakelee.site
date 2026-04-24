import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, detectLocale, isLocale } from "@/i18n/config";

function pathnameHasLocale(pathname: string) {
  const [, maybeLocale] = pathname.split("/");
  return isLocale(maybeLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathnameHasLocale(pathname)) return NextResponse.next();

  const locale = detectLocale(request.headers.get("accept-language")) ?? defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
