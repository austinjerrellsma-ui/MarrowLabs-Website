"use client";

import { motion } from "framer-motion";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FacilityCoreCard } from "@/components/ui/FacilityCoreCard";
import "./studio-ui-editor.css";

const CAPABILITIES = [
  {
    code: "UI-01",
    title: "Mod UI Canvas",
    body: "Design full in-headset interfaces for your powers — wrist menus, readouts, and overlays laid out on a facility canvas that maps straight into BONELAB.",
  },
  {
    code: "UI-02",
    title: "Keyframe Motion",
    body: "Animate any property on a timeline. Set keys for position, opacity, scale, and color, then scrub and refine until the UI feels alive.",
  },
  {
    code: "UI-03",
    title: "Element Library",
    body: "Drop in ready elements — buttons, text boxes, sliders, panels, icons — then restyle colors, type, and states to match your mod’s look.",
  },
  {
    code: "UI-04",
    title: "Custom Elements",
    body: "Compose your own widgets from primitives, save them to your library, and reuse them across every power package you author.",
  },
] as const;

const ELEMENTS = [
  { id: "btn", label: "Button", active: true },
  { id: "txt", label: "Text Box", active: false },
  { id: "sld", label: "Slider", active: false },
  { id: "pnl", label: "Panel", active: false },
  { id: "ico", label: "Icon", active: false },
  { id: "cst", label: "Custom", active: false },
] as const;

const KEYFRAMES = [
  { t: "0%", label: "0f" },
  { t: "28%", label: "12f" },
  { t: "55%", label: "24f" },
  { t: "82%", label: "36f" },
] as const;

export function StudioUiEditor() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 sm:py-24">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">UI Forge</SectionLabel>}
          title="A full UI editor for your mod."
          description="Build the interface your powers need — place elements, keyframe their motion, customize every state, and invent widgets that only your mod can ship."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="mb-10 md:mb-12"
        >
          <FacilityPanel className="overflow-hidden p-0" accentClassName="bg-studio">
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2.5 sm:px-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                  FORGE // UI EDITOR
                </span>
                <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-studio sm:inline-flex">
                  <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-studio" />
                  Timeline Armed
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.16em] text-studio">
                LAYOUT + KEYS
              </span>
            </div>

            <div className="studio-ui-editor relative grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(251 191 36 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(251 191 36 / 1) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Element palette + brief */}
              <div className="relative z-10 flex flex-col border-b border-border lg:border-b-0 lg:border-r">
                <div className="border-b border-border px-4 py-4 sm:px-5 sm:py-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-studio">
                    Editor Brief
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-bone sm:text-[1.7rem]">
                    Layout. Animate. Own every pixel.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    Design mod UIs on a live canvas, drive them with a keyframe
                    timeline, pick from a library of elements, customize each
                    one — or forge a custom element and drop it into every
                    package.
                  </p>
                </div>

                <div className="flex-1 p-4 sm:p-5">
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Element Bay
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {ELEMENTS.map((el) => (
                      <div
                        key={el.id}
                        className={
                          el.active
                            ? "rounded-sm border border-studio/50 bg-studio/15 px-3 py-2.5"
                            : "rounded-sm border border-border bg-background/55 px-3 py-2.5"
                        }
                      >
                        <p
                          className={
                            el.active
                              ? "font-mono text-[10px] uppercase tracking-[0.14em] text-studio"
                              : "font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                          }
                        >
                          {el.id}
                        </p>
                        <p className="mt-1 text-sm text-bone">{el.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-studio">
                    <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-studio" />
                    System Nominal
                  </div>
                </div>
              </div>

              {/* Canvas + timeline */}
              <div className="relative z-10 flex min-h-[420px] flex-col sm:min-h-[480px]">
                <div className="flex items-center justify-between border-b border-border bg-background/40 px-3 py-2 sm:px-4">
                  <span className="font-mono text-[9px] tracking-[0.16em] text-muted">
                    CANVAS // WRIST MENU
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.14em] text-studio">
                    SEL: Button · Primary
                  </span>
                </div>

                <div className="relative flex-1 p-4 sm:p-6">
                  {/* Mock UI stage */}
                  <div className="studio-ui-stage relative mx-auto flex h-full min-h-[220px] max-w-md flex-col justify-center gap-3 rounded-sm border border-studio/30 bg-background/70 p-4 sm:min-h-[260px] sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-studio">
                        Power Deck
                      </span>
                      <span className="font-mono text-[9px] text-muted">v0.4</span>
                    </div>

                    <div className="studio-ui-selected rounded-sm border border-studio bg-studio/20 px-3 py-2.5 text-center font-mono text-xs uppercase tracking-[0.14em] text-bone shadow-[0_0_18px_rgb(var(--studio-glow)/0.25)]">
                      Engage Pull
                    </div>

                    <div className="rounded-sm border border-border bg-surface/80 px-3 py-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                        Status Readout
                      </p>
                      <p className="mt-1 text-sm text-bone">Charge 78% · Ready</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-border">
                        <div className="h-full w-[68%] bg-studio" />
                      </div>
                      <span className="font-mono text-[9px] text-studio">68</span>
                    </div>

                    {/* Selection handles */}
                    <span
                      className="absolute -left-1 -top-1 h-2.5 w-2.5 border border-studio bg-background"
                      aria-hidden
                    />
                    <span
                      className="absolute -right-1 -top-1 h-2.5 w-2.5 border border-studio bg-background"
                      aria-hidden
                    />
                    <span
                      className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border border-studio bg-background"
                      aria-hidden
                    />
                    <span
                      className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border border-studio bg-background"
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Keyframe timeline */}
                <div className="border-t border-border bg-background/50 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Keyframe Timeline · Opacity / Scale
                    </p>
                    <p className="font-mono text-[9px] text-studio">24f / 48f</p>
                  </div>
                  <div className="studio-ui-timeline relative h-10 rounded-sm border border-border bg-surface/90">
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[55%] bg-studio/10"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-y-2 left-0 right-0 border-t border-dashed border-studio/25"
                      style={{ top: "50%" }}
                    />
                    {KEYFRAMES.map((kf) => (
                      <span
                        key={kf.label}
                        className="studio-ui-key"
                        style={{ left: kf.t }}
                        title={kf.label}
                      >
                        <span className="studio-ui-key-dot" />
                        <span className="studio-ui-key-label">{kf.label}</span>
                      </span>
                    ))}
                    <span
                      className="studio-ui-playhead"
                      style={{ left: "55%" }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </FacilityPanel>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="min-h-[300px]"
            >
              <FacilityCoreCard
                code={cap.code}
                title={cap.title}
                body={cap.body}
                status="System Nominal"
                accent="studio"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
