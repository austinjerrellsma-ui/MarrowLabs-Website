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

const CARD_META = {
  marrowlink: {
    role: "Runtime",
    stats: [
      { label: "Channels", value: "3" },
      { label: "Loader", value: "ML" },
      { label: "Mode", value: "PCVR" },
    ],
    highlights: [
      "Live node-graph power packages in-headset",
      "Stable free — Beta & Testing gated",
      "Wrist UI toggles without leaving VR",
    ],
  },
  hub: {
    role: "Deploy",
    stats: [
      { label: "OS", value: "Win" },
      { label: "Backup", value: "Yes" },
      { label: "Access", value: "Auto" },
    ],
    highlights: [
      "Auto-detect BONELAB + MelonLoader",
      "Install, rollback, and verify builds",
      "Discord-linked channel unlocks",
    ],
  },
  studio: {
    role: "Author",
    stats: [
      { label: "Ports", value: "7" },
      { label: "Code", value: "0" },
      { label: "Parity", value: "1:1" },
    ],
    highlights: [
      "Visual Trigger → Compute → Action graphs",
      "Live validation before compile",
      "No C# required to ship powers",
    ],
  },
} as const;

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
            const meta = CARD_META[product.id as keyof typeof CARD_META];
            return (
              <motion.div
                key={product.id}
                variants={item}
                className="min-h-[340px]"
              >
                <HoverTrackerCard
                  href={product.href}
                  name={product.name}
                  tagline={product.tagline}
                  accent={product.accentVariant}
                  icon={Icon}
                  code={`SEC-0${i + 1}`}
                  role={meta.role}
                  stats={meta.stats}
                  highlights={meta.highlights}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
