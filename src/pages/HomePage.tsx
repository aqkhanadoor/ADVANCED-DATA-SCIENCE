import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  LineChart,
  MousePointerClick,
  Sigma,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChapterCard } from "@/components/learning/ChapterCard";
import { InlineMath } from "@/components/math/InlineMath";
import { BlockMath } from "@/components/math/BlockMath";
import { chapters } from "@/content/chapters";
import { ROUTES } from "@/lib/routes";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Real-life examples",
    body: "Every idea starts from a relatable scenario — commutes, budgets, recipes — before any symbols appear.",
  },
  {
    icon: Sigma,
    title: "Mathematical solving",
    body: "Step-by-step derivations show where each formula comes from, not just the final result.",
  },
  {
    icon: LineChart,
    title: "Visual graphs",
    body: "Clean 2D plots make abstract functions, regions, and curves concrete and intuitive.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive charts",
    body: "Drag sliders to watch gradient descent converge or diverge, and matrices reshape space.",
  },
  {
    icon: Sparkles,
    title: "Beautiful formulas",
    body: "Mathematics is rendered crisply with KaTeX, so exponents and operators read exactly right.",
  },
  {
    icon: GraduationCap,
    title: "Beginner-friendly",
    body: "Plain language first, jargon second — with a glossary and formula reference always one click away.",
  },
];

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/30 to-sky-400/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Badge variant="secondary" className="mx-auto">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Chapter 1 is live · 3 more coming soon
          </Badge>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Advanced{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
              Data Science
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A practical learning platform that teaches the important mathematical
            and programming ideas behind modern data science. It combines
            intuitive explanations, real-life examples, mathematical
            derivations, interactive graphs, and solved examples.
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-xl border bg-card/60 p-4 text-sm text-muted-foreground backdrop-blur">
            From a single optimization problem like{" "}
            <InlineMath>{"\\min_{x} \\, f(x)"}</InlineMath> to training models
            with <InlineMath>{"x_{k+1} = x_k - \\alpha \\nabla f(x_k)"}</InlineMath>.
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to={ROUTES.optimization}>
                Start Chapter 1
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.formulas}>Browse formulas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            The course
          </h2>
          <p className="mt-2 text-muted-foreground">
            Four chapters take you from the foundations to applied AI &amp; ML.
            Chapter 1 is available now.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>

      {/* How we teach */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How this site teaches
            </h2>
            <p className="mt-3 text-muted-foreground">
              We pair clear intuition with rigorous math and let you experiment.
              Concepts are never just told — they are shown, derived, and
              explored.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Mathematics, rendered beautifully
            </p>
            <BlockMath>
              {"\\min_{x \\in \\mathbb{R}^n} \\; f(x) \\quad \\text{s.t.} \\quad c_i(x) \\ge 0,\\; Ax = b"}
            </BlockMath>
            <p className="text-sm text-muted-foreground">
              Constraints, gradients <InlineMath>{"\\nabla f(x)"}</InlineMath>,
              and eigenvalues <InlineMath>{"Av = \\lambda v"}</InlineMath> all
              read exactly as they should.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to start optimizing?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Begin with what optimization means and build all the way up to
          gradient descent, Newton&apos;s method, and conjugate gradients.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to={ROUTES.optimization}>
            Open Chapter 1 · Optimization
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </>
  );
}
