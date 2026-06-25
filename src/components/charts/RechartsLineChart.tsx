import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useChartPalette } from "@/components/charts/chartTheme";
import {
  type ChartMarker,
  markerFill,
  markerLabelPosition,
  markerRadius,
} from "@/components/charts/chartMarkers";

export interface LineSeries {
  /** Key in each data row holding this series' value. */
  dataKey: string;
  name: string;
  color?: string;
}

export interface RechartsLineChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  series: LineSeries[];
  xLabel?: string;
  yLabel?: string;
  height?: number;
  /** Highlighted points such as minima, maxima, or the current slider value. */
  markers?: ChartMarker[];
  ariaLabel: string;
}

/**
 * A clean, theme-aware 2D line chart built on Recharts.
 */
export function RechartsLineChart({
  data,
  xKey,
  series,
  xLabel,
  yLabel,
  height = 320,
  markers = [],
  ariaLabel,
}: RechartsLineChartProps) {
  const palette = useChartPalette();

  const colors = useMemo(
    () => series.map((s, i) => s.color ?? palette.series[i % palette.series.length]),
    [series, palette],
  );

  const hasTopLabels = markers.some(
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
            bottom: xLabel ? 40 : 24,
            left: yLabel ? 40 : 8,
          }}
        >
          <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            stroke={palette.axis}
            tick={{ fill: palette.muted, fontSize: 12 }}
            label={
              xLabel
                ? { value: xLabel, position: "bottom", offset: 8, fill: palette.muted }
                : undefined
            }
          />
          <YAxis
            stroke={palette.axis}
            tick={{ fill: palette.muted, fontSize: 12 }}
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
          />
          {series.length > 1 ? <Legend wrapperStyle={{ color: palette.text }} /> : null}
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name}
              stroke={colors[i]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
          {markers.map((m, i) => {
            const variant = m.variant ?? "default";
            return (
              <ReferenceDot
                key={`${m.x}-${m.y}-${i}`}
                x={m.x}
                y={m.y}
                r={markerRadius(variant)}
                fill={markerFill(palette, variant)}
                stroke="#ffffff"
                strokeWidth={1.5}
                label={
                  m.label
                    ? {
                        value: m.label,
                        position: markerLabelPosition(variant),
                        fill: palette.text,
                        fontSize: 11,
                      }
                    : undefined
                }
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
