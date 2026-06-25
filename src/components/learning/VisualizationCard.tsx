import type { ReactNode } from "react";
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface VisualizationCardProps {
  title: string;
  caption?: string;
  children: ReactNode;
}

/**
 * Frames an interactive visualization with a title and explanatory caption so
 * every chart sits in a consistent, accessible container.
 */
export function VisualizationCard({
  title,
  caption,
  children,
}: VisualizationCardProps) {
  return (
    <Card className="my-6 overflow-hidden">
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <BarChart3 className="size-4 text-primary" aria-hidden="true" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
      {caption ? (
        <figcaption className="border-t bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </Card>
  );
}
