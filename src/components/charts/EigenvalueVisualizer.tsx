import { useMemo } from "react";
import { PlotlyChart } from "@/components/charts/PlotlyChart";
import { useChartPalette } from "@/components/charts/chartTheme";

interface EigenvalueVisualizerProps {
  /** A symmetric 2×2 matrix [[a, b], [b, d]]. */
  matrix?: [[number, number], [number, number]];
  height?: number;
}

/** Eigen-decomposition of a symmetric 2×2 matrix. */
function symmetricEigen(a: number, b: number, d: number) {
  const mean = (a + d) / 2;
  const diff = (a - d) / 2;
  const root = Math.sqrt(diff * diff + b * b);
  const l1 = mean + root;
  const l2 = mean - root;
  const vec = (lambda: number): [number, number] => {
    // (A - λI) v = 0  ->  use [b, λ - a] (handles b = 0 too)
    let v: [number, number] = Math.abs(b) > 1e-9 ? [lambda - d, b] : [1, 0];
    if (Math.abs(b) < 1e-9 && Math.abs(lambda - a) < 1e-9) v = [1, 0];
    else if (Math.abs(b) < 1e-9) v = [0, 1];
    const norm = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / norm, v[1] / norm];
  };
  return { l1, l2, v1: vec(l1), v2: vec(l2) };
}

/**
 * Shows how a symmetric 2×2 matrix transforms space: the unit circle becomes an
 * ellipse whose axes align with the eigenvectors and stretch by the eigenvalues.
 */
export function EigenvalueVisualizer({
  matrix = [
    [2, 1],
    [1, 2],
  ],
  height = 420,
}: EigenvalueVisualizerProps) {
  const palette = useChartPalette();
  const [[a, b], [, d]] = matrix;
  const { l1, l2, v1, v2 } = useMemo(() => symmetricEigen(a, b, d), [a, b, d]);

  const data = useMemo<Array<Record<string, unknown>>>(() => {
    const n = 100;
    const cx: number[] = [];
    const cy: number[] = [];
    const ex: number[] = [];
    const ey: number[] = [];
    for (let i = 0; i < n; i++) {
      const t = (2 * Math.PI * i) / (n - 1);
      const x = Math.cos(t);
      const y = Math.sin(t);
      cx.push(x);
      cy.push(y);
      ex.push(a * x + b * y);
      ey.push(b * x + d * y);
    }
    return [
      {
        x: cx,
        y: cy,
        type: "scatter",
        mode: "lines",
        line: { color: palette.muted, width: 1.5, dash: "dot" },
        name: "Unit circle",
      },
      {
        x: ex,
        y: ey,
        type: "scatter",
        mode: "lines",
        line: { color: palette.primary, width: 2.5 },
        name: "Transformed (ellipse)",
      },
      {
        x: [0, v1[0] * l1],
        y: [0, v1[1] * l1],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.danger, width: 3 },
        marker: { size: 8 },
        name: `Eigenvector 1 (λ=${l1.toFixed(2)})`,
      },
      {
        x: [0, v2[0] * l2],
        y: [0, v2[1] * l2],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.accent, width: 3 },
        marker: { size: 8 },
        name: `Eigenvector 2 (λ=${l2.toFixed(2)})`,
      },
    ];
  }, [a, b, d, l1, l2, v1, v2, palette]);

  const layout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { range: [-4, 4], gridcolor: palette.grid, zerolinecolor: palette.axis },
      yaxis: { range: [-4, 4], gridcolor: palette.grid, zerolinecolor: palette.axis, scaleanchor: "x" },
      legend: { orientation: "h", y: -0.2 },
    }),
    [palette],
  );

  return (
    <PlotlyChart
      data={data}
      layout={layout}
      height={height}
      ariaLabel={`Visualization of how the matrix [[${a}, ${b}], [${b}, ${d}]] stretches the unit circle into an ellipse, with eigenvalues ${l1.toFixed(2)} and ${l2.toFixed(2)}`}
    />
  );
}
