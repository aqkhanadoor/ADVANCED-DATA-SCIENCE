import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Check, Circle } from "lucide-react";
import { optimizationPages } from "@/content/optimizationPages";
import { optimizationPagePath, ROUTES } from "@/lib/routes";
import { useProgressStore, useChapterProgress } from "@/store/progressStore";
import { optimizationPageIds } from "@/content/optimizationPages";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";

/**
 * Sticky chapter-navigation sidebar shown on learning pages.
 */
export function Sidebar() {
  const location = useLocation();
  const completedPages = useProgressStore((s) => s.completedPages);
  const { completed, total, percent } = useChapterProgress(optimizationPageIds);

  return (
    <nav
      aria-label="Chapter navigation"
      className="scrollbar-thin sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-4"
    >
      <div className="mb-4 rounded-lg border bg-card p-4">
        <RouterNavLink
          to={ROUTES.optimization}
          className={cn(
            "text-sm font-semibold hover:underline",
            location.pathname === ROUTES.optimization && "text-primary",
          )}
        >
          Chapter 1 · Optimization
        </RouterNavLink>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {completed} of {total} done
          </span>
          <span className="font-medium tabular-nums">{percent}%</span>
        </div>
        <Progress
          value={percent}
          className="mt-1.5"
          aria-label={`Chapter progress ${percent}%`}
        />
      </div>

      <ol className="space-y-0.5">
        {optimizationPages.map((page, i) => {
          const to = optimizationPagePath(page.slug);
          const active = location.pathname === to;
          const done = completedPages.includes(page.id);
          return (
            <li key={page.id}>
              <RouterNavLink
                to={to}
                className={cn(
                  "group flex items-start gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="mt-0.5 shrink-0" aria-hidden="true">
                  {done ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Circle
                      className={cn(
                        "size-4",
                        active ? "text-primary" : "text-muted-foreground/40",
                      )}
                    />
                  )}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground/70">
                    Page {i + 1}
                  </span>
                  <span className="truncate leading-snug">{page.shortTitle}</span>
                </span>
              </RouterNavLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
