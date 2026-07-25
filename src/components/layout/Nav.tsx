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
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 pt-4 sm:px-6">
        <Link
          href="/"
          className="mt-2 flex items-center gap-2.5 group shrink-0"
        >
          <div className="h-7 w-7 rounded-lg bg-ml/20 border border-ml/30 flex items-center justify-center">
            <div className="h-3 w-3 rounded-sm bg-ml animate-glow-pulse" />
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-foreground group-hover:text-ml transition-colors hidden sm:inline">
            MarrowLabs
          </span>
        </Link>

        <div className="flex-1 flex justify-center md:justify-center">
          <FloatingDock items={DOCK_ITEMS} mobileClassName="ml-auto" />
        </div>

        {/* Spacer to balance the brand on desktop so the dock stays visually centered */}
        <div className="hidden sm:block w-[140px] shrink-0" aria-hidden />
      </div>
    </header>
  );
}
