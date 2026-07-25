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
        <div
          className="absolute -top-1/4 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--ml-glow) / 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 -left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--hub-glow) / 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 -right-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--studio-glow) / 0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(250 250 250 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(250 250 250 / 1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div {...fadeUp(0)}>
          <SectionLabel variant="ml" className="mb-6">
            BONELAB Modding Studio
          </SectionLabel>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Build the powers
          <br />
          <GradientText variant="ml">BONELAB deserves.</GradientText>
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
          <Button asChild size="lg" className="gap-2 text-base">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              Download the Hub
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="gap-1.5 text-base"
          >
            <Link href="/marrowlink">
              Learn about the mod
              <ChevronRight size={16} />
            </Link>
          </Button>
        </motion.div>

        <motion.p
          {...fadeUp(0.32)}
          className="mt-8 text-xs text-muted font-mono tracking-wide uppercase"
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
        <div className="h-10 w-px bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  );
}
