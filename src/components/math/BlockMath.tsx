import { useMemo } from "react";
import { renderMathToString } from "@/lib/math";
import { cn } from "@/lib/cn";

interface BlockMathProps {
  /** TeX source without delimiters. */
  children: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Render display (block) mathematics with KaTeX, centered and scrollable on
 * small screens.
 */
export function BlockMath({ children, className, ariaLabel }: BlockMathProps) {
  const html = useMemo(
    () => renderMathToString(children, { displayMode: true }),
    [children],
  );

  return (
    <div
      className={cn("my-4 w-full", className)}
      role="math"
      aria-label={ariaLabel ?? children}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
