import { cn } from "@/lib/utils";

interface FacilityBackdropProps {
  className?: string;
  accent?: "hazard" | "ml" | "hub" | "studio";
  showStripes?: boolean;
}

const accentGlow: Record<NonNullable<FacilityBackdropProps["accent"]>, string> =
  {
    hazard: "rgb(var(--hazard) / 0.16)",
    ml: "rgb(var(--ml-glow) / 0.16)",
    hub: "rgb(var(--hub-glow) / 0.16)",
    studio: "rgb(var(--studio-glow) / 0.16)",
  };

/** Shared BONELAB void-facility atmosphere for sections */
export function FacilityBackdrop({
  className,
  accent = "hazard",
  showStripes = true,
}: FacilityBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-24 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${accentGlow[accent]} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(237 230 217 / 1) 1px, transparent 1px), linear-gradient(90deg, rgb(237 230 217 / 1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgb(6 6 8 / 0.85) 100%)",
        }}
      />
      {showStripes && (
        <>
          <div className="absolute top-0 inset-x-0 h-1 hazard-stripe opacity-70" />
          <div className="absolute bottom-0 inset-x-0 h-1 hazard-stripe opacity-40" />
        </>
      )}
    </div>
  );
}

interface FacilityPanelProps {
  children: React.ReactNode;
  className?: string;
  accentClassName?: string;
}

/** Industrial panel with corner brackets + left hazard rail */
export function FacilityPanel({
  children,
  className,
  accentClassName = "bg-hazard",
}: FacilityPanelProps) {
  return (
    <div
      className={cn(
        "facility-panel relative overflow-hidden rounded-sm border border-border bg-surface/90",
        className,
      )}
    >
      <span
        className={cn("absolute left-0 top-0 h-full w-[3px]", accentClassName)}
        aria-hidden
      />
      <span className="facility-corner facility-corner-tl" aria-hidden />
      <span className="facility-corner facility-corner-tr" aria-hidden />
      <span className="facility-corner facility-corner-bl" aria-hidden />
      <span className="facility-corner facility-corner-br" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface FacilityHeaderProps {
  label: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function FacilityHeader({
  label,
  title,
  description,
  className,
  align = "left",
}: FacilityHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-10",
        align === "center" && "text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        {label}
        <span
          className="hidden h-px flex-1 max-w-[140px] bg-gradient-to-r from-hazard/50 to-transparent sm:block"
          aria-hidden
        />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
