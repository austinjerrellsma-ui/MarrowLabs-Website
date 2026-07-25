import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { ModHeroSection } from "@/components/marrowlink/ModHeroSection";
import { FeatureGrid } from "@/components/marrowlink/FeatureGrid";
import { ChannelTierSection } from "@/components/marrowlink/ChannelTierSection";
import { CtaStrip } from "@/components/home/CtaStrip";
import { ProductTheme } from "@/components/products/ProductTheme";

const p = PRODUCTS.marrowlink;

export const metadata: Metadata = {
  title: "MarrowLink",
  description: p.description,
};

export default function MarrowLinkPage() {
  return (
    <ProductTheme accent="ml">
      <ModHeroSection />
      <FeatureGrid />
      <ChannelTierSection />
      <CtaStrip />
    </ProductTheme>
  );
}
