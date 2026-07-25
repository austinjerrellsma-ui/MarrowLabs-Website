"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FacilityBackdrop, FacilityPanel } from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/button";
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
  ml: {
    backdrop: "ml" as const,
    rail: "bg-ml",
    chip: "border-ml/40 bg-ml/10 text-ml",
    gradient: "ml" as const,
    bar: "bg-gradient-to-r from-ml to-ml-glow",
  },
  hub: {
    backdrop: "hub" as const,
    rail: "bg-hub",
    chip: "border-hub/40 bg-hub/10 text-hub",
    gradient: "hub" as const,
    bar: "bg-gradient-to-r from-hub to-hub-glow",
  },
  studio: {
    backdrop: "studio" as const,
    rail: "bg-studio",
    chip: "border-studio/40 bg-studio/10 text-studio",
    gradient: "studio" as const,
    bar: "bg-gradient-to-r from-studio to-studio-glow",
  },
  hazard: {
    backdrop: "hazard" as const,
    rail: "bg-hazard",
    chip: "border-hazard/50 bg-hazard/10 text-hazard",
    gradient: "white" as const,
    bar: "bg-gradient-to-r from-hazard to-hazard-glow",
  },
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

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:py-20">
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
        >
          <FacilityPanel className="p-5" accentClassName={a.rail}>
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Module dossier
              </span>
              <span
                className={cn(
                  "border px-2 py-0.5 font-mono text-[9px] tracking-[0.16em]",
                  a.chip,
                )}
              >
                ONLINE
              </span>
            </div>
            <dl className="space-y-3">
              {[
                ["Designation", title],
                ["Division", "MarrowLabs"],
                ["Platform", "BONELAB / Windows"],
                ["Interface", "Desktop + VR"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {k}
                  </dt>
                  <dd className="text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.map((tag) => (
                <span
                  key={tag}
                  className="border border-border bg-background/60 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 h-1.5 overflow-hidden bg-background/80">
              <div className={cn("h-full w-[78%]", a.bar)} />
            </div>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Integrity // 78%
            </p>
          </FacilityPanel>
        </motion.div>
      </div>
    </section>
  );
}
