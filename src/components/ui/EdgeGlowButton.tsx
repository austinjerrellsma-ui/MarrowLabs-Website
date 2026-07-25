"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface EdgeGlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/** From Uiverse.io by SelfMadeSystem */
export function EdgeGlowButton({
  children,
  className,
  type = "button",
  ...props
}: EdgeGlowButtonProps) {
  const filterId = `unopaq-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={cn("edge-glow-wrap", className)}
      style={{ ["--unopaq" as string]: `url(#${filterId})` }}
    >
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <filter
          width="3000%"
          x="-1000%"
          height="3000%"
          y="-1000%"
          id={filterId}
        >
          <feColorMatrix
            values="1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0"
          />
        </filter>
      </svg>

      <div className="edge-glow-backdrop" aria-hidden />

      <button type={type} className="edge-glow-button" {...props}>
        <div className="a l" aria-hidden />
        <div className="a r" aria-hidden />
        <div className="a t" aria-hidden />
        <div className="a b" aria-hidden />
        <div className="text">{children}</div>
      </button>
    </div>
  );
}
