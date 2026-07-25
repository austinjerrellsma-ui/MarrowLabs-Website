"use client";

import { motion } from "framer-motion";
import { ABOUT, PRODUCTS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MODULES = [
  PRODUCTS.marrowlink,
  PRODUCTS.hub,
  PRODUCTS.studio,
] as const;

export function AboutContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <FacilityBackdrop accent="hazard" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel variant="hazard" className="mb-5">
              About
            </SectionLabel>
            <h1 className="font-display text-4xl font-bold tracking-tight text-bone sm:text-5xl lg:text-6xl">
              <GradientText variant="white">{ABOUT.name}</GradientText>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              {ABOUT.mission}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {ABOUT.description}
            </p>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { code: "DIV-01", label: "Author", value: "Marrow Studio" },
              { code: "DIV-02", label: "Deploy", value: "MarrowLink Hub" },
              { code: "DIV-03", label: "Runtime", value: "MarrowLink" },
            ].map((item, i) => (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <FacilityPanel className="p-4" accentClassName="bg-hazard">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-muted">
                    {item.code}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-hazard">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-base text-bone">
                    {item.value}
                  </p>
                </FacilityPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
        <FacilityBackdrop accent="ml" showStripes={false} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FacilityHeader
            label={<SectionLabel variant="hazard">Facility Roster</SectionLabel>}
            title="The pipeline."
            description="Three linked tools — one BONELAB-facing toolchain from authoring to in-headset play."
          />

          <div className="grid gap-3 md:grid-cols-3">
            {MODULES.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <FacilityPanel
                  className="flex h-full flex-col p-5"
                  accentClassName={
                    mod.id === "marrowlink"
                      ? "bg-ml"
                      : mod.id === "hub"
                        ? "bg-hub"
                        : "bg-studio"
                  }
                >
                  <p className="font-mono text-[9px] tracking-[0.2em] text-muted">
                    MOD-{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={`mt-3 font-display text-lg font-semibold ${mod.accentClass}`}
                  >
                    {mod.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {mod.tagline}
                  </p>
                  <Link
                    href={mod.href}
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition hover:text-hazard"
                  >
                    Enter sector
                    <ArrowRight size={12} />
                  </Link>
                </FacilityPanel>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 font-mono text-xs text-muted">
            Not affiliated with Stress Level Zero. BONELAB is a trademark of
            Stress Level Zero.
          </p>
        </div>
      </section>
    </>
  );
}
