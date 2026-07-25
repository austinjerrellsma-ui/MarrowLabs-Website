"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { Cpu, Download, Gamepad2, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Cpu,
    accent: "text-studio",
    accentBg: "bg-studio/10",
    accentBorder: "border-studio/40",
    rail: "bg-studio",
    step: "01",
    title: "Author in Marrow Studio",
    body: "Wire Trigger → Compute → Action. Compile to a validated JSON package ready for the runtime.",
  },
  {
    icon: Download,
    accent: "text-hub",
    accentBg: "bg-hub/10",
    accentBorder: "border-hub/40",
    rail: "bg-hub",
    step: "02",
    title: "Manage via the Hub",
    body: "Install MarrowLink channels with backup protection. Keep Stable, Beta, and Testing verified.",
  },
  {
    icon: Gamepad2,
    accent: "text-ml",
    accentBg: "bg-ml/10",
    accentBorder: "border-ml/40",
    rail: "bg-ml",
    step: "03",
    title: "Play in BONELAB",
    body: "The mod discovers packages live. Toggle powers from the wrist UI without leaving the void.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <FacilityHeader
          label={<SectionLabel variant="hazard">How It Works</SectionLabel>}
          title="From idea to in-game."
          description="A closed loop across the MarrowLabs facility — author, deploy, execute."
        />

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {STEPS.map((s, i) => (
            <div key={s.step} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <FacilityPanel
                  className="flex h-full flex-col p-5"
                  accentClassName={s.rail}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center border ${s.accentBorder} ${s.accentBg}`}
                    >
                      <s.icon size={20} className={s.accent} />
                    </div>
                    <p className="font-mono text-xs tracking-[0.2em] text-muted">
                      {s.step}
                    </p>
                  </div>
                  <h3 className="font-display text-base font-semibold text-bone">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </FacilityPanel>
              </motion.div>

              {i < STEPS.length - 1 ? (
                <div
                  className="hidden items-center justify-center text-hazard/50 md:flex"
                  aria-hidden
                >
                  <ArrowRight size={18} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
