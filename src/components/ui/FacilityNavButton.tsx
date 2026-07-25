"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import "./facility-nav-button.css";

type Accent = "hazard" | "ml" | "hub" | "studio";

type FacilityNavButtonProps = {
  href: string;
  children: React.ReactNode;
  accent?: Accent;
  active?: boolean;
  className?: string;
};

/** From Uiverse.io by adamgiebl — BONELAB facility nav button */
export function FacilityNavButton({
  href,
  children,
  accent = "hazard",
  active = false,
  className,
}: FacilityNavButtonProps) {
  return (
    <Link
      href={href}
      data-accent={accent}
      data-active={active ? "true" : "false"}
      className={cn("facility-nav-btn", className)}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
