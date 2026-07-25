"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { StudioEditorPlayground } from "@/components/studio/StudioEditorPlayground";

const PLAYGROUND_HEIGHT = 860;

export function NodeGraphPreview() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
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
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-background/60 px-3 py-2 sm:px-4">
              <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                CAM-01 // MARROW STUDIO
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-studio">
                INTERACTIVE
              </span>
            </div>
            <div
              className="relative w-full shrink-0 overflow-hidden bg-surface"
              style={{
                height: PLAYGROUND_HEIGHT,
                minHeight: PLAYGROUND_HEIGHT,
                maxHeight: PLAYGROUND_HEIGHT,
              }}
            >
              <StudioEditorPlayground
                className="h-full w-full shrink-0"
                style={{
                  borderRadius: 0,
                  border: "none",
                  height: PLAYGROUND_HEIGHT,
                  minHeight: PLAYGROUND_HEIGHT,
                  maxHeight: PLAYGROUND_HEIGHT,
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
