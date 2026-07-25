"use client";

import { motion } from "framer-motion";
import { Zap, Monitor, Cpu } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import {
  FacilityBackdrop,
  FacilityHeader,
} from "@/components/ui/FacilityChrome";
import { HoverTrackerCard } from "@/components/ui/HoverTrackerCard";
import { PRODUCTS } from "@/lib/constants";

const ICONS = { Zap, Monitor, Cpu } as const;

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
      <FacilityBackdrop accent="hazard" showStripes={false} />

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
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {products.map((product, i) => {
            const Icon = ICONS[product.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={product.id}
                variants={item}
                className="min-h-[300px]"
              >
                <HoverTrackerCard
                  href={product.href}
                  name={product.name}
                  tagline={product.tagline}
                  accent={product.accentVariant}
                  icon={Icon}
                  code={`SEC-0${i + 1}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
