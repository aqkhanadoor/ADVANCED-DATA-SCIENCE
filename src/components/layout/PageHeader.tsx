import type { ReactNode } from "react";
import { Clock, Signal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Difficulty } from "@/content/optimizationPages";

interface PageHeaderProps {
  /** Small label above the title, e.g. "Page 3 of 13". */
  eyebrow?: string;
  title: string;
  description?: string;
  difficulty?: Difficulty;
  estimatedTime?: number;
  children?: ReactNode;
}

const difficultyVariant: Record<
  Difficulty,
  "success" | "warning" | "secondary"
> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "secondary",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  difficulty,
  estimatedTime,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-8 border-b pb-6">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
      {(difficulty || estimatedTime || children) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {difficulty ? (
            <Badge variant={difficultyVariant[difficulty]}>
              <Signal className="size-3.5" aria-hidden="true" />
              {difficulty}
            </Badge>
          ) : null}
          {estimatedTime ? (
            <Badge variant="muted">
              <Clock className="size-3.5" aria-hidden="true" />
              {estimatedTime} min read
            </Badge>
          ) : null}
          {children}
        </div>
      )}
    </header>
  );
}
