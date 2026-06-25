import { useMemo, useState } from "react";
import { PlotlyChart } from "@/components/charts/PlotlyChart";
import { useChartPalette } from "@/components/charts/chartTheme";

interface GradientDescentVisualizerProps {
  /** Curvature coefficients of f(x,y) = a·x² + b·y². */
  a?: number;
  b?: number;
  start?: [number, number];
  height?: number;
}

/**
 * Interactive 2D contour plot of f(x,y) = a·x² + b·y² with the gradient-descent
 * path overlaid. Demonstrates how the learning rate and conditioning (a vs b)
 * affect convergence — all in 2D, no 3D required.
 */
export function GradientDescentVisualizer({
  a = 1,
  b = 4,
  start = [-4, 3.2],
  height = 420,
}: GradientDescentVisualizerProps) {
  const palette = useChartPalette();
  const [learningRate, setLearningRate] = useState(0.1);
  const [steps, setSteps] = useState(20);

  const path = useMemo(() => {
    const pts: Array<[number, number]> = [start];
    let [x, y] = start;
    for (let i = 0; i < steps; i++) {
      const gx = 2 * a * x;
      const gy = 2 * b * y;
      x -= learningRate * gx;
      y -= learningRate * gy;
      if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > 50 || Math.abs(y) > 50) {
        pts.push([x, y]);
        break;
      }
      pts.push([x, y]);
    }
    return pts;
  }, [a, b, start, learningRate, steps]);

  const contour = useMemo(() => {
    const range = 5;
    const n = 60;
    const axis: number[] = [];
    for (let i = 0; i < n; i++) axis.push(-range + (2 * range * i) / (n - 1));
    const z = axis.map((y) => axis.map((x) => a * x * x + b * y * y));
    return { axis, z };
  }, [a, b]);

  const data = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        x: contour.axis,
        y: contour.axis,
        z: contour.z,
        type: "contour",
        colorscale: palette.isDark ? "Viridis" : "Blues",
        reversescale: !palette.isDark,
        showscale: false,
        contours: { coloring: "lines" },
        line: { width: 1 },
        hoverinfo: "skip",
      },
      {
        x: path.map((p) => p[0]),
        y: path.map((p) => p[1]),
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.danger, width: 2 },
        marker: { color: palette.danger, size: 6 },
        name: "Descent path",
      },
      {
        x: [start[0]],
        y: [start[1]],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.accent, size: 11 },
        text: ["start"],
        textposition: "top center",
        name: "Start",
      },
      {
        x: [path[path.length - 1]![0]],
        y: [path[path.length - 1]![1]],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.danger, size: 9 },
        text: ["end"],
        textposition: "top center",
        name: "End",
      },
      {
        x: [0],
        y: [0],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.secondary, size: 12, symbol: "star" },
        text: ["minimum"],
        textposition: "bottom center",
        name: "Minimum",
      },
    ],
    [contour, path, palette, start],
  );

  const layout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "x" }, range: [-5, 5], gridcolor: palette.grid },
      yaxis: { title: { text: "y" }, range: [-5, 5], gridcolor: palette.grid, scaleanchor: "x" },
      showlegend: false,
    }),
    [palette],
  );

  const diverged = path.some(([x, y]) => Math.abs(x) > 10 || Math.abs(y) > 10);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 flex items-center justify-between font-medium">
            Learning rate (α)
            <span className="font-mono text-muted-foreground">{learningRate.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0.01}
            max={0.5}
            step={0.01}
            value={learningRate}
            onChange={(e) => setLearningRate(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Learning rate"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 flex items-center justify-between font-medium">
            Steps
            <span className="font-mono text-muted-foreground">{steps}</span>
          </span>
          <input
            type="range"
            min={1}
            max={60}
            step={1}
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Number of steps"
          />
        </label>
      </div>
      {diverged ? (
        <p className="rounded-md bg-amber-500/15 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          The step size is too large — the iterates are diverging. Try a smaller learning rate.
        </p>
      ) : null}
      <PlotlyChart
        data={data}
        layout={layout}
        height={height}
        ariaLabel={`Contour plot of f(x,y) = ${a}x² + ${b}y² with a gradient descent path of ${path.length} points using learning rate ${learningRate}`}
      />
    </div>
  );
}
