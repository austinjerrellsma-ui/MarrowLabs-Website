"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FacilityBackdrop,
  FacilityHeader,
  FacilityPanel,
} from "@/components/ui/FacilityChrome";

const NODES = [
  {
    id: "trigger",
    label: "On Grip",
    type: "Trigger",
    x: 40,
    y: 80,
    color: "rgb(var(--studio-primary))",
  },
  {
    id: "bool",
    label: "AND Gate",
    type: "Boolean",
    x: 220,
    y: 40,
    color: "rgb(var(--hub-primary))",
  },
  {
    id: "compute",
    label: "Force Scale",
    type: "Compute",
    x: 220,
    y: 140,
    color: "rgb(var(--ml-primary))",
  },
  {
    id: "action",
    label: "Apply Impulse",
    type: "Action",
    x: 420,
    y: 90,
    color: "rgb(var(--studio-glow))",
  },
] as const;

const EDGES = [
  { from: "trigger", to: "bool", fromPort: "right", toPort: "left" },
  { from: "trigger", to: "compute", fromPort: "right", toPort: "left" },
  { from: "bool", to: "action", fromPort: "right", toPort: "left" },
  { from: "compute", to: "action", fromPort: "right", toPort: "left" },
] as const;

function nodeCenter(id: string, side: "left" | "right") {
  const node = NODES.find((n) => n.id === id)!;
  const w = 140;
  const h = 56;
  return {
    x: side === "left" ? node.x : node.x + w,
    y: node.y + h / 2,
  };
}

export function NodeGraphPreview() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <FacilityBackdrop accent="studio" showStripes={false} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FacilityHeader
          label={<SectionLabel variant="studio">Telemetry</SectionLabel>}
          title="Wire. Validate. Compile."
          description="A facility schematic of a Marrow Studio graph — trigger into boolean and compute chains, then out to a physics action."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <FacilityPanel className="overflow-hidden p-0" accentClassName="bg-studio">
            <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2">
              <span className="font-mono text-[9px] tracking-[0.18em] text-muted">
                CAM-01 // GRAPH PREVIEW
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-hazard">
                REC ●
              </span>
            </div>
            <div className="relative bg-surface">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06] facility-scanlines"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(237 230 217 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(237 230 217 / 1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <svg
                viewBox="0 0 600 240"
                className="relative z-10 h-auto w-full"
                role="img"
                aria-label="Illustration of a Marrow Studio node graph connecting Trigger, Boolean, Compute, and Action nodes"
              >
                {EDGES.map((edge) => {
                  const a = nodeCenter(edge.from, "right");
                  const b = nodeCenter(edge.to, "left");
                  const midX = (a.x + b.x) / 2;
                  return (
                    <path
                      key={`${edge.from}-${edge.to}`}
                      d={`M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`}
                      fill="none"
                      stroke="rgb(var(--studio-primary) / 0.45)"
                      strokeWidth="2"
                    />
                  );
                })}

                {NODES.map((node) => (
                  <g key={node.id}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width="140"
                      height="56"
                      rx="2"
                      fill="rgb(var(--surface-raised))"
                      stroke={node.color}
                      strokeOpacity="0.55"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y + 28}
                      r="4"
                      fill={node.color}
                      opacity="0.8"
                    />
                    <circle
                      cx={node.x + 140}
                      cy={node.y + 28}
                      r="4"
                      fill={node.color}
                      opacity="0.8"
                    />
                    <text
                      x={node.x + 16}
                      y={node.y + 22}
                      fill="rgb(var(--muted-foreground))"
                      fontSize="9"
                      fontFamily="ui-monospace, monospace"
                      letterSpacing="0.08em"
                    >
                      {node.type.toUpperCase()}
                    </text>
                    <text
                      x={node.x + 16}
                      y={node.y + 40}
                      fill="rgb(var(--foreground))"
                      fontSize="13"
                      fontFamily="system-ui, sans-serif"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </FacilityPanel>
        </motion.div>
      </div>
    </section>
  );
}
