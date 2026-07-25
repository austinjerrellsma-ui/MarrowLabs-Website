import { Button } from "@/components/ui/button";
import { DOWNLOAD_URL, PRODUCTS } from "@/lib/constants";
import { Download } from "lucide-react";

const p = PRODUCTS.hub;

export function DownloadBlock() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--hub-glow) / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Get the Hub
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          {p.tagline} Download the Windows installer and let the Hub handle the
          rest.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 text-base bg-hub text-primary-foreground hover:bg-hub/90">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              Download Hub for Windows
            </a>
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted font-mono tracking-wide uppercase">
          Free · Windows 10+ · No account for Stable
        </p>
      </div>
    </section>
  );
}
