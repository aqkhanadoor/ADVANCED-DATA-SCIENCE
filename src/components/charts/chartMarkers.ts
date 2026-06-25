import type { ChartPalette } from "@/components/charts/chartTheme";

export type ChartMarkerVariant =
  | "min"
  | "max"
  | "current"
  | "critical"
  | "start"
  | "end"
  | "default";

export interface ChartMarker {
  x: number;
  y: number;
  label?: string;
  variant?: ChartMarkerVariant;
}

export function markerFill(
  palette: ChartPalette,
  variant: ChartMarkerVariant = "default",
): string {
  switch (variant) {
    case "min":
      return palette.secondary;
    case "max":
      return palette.danger;
    case "current":
      return palette.accent;
    case "start":
      return palette.accent;
    case "end":
      return palette.danger;
    case "critical":
      return palette.danger;
    default:
      return palette.danger;
  }
}

export function markerRadius(variant: ChartMarkerVariant = "default"): number {
  switch (variant) {
    case "min":
    case "max":
      return 6;
    case "current":
    case "start":
    case "end":
      return 5;
    default:
      return 5;
  }
}

export function markerLabelPosition(
  variant: ChartMarkerVariant = "default",
): "top" | "bottom" | "left" | "right" {
  if (variant === "min") return "bottom";
  if (variant === "max") return "top";
  return "top";
}
