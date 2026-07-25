"use client";

import { cn } from "@/lib/utils";
import "./facility-core-card.css";

const TRACKERS = Array.from({ length: 9 }, (_, i) => i + 1);

type Accent = "hazard" | "ml" | "hub" | "studio";

type FacilityCoreCardProps = {
  code: string;
  title: string;
  body: string;
  status?: string;
  accent?: Accent;
  className?: string;
};

/** From Uiverse.io by 3HugaDa3 — BONELAB facility core capability card */
export function FacilityCoreCard({
  code,
  title,
  body,
  status = "System Nominal",
  accent = "hazard",
  className,
}: FacilityCoreCardProps) {
  return (
    <div
      className={cn("fc-wrapper", className)}
      data-accent={accent}
    >
      {TRACKERS.map((n) => (
        <div
          key={n}
          className={cn("fc-tracker", `fc-tr-${n}`)}
          aria-hidden
        />
      ))}

      <div className="fc-card">
        <div className="fc-corner fc-tl" aria-hidden />
        <div className="fc-corner fc-tr" aria-hidden />
        <div className="fc-corner fc-bl" aria-hidden />
        <div className="fc-corner fc-br" aria-hidden />

        <div className="fc-content">
          <div className="fc-cap">{code}</div>
          <h3 className="fc-title fc-glitch" data-text={title}>
            {title}
          </h3>
          <p className="fc-body">{body}</p>
          <div className="fc-status">
            <span className="fc-status-dot" aria-hidden />
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}
