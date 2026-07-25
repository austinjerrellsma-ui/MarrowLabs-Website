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
  role?: string;
  highlights?: readonly string[];
  stats?: readonly { label: string; value: string }[];
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
  role = "MODULE",
  highlights = [],
  stats = [],
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
              <div className="ht-top-meta">
                <span className="ht-code">{code}</span>
                <span className="ht-role">{role}</span>
              </div>
            </div>

            <div className="ht-mid">
              {stats.length > 0 ? (
                <div className="ht-stats">
                  {stats.map((stat) => (
                    <div key={stat.label} className="ht-stat">
                      <span className="ht-stat-value">{stat.value}</span>
                      <span className="ht-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {highlights.length > 0 ? (
                <ul className="ht-highlights">
                  {highlights.map((item) => (
                    <li key={item}>
                      <span className="ht-bullet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
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
