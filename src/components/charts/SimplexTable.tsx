import { cn } from "@/lib/cn";

export interface SimplexTableProps {
  /** Column headers (variables + RHS). */
  columns: string[];
  /** Row labels (basis variables / objective). */
  rowLabels: string[];
  /** Numeric tableau, rows × columns. */
  rows: number[][];
  /** Optional pivot cell to highlight as [rowIndex, colIndex]. */
  pivot?: [number, number];
  /** Optional pivot column index (entering variable column). */
  pivotColumn?: number;
  /** Optional pivot row index (leaving variable row). */
  pivotRow?: number;
  caption?: string;
}

/**
 * Renders a simplex tableau as an accessible table, optionally highlighting the
 * pivot column, row, and element. Meaning is conveyed via rings/labels, not color alone.
 */
export function SimplexTable({
  columns,
  rowLabels,
  rows,
  pivot,
  pivotColumn,
  pivotRow,
  caption,
}: SimplexTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {caption ? (
          <caption className="mb-2 text-left text-sm text-muted-foreground">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            <th className="border-b px-3 py-2 text-left font-semibold" scope="col">
              Basis
            </th>
            {columns.map((c, colIdx) => (
              <th
                key={c}
                scope="col"
                className={cn(
                  "border-b px-3 py-2 text-right font-mono font-semibold",
                  pivotColumn === colIdx && "bg-amber-500/15",
                )}
              >
                {pivotColumn === colIdx ? (
                  <span className="sr-only">pivot column: </span>
                ) : null}
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => {
            const isObjective = r === rows.length - 1;
            const isPivotRow = pivotRow === r;
            return (
              <tr
                key={r}
                className={cn(
                  isObjective && "bg-muted/50 font-medium",
                  isPivotRow && !isObjective && "bg-sky-500/10",
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    "border-b px-3 py-2 text-left font-mono font-semibold",
                    isPivotRow && "bg-sky-500/15",
                  )}
                >
                  {isPivotRow ? <span className="sr-only">pivot row: </span> : null}
                  {rowLabels[r]}
                </th>
                {row.map((value, c) => {
                  const isPivot = pivot && pivot[0] === r && pivot[1] === c;
                  const isPivotCol = pivotColumn === c;
                  return (
                    <td
                      key={c}
                      className={cn(
                        "border-b px-3 py-2 text-right font-mono tabular-nums",
                        isPivotCol && !isPivot && "bg-amber-500/10",
                        isPivot &&
                          "rounded ring-2 ring-inset ring-indigo-500 bg-indigo-500/15 font-bold",
                      )}
                    >
                      {isPivot ? (
                        <span className="sr-only">pivot element: </span>
                      ) : null}
                      {formatTableauValue(value)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatTableauValue(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const rounded = Math.round(value * 1000) / 1000;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(3).replace(/\.?0+$/, "");
}
