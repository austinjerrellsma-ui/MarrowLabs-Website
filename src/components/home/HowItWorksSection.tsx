"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Cpu, Download, Gamepad2 } from "lucide-react";

const STEPS = [
  {
    icon: Cpu,
    accent: "text-studio",
    accentBg: "bg-studio/10",
    accentBorder: "border-studio/30",
    step: "01",
    title: "Author in Marrow Studio",
    body: "Wire nodes together in the Studio editor. Trigger → Compute → Action. Compile to a validated JSON package.",
  },
  {
    icon: Download,
    accent: "text-hub",
    accentBg: "bg-hub/10",
    accentBorder: "border-hub/30",
    step: "02",
    title: "Manage via the Hub",
    body: "The Hub downloads your MarrowLink build and keeps it up to date. Future Studio package distribution runs through the same app.",
  },
  {
    icon: Gamepad2,
    accent: "text-ml",
    accentBg: "bg-ml/10",
    accentBorder: "border-ml/30",
    step: "03",
    title: "Play in BONELAB",
    body: "The MarrowLink mod discovers packages from your UserData folder and executes them live. No restarts. Wrist UI toggle per power.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <SectionLabel className="mb-4">How It Works</SectionLabel>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          From idea to in-game.
        </h2>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3">
        <div
          aria-hidden
          className="absolute top-12 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, var(--studio-glow), var(--hub-glow), var(--ml-glow))",
            opacity: 0.25,
          }}
        />

        {STEPS.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex flex-col items-center text-center"
          >
            <div
              className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ${s.accentBorder} ${s.accentBg}`}
            >
              <s.icon size={24} className={s.accent} />
            </div>
            <p className="font-mono text-xs text-muted mb-1 tracking-widest">
              {s.step}
            </p>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
