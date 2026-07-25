"use client";

import { motion } from "framer-motion";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";

const p = PRODUCTS.marrowlink;

export function ChannelTierSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="ml" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="ml">Release Channels</SectionLabel>}
          title="Get access at your level."
          description="Stable is free and open. Beta and Testing require Discord roles or Patreon support. The Hub handles access automatically when you link your account."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          {p.channels.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <FacilityPanel className="h-full p-5 text-center" accentClassName="bg-ml">
                <p className="font-mono text-[9px] tracking-[0.2em] text-muted">
                  CH-{String(i + 1).padStart(2, "0")}
                </p>
                <p className={`mt-3 font-display text-xl font-bold ${ch.color}`}>
                  {ch.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {ch.access}
                </p>
                <div className="mx-auto mt-4 h-1 w-16 bg-gradient-to-r from-transparent via-hazard/70 to-transparent" />
              </FacilityPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
