import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "white";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

/* Original color → slightly darker same hue (subtle, never black) */
const gradients = {
  ml: "from-violet-300 via-violet-400 to-violet-500",
  hub: "from-cyan-300 via-cyan-400 to-cyan-500",
  studio: "from-amber-300 via-amber-400 to-amber-500",
  white: "from-bone via-[#e4dccb] to-[#cfc5b0]",
};

export function GradientText({
  children,
  variant = "white",
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
