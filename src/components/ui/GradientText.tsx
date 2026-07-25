import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "ml" | "hub" | "studio" | "white";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

const gradients = {
  ml: "from-violet-400 via-violet-300 to-purple-200",
  hub: "from-cyan-400 via-cyan-300 to-sky-200",
  studio: "from-amber-400 via-amber-300 to-yellow-200",
  white: "from-white via-zinc-100 to-zinc-300",
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
