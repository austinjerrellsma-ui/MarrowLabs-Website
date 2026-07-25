import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/constants";
import { StudioHeroSection } from "@/components/studio/StudioHeroSection";
import { NodeGraphPreview } from "@/components/studio/NodeGraphPreview";
import { StudioFeatureGrid } from "@/components/studio/StudioFeatureGrid";
import { CtaStrip } from "@/components/home/CtaStrip";

const p = PRODUCTS.studio;

export const metadata: Metadata = {
  title: "Marrow Studio",
  description: p.description,
};

export default function StudioPage() {
  return (
    <>
      <StudioHeroSection />
      <NodeGraphPreview />
      <StudioFeatureGrid />
      <CtaStrip />
    </>
  );
}
