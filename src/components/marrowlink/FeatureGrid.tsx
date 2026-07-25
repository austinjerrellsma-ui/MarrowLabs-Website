"use client";

import { ProductFeatureGrid } from "@/components/products/ProductFeatureGrid";
import { PRODUCTS } from "@/lib/constants";

const p = PRODUCTS.marrowlink;

export function FeatureGrid() {
  return (
    <ProductFeatureGrid
      label="Capabilities"
      title="What MarrowLink brings to BONELAB."
      description="Runtime execution for authored power packages — discovered live, toggled in-headset."
      features={p.features}
      accent="ml"
      accentClass={p.accentClass}
      railClass="bg-ml"
      columns="4"
    />
  );
}
