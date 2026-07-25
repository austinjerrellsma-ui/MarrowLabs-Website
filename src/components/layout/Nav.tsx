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
      <nav className="pointer-events-auto mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="h-7 w-7 rounded-sm bg-hazard/15 border border-hazard/40 flex items-center justify-center">
            <div className="h-3 w-3 rounded-[1px] bg-hazard animate-glow-pulse" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-bone group-hover:text-hazard transition-colors hidden sm:inline">
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
