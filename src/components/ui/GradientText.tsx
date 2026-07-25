import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "white";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

const gradients = {
  ml: "from-violet-300 via-bone to-violet-200",
  hub: "from-cyan-300 via-bone to-sky-200",
  studio: "from-amber-300 via-bone to-yellow-100",
  white: "from-bone via-[#f5f0e6] to-[#c8bfae]",
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
