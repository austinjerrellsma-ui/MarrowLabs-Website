"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DOWNLOAD_URL } from "@/lib/constants";
import { ChevronRight, Download } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const, delay },
});

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Void core wash */}
        <div
          className="absolute -top-1/4 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--hazard) / 0.12) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-1/3 -left-1/4 h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--ml-glow) / 0.10) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute bottom-0 -right-1/4 h-[480px] w-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--hub-glow) / 0.08) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Facility grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(237 230 217 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(237 230 217 / 1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Top hazard bar */}
        <div className="absolute top-0 inset-x-0 h-1 hazard-stripe opacity-70" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div {...fadeUp(0)}>
          <SectionLabel variant="hazard" className="mb-6">
            BONELAB Void Facility
          </SectionLabel>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="font-display text-5xl font-bold leading-[1.08] tracking-tight text-bone sm:text-6xl lg:text-7xl"
        >
          Build the powers
          <br />
          <GradientText variant="white">BONELAB deserves.</GradientText>
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          MarrowLabs ships the tools — MarrowLink brings new powers to your
          headset, the Hub manages every release, and Marrow Studio lets you
          build your own.
        </motion.p>

        <motion.div
          {...fadeUp(0.24)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 text-base font-mono uppercase tracking-wider rounded-sm"
          >
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              Download the Hub
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-1.5 text-base font-mono uppercase tracking-wider rounded-sm border-bone/20 text-bone hover:bg-bone/5 hover:text-bone"
          >
            <Link href="/marrowlink">
              Learn about the mod
              <ChevronRight size={16} />
            </Link>
          </Button>
        </motion.div>

        <motion.p
          {...fadeUp(0.32)}
          className="mt-8 text-[11px] text-muted font-mono tracking-[0.2em] uppercase"
        >
          Free to install · Windows · PCVR
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="h-10 w-px bg-gradient-to-b from-hazard/60 to-transparent" />
      </motion.div>
    </section>
  );
}
