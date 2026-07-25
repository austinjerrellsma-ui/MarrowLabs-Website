"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
  accentRail?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "var(--ml-glow)",
  interactive = true,
  accentRail,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !interactive) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "facility-panel relative overflow-hidden rounded-sm border border-border bg-surface p-5 sm:p-6",
        "transition-colors duration-300",
        className,
      )}
      whileHover={interactive ? { borderColor: `${glowColor}70` } : undefined}
    >
      {accentRail ? (
        <span
          className={cn("absolute left-0 top-0 h-full w-[3px]", accentRail)}
          aria-hidden
        />
      ) : null}
      <span className="facility-corner facility-corner-tl" aria-hidden />
      <span className="facility-corner facility-corner-tr" aria-hidden />
      <span className="facility-corner facility-corner-bl" aria-hidden />
      <span className="facility-corner facility-corner-br" aria-hidden />
      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${glowColor}22, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
