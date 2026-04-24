import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="tool-aurora" aria-hidden />
      <SiteHeader />
      <main className="flex-1 pb-4 pt-6 sm:pt-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
