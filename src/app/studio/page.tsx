import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { StudioHeroSection } from "@/components/studio/StudioHeroSection";
import { NodeGraphPreview } from "@/components/studio/NodeGraphPreview";
import { StudioFeatureGrid } from "@/components/studio/StudioFeatureGrid";
import { CtaStrip } from "@/components/home/CtaStrip";
import { ProductTheme } from "@/components/products/ProductTheme";

const p = PRODUCTS.studio;

export const metadata: Metadata = {
  title: "Marrow Studio",
  description: p.description,
};

export default function StudioPage() {
  return (
    <ProductTheme accent="studio">
      <StudioHeroSection />
      <NodeGraphPreview />
      <StudioFeatureGrid />
      <CtaStrip />
    </ProductTheme>
  );
}
