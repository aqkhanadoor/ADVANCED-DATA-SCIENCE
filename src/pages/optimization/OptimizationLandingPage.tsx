import { Link } from "react-router-dom";
import { ArrowRight, Check, Circle, Clock, Map, Signal, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InlineMath } from "@/components/math/InlineMath";
import { KeyIdeaBox } from "@/components/ui/Callout";
import {
  optimizationPages,
  optimizationPageIds,
  type Difficulty,
} from "@/content/optimizationPages";
import { optimizationPagePath, ROUTES } from "@/lib/routes";
import { useProgressStore, useChapterProgress } from "@/store/progressStore";
import { cn } from "@/lib/cn";

const difficultyVariant: Record<Difficulty, "success" | "warning" | "secondary"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "secondary",
};

export function OptimizationLandingPage() {
  const completedPages = useProgressStore((s) => s.completedPages);
  const lastVisited = useProgressStore((s) => s.lastVisitedPage);
  const { completed, total, percent } = useChapterProgress(optimizationPageIds);

  const totalMinutes = optimizationPages.reduce((sum, p) => sum + p.estimatedTime, 0);
  const firstIncomplete =
    optimizationPages.find((p) => !completedPages.includes(p.id)) ??
    optimizationPages[0];
  const resumePage =
    optimizationPages.find((p) => p.id === lastVisited) ?? firstIncomplete;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Chapter 1 · Optimization" },
        ]}
      />

      {/* Header */}
      <header className="mt-6 overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-500/10 to-sky-500/10 p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm">
            <Target className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Chapter 1
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Optimization</h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Optimization is the science of making the best possible choice. From
          linear programming to gradient descent, this chapter shows how to
          model problems and how algorithms find the best solution among
          countless possibilities.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="muted">
            <Signal className="size-3.5" aria-hidden="true" /> Beginner → Advanced
          </Badge>
          <Badge variant="muted">
            <Clock className="size-3.5" aria-hidden="true" /> ~{Math.round(totalMinutes / 60 * 10) / 10} hours
          </Badge>
          <Badge variant="muted">{total} pages</Badge>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={optimizationPagePath(resumePage.slug)}>
              {percent > 0 ? "Continue" : "Start"}: {resumePage.shortTitle}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Why it matters */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Why optimization matters</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Almost every data science task is optimization in disguise. Training
            a model minimizes a loss function; allocating a budget maximizes
            return; fitting a curve minimizes error. Whenever we write{" "}
            <InlineMath>{"\\min_{x} f(x)"}</InlineMath>, we are optimizing.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Machine learning is optimization of model parameters.</li>
            <li>• Operations research allocates scarce resources optimally.</li>
            <li>• Engineering design minimizes cost, weight, or error.</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Your progress</h2>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completed} of {total} pages complete
            </span>
            <span className="font-semibold tabular-nums">{percent}%</span>
          </div>
          <Progress
            value={percent}
            className="mt-2"
            aria-label={`Chapter completion ${percent}%`}
          />
          <KeyIdeaBox title="Suggested approach" className="mt-5">
            Work through the pages in order. Each builds on the previous one,
            moving from intuition to modelling, then to algorithms.
          </KeyIdeaBox>
        </Card>
      </section>

      {/* Roadmap */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Map className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-bold tracking-tight">Learning roadmap</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          The chapter flows through three phases: foundations, linear
          programming, then continuous &amp; numerical methods.
        </p>

        <ol className="mt-6 space-y-3">
          {optimizationPages.map((page, i) => {
            const done = completedPages.includes(page.id);
            return (
              <li key={page.id}>
                <Link
                  to={optimizationPagePath(page.slug)}
                  className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold",
                      done
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground",
                    )}
                    aria-hidden="true"
                  >
                    {done ? <Check className="size-5" /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{page.title}</h3>
                      <Badge variant={difficultyVariant[page.difficulty]}>
                        {page.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {page.estimatedTime} min
                      </span>
                      {done ? (
                        <span className="sr-only">(completed)</span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Page cards grid (quick links) */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight">All pages</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {optimizationPages.map((page, i) => {
            const done = completedPages.includes(page.id);
            return (
              <Link
                key={page.id}
                to={optimizationPagePath(page.slug)}
                className="flex flex-col rounded-xl border bg-card p-4 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Page {i + 1}
                  </span>
                  {done ? (
                    <Check className="size-4 text-emerald-500" aria-label="completed" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground/40" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-1.5 font-semibold leading-snug">{page.shortTitle}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
