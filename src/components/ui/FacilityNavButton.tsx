"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import "./facility-nav-button.css";

type FacilityNavButtonProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

/** From Uiverse.io by adamgiebl — equal-width facility bar button */
export function FacilityNavButton({
  href,
  children,
  active = false,
  className,
}: FacilityNavButtonProps) {
  return (
    <Link
      href={href}
      data-active={active ? "true" : "false"}
      className={cn("facility-nav-btn", className)}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
