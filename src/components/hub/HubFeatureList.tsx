"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";
import { Check } from "lucide-react";

const p = PRODUCTS.hub;

export function HubFeatureList() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <SectionLabel variant="hub" className="mb-4">
          Features
        </SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to manage MarrowLink.
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

      <div className="mt-16 mx-auto max-w-2xl">
        <SectionLabel variant="hub" className="mb-6">
          Requirements
        </SectionLabel>
        <GlowCard glowColor={p.glowColor} interactive={false}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.requirements.map((req) => (
              <li
                key={req}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-hub"
                  aria-hidden
                />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </GlowCard>
      </div>
    </section>
  );
}
