"use client";

import { motion } from "framer-motion";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FacilityCoreCard } from "@/components/ui/FacilityCoreCard";
import "./studio-ai-coach.css";

const CAPABILITIES = [
  {
    code: "AI-01",
    title: "Teach the Graph",
    body: "Ask how any node works — ports, impulse flow, type rules — and get a clear walkthrough before you wire a single cable.",
  },
  {
    code: "AI-02",
    title: "Node Briefings",
    body: "Hover a node or name it in chat. The coach explains inputs, outputs, and when to reach for it instead of another primitive.",
  },
  {
    code: "AI-03",
    title: "Build From Prompt",
    body: "Describe the power you want — “slow-mo slam on grip” — and get a step-by-step node recipe you can assemble in Studio.",
  },
] as const;

const THREAD = [
  {
    role: "user" as const,
    text: "How do I make a grip-triggered pull?",
  },
  {
    role: "ai" as const,
    text: "Start with On Grip → Force Scale → Apply Impulse. Wire the grip impulse into Force Scale, set direction from your hand forward, then send the scaled vector into Apply Impulse on the target rigidbody.",
  },
  {
    role: "user" as const,
    text: "What does Force Scale actually do?",
  },
  {
    role: "ai" as const,
    text: "Force Scale is a Compute node. It takes a Vector3 and a Number multiplier, then outputs the scaled force. Use it when your trigger is correct but the physics hit needs tuning.",
  },
] as const;

export function StudioAiCoach() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">Node Coach</SectionLabel>}
          title="An AI that teaches the graph."
          description="Learn every node, understand every port, and ask how to build a power — Studio’s coach walks you from question to working wire."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <FacilityPanel className="overflow-hidden p-0" accentClassName="bg-studio">
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2 sm:px-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                  COACH // STUDIO AI
                </span>
                <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-studio sm:inline-flex">
                  <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-studio" />
                  Online
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.16em] text-studio">
                GRAPH AWARE
              </span>
            </div>

            <div className="studio-ai-coach relative grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(251 191 36 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(251 191 36 / 1) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative z-10 flex flex-col border-b border-border lg:border-b-0 lg:border-r">
                <div className="flex-1 space-y-3 p-4 sm:p-5">
                  {THREAD.map((msg, i) => (
                    <motion.div
                      key={`${msg.role}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.35 }}
                      className={
                        msg.role === "user"
                          ? "ml-auto max-w-[92%] sm:max-w-[85%]"
                          : "mr-auto max-w-[94%] sm:max-w-[90%]"
                      }
                    >
                      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        {msg.role === "user" ? "Author" : "Node Coach"}
                      </p>
                      <div
                        className={
                          msg.role === "user"
                            ? "rounded-sm border border-studio/35 bg-studio/10 px-3 py-2.5 text-sm leading-relaxed text-bone"
                            : "rounded-sm border border-border bg-background/70 px-3 py-2.5 text-sm leading-relaxed text-muted-foreground"
                        }
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 border-t border-border bg-background/50 p-3 sm:p-4">
                  <div className="flex items-center gap-2 rounded-sm border border-studio/40 bg-surface px-3 py-2.5">
                    <span className="font-mono text-[10px] text-studio">›</span>
                    <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground sm:text-xs">
                      Ask how to build a power, or explain a node…
                    </span>
                    <span className="shrink-0 rounded-sm bg-studio/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-studio">
                      Send
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col justify-between gap-6 p-4 sm:p-5 lg:p-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-studio">
                    Session Brief
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
                    Learn nodes. Ask for builds.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The coach sits beside your graph. It can teach Studio from
                    scratch, brief any node you point at, and turn a plain
                    English idea into a concrete node recipe.
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    "Explain ports, types, and impulse flow",
                    "Walk through example graphs step by step",
                    "Answer “how do I make…” with a build plan",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-bone"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-studio shadow-[0_0_10px_rgb(var(--studio-glow)/0.65)]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-studio">
                  <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-studio" />
                  System Nominal
                </div>
              </div>
            </div>
          </FacilityPanel>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="min-h-[280px]"
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
