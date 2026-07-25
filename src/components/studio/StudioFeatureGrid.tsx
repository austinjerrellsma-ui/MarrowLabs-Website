"use client";

import { ProductFeatureGrid } from "@/components/products/ProductFeatureGrid";
import { PRODUCTS } from "@/lib/constants";

const p = PRODUCTS.studio;

export function StudioFeatureGrid() {
  return (
    <ProductFeatureGrid
      label="Capabilities"
      title="Built for authors who ship powers."
      description="Primitive-first graphs, live validation, and protected compilation — facility tooling for BONELAB powers."
      features={p.features}
      accent="studio"
      accentClass={p.accentClass}
      railClass="bg-studio"
    />
  );
}
