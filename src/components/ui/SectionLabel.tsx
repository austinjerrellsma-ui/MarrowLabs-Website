import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "neutral" | "hazard";
  className?: string;
}

const variantStyles = {
  ml: "border-ml/40 bg-ml/10 text-ml",
  hub: "border-hub/40 bg-hub/10 text-hub",
  studio: "border-studio/40 bg-studio/10 text-studio",
  hazard: "border-hazard/50 bg-hazard/10 text-hazard",
  neutral: "border-border bg-surface text-muted-foreground",
};

export function SectionLabel({
  children,
  variant = "neutral",
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1",
        "font-mono text-[11px] font-semibold uppercase tracking-[0.22em]",
        variantStyles[variant],
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 bg-current opacity-80"
        aria-hidden
      />
      {children}
    </span>
  );
}
