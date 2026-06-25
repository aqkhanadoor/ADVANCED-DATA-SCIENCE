import { Link } from "react-router-dom";
import { ArrowRight, Check, Circle, RotateCcw, Trophy } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { chapters } from "@/content/chapters";
import {
  optimizationPages,
  optimizationPageIds,
} from "@/content/optimizationPages";
import { optimizationPagePath, ROUTES } from "@/lib/routes";
import { useProgressStore, useChapterProgress } from "@/store/progressStore";

export function ProgressPage() {
  const completedPages = useProgressStore((s) => s.completedPages);
  const lastVisited = useProgressStore((s) => s.lastVisitedPage);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const { completed, total, percent } = useChapterProgress(optimizationPageIds);

  const resumePage =
    optimizationPages.find((p) => p.id === lastVisited) ??
    optimizationPages.find((p) => !completedPages.includes(p.id)) ??
    optimizationPages[0];

  const allDone = total > 0 && completed === total;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", to: ROUTES.home }, { label: "Progress" }]}
      />
      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your progress</h1>
          <p className="mt-2 text-muted-foreground">
            Track what you&apos;ve completed. Progress is saved automatically in
            your browser.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={completedPages.length === 0}>
              <RotateCcw className="size-4" />
              Reset progress
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset all progress?</DialogTitle>
              <DialogDescription>
                This clears every completed page and your last-visited page. This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2 flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={() => resetProgress()}>
                  Reset everything
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Overall card */}
      <Card className="mt-8 overflow-hidden">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className={
                "flex size-12 items-center justify-center rounded-xl " +
                (allDone
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "bg-primary/10 text-primary")
              }
            >
              <Trophy className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Chapter 1 · Optimization</p>
              <p className="text-2xl font-bold tabular-nums">
                {percent}% complete
              </p>
            </div>
          </div>
          <Button asChild>
            <Link to={optimizationPagePath(resumePage.slug)}>
              {allDone ? "Review" : percent > 0 ? "Continue" : "Start"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="px-6 pb-6">
          <Progress value={percent} aria-label={`Chapter 1 progress ${percent}%`} />
          <p className="mt-2 text-sm text-muted-foreground">
            {completed} of {total} pages complete
          </p>
        </div>
      </Card>

      {/* Per-chapter overview */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Chapters</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {chapters.map((c) => {
            const available = c.status === "available";
            return (
              <Card key={c.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Chapter {c.number}</p>
                  <p className="font-semibold">{c.title}</p>
                </div>
                {available ? (
                  <Badge variant="success">{percent}%</Badge>
                ) : (
                  <Badge variant="muted">Coming soon</Badge>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Page checklist */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Optimization pages</h2>
        <ul className="mt-4 divide-y rounded-xl border">
          {optimizationPages.map((page, i) => {
            const done = completedPages.includes(page.id);
            return (
              <li key={page.id}>
                <Link
                  to={optimizationPagePath(page.slug)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/40"
                >
                  {done ? (
                    <Check className="size-5 text-emerald-500" aria-label="completed" />
                  ) : (
                    <Circle
                      className="size-5 text-muted-foreground/40"
                      aria-label="not completed"
                    />
                  )}
                  <span className="w-6 text-sm tabular-nums text-muted-foreground">
                    {i + 1}.
                  </span>
                  <span className="flex-1 text-sm font-medium">{page.title}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
