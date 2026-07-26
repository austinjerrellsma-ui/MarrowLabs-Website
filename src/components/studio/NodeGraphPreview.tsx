"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { StudioEditorPlayground } from "@/components/studio/StudioEditorPlayground";
import { cn } from "@/lib/utils";

const PLAYGROUND_HEIGHT = 860;

function PreviewGraphSketch() {
  return (
    <svg
      viewBox="0 0 640 280"
      className="h-full w-full opacity-80"
      aria-hidden
    >
      <defs>
        <pattern id="pg-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="rgb(251 191 36 / 0.12)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="640" height="280" fill="url(#pg-grid)" />

      <path
        d="M170 90C230 90 230 70 290 70"
        fill="none"
        stroke="rgb(251 191 36 / 0.55)"
        strokeWidth="2"
      />
      <path
        d="M170 130C230 130 230 150 290 150"
        fill="none"
        stroke="rgb(96 165 250 / 0.55)"
        strokeWidth="2"
      />
      <path
        d="M410 70C470 70 470 110 530 110"
        fill="none"
        stroke="rgb(251 191 36 / 0.45)"
        strokeWidth="2"
      />
      <path
        d="M410 150C470 150 470 130 530 130"
        fill="none"
        stroke="rgb(167 139 250 / 0.5)"
        strokeWidth="2"
      />

      {[
        { x: 48, y: 70, w: 122, h: 80, title: "Button Pressed" },
        { x: 290, y: 40, w: 120, h: 70, title: "AND Gate" },
        { x: 290, y: 130, w: 120, h: 70, title: "Force Scale" },
        { x: 530, y: 85, w: 78, h: 70, title: "Impulse" },
      ].map((node) => (
        <g key={node.title}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="6"
            fill="#15171c"
            stroke="rgb(251 191 36 / 0.45)"
            strokeWidth="1.5"
          />
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height="22"
            rx="6"
            fill="rgb(251 191 36 / 0.12)"
          />
          <text
            x={node.x + 10}
            y={node.y + 15}
            fill="rgb(237 230 217 / 0.9)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            {node.title}
          </text>
          <circle cx={node.x} cy={node.y + 44} r="4" fill="#f5f5f5" />
          <circle
            cx={node.x + node.w}
            cy={node.y + 44}
            r="4"
            fill="rgb(251 191 36)"
          />
        </g>
      ))}
    </svg>
  );
}

export function NodeGraphPreview() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">Inside the editor</SectionLabel>}
          title="Wire. Validate. Compile."
          description="Click the preview to open a live Marrow Studio graph — pan, zoom, connect nodes, and inspect fields. Exit anytime to collapse it back."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!open ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <FacilityPanel
                  className="overflow-hidden p-0"
                  accentClassName="bg-studio"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-labelledby={titleId}
                    className={cn(
                      "group relative block w-full cursor-pointer text-left",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-studio/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2 sm:px-4">
                      <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                        CAM-01 // MARROW STUDIO
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.16em] text-studio">
                        PREVIEW
                      </span>
                    </div>

                    <div className="relative h-[240px] overflow-hidden bg-[#0d0d0d] sm:h-[280px] md:h-[320px]">
                      <div className="absolute inset-0 p-4 sm:p-6">
                        <PreviewGraphSketch />
                      </div>

                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent"
                      />

                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="max-w-sm rounded-sm border border-studio/45 bg-background/85 px-5 py-4 text-center shadow-[0_0_28px_rgb(var(--studio-glow)/0.2)] backdrop-blur-sm transition group-hover:border-studio group-hover:shadow-[0_0_36px_rgb(var(--studio-glow)/0.32)]">
                          <p
                            id={titleId}
                            className="font-display text-lg font-bold tracking-tight text-bone sm:text-xl"
                          >
                            Click to interact
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Open the live Studio playground — wire nodes, pan the
                            canvas, and try the inspector.
                          </p>
                          <span className="mt-3 inline-flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-studio">
                            <Maximize2 size={12} aria-hidden />
                            Enter editor
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </FacilityPanel>
              </motion.div>
            ) : (
              <motion.div
                key="playground"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.3 }}
              >
                <FacilityPanel
                  className="overflow-hidden p-0"
                  accentClassName="bg-studio"
                >
                  <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-background/60 px-3 py-2 sm:px-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                        CAM-01 // MARROW STUDIO
                      </span>
                      <span className="hidden font-mono text-[9px] tracking-[0.16em] text-studio sm:inline">
                        LIVE SESSION
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-studio/40 bg-studio/15 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-studio transition hover:border-studio hover:bg-studio/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-studio/60"
                    >
                      <X size={12} aria-hidden />
                      Exit interaction
                    </button>
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
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
