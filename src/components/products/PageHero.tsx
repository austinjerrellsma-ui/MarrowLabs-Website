"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FacilityBackdrop } from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/button";
import { BoneTerminal } from "@/components/ui/BoneTerminal";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Accent = "ml" | "hub" | "studio" | "hazard";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  accent: Accent;
  icon: LucideIcon;
  accentClass: string;
  accentBg: string;
  accentBorder: string;
  primaryCta?: { href: string; label: string; external?: boolean };
  secondaryCta?: { href: string; label: string };
  meta?: string[];
  status?: string;
};

const accentMap = {
  ml: { backdrop: "ml" as const, gradient: "ml" as const },
  hub: { backdrop: "hub" as const, gradient: "hub" as const },
  studio: { backdrop: "studio" as const, gradient: "studio" as const },
  hazard: { backdrop: "hazard" as const, gradient: "white" as const },
};

export function PageHero({
  eyebrow,
  title,
  tagline,
  description,
  accent,
  icon: Icon,
  accentClass,
  accentBg,
  accentBorder,
  primaryCta,
  secondaryCta,
  meta = ["MODDING", "WINDOWS", "VR"],
  status = "ACTIVE",
}: PageHeroProps) {
  const a = accentMap[accent];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <FacilityBackdrop accent={a.backdrop} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center border",
                accentBorder,
                accentBg,
              )}
            >
              <Icon size={20} className={accentClass} />
            </div>
            <SectionLabel variant={accent}>{eyebrow}</SectionLabel>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl"
          >
            <GradientText variant={a.gradient}>{title}</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 font-display text-lg font-medium text-muted-foreground sm:text-xl"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {description}
          </motion.p>

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {primaryCta ? (
                <Button asChild size="lg" className="rounded-sm font-mono text-xs uppercase tracking-wider">
                  {primaryCta.external ? (
                    <a
                      href={primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {primaryCta.label}
                    </a>
                  ) : (
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  )}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-sm font-mono text-xs uppercase tracking-wider"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <BoneTerminal
            title={title}
            meta={meta}
            integrity={78}
            accent={accent === "hazard" ? "hazard" : accent}
          />
        </motion.div>
      </div>
    </section>
  );
}
