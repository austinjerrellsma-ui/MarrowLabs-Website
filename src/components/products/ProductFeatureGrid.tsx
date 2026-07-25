"use client";

import { motion } from "framer-motion";
import {
  FacilityBackdrop,
  FacilityHeader,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FacilityCoreCard } from "@/components/ui/FacilityCoreCard";
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
            "grid gap-4 sm:gap-5",
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
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="min-h-[300px]"
            >
              <FacilityCoreCard
                code={`CAP-${String(i + 1).padStart(2, "0")}`}
                title={feature.title}
                body={feature.body}
                status="System Nominal"
                accent={accent === "hazard" ? "hazard" : accent}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
