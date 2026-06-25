import { useMemo } from "react";
import type { PageVisualization } from "@/content/optimizationPages";
import { VisualizationCard } from "@/components/learning/VisualizationCard";
import { FunctionPlot2D } from "@/components/charts/FunctionPlot2D";
import { FeasibleRegionPlot } from "@/components/charts/FeasibleRegionPlot";
import { GradientDescentVisualizer } from "@/components/charts/GradientDescentVisualizer";
import { SimplexTable } from "@/components/charts/SimplexTable";
import { MatrixVisualizer } from "@/components/charts/MatrixVisualizer";
import { EigenvalueVisualizer } from "@/components/charts/EigenvalueVisualizer";
import { RechartsLineChart } from "@/components/charts/RechartsLineChart";
import { PlotlyChart } from "@/components/charts/PlotlyChart";

/**
 * Renders a sample/placeholder visualization appropriate to the page's declared
 * visualization kind. Real, page-specific data is added as content is authored.
 */
function VisualizationByKind({ viz }: { viz: PageVisualization }) {
  switch (viz.kind) {
    case "function-plot-2d":
      return (
        <FunctionPlot2D
          fn={(x) => x * x}
          domain={[-4, 4]}
          markers={[{ x: 0, label: "minimum", variant: "min" }]}
          xLabel="x"
          yLabel="f(x)"
          ariaLabel="Plot of the convex function f(x) = x squared with its minimum at the origin"
        />
      );
    case "feasible-region":
      return (
        <FeasibleRegionPlot
          region={[
            { x: 0, y: 0 },
            { x: 4, y: 0 },
            { x: 3, y: 2 },
            { x: 0, y: 3 },
          ]}
          constraints={[
            { x: [0, 4.5], y: [3, 0], label: "x₁ + 1.5x₂ ≤ 4.5" },
            { x: [3, 3], y: [-0.5, 3], label: "x₁ ≤ 3" },
          ]}
          optimum={{ x: 3, y: 2, label: "optimum" }}
          xRange={[-0.5, 5]}
          yRange={[-0.5, 4]}
          ariaLabel="A shaded feasible region for a linear program with its optimal vertex highlighted"
        />
      );
    case "gradient-descent":
      return <GradientDescentVisualizer />;
    case "simplex-table":
      return (
        <SimplexTable
          columns={["x₁", "x₂", "s₁", "s₂", "RHS"]}
          rowLabels={["s₁", "s₂", "z"]}
          rows={[
            [2, 1, 1, 0, 18],
            [1, 3, 0, 1, 21],
            [-3, -2, 0, 0, 0],
          ]}
          pivot={[0, 0]}
          caption="A starting tableau; the highlighted cell is a candidate pivot element."
        />
      );
    case "matrix":
      return (
        <MatrixVisualizer
          matrix={[
            [2, 0, 0],
            [0, 5, -1],
            [0, -1, 3],
          ]}
          rowLabels={["1", "2", "3"]}
          colLabels={["1", "2", "3"]}
          ariaLabel="A 3 by 3 symmetric matrix shown as a heatmap of its entries"
        />
      );
    case "eigenvalue":
      return <EigenvalueVisualizer />;
    case "recharts-line":
      return <SampleLineChart />;
    case "plotly-surface":
      return <SampleSurface />;
    default:
      return null;
  }
}

function SampleLineChart() {
  const data = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => {
        const x = i - 10;
        return { x, value: x * x };
      }),
    [],
  );
  return (
    <RechartsLineChart
      data={data}
      xKey="x"
      series={[{ dataKey: "value", name: "f(x) = x²" }]}
      xLabel="x"
      yLabel="f(x)"
      markers={[{ x: 0, y: 0, label: "minimum", variant: "min" }]}
      ariaLabel="A line chart showing f(x)=x² with its minimum at the origin marked"
    />
  );
}

function SampleSurface() {
  const { z, axis } = useMemo(() => {
    const n = 40;
    const ax: number[] = [];
    for (let i = 0; i < n; i++) ax.push(-3 + (6 * i) / (n - 1));
    const grid = ax.map((y) => ax.map((x) => x * x + y * y));
    return { z: grid, axis: ax };
  }, []);
  return (
    <PlotlyChart
      data={[{ x: axis, y: axis, z, type: "surface", showscale: false, colorscale: "Viridis" }]}
      layout={{ scene: { xaxis: { title: { text: "x" } }, yaxis: { title: { text: "y" } }, zaxis: { title: { text: "f" } } } }}
      height={420}
      ariaLabel="A 3D surface plot of the paraboloid f(x, y) = x squared plus y squared"
    />
  );
}

export function VisualizationSlot({ viz }: { viz: PageVisualization }) {
  return (
    <VisualizationCard title={viz.title} caption={viz.caption}>
      <VisualizationByKind viz={viz} />
    </VisualizationCard>
  );
}
