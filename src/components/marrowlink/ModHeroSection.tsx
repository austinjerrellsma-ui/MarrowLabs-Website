"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { PRODUCTS } from "@/lib/constants";
import { Zap } from "lucide-react";

const p = PRODUCTS.marrowlink;

export function ModHeroSection() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgb(var(--ml-glow) / 0.14), transparent)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl"
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${p.accentBorder} ${p.accentBg}`}
          >
            <Zap size={22} className={p.accentClass} />
          </div>
          <SectionLabel variant="ml">PCVR Mod</SectionLabel>
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          <GradientText variant="ml">MarrowLink</GradientText>
        </h1>
        <p className="mt-3 font-display text-xl text-muted-foreground font-medium italic">
          {p.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
          {p.description}
        </p>
      </motion.div>
    </section>
  );
}
