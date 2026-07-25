import { Button } from "@/components/ui/button";
import { DOWNLOAD_URL } from "@/lib/constants";
import { Download } from "lucide-react";

export function CtaStrip() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div className="absolute top-0 inset-x-0 h-1 hazard-stripe opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--hazard) / 0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-bone sm:text-5xl">
          Ready to play?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          Download the MarrowLink Hub — it handles installation, updates, and
          channel access for you. Free. No account required for stable builds.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 text-base font-mono uppercase tracking-wider rounded-sm"
          >
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              Download the Hub for Windows
            </a>
          </Button>
        </div>
        <p className="mt-5 text-[11px] text-muted font-mono tracking-[0.2em] uppercase">
          Requires Windows 10+ · MelonLoader · BoneLib
        </p>
      </div>
    </section>
  );
}
