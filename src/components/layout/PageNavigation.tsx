import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useProgressStore, useChapterProgress } from "@/store/progressStore";
import {
  getOptimizationPageBySlug,
  optimizationPageIds,
} from "@/content/optimizationPages";
import { optimizationPagePath, ROUTES } from "@/lib/routes";

interface PageNavigationProps {
  pageId: string;
  previousSlug: string | null;
  nextSlug: string | null;
}

/**
 * Mark-as-complete control plus previous/next navigation shown at the bottom of
 * every learning page.
 */
export function PageNavigation({
  pageId,
  previousSlug,
  nextSlug,
}: PageNavigationProps) {
  const isComplete = useProgressStore((s) => s.completedPages.includes(pageId));
  const toggleComplete = useProgressStore((s) => s.toggleComplete);
  const { completed, total } = useChapterProgress(optimizationPageIds);

  const prev = previousSlug ? getOptimizationPageBySlug(previousSlug) : undefined;
  const next = nextSlug ? getOptimizationPageBySlug(nextSlug) : undefined;
  const isLast = !nextSlug;

  return (
    <div className="mt-12 space-y-6 border-t pt-8">
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-medium">
            {isComplete ? "You've completed this page" : "Finished this page?"}
          </p>
          <p className="text-sm text-muted-foreground">
            Chapter progress: {completed} of {total} pages complete.
          </p>
        </div>
        <Button
          variant={isComplete ? "secondary" : "default"}
          onClick={() => toggleComplete(pageId)}
          aria-pressed={isComplete}
        >
          {isComplete ? (
            <>
              <Check className="size-4" /> Completed
            </>
          ) : (
            <>
              <Circle className="size-4" /> Mark as complete
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Button asChild variant="outline" className="h-auto justify-start py-3">
            <Link to={optimizationPagePath(prev.slug)}>
              <ArrowLeft className="size-4" />
              <span className="flex flex-col items-start text-left">
                <span className="text-xs text-muted-foreground">Previous</span>
                <span className="font-medium">{prev.shortTitle}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}

        {next ? (
          <Button
            asChild
            variant="outline"
            className="h-auto justify-end py-3 sm:col-start-2"
          >
            <Link to={optimizationPagePath(next.slug)}>
              <span className="flex flex-col items-end text-right">
                <span className="text-xs text-muted-foreground">Next</span>
                <span className="font-medium">{next.shortTitle}</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="default" className="h-auto justify-end py-3 sm:col-start-2">
            <Link to={ROUTES.optimization}>
              <span className="flex flex-col items-end text-right">
                <span className="text-xs opacity-80">
                  {isLast ? "Chapter complete" : "Back to"}
                </span>
                <span className="font-medium">Optimization overview</span>
              </span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
