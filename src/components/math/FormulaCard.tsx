import { cn } from "@/lib/cn";
import { BlockMath } from "@/components/math/BlockMath";

interface FormulaCardProps {
  tex: string;
  /** Short label shown above the formula. */
  label?: string;
  /** A "(3.1)"-style number rendered on the right, like a textbook. */
  number?: string | number;
  /** Optional explanatory caption below the formula. */
  caption?: string;
  className?: string;
}

/**
 * A textbook-style, numbered-looking formula box.
 */
export function FormulaCard({
  tex,
  label,
  number,
  caption,
  className,
}: FormulaCardProps) {
  return (
    <figure
      className={cn(
        "my-5 overflow-hidden rounded-xl border bg-card shadow-sm",
        className,
      )}
    >
      {label ? (
        <div className="border-b bg-muted/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
      ) : null}
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <BlockMath className="my-1">{tex}</BlockMath>
        </div>
        {number !== undefined ? (
          <span className="shrink-0 font-mono text-sm text-muted-foreground tabular-nums">
            ({number})
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="border-t bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
