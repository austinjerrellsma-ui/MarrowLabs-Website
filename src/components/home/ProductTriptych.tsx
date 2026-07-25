"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Monitor, Cpu, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import {
  FacilityBackdrop,
  FacilityHeader,
} from "@/components/ui/FacilityChrome";
import { PRODUCTS } from "@/lib/constants";

const ICONS = { Zap, Monitor, Cpu } as const;

const MEDIA: Record<string, { from: string; to: string; rail: string }> = {
  marrowlink: {
    from: "rgb(var(--ml-glow) / 0.45)",
    to: "rgb(var(--ml-primary) / 0.08)",
    rail: "bg-ml",
  },
  hub: {
    from: "rgb(var(--hub-glow) / 0.45)",
    to: "rgb(var(--hub-primary) / 0.08)",
    rail: "bg-hub",
  },
  studio: {
    from: "rgb(var(--studio-glow) / 0.45)",
    to: "rgb(var(--studio-primary) / 0.08)",
    rail: "bg-studio",
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProductTriptych() {
  const products = [PRODUCTS.marrowlink, PRODUCTS.hub, PRODUCTS.studio];

  return (
    <section className="relative overflow-hidden border-y border-border py-16 sm:py-20">
      <FacilityBackdrop accent="ml" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <FacilityHeader
          label={<SectionLabel variant="hazard">The Ecosystem</SectionLabel>}
          title={
            <>
              Three tools.{" "}
              <GradientText variant="white">One pipeline.</GradientText>
            </>
          }
          description="Studio authors packages, Hub distributes builds, MarrowLink executes them live in BONELAB."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 md:grid-cols-3"
        >
          {products.map((product) => {
            const Icon = ICONS[product.icon as keyof typeof ICONS];
            const media = MEDIA[product.id];
            return (
              <motion.div key={product.id} variants={item}>
                <GlowCard
                  glowColor={product.glowColor}
                  accentRail={media.rail}
                  className="group flex h-full flex-col !p-0"
                >
                  <div
                    className="relative flex h-28 items-end overflow-hidden border-b border-border facility-scanlines px-4 pb-3"
                    style={{
                      background: `linear-gradient(145deg, ${media.from}, ${media.to}), linear-gradient(rgb(14 14 16), rgb(6 6 8))`,
                    }}
                  >
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center border ${product.accentBorder} bg-background/70`}
                    >
                      <Icon size={18} className={product.accentClass} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      <GradientText variant={product.accentVariant}>
                        {product.name}
                      </GradientText>
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {product.tagline}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <Link
                      href={product.href}
                      className={`mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider ${product.accentClass} opacity-90 transition-opacity hover:opacity-100`}
                    >
                      Open dossier
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
