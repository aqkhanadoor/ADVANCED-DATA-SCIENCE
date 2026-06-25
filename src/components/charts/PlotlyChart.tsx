import { Suspense, lazy, useMemo } from "react";
import { useChartPalette } from "@/components/charts/chartTheme";
import { cn } from "@/lib/cn";

// Lazily load Plotly (~MBs) only when a chart actually renders.
const LazyPlot = lazy(async () => {
  const [{ default: createPlotlyComponent }, plotlyModule] = await Promise.all([
    import("react-plotly.js/factory"),
    import("plotly.js-dist-min"),
  ]);
  const Plotly =
    (plotlyModule as { default?: unknown }).default ?? plotlyModule;
  const Plot = createPlotlyComponent(Plotly);
  return { default: Plot as React.ComponentType<Record<string, unknown>> };
});

export interface PlotlyChartProps {
  data: Array<Record<string, unknown>>;
  layout?: Record<string, unknown>;
  config?: Record<string, unknown>;
  className?: string;
  /** Accessible description of what the chart shows. */
  ariaLabel: string;
  height?: number;
}

/**
 * Theme-aware Plotly wrapper. Used for the few cases where a 3D surface or
 * contour genuinely aids understanding; prefer 2D charts elsewhere.
 */
export function PlotlyChart({
  data,
  layout,
  config,
  className,
  ariaLabel,
  height = 360,
}: PlotlyChartProps) {
  const palette = useChartPalette();

  const mergedLayout = useMemo<Record<string, unknown>>(
    () => ({
      autosize: true,
      height,
      margin: { l: 48, r: 16, t: 24, b: 40 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: palette.text, family: "Inter, system-ui, sans-serif" },
      colorway: palette.series,
      legend: { font: { color: palette.text } },
      ...layout,
    }),
    [layout, palette, height],
  );

  const mergedConfig = useMemo<Record<string, unknown>>(
    () => ({ displaylogo: false, responsive: true, ...config }),
    [config],
  );

  return (
    <div
      className={cn("w-full", className)}
      role="img"
      aria-label={ariaLabel}
      style={{ minHeight: height }}
    >
      <Suspense
        fallback={
          <div
            className="flex w-full animate-pulse items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
            style={{ height }}
          >
            Loading chart…
          </div>
        }
      >
        <LazyPlot
          data={data}
          layout={mergedLayout}
          config={mergedConfig}
          style={{ width: "100%", height }}
          useResizeHandler
        />
      </Suspense>
    </div>
  );
}
