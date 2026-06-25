import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";

export interface ChartPalette {
  isDark: boolean;
  text: string;
  muted: string;
  grid: string;
  axis: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  danger: string;
  /** A categorical sequence for multi-series charts. */
  series: string[];
}

const LIGHT: ChartPalette = {
  isDark: false,
  text: "#1e293b",
  muted: "#64748b",
  grid: "#e2e8f0",
  axis: "#94a3b8",
  surface: "transparent",
  primary: "#6366f1",
  secondary: "#0ea5e9",
  accent: "#8b5cf6",
  danger: "#ef4444",
  series: ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#14b8a6"],
};

const DARK: ChartPalette = {
  isDark: true,
  text: "#e2e8f0",
  muted: "#94a3b8",
  grid: "#334155",
  axis: "#475569",
  surface: "transparent",
  primary: "#818cf8",
  secondary: "#38bdf8",
  accent: "#a78bfa",
  danger: "#f87171",
  series: ["#818cf8", "#38bdf8", "#34d399", "#fbbf24", "#f472b6", "#2dd4bf"],
};

/**
 * Resolve the active chart palette, reacting to the current light/dark theme.
 */
export function useChartPalette(): ChartPalette {
  const { resolvedTheme } = useTheme();
  // Avoid hydration/first-paint mismatch by tracking mount.
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  return isDark ? DARK : LIGHT;
}
