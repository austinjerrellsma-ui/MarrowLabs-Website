"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";

export function NodeGraphPreview() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">Inside the editor</SectionLabel>}
          title="Wire. Validate. Compile."
          description="Marrow Studio’s full node graph — library, canvas, inspector, and build pipeline in one facility console."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <FacilityPanel
            className="overflow-hidden p-0"
            accentClassName="bg-studio"
          >
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2 sm:px-4">
              <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                CAM-01 // MARROW STUDIO
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-studio">
                LIVE GRAPH
              </span>
            </div>
            <div className="relative bg-surface">
              <Image
                src="/studio-editor.png"
                alt="Marrow Studio node editor showing a Phase 13 Variable Counter graph with library, canvas, inspector, and build controls"
                width={1919}
                height={1079}
                className="h-auto w-full"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-studio/20"
              />
            </div>
          </FacilityPanel>
        </motion.div>
      </div>
    </section>
  );
}
