"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Monitor, Cpu, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { PRODUCTS } from "@/lib/constants";

const ICONS = { Zap, Monitor, Cpu } as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProductTriptych() {
  const products = [PRODUCTS.marrowlink, PRODUCTS.hub, PRODUCTS.studio];

  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <SectionLabel className="mb-4">The Ecosystem</SectionLabel>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three tools.{" "}
          <GradientText variant="white">One pipeline.</GradientText>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          MarrowLabs products are designed to work together — Studio authors
          packages, Hub distributes them, and the mod runs them live.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {products.map((product) => {
          const Icon = ICONS[product.icon as keyof typeof ICONS];
          return (
            <motion.div key={product.id} variants={item}>
              <GlowCard
                glowColor={product.glowColor}
                className="flex h-full flex-col group"
              >
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${product.accentBorder} ${product.accentBg}`}
                >
                  <Icon size={20} className={product.accentClass} />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  <GradientText variant={product.accentVariant}>
                    {product.name}
                  </GradientText>
                </h3>
                <p className="mt-2 text-sm font-medium text-muted-foreground italic">
                  {product.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${product.accentClass} opacity-80 hover:opacity-100 transition-opacity`}
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="translate-x-0 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
