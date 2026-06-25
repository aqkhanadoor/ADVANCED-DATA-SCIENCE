import { useMemo } from "react";
import { renderMathToString } from "@/lib/math";
import { cn } from "@/lib/cn";

interface InlineMathProps {
  /** TeX source without delimiters, e.g. "\\nabla f(x)". */
  children: string;
  className?: string;
  /** Accessible description; defaults to the raw TeX. */
  ariaLabel?: string;
}

/**
 * Render inline mathematics with KaTeX.
 */
export function InlineMath({ children, className, ariaLabel }: InlineMathProps) {
  const html = useMemo(
    () => renderMathToString(children, { displayMode: false }),
    [children],
  );

  return (
    <span
      className={cn("katex-inline", className)}
      role="math"
      aria-label={ariaLabel ?? children}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
