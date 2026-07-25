"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";

const p = PRODUCTS.studio;

export function StudioFeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <SectionLabel variant="studio" className="mb-4">
          Features
        </SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Built for authors who ship powers.
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {p.features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <GlowCard glowColor={p.glowColor} className="h-full">
              <h3
                className={`font-display text-base font-semibold ${p.accentClass}`}
              >
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.body}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
