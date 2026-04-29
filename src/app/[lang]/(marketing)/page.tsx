import { CssAnimationsHomeBanner } from "@/components/shell/css-animations-home-banner";
import { MarketingHero } from "@/components/shell/marketing-hero";
import { ToolCardGrid } from "@/components/shell/tool-card-grid";

export default function HomePage() {
  return (
    <>
      <MarketingHero />
      <CssAnimationsHomeBanner />
      <ToolCardGrid />
    </>
  );
}
