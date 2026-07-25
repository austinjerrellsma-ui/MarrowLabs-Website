import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "neutral";
  className?: string;
}

const variantStyles = {
  ml: "border-ml/30 bg-ml/10 text-ml",
  hub: "border-hub/30 bg-hub/10 text-hub",
  studio: "border-studio/30 bg-studio/10 text-studio",
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
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
        "font-mono text-xs font-medium uppercase tracking-widest",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
