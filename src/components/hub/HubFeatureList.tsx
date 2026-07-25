"use client";

import { motion } from "framer-motion";
import { ProductFeatureGrid } from "@/components/products/ProductFeatureGrid";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";
import { Check } from "lucide-react";

const p = PRODUCTS.hub;

export function HubFeatureList() {
  return (
    <>
      <ProductFeatureGrid
        label="Capabilities"
        title="Everything you need to manage MarrowLink."
        description="Detection, channels, backups, mods, and Discord-gated access — one facility console."
        features={p.features}
        accent="hub"
        accentClass={p.accentClass}
        railClass="bg-hub"
      />

      <section className="relative overflow-hidden border-b border-border py-14 sm:py-16">
        <FacilityBackdrop accent="hub" showStripes={false} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FacilityHeader
            label={<SectionLabel variant="hub">Requirements</SectionLabel>}
            title="Facility prerequisites."
            description="Validate these before deploying the Hub into your BONELAB install."
          />
          <FacilityPanel className="p-5 sm:p-6" accentClassName="bg-hub">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.requirements.map((req, i) => (
                <motion.li
                  key={req}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="flex items-start gap-2.5 border border-border bg-background/40 px-3 py-2.5 text-sm text-muted-foreground"
                >
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-hub"
                    aria-hidden
                  />
                  <span>{req}</span>
                </motion.li>
              ))}
            </ul>
          </FacilityPanel>
        </div>
      </section>
    </>
  );
}
