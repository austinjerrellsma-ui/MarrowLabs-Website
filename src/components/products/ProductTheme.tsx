import { cn } from "@/lib/utils";
import "./product-theme.css";

type ProductAccent = "ml" | "hub" | "studio";

/**
 * Scopes facility chrome tokens to the active product accent so shared
 * components (buttons, panels, corners, CTA strips) follow section theme.
 */
export function ProductTheme({
  accent,
  children,
  className,
}: {
  accent: ProductAccent;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("product-theme", className)} data-accent={accent}>
      {children}
    </div>
  );
}
