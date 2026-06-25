import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartPalette } from "@/components/charts/chartTheme";
import {
  type ChartMarkerVariant,
  markerFill,
  markerLabelPosition,
  markerRadius,
} from "@/components/charts/chartMarkers";

export interface MarkedPoint {
  x: number;
  /** Defaults to f(x) when omitted. */
  y?: number;
  label?: string;
  variant?: ChartMarkerVariant;
}

export interface TangentLine {
  /** Point of tangency x₀. */
  x: number;
  /** Slope f′(x₀). */
  slope: number;
  /** Half-width of the tangent segment in x-units. */
  extent?: number;
  label?: string;
}

export interface FunctionPlot2DProps {
  /** The function to plot, y = f(x). */
  fn: (x: number) => number;
  domain?: [number, number];
  samples?: number;
  /** Optional points to highlight (e.g. minima, maxima). */
  markers?: MarkedPoint[];
  /** Optional tangent line through (x, f(x)) with given slope. */
  tangent?: TangentLine;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  ariaLabel: string;
}

/**
 * Plot a single-variable function as a smooth 2D curve. Ideal for illustrating
 * convexity, minima, and critical points without needing 3D.
 */
export function FunctionPlot2D({
  fn,
  domain = [-5, 5],
  samples = 200,
  markers = [],
  tangent,
  xLabel,
  yLabel,
  height = 320,
  ariaLabel,
}: FunctionPlot2DProps) {
  const palette = useChartPalette();

  const data = useMemo(() => {
    const [a, b] = domain;
    const step = (b - a) / (samples - 1);
    const rows: { x: number; y: number }[] = [];
    for (let i = 0; i < samples; i++) {
      const x = a + i * step;
      const y = fn(x);
      if (Number.isFinite(y)) rows.push({ x: Number(x.toFixed(4)), y });
    }
    return rows;
  }, [fn, domain, samples]);

  const resolvedMarkers = useMemo(
    () =>
      markers.map((m) => ({
        ...m,
        y: m.y ?? fn(m.x),
        variant: m.variant ?? ("default" as ChartMarkerVariant),
      })),
    [fn, markers],
  );

  const tangentSegment = useMemo(() => {
    if (!tangent) return null;
    const extent = tangent.extent ?? 1.2;
    const y0 = fn(tangent.x);
    const x1 = tangent.x - extent;
    const x2 = tangent.x + extent;
    return {
      x1,
      y1: y0 - tangent.slope * extent,
      x2,
      y2: y0 + tangent.slope * extent,
      label: tangent.label ?? "tangent",
    };
  }, [fn, tangent]);

  const hasTopLabels = resolvedMarkers.some(
    (m) => markerLabelPosition(m.variant) === "top" && m.label,
  );

  return (
    <div role="img" aria-label={ariaLabel} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: hasTopLabels ? 20 : 8,
            right: 16,
            bottom: xLabel ? 36 : 16,
            left: yLabel ? 40 : 8,
          }}
        >
          <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={domain}
            stroke={palette.axis}
            tick={{ fill: palette.muted, fontSize: 12 }}
            label={
              xLabel
                ? { value: xLabel, position: "bottom", offset: 4, fill: palette.muted }
                : undefined
            }
          />
          <YAxis
            stroke={palette.axis}
            tick={{ fill: palette.muted, fontSize: 12 }}
            width={40}
            label={
              yLabel
                ? { value: yLabel, angle: -90, position: "insideLeft", fill: palette.muted }
                : undefined
            }
          />
          <Tooltip
            contentStyle={{
              background: palette.isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${palette.grid}`,
              borderRadius: 8,
              color: palette.text,
            }}
            formatter={(value) => Number(value).toFixed(3)}
            labelFormatter={(label) => `x = ${label}`}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke={palette.primary}
            strokeWidth={2.5}
            dot={false}
            name="f(x)"
          />
          {tangentSegment ? (
            <ReferenceLine
              segment={[
                { x: tangentSegment.x1, y: tangentSegment.y1 },
                { x: tangentSegment.x2, y: tangentSegment.y2 },
              ]}
              stroke={palette.secondary}
              strokeWidth={2}
              strokeDasharray="6 4"
              label={{
                value: tangentSegment.label,
                position: "insideTopRight",
                fill: palette.secondary,
                fontSize: 11,
              }}
            />
          ) : null}
          {resolvedMarkers.map((m, i) => (
            <ReferenceDot
              key={`${m.x}-${i}`}
              x={m.x}
              y={m.y}
              r={markerRadius(m.variant)}
              fill={markerFill(palette, m.variant)}
              stroke="#ffffff"
              strokeWidth={1.5}
              label={
                m.label
                  ? {
                      value: m.label,
                      position: markerLabelPosition(m.variant),
                      fill: palette.text,
                      fontSize: 11,
                    }
                  : undefined
              }
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
