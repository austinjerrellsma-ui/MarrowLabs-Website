"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";

const p = PRODUCTS.marrowlink;

export function ChannelTierSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10 text-center">
        <SectionLabel variant="ml" className="mb-4">
          Release Channels
        </SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Get access at your level.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Stable is free and open. Beta and Testing require Discord roles or
          Patreon support. The Hub handles access automatically when you link
          your account.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {p.channels.map((ch, i) => (
          <motion.div
            key={ch.name}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <GlowCard glowColor={p.glowColor} className="text-center">
              <p className={`font-display text-lg font-bold ${ch.color}`}>
                {ch.name}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">{ch.access}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
