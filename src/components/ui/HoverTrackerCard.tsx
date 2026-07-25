"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import "./hover-tracker-card.css";

const TRACKERS = Array.from({ length: 25 }, (_, i) => i + 1);

type Accent = "ml" | "hub" | "studio";

type HoverTrackerCardProps = {
  href: string;
  name: string;
  tagline: string;
  description: string;
  accent: Accent;
  icon: LucideIcon;
  className?: string;
};

/** From Uiverse.io by kennyotsu — BONELAB product tilt card */
export function HoverTrackerCard({
  href,
  name,
  tagline,
  description,
  accent,
  icon: Icon,
  className,
}: HoverTrackerCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "ht-container ht-noselect block",
        className,
      )}
      data-accent={accent}
      aria-label={`Open ${name} dossier`}
    >
      <div className="ht-canvas">
        {TRACKERS.map((n) => (
          <div
            key={n}
            className={cn("ht-tracker", `ht-tr-${n}`)}
            aria-hidden
          />
        ))}

        <div className="ht-card">
          <div className="ht-icon" aria-hidden>
            <Icon size={18} />
          </div>
          <p className="ht-prompt">Hover // Inspect</p>
          <div className="ht-title">
            <div className="ht-title-name">{name}</div>
            <div className="ht-title-tag">{tagline}</div>
            <p className="ht-title-body">{description}</p>
            <div className="ht-title-cta">Open dossier →</div>
          </div>
          <div className="ht-subtitle">{name}</div>
        </div>
      </div>
    </Link>
  );
}
