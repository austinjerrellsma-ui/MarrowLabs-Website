"use client";

import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Zap, Monitor, Cpu } from "lucide-react";

const DOCK_ITEMS = [
  {
    title: "MarrowLink",
    href: "/marrowlink",
    icon: <Zap className="h-full w-full text-ml" />,
  },
  {
    title: "MarrowLink Hub",
    href: "/hub",
    icon: <Monitor className="h-full w-full text-hub" />,
  },
  {
    title: "Marrow Studio",
    href: "/studio",
    icon: <Cpu className="h-full w-full text-studio" />,
  },
];

export function Nav() {
  return (
    <header className="pointer-events-none fixed top-0 inset-x-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hazard to-transparent opacity-80" aria-hidden />
      <nav className="pointer-events-auto mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-hazard/60 bg-hazard/20 shadow-[0_0_16px_rgb(var(--hazard)/0.35)]">
            <div className="h-3 w-3 animate-glow-pulse rounded-[1px] bg-hazard shadow-[0_0_8px_rgb(var(--hazard-glow)/0.8)]" />
          </div>
          <span className="hidden font-display text-base font-semibold tracking-tight text-bone transition-colors group-hover:text-hazard sm:inline">
            MarrowLabs
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-center">
          <FloatingDock items={DOCK_ITEMS} />
        </div>

        {/* Balance brand width so the dock stays visually centered on desktop */}
        <div
          className="hidden md:block w-[132px] shrink-0"
          aria-hidden
        />
      </nav>
    </header>
  );
}
