import { useMemo } from "react";
import { PlotlyChart } from "@/components/charts/PlotlyChart";
import { useChartPalette } from "@/components/charts/chartTheme";

export interface Point2D {
  x: number;
  y: number;
}

export interface ConstraintLine {
  x: [number, number];
  y: [number, number];
  label?: string;
}

export interface FeasibleRegionPlotProps {
  /** Ordered vertices of the feasible polygon (shaded). */
  region: Point2D[];
  /** Boundary lines for each constraint (drawn over the shading). */
  constraints?: ConstraintLine[];
  /** Optional optimal point to highlight. */
  optimum?: Point2D & { label?: string };
  xRange?: [number, number];
  yRange?: [number, number];
  height?: number;
  ariaLabel: string;
}

/**
 * A 2D linear-programming feasible region: a shaded convex polygon with its
 * constraint boundaries and (optionally) the optimal vertex highlighted.
 */
export function FeasibleRegionPlot({
  region,
  constraints = [],
  optimum,
  xRange,
  yRange,
  height = 380,
  ariaLabel,
}: FeasibleRegionPlotProps) {
  const palette = useChartPalette();

  const data = useMemo(() => {
    const traces: Array<Record<string, unknown>> = [];

    // Shaded feasible region (close the polygon).
    const rx = [...region.map((p) => p.x), region[0]?.x];
    const ry = [...region.map((p) => p.y), region[0]?.y];
    traces.push({
      x: rx,
      y: ry,
      type: "scatter",
      mode: "lines",
      fill: "toself",
      fillcolor: palette.isDark
        ? "rgba(129,140,248,0.25)"
        : "rgba(99,102,241,0.18)",
      line: { color: palette.primary, width: 2 },
      name: "Feasible region",
      hoverinfo: "skip",
    });

    // Constraint boundary lines.
    constraints.forEach((c, i) => {
      traces.push({
        x: c.x,
        y: c.y,
        type: "scatter",
        mode: "lines",
        line: { color: palette.series[(i + 1) % palette.series.length], width: 1.5, dash: "dot" },
        name: c.label ?? `Constraint ${i + 1}`,
      });
    });

    // Vertices.
    traces.push({
      x: region.map((p) => p.x),
      y: region.map((p) => p.y),
      type: "scatter",
      mode: "markers+text",
      marker: { color: palette.secondary, size: 8 },
      text: region.map((p) => `(${p.x}, ${p.y})`),
      textposition: "top center",
      textfont: { color: palette.muted, size: 10 },
      name: "Vertices",
    });

    if (optimum) {
      traces.push({
        x: [optimum.x],
        y: [optimum.y],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.danger, size: 13, symbol: "star" },
        text: [optimum.label ?? "Optimum"],
        textposition: "top center",
        textfont: { color: palette.text },
        name: "Optimum",
      });
    }

    return traces;
  }, [region, constraints, optimum, palette]);

  const layout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "x₁" }, gridcolor: palette.grid, zerolinecolor: palette.axis, range: xRange },
      yaxis: { title: { text: "x₂" }, gridcolor: palette.grid, zerolinecolor: palette.axis, range: yRange },
      showlegend: true,
      legend: { orientation: "h", y: -0.2 },
    }),
    [palette, xRange, yRange],
  );

  return (
    <PlotlyChart data={data} layout={layout} ariaLabel={ariaLabel} height={height} />
  );
}
