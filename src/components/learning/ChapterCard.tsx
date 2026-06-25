import { Link } from "react-router-dom";
import { ArrowRight, Lock, Target, Sigma, Code2, BrainCircuit } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Chapter } from "@/content/chapters";
import { chapterPath } from "@/lib/routes";
import { useChapterProgress } from "@/store/progressStore";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";

const ICONS: Record<Chapter["icon"], LucideIcon> = {
  Target,
  Sigma,
  Code2,
  BrainCircuit,
};

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const Icon = ICONS[chapter.icon];
  const available = chapter.status === "available";
  const { percent, completed, total } = useChapterProgress(chapter.pageIds);

  const inner = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all",
        available
          ? "hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring"
          : "opacity-75",
      )}
      aria-disabled={!available}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r",
          chapter.gradient,
        )}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            chapter.gradient,
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {available ? (
          <Badge variant="success">Available now</Badge>
        ) : (
          <Badge variant="muted">
            <Lock className="size-3" aria-hidden="true" />
            Coming soon
          </Badge>
        )}
      </div>

      <div className="mt-4 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Chapter {chapter.number}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight">{chapter.title}</h3>
        <p className="mt-0.5 text-sm font-medium text-primary">{chapter.tagline}</p>
        <p className="mt-3 text-sm text-muted-foreground">{chapter.description}</p>
      </div>

      {available ? (
        <div className="mt-5">
          {completed > 0 ? (
            <div className="mb-3">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {completed}/{total} pages
                </span>
                <span className="tabular-nums">{percent}%</span>
              </div>
              <Progress value={percent} aria-label={`${chapter.title} progress ${percent}%`} />
            </div>
          ) : null}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Start learning
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      ) : (
        <p className="mt-5 text-sm font-medium text-muted-foreground">
          We&apos;re building this chapter. Check back soon.
        </p>
      )}
    </article>
  );

  if (!available) {
    return (
      <div
        role="group"
        aria-label={`${chapter.title} — coming soon, not yet available`}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={chapterPath(chapter.id)}
      className="block rounded-2xl focus-visible:outline-none"
      aria-label={`${chapter.title} — start learning`}
    >
      {inner}
    </Link>
  );
}
