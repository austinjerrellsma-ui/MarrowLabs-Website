"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface EdgeGlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/** From Uiverse.io by SelfMadeSystem — filter applied inline so the glow actually renders */
export function EdgeGlowButton({
  children,
  className,
  type = "button",
  ...props
}: EdgeGlowButtonProps) {
  const filterId = `unopaq-${useId().replace(/:/g, "")}`;
  const filterCss = `blur(4px) url(#${filterId})`;
  const filterHoverCss = `blur(10px) url(#${filterId})`;

  return (
    <div className={cn("edge-glow-wrap", className)}>
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <filter
            id={filterId}
            x="-1000%"
            y="-1000%"
            width="3000%"
            height="3000%"
          >
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="edge-glow-backdrop" aria-hidden />

      <button type={type} className="edge-glow-button" {...props}>
        {(["l", "r", "t", "b"] as const).map((side) => (
          <div key={side} className={`a ${side}`} aria-hidden>
            <span
              className="a-glow"
              style={{ filter: filterCss }}
            />
            <span
              className="a-glow-hover"
              style={{ filter: filterHoverCss }}
            />
          </div>
        ))}
        <div className="text">{children}</div>
      </button>
    </div>
  );
}
