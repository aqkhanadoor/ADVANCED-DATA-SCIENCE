import { useMemo } from "react";
import { cn } from "@/lib/cn";

export interface MatrixVisualizerProps {
  matrix: number[][];
  /** "heatmap" colors by magnitude; "sparsity" only marks non-zeros. */
  mode?: "heatmap" | "sparsity";
  showValues?: boolean;
  rowLabels?: string[];
  colLabels?: string[];
  ariaLabel: string;
}

/**
 * Visualizes a matrix as a colored grid — useful for reading a Hessian's
 * curvature (heatmap) or appreciating sparsity (non-zero pattern).
 */
export function MatrixVisualizer({
  matrix,
  mode = "heatmap",
  showValues = true,
  rowLabels,
  colLabels,
  ariaLabel,
}: MatrixVisualizerProps) {
  const maxAbs = useMemo(() => {
    let m = 0;
    for (const row of matrix) for (const v of row) m = Math.max(m, Math.abs(v));
    return m || 1;
  }, [matrix]);

  const cols = matrix[0]?.length ?? 0;

  return (
    <div className="overflow-x-auto" role="img" aria-label={ariaLabel}>
      <div className="inline-block">
        {colLabels ? (
          <div
            className="grid gap-1 pl-8"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(2.5rem, 1fr))` }}
          >
            {colLabels.map((c) => (
              <div key={c} className="pb-1 text-center text-xs text-muted-foreground">
                {c}
              </div>
            ))}
          </div>
        ) : null}
        <div className="space-y-1">
          {matrix.map((row, r) => (
            <div key={r} className="flex items-center gap-1">
              {rowLabels ? (
                <div className="w-7 text-right text-xs text-muted-foreground">
                  {rowLabels[r]}
                </div>
              ) : null}
              <div
                className="grid flex-1 gap-1"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(2.5rem, 1fr))` }}
              >
                {row.map((value, c) => {
                  const nonZero = Math.abs(value) > 1e-9;
                  const intensity = Math.abs(value) / maxAbs;
                  const positive = value >= 0;
                  const bg =
                    mode === "sparsity"
                      ? nonZero
                        ? "rgba(99,102,241,0.85)"
                        : "transparent"
                      : nonZero
                        ? positive
                          ? `rgba(99,102,241,${0.15 + 0.75 * intensity})`
                          : `rgba(244,63,94,${0.15 + 0.75 * intensity})`
                        : "transparent";
                  return (
                    <div
                      key={c}
                      className={cn(
                        "flex aspect-square items-center justify-center rounded border text-xs font-mono tabular-nums",
                        !nonZero && "border-dashed text-muted-foreground/50",
                      )}
                      style={{ backgroundColor: bg }}
                      title={`(${r + 1}, ${c + 1}) = ${value}`}
                    >
                      {showValues
                        ? Number.isInteger(value)
                          ? value
                          : value.toFixed(1)
                        : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
