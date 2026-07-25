"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

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
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 text-center">
        <SectionLabel variant="studio" className="mb-4">
          Preview
        </SectionLabel>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Wire. Validate. Compile.
        </h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          A static illustration of a Marrow Studio graph — trigger into boolean
          and compute chains, then out to a physics action.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-studio/30 bg-surface"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(250 250 250 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(250 250 250 / 1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <svg
          viewBox="0 0 600 240"
          className="relative z-10 w-full h-auto"
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
                rx="10"
                fill="rgb(var(--surface-raised))"
                stroke={node.color}
                strokeOpacity="0.5"
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
      </motion.div>
    </section>
  );
}
