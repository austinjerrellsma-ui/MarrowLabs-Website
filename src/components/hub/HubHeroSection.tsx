"use client";

import { PageHero } from "@/components/products/PageHero";
import { DOWNLOAD_URL, PRODUCTS } from "@/lib/constants";
import { Monitor } from "lucide-react";

const p = PRODUCTS.hub;

export function HubHeroSection() {
  return (
    <PageHero
      eyebrow="Desktop App"
      title={p.name}
      tagline={p.tagline}
      description={p.description}
      accent="hub"
      icon={Monitor}
      accentClass={p.accentClass}
      accentBg={p.accentBg}
      accentBorder={p.accentBorder}
      primaryCta={{
        href: DOWNLOAD_URL,
        label: "Download for Windows",
        external: true,
      }}
      secondaryCta={{ href: "/marrowlink", label: "View MarrowLink" }}
      meta={["INSTALLER", "CHANNELS", "BACKUPS"]}
      status="SECTOR // DEPLOY"
    />
  );
}
