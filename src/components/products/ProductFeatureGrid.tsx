"use client";

import { motion } from "framer-motion";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  body: string;
};

type ProductFeatureGridProps = {
  label: string;
  title: string;
  description?: string;
  features: readonly Feature[];
  accent: "ml" | "hub" | "studio" | "hazard";
  accentClass: string;
  railClass: string;
  backdropAccent?: "ml" | "hub" | "studio" | "hazard";
  columns?: "3" | "4";
};

export function ProductFeatureGrid({
  label,
  title,
  description,
  features,
  accent,
  accentClass,
  railClass,
  backdropAccent,
  columns = "3",
}: ProductFeatureGridProps) {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop
        accent={backdropAccent ?? accent}
        showStripes={false}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant={accent}>{label}</SectionLabel>}
          title={title}
          description={description}
        />

        <div
          className={cn(
            "grid gap-3",
            columns === "4"
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <FacilityPanel
                className="h-full p-5"
                accentClassName={railClass}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-hazard">
                    CAP-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-hazard shadow-[0_0_8px_rgb(var(--hazard)/0.8)]" />
                </div>
                <h3
                  className={cn(
                    "font-display text-base font-semibold tracking-tight",
                    accentClass,
                  )}
                >
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </FacilityPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
