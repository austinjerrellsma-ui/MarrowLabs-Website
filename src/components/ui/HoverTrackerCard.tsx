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
  accent: Accent;
  icon: LucideIcon;
  code?: string;
  className?: string;
};

/** From Uiverse.io by kennyotsu — BONELAB product tilt card */
export function HoverTrackerCard({
  href,
  name,
  tagline,
  accent,
  icon: Icon,
  code = "MOD",
  className,
}: HoverTrackerCardProps) {
  return (
    <Link
      href={href}
      className={cn("ht-container ht-noselect block", className)}
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
          <div className="ht-face">
            <div className="ht-top">
              <div className="ht-icon" aria-hidden>
                <Icon size={18} />
              </div>
              <span className="ht-code">{code}</span>
            </div>

            <div className="ht-body">
              <h3 className="ht-name">{name}</h3>
              <p className="ht-tag">{tagline}</p>
              <div className="ht-rule" aria-hidden />
              <span className="ht-cta">Open dossier →</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
