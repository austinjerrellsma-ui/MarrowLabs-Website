"use client";

import { PageHero } from "@/components/products/PageHero";
import { DOWNLOAD_URL, PRODUCTS } from "@/lib/constants";
import { Zap } from "lucide-react";

const p = PRODUCTS.marrowlink;

export function ModHeroSection() {
  return (
    <PageHero
      eyebrow="PCVR Mod"
      title={p.name}
      tagline={p.tagline}
      description={p.description}
      accent="ml"
      icon={Zap}
      accentClass={p.accentClass}
      accentBg={p.accentBg}
      accentBorder={p.accentBorder}
      primaryCta={{ href: DOWNLOAD_URL, label: "Get via Hub", external: true }}
      secondaryCta={{ href: "/hub", label: "Open Hub" }}
      meta={["RUNTIME", "MELONLOADER", "BONELIB"]}
      status="SECTOR // RUNTIME"
    />
  );
}
