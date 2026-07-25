"use client";

import { PageHero } from "@/components/products/PageHero";
import { PRODUCTS } from "@/lib/constants";
import { Cpu } from "lucide-react";

const p = PRODUCTS.studio;

export function StudioHeroSection() {
  return (
    <PageHero
      eyebrow="Node-Graph Editor"
      title={p.name}
      tagline={p.tagline}
      description={p.description}
      accent="studio"
      icon={Cpu}
      accentClass={p.accentClass}
      accentBg={p.accentBg}
      accentBorder={p.accentBorder}
      primaryCta={{ href: "/hub", label: "Get the Hub" }}
      secondaryCta={{ href: "/marrowlink", label: "See Runtime" }}
      meta={["AUTHOR", "VALIDATE", "COMPILE"]}
      status="SECTOR // AUTHOR"
    />
  );
}
