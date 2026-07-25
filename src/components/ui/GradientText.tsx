import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "white";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

/* Soft near-solid fills — gradient is barely perceptible */
const gradients = {
  ml: "from-bone via-[#e8e0f4] to-bone",
  hub: "from-bone via-[#dfeef0] to-bone",
  studio: "from-bone via-[#f0e8d4] to-bone",
  white: "from-bone via-[#f2ebe0] to-[#e8e0d2]",
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
