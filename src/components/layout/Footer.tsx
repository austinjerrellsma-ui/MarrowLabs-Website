import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display font-semibold text-foreground">
              MarrowLabs
            </p>
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              Building BONELAB modding tools — MarrowLink, Hub, and Marrow
              Studio.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} MarrowLabs. Not affiliated with Stress
            Level Zero.
          </p>
          <p className="font-mono">
            BONELAB is a trademark of Stress Level Zero.
          </p>
        </div>
      </div>
    </footer>
  );
}
