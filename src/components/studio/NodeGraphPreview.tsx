"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { StudioEditorPlayground } from "@/components/studio/StudioEditorPlayground";

export function NodeGraphPreview() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">Inside the editor</SectionLabel>}
          title="Wire. Validate. Compile."
          description="Try the real Marrow Studio graph — pan, zoom, connect nodes, and inspect fields in a live playground pulled straight from the editor."
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
                INTERACTIVE
              </span>
            </div>
            <div className="relative bg-surface">
              <StudioEditorPlayground
                className="h-[560px] w-full sm:h-[640px] lg:h-[720px]"
                style={{
                  borderRadius: 0,
                  border: "none",
                  minHeight: 0,
                }}
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
