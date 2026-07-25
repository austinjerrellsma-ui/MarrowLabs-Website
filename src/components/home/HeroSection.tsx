"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FacilityBackdrop, FacilityPanel } from "@/components/ui/FacilityChrome";
import { DOWNLOAD_URL, PRODUCTS } from "@/lib/constants";
import { ChevronRight, Download, Zap, Monitor, Cpu } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay },
});

const PIPELINE = [
  {
    name: PRODUCTS.studio.name,
    href: PRODUCTS.studio.href,
    icon: Cpu,
    accent: "text-studio",
    rail: "bg-studio",
    tag: "AUTHOR",
  },
  {
    name: PRODUCTS.hub.name,
    href: PRODUCTS.hub.href,
    icon: Monitor,
    accent: "text-hub",
    rail: "bg-hub",
    tag: "DEPLOY",
  },
  {
    name: PRODUCTS.marrowlink.name,
    href: PRODUCTS.marrowlink.href,
    icon: Zap,
    accent: "text-ml",
    rail: "bg-ml",
    tag: "RUNTIME",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
      <FacilityBackdrop accent="hazard" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="text-left">
            <motion.div {...fadeUp(0)}>
              <SectionLabel variant="hazard" className="mb-4">
                BONELAB Void Facility
              </SectionLabel>
            </motion.div>

            <motion.p
              {...fadeUp(0.04)}
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
            >
              SECTOR // MARROWLABS · PCVR TOOLCHAIN
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl"
            >
              Build the powers
              <br />
              <GradientText variant="white">BONELAB deserves.</GradientText>
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              MarrowLink runs authored powers in-headset. The Hub installs and
              updates every channel. Marrow Studio is the node-graph workshop —
              one pipeline from void desk to BONELAB floor.
            </motion.p>

            <motion.div
              {...fadeUp(0.24)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="gap-2 rounded-sm text-sm font-mono uppercase tracking-wider"
              >
                <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                  Download the Hub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-1.5 rounded-sm border-bone/25 text-sm font-mono uppercase tracking-wider text-bone hover:bg-bone/5 hover:text-bone"
              >
                <Link href="/marrowlink">
                  Inspect the mod
                  <ChevronRight size={14} />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            >
              <span>Windows 10+</span>
              <span className="text-hazard/70">/</span>
              <span>MelonLoader</span>
              <span className="text-hazard/70">/</span>
              <span>BoneLib</span>
              <span className="text-hazard/70">/</span>
              <span>PCVR</span>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.18)} className="space-y-3">
            <FacilityPanel className="p-4 sm:p-5" accentClassName="bg-hazard">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-hazard">
                  Active Pipeline
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-hazard" />
                  Online
                </span>
              </div>
              <div className="space-y-2">
                {PIPELINE.map((node, i) => (
                  <Link
                    key={node.href}
                    href={node.href}
                    className="group flex items-center gap-3 border border-border/80 bg-background/60 px-3 py-2.5 transition-colors hover:border-hazard/40"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center border border-border bg-surface ${node.accent}`}
                    >
                      <node.icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        {String(i + 1).padStart(2, "0")} · {node.tag}
                      </span>
                      <span className="block truncate text-sm text-bone group-hover:text-hazard transition-colors">
                        {node.name}
                      </span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-muted group-hover:text-hazard transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </FacilityPanel>

            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "Channels", v: "3" },
                { k: "Runtime", v: "Live" },
                { k: "Editor", v: "Nodes" },
              ].map((stat) => (
                <FacilityPanel
                  key={stat.k}
                  className="px-3 py-3 text-center"
                  accentClassName="bg-hazard/70"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {stat.k}
                  </p>
                  <p className="mt-1 font-display text-lg text-bone">{stat.v}</p>
                </FacilityPanel>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
