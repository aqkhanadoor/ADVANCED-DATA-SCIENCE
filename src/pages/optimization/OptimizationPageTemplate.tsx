import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { FormulaCard } from "@/components/math/FormulaCard";
import { InlineMath } from "@/components/math/InlineMath";
import { BlockMath } from "@/components/math/BlockMath";
import {
  ExampleBox,
  PracticeBox,
  KeyIdeaBox,
  SummaryBox,
  StepByStepBox,
  DefinitionBox,
} from "@/components/ui/Callout";
import { SimplexTable } from "@/components/charts/SimplexTable";
import { SimplexMethodInteractiveTable } from "@/components/charts/SimplexMethodInteractiveTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { VisualizationSlot } from "@/components/learning/VisualizationSlot";
import { VisualizationCard } from "@/components/learning/VisualizationCard";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {
  type OptimizationPage,
  getOptimizationPageBySlug,
  optimizationPages,
  optimizationPageIds,
} from "@/content/optimizationPages";
import { getGlossaryTerm } from "@/content/glossary";
import { ROUTES, optimizationPagePath } from "@/lib/routes";
import { useProgressStore, useChapterProgress } from "@/store/progressStore";
import { EigenvalueVisualizer } from "@/components/charts/EigenvalueVisualizer";
import { MatrixVisualizer } from "@/components/charts/MatrixVisualizer";
import { RechartsLineChart } from "@/components/charts/RechartsLineChart";
import { PlotlyChart } from "@/components/charts/PlotlyChart";
import { FunctionPlot2D } from "@/components/charts/FunctionPlot2D";
import { GradientDescentVisualizer } from "@/components/charts/GradientDescentVisualizer";
import { useChartPalette } from "@/components/charts/chartTheme";
import {
  FeasibleRegionPlot,
  type Point2D,
} from "@/components/charts/FeasibleRegionPlot";

export function OptimizationPageTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getOptimizationPageBySlug(slug) : undefined;
  const setCurrentPage = useProgressStore((s) => s.setCurrentPage);

  useEffect(() => {
    if (page) setCurrentPage(page.id);
  }, [page, setCurrentPage]);

  if (!page) return <NotFoundPage />;

  const index = optimizationPages.findIndex((p) => p.id === page.id);

  if (page.slug === "what-is-optimization") {
    return (
      <WhatIsOptimizationPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "modelling") {
    return (
      <OptimizationModellingPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "linear-programming") {
    return (
      <LinearProgrammingPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "graphical-method") {
    return (
      <GraphicalMethodPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "simplex-method") {
    return (
      <SimplexMethodPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "types-and-convexity") {
    return (
      <TypesAndConvexityPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "duality-sensitivity") {
    return (
      <DualitySensitivityPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "unconstrained-optimization") {
    return (
      <UnconstrainedOptimizationPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "gradient-descent") {
    return (
      <GradientDescentPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "hessian-newton") {
    return (
      <HessianNewtonPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "trust-region") {
    return (
      <TrustRegionPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "eigenvalues-conjugate-gradient") {
    return (
      <EigenvaluesConjugateGradientPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }
  if (page.slug === "numerical-derivatives-sparsity") {
    return (
      <NumericalDerivativesSparsityPage
        page={page}
        index={index}
        totalPages={optimizationPages.length}
      />
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${optimizationPages.length}`}
          title={page.title}
          description={page.description}
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        />
      </div>

      {/* Prerequisites */}
      {page.prerequisites.length > 0 ? (
        <p className="mb-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Before this page:</span>{" "}
          {page.prerequisites.map((pre, i) => {
            const prePage = getOptimizationPageBySlug(pre);
            if (!prePage) return null;
            return (
              <span key={pre}>
                {i > 0 ? ", " : ""}
                <Link
                  to={optimizationPagePath(prePage.slug)}
                  className="text-primary hover:underline"
                >
                  {prePage.shortTitle}
                </Link>
              </span>
            );
          })}
        </p>
      ) : null}

      {/* Learning objectives */}
      <KeyIdeaBox title="What you'll learn">
        <ul className="ml-4 list-disc space-y-1">
          {page.learningObjectives.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        {/* Placeholder content sections */}
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.placeholder}</p>
            <p className="text-muted-foreground">
              <em>
                Full explanation coming soon. This page currently shows the
                structure, key formulas, an interactive visualization, a worked
                example, and practice.
              </em>
            </p>
          </section>
        ))}

        {/* Key formulas */}
        {page.formulas.length > 0 ? (
          <>
            <h2>Key formulas</h2>
            {page.formulas.map((f, i) => (
              <FormulaCard
                key={f.tex}
                tex={f.tex}
                label={f.label}
                number={`${index + 1}.${i + 1}`}
              />
            ))}
          </>
        ) : null}

        {/* Visualizations */}
        <h2>Visualize it</h2>
        {page.visualizations.map((viz) => (
          <VisualizationSlot key={viz.title} viz={viz} />
        ))}

        {/* Real-life example */}
        <h2>Real-life example</h2>
        <ExampleBox title={page.example.title}>
          {page.example.placeholder}
        </ExampleBox>

        {/* Practice */}
        <h2>Practice</h2>
        <PracticeBox>
          {page.practice.prompt}
          <p className="mt-3 text-xs text-muted-foreground">
            Interactive practice and solutions will appear here as the chapter
            is completed.
          </p>
        </PracticeBox>

        {/* Key terms */}
        {page.keyTerms.length > 0 ? (
          <>
            <h2>Key terms</h2>
            <Accordion type="single" collapsible className="rounded-xl border px-4">
              {page.keyTerms.map((termId) => {
                const term = getGlossaryTerm(termId);
                if (!term) return null;
                return (
                  <AccordionItem key={termId} value={termId}>
                    <AccordionTrigger>{term.term}</AccordionTrigger>
                    <AccordionContent>
                      <p>{term.definition}</p>
                      {term.tex ? (
                        <p className="mt-2">
                          <InlineMath>{term.tex}</InlineMath>
                        </p>
                      ) : null}
                      <Link
                        to={`${ROUTES.glossary}#${term.id}`}
                        className="mt-2 inline-block text-xs text-primary hover:underline"
                      >
                        View in glossary →
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        ) : null}

        {/* Summary */}
        <h2>Summary</h2>
        <SummaryBox>
          A concise recap of this page&apos;s key takeaways will be written here.
          For now, revisit the learning objectives above and try the practice
          prompt.
        </SummaryBox>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

interface IntroProps {
  page: OptimizationPage;
  index: number;
  totalPages: number;
}

interface PracticeQuestion {
  id: string;
  question: string;
  answer: React.ReactNode;
}

function PracticeQuestions({
  questions,
}: {
  questions: PracticeQuestion[];
}) {
  return (
    <Accordion
      type="multiple"
      className="mt-4 rounded-xl border bg-card px-4 py-2"
    >
      {questions.map((q) => (
        <AccordionItem key={q.id} value={q.id}>
          <AccordionTrigger>{q.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              <strong>Suggested answer:</strong> {q.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function LinearProgrammingPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "lp-q1",
      question: "Q1. What makes an objective function linear?",
      answer:
        "Each variable appears only to power 1, multiplied by constants, and terms are added. Example: 4x1 + 9x2.",
    },
    {
      id: "lp-q2",
      question: "Q2. Why is x^2 not allowed in linear programming?",
      answer:
        "x^2 is nonlinear because the variable has power 2, so the objective or constraint is no longer linear.",
    },
    {
      id: "lp-q3",
      question: "Q3. Identify decision variables in the bakery model.",
      answer:
        "x1 = number of cakes produced, x2 = number of cookies produced.",
    },
    {
      id: "lp-q4",
      question: "Q4. Write the flour constraint for the bakery problem.",
      answer:
        "5x1 + 2x2 <= 100 because each cake uses 5 kg flour and each cookie uses 2 kg flour with 100 kg available.",
    },
    {
      id: "lp-q5",
      question: "Q5. What does non-negativity mean physically?",
      answer:
        "Production quantities cannot be negative, so x1 >= 0 and x2 >= 0.",
    },
    {
      id: "lp-q6",
      question: "Q6. In Ax <= b, what does b represent?",
      answer:
        "b is the vector of resource limits or capacities on the right side of constraints.",
    },
    {
      id: "lp-q7",
      question: "Q7. Give one finance use case for LP.",
      answer:
        "Portfolio allocation can maximize expected return under budget and risk limits expressed as linear constraints.",
    },
    {
      id: "lp-q8",
      question: "Q8. Is sin(x) linear? Why?",
      answer:
        "No. sin(x) is a nonlinear trigonometric function, so it cannot appear in a linear program.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Linear Programming"
          description="Understand how to model optimization problems with linear objectives and linear constraints."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        />
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Say what linear programming (LP) means in plain English.</li>
          <li>Recognize linear vs nonlinear expressions — and why it matters.</li>
          <li>Read standard LP notation: <InlineMath>{"c"}</InlineMath>, <InlineMath>{"A"}</InlineMath>, <InlineMath>{"b"}</InlineMath>, <InlineMath>{"x"}</InlineMath>, <InlineMath>{"Z"}</InlineMath>.</li>
          <li>Build a complete LP model from a word problem (bakery example).</li>
          <li>See where LP is used in business, transport, finance, and data science.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>What is linear programming?</h2>
          <p>
            <strong>Linear programming</strong> (LP) is optimization where{" "}
            <em>everything is linear</em>: the objective and every constraint are
            sums of constants times variables — no squares, no curves, no
            multiplying two variables together.
          </p>
          <p>
            LP is one of the most widely used optimization tools in the world
            because many resource-allocation problems are naturally linear, and
            LP has fast, reliable solvers.
          </p>
          <DefinitionBox title="LP in one sentence">
            <p>
              Choose non-negative amounts <InlineMath>{"x_1, x_2, \\ldots"}</InlineMath>{" "}
              to maximize or minimize a linear profit/cost score, while staying
              within linear limits on materials, time, and budget.
            </p>
          </DefinitionBox>
          <ExampleBox title="Linear vs non-linear expressions">
            <p className="mb-1 font-medium">Linear — allowed in LP:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li><InlineMath>{"2x + 3y"}</InlineMath> — constants 2 and 3 times variables</li>
              <li><InlineMath>{"5x_1 + 7x_2"}</InlineMath> — same idea with subscripts</li>
              <li>
                <InlineMath>{"c^\\top x"}</InlineMath> — shorthand for{" "}
                <InlineMath>{"c_1 x_1 + c_2 x_2 + \\cdots"}</InlineMath>
              </li>
            </ul>
            <p className="mb-1 mt-3 font-medium">Non-linear — not allowed in LP:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li><InlineMath>{"x^2"}</InlineMath> — squared variable</li>
              <li><InlineMath>{"xy"}</InlineMath> — product of two variables</li>
              <li><InlineMath>{"\\sin(x)"}</InlineMath>, <InlineMath>{"e^x"}</InlineMath> — curved functions</li>
            </ul>
          </ExampleBox>
        </section>

        <section>
          <h2>Standard LP form — symbol by symbol</h2>
          <p>
            Textbooks pack the whole problem into one line. Here is how to read
            it:
          </p>
          <FormulaCard
            tex={"\\max \\; c^\\top x \\quad \\text{subject to } Ax \\le b, \\; x \\ge 0"}
            label="Standard linear programming form"
            number="4.1"
            caption="Maximize weighted sum cᵀx subject to linear limits Ax ≤ b and x ≥ 0."
          />
          <DefinitionBox title="What each symbol means">
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <InlineMath>{"x"}</InlineMath> — vector of decision variables{" "}
                <InlineMath>{"(x_1, x_2, \\ldots)"}</InlineMath> you choose
                (cakes, cookies, hours, …).
              </li>
              <li>
                <InlineMath>{"c"}</InlineMath> — vector of <strong>objective
                coefficients</strong>: profit or cost per unit of each variable.
                <InlineMath>{"c^\\top x"}</InlineMath> means{" "}
                <InlineMath>{"c_1 x_1 + c_2 x_2 + \\cdots"}</InlineMath>.
              </li>
              <li>
                <InlineMath>{"A"}</InlineMath> — matrix of numbers telling how
                much of each resource each variable uses (flour per cake, etc.).
              </li>
              <li>
                <InlineMath>{"b"}</InlineMath> — vector of <strong>limits</strong>{" "}
                (100 kg flour, 80 kg sugar, …). Fixed data, not chosen.
              </li>
              <li>
                <InlineMath>{"Ax \\le b"}</InlineMath> — each row is one “at
                most” constraint: total usage ≤ available amount.
              </li>
              <li>
                <InlineMath>{"x \\ge 0"}</InlineMath> — no negative production or
                spending.
              </li>
            </ul>
          </DefinitionBox>
          <p>
            You can write <InlineMath>{"\\min"}</InlineMath> instead of{" "}
            <InlineMath>{"\\max"}</InlineMath> for cost-minimization problems —
            the structure is identical.
          </p>
        </section>

        <section>
          <h2>Why LP matters in real life</h2>
          <p>
            In factory production planning, LP allocates limited labor, machine
            time, and raw materials to products so profit is maximized. In many
            industries, this directly improves margin without any new capital
            investment.
          </p>
          <p>
            In diet planning, LP chooses food quantities that meet nutrition
            requirements at minimum cost. In transportation and logistics, LP
            determines shipment quantities from origins to destinations while
            respecting supply and demand constraints.
          </p>
          <p>
            In scheduling, LP balances tasks against limited staff-hours and time
            windows. In advertising, LP can split a fixed budget across channels
            to maximize reach or conversions under campaign rules.
          </p>
          <p>
            In finance, LP supports portfolio allocation with budget and exposure
            constraints. In data science workflows, linear models and some
            regularized formulations are solved using optimization structures that
            build directly on LP ideas.
          </p>
        </section>

        <section>
          <h2>Big bakery example (full model)</h2>
          <p>
            A bakery produces cakes and cookies.
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Product</th>
                  <th className="px-3 py-2 text-left font-semibold">Profit (Rs.)</th>
                  <th className="px-3 py-2 text-left font-semibold">Flour (kg)</th>
                  <th className="px-3 py-2 text-left font-semibold">Sugar (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2">Cake</td>
                  <td className="px-3 py-2">50</td>
                  <td className="px-3 py-2">5</td>
                  <td className="px-3 py-2">2</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Cookie</td>
                  <td className="px-3 py-2">30</td>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            <strong>Step 1 — name the variables.</strong> Let{" "}
            <InlineMath>{"x_1"}</InlineMath> = number of cakes produced and{" "}
            <InlineMath>{"x_2"}</InlineMath> = number of cookies produced. These
            are the only quantities we choose; everything else in the table is
            fixed data.
          </p>
          <FormulaCard
            tex={
              "\\begin{aligned} \\max \\; Z &= 50x_1 + 30x_2 \\\\ \\text{s.t. } 5x_1 + 2x_2 &\\le 100 \\\\ 2x_1 + 4x_2 &\\le 80 \\\\ x_1, x_2 &\\ge 0 \\end{aligned}"
            }
            label="Bakery linear programming model"
            number="4.2"
            caption="Z = total profit (Rs.). Each constraint is one resource limit."
          />
          <DefinitionBox title="Read formula (4.2) line by line">
            <ol className="ml-4 list-decimal space-y-2 text-sm">
              <li>
                <InlineMath>{"\\max Z"}</InlineMath> — we want the <em>largest</em>{" "}
                possible profit.
              </li>
              <li>
                <InlineMath>{"Z = 50x_1 + 30x_2"}</InlineMath> — Rs. 50 per cake
                plus Rs. 30 per cookie.
              </li>
              <li>
                <InlineMath>{"5x_1 + 2x_2 \\le 100"}</InlineMath> — flour: 5 kg per
                cake + 2 kg per cookie ≤ 100 kg available.
              </li>
              <li>
                <InlineMath>{"2x_1 + 4x_2 \\le 80"}</InlineMath> — sugar: 2 kg per
                cake + 4 kg per cookie ≤ 80 kg available.
              </li>
              <li>
                <InlineMath>{"x_1, x_2 \\ge 0"}</InlineMath> — cannot bake negative
                amounts.
              </li>
            </ol>
          </DefinitionBox>
          <StepByStepBox
            title="Deep interpretation of every term"
            steps={[
              <>Decision variables: <InlineMath>{"x_1, x_2"}</InlineMath> are controllable production quantities (you choose them).</>,
              <>Objective: <InlineMath>{"Z = 50x_1 + 30x_2"}</InlineMath> totals profit in Rs. from cakes and cookies.</>,
              <>Flour constraint: <InlineMath>{"5x_1 + 2x_2 \\le 100"}</InlineMath> — if you make <InlineMath>{"x_1"}</InlineMath> cakes and <InlineMath>{"x_2"}</InlineMath> cookies, flour used is <InlineMath>{"5x_1+2x_2"}</InlineMath>; it must not exceed 100.</>,
              <>Sugar constraint: <InlineMath>{"2x_1 + 4x_2 \\le 80"}</InlineMath> — same pattern for sugar stock.</>,
              <>Non-negativity: <InlineMath>{"x_1, x_2 \\ge 0"}</InlineMath> — production counts cannot be negative.</>,
              <>Feasible solution: any pair <InlineMath>{"(x_1,x_2)"}</InlineMath> satisfying <em>all</em> inequalities at once (e.g. (10, 5) uses 60 kg flour — OK).</>,
              <>Optimal solution: the feasible pair with the largest <InlineMath>{"Z"}</InlineMath> — found on the next page using the graphical method.</>,
            ]}
          />
        </section>

        <section>
          <h2>LP modelling checklist</h2>
          <KeyIdeaBox title="Use this every time">
            <ul className="ml-4 list-disc space-y-1">
              <li>Define decision variables clearly.</li>
              <li>Write the objective function (minimize or maximize).</li>
              <li>Write all constraints from resources/rules.</li>
              <li>Add non-negativity restrictions.</li>
              <li>Check units are consistent.</li>
              <li>Check every expression is linear.</li>
            </ul>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Expand each item to reveal the answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Linear programming models decisions where both the objective and
            constraints are linear sums of variables. Symbols{" "}
            <InlineMath>{"c^\\top x"}</InlineMath>, <InlineMath>{"Ax \\le b"}</InlineMath>, and{" "}
            <InlineMath>{"x \\ge 0"}</InlineMath> are just compact ways to write
            “maximize profit subject to resource limits.” LP is one of the most
            important tools for allocating limited resources efficiently.
            <p className="mt-3 text-sm">
              Next: <em>Graphical Method</em> — solve two-variable LPs by drawing
              the feasible region on an x₁–x₂ plane.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function GraphicalMethodPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "gm-q1",
      question: "Q1. When is the graphical method applicable?",
      answer:
        "Only for LP problems with two decision variables, because we need an x-y plot.",
    },
    {
      id: "gm-q2",
      question: "Q2. Why convert inequalities into equations first?",
      answer:
        "Equations give boundary lines; inequalities then tell us which side is feasible.",
    },
    {
      id: "gm-q3",
      question: "Q3. What are intercepts for 5x1 + 2x2 = 100?",
      answer:
        "x-intercept is (20, 0) and y-intercept is (0, 50).",
    },
    {
      id: "gm-q4",
      question: "Q4. Why must x1 >= 0 and x2 >= 0 be included on the graph?",
      answer:
        "They restrict the region to the first quadrant and remove infeasible negative values.",
    },
    {
      id: "gm-q5",
      question: "Q5. What is a corner point in LP geometry?",
      answer:
        "A vertex where boundary lines meet; feasible region edges intersect there.",
    },
    {
      id: "gm-q6",
      question: "Q6. Why evaluate the objective at every corner?",
      answer:
        "For LP, the best value is attained at at least one feasible corner point.",
    },
    {
      id: "gm-q7",
      question: "Q7. What common error causes wrong feasible regions?",
      answer:
        "Shading the wrong side of one inequality, which changes the intersection region.",
    },
    {
      id: "gm-q8",
      question: "Q8. If a point satisfies one constraint but not another, is it feasible?",
      answer:
        "No. A feasible point must satisfy all constraints simultaneously.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Graphical Method"
          description="Learn how to solve a two-variable linear program by plotting constraints and checking corner points."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        />
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Understand why the graphical method needs exactly two variables.</li>
          <li>Draw constraint boundary lines using intercepts.</li>
          <li>Shade the feasible region and find corner points.</li>
          <li>Evaluate profit <InlineMath>{"Z"}</InlineMath> at each corner to find the optimum.</li>
          <li>Read coordinates <InlineMath>{"(x_1, x_2)"}</InlineMath> as production plans.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Main idea</h2>
          <p>
            The <strong>graphical method</strong> solves a linear program by
            drawing it on a flat x–y chart. It only works when there are{" "}
            <strong>exactly two decision variables</strong> — otherwise we need
            more than two dimensions to draw.
          </p>
          <DefinitionBox title="The coordinate plane setup">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Horizontal axis = <InlineMath>{"x_1"}</InlineMath> (e.g. cakes)
              </li>
              <li>
                Vertical axis = <InlineMath>{"x_2"}</InlineMath> (e.g. cookies)
              </li>
              <li>
                A point <InlineMath>{"(x_1, x_2) = (15, 12.5)"}</InlineMath> means
                “make 15 cakes and 12.5 cookie batches”
              </li>
              <li>
                Each constraint is a <strong>half-plane</strong> — one side of a
                line is allowed, the other is not
              </li>
              <li>
                The <strong>feasible region</strong> is where all allowed sides
                overlap (usually a shaded polygon)
              </li>
            </ul>
          </DefinitionBox>
          <p>
            The method: draw lines → shade feasible sides → list corner points →
            plug each corner into the objective → pick the best.
          </p>
        </section>

        <section>
          <h2>Step-by-step method</h2>
          <StepByStepBox
            title="Eight steps on paper or in the plot below"
            steps={[
              <>Convert each inequality into an <strong>equation</strong> — that gives the boundary line (e.g. <InlineMath>{"5x_1 + 2x_2 = 100"}</InlineMath>).</>,
              <>Find <strong>intercepts</strong>: set one variable to 0 and solve for the other — two points determine a line.</>,
              <>Draw each line on the <InlineMath>{"x_1"}</InlineMath>–<InlineMath>{"x_2"}</InlineMath> plane.</>,
              <>For each inequality, shade the <strong>feasible side</strong> (for <InlineMath>{"\\le"}</InlineMath>, typically toward the origin).</>,
              <>The overlap of all shaded regions is the <strong>feasible region</strong>.</>,
              <>Mark <strong>corner points</strong> (vertices) where boundary lines meet.</>,
              <>Compute <InlineMath>{"Z"}</InlineMath> at every corner: substitute coordinates into <InlineMath>{"50x_1 + 30x_2"}</InlineMath>.</>,
              <>The corner with the highest <InlineMath>{"Z"}</InlineMath> (for maximization) is optimal.</>,
            ]}
          />
        </section>

        <section>
          <h2>Bakery example solved graphically</h2>
          <p>
            We reuse the bakery model from Page 4. Read each line before plotting:
          </p>
          <FormulaCard
            tex={
              "\\begin{aligned} \\max \\; Z &= 50x_1 + 30x_2 \\\\ \\text{s.t. } 5x_1 + 2x_2 &\\le 100 \\\\ 2x_1 + 4x_2 &\\le 80 \\\\ x_1, x_2 &\\ge 0 \\end{aligned}"
            }
            label="Bakery LP used for graphical method"
            number="5.1"
            caption="Same model as Page 4 — now we solve it by drawing."
          />
          <h3>What is an intercept?</h3>
          <p>
            An <strong>intercept</strong> is where a line crosses an axis. To
            find them, set one variable to zero and solve for the other — you get
            a point you can plot.
          </p>
          <h3>Flour line: <InlineMath>{"5x_1 + 2x_2 = 100"}</InlineMath></h3>
          <ul>
            <li>
              Set <InlineMath>{"x_2 = 0"}</InlineMath> (on the x₁-axis):{" "}
              <InlineMath>{"5x_1 = 100"}</InlineMath> → <InlineMath>{"x_1 = 20"}</InlineMath> →
              point <InlineMath>{"(20, 0)"}</InlineMath> — “20 cakes, 0 cookies.”
            </li>
            <li>
              Set <InlineMath>{"x_1 = 0"}</InlineMath> (on the x₂-axis):{" "}
              <InlineMath>{"2x_2 = 100"}</InlineMath> → <InlineMath>{"x_2 = 50"}</InlineMath> →
              point <InlineMath>{"(0, 50)"}</InlineMath>.
            </li>
            <li>
              Feasible side of <InlineMath>{"5x_1 + 2x_2 \\le 100"}</InlineMath> is{" "}
              <em>below</em> this line (uses at most 100 kg flour).
            </li>
          </ul>
          <h3>Sugar line: <InlineMath>{"2x_1 + 4x_2 = 80"}</InlineMath></h3>
          <ul>
            <li>
              <InlineMath>{"x_2 = 0"}</InlineMath> → <InlineMath>{"x_1 = 40"}</InlineMath> →{" "}
              <InlineMath>{"(40, 0)"}</InlineMath>.
            </li>
            <li>
              <InlineMath>{"x_1 = 0"}</InlineMath> → <InlineMath>{"x_2 = 20"}</InlineMath> →{" "}
              <InlineMath>{"(0, 20)"}</InlineMath>.
            </li>
            <li>
              Feasible side of <InlineMath>{"2x_1 + 4x_2 \\le 80"}</InlineMath> is below
              this line too.
            </li>
          </ul>
          <p>
            <InlineMath>{"x_1 \\ge 0"}</InlineMath> and <InlineMath>{"x_2 \\ge 0"}</InlineMath>{" "}
            restrict us to the <strong>first quadrant</strong> (upper-right of the
            origin) — no negative production.
          </p>

          <h3>Find intersection point step by step</h3>
          <StepByStepBox
            steps={[
              <>Start from the two boundary equations: <InlineMath>{"5x_1 + 2x_2 = 100"}</InlineMath> and <InlineMath>{"2x_1 + 4x_2 = 80"}</InlineMath>.</>,
              <>Simplify the second equation: <InlineMath>{"x_1 + 2x_2 = 40"}</InlineMath>, so <InlineMath>{"x_1 = 40 - 2x_2"}</InlineMath>.</>,
              <>Substitute into the first: <InlineMath>{"5(40 - 2x_2) + 2x_2 = 100"}</InlineMath>.</>,
              <>Solve: <InlineMath>{"200 - 10x_2 + 2x_2 = 100 \\Rightarrow -8x_2 = -100 \\Rightarrow x_2 = 12.5"}</InlineMath>.</>,
              <>Then <InlineMath>{"x_1 = 40 - 2(12.5) = 15"}</InlineMath>. Intersection point is <InlineMath>{"(15,12.5)"}</InlineMath>.</>,
            ]}
          />

          <h3>Evaluate objective at corner points</h3>
          <p>
            Corners are where constraints are “tight.” Plug each into{" "}
            <InlineMath>{"Z = 50x_1 + 30x_2"}</InlineMath>:
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Corner (x₁, x₂)</th>
                  <th className="px-3 py-2 text-left font-semibold">Meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Z = 50x₁ + 30x₂</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2">(0, 0)</td>
                  <td className="px-3 py-2 text-muted-foreground">Make nothing</td>
                  <td className="px-3 py-2">0</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2">(20, 0)</td>
                  <td className="px-3 py-2 text-muted-foreground">Flour limit, no cookies</td>
                  <td className="px-3 py-2">1000</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2">(0, 20)</td>
                  <td className="px-3 py-2 text-muted-foreground">Sugar limit, no cakes</td>
                  <td className="px-3 py-2">600</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">(15, 12.5)</td>
                  <td className="px-3 py-2 text-muted-foreground">Both flour and sugar tight</td>
                  <td className="px-3 py-2 font-medium">1125 (optimal)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <KeyIdeaBox title="Optimal plan in words">
            <p>
              Bake <strong>15 cakes</strong> and <strong>12.5 cookie batches</strong>{" "}
              for profit <strong>Rs. 1125</strong>. This uses all flour and all
              sugar exactly (both constraints are binding).
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Interactive feasible-region plot</h2>
          <p>
            Adjust cake and cookie profits with the sliders. The shaded polygon
            is the feasible region; corner labels show coordinates; the starred
            point is the optimal vertex for the current profits.
          </p>
          <GraphicalMethodInteractivePlot />
        </section>

        <section>
          <h2>Why optimum occurs at a corner point</h2>
          <p>
            The objective <InlineMath>{"Z = 50x_1 + 30x_2"}</InlineMath> is linear,
            so lines of equal profit (“iso-profit lines”) are straight and parallel.
            Slide such a line in the direction of increasing Z. The last point
            that still touches the feasible region will be on a <strong>corner</strong>{" "}
            of the polygon (or along an entire optimal edge in rare tie cases).
          </p>
          <p>
            Intuitively: you cannot beat a corner without leaving the feasible
            region, because linear objectives improve fastest along one direction
            until a constraint blocks further movement — and that blockage happens
            at edges and corners.
          </p>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Shading the wrong side of a constraint line.</li>
            <li>Forgetting <InlineMath>{"x_1 \\ge 0"}</InlineMath> and <InlineMath>{"x_2 \\ge 0"}</InlineMath>.</li>
            <li>Not checking all corner points.</li>
            <li>Mixing up x- and y-intercepts.</li>
            <li>Using infeasible points in objective evaluation.</li>
            <li>Confusing maximization with minimization direction.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Expand each item to reveal the answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            The graphical method solves two-variable LPs by plotting constraint
            lines on the <InlineMath>{"x_1"}</InlineMath>–<InlineMath>{"x_2"}</InlineMath>{" "}
            plane, shading the feasible polygon, and comparing objective values at
            every corner. For linear objectives, the optimum is always at a
            vertex of the feasible region.
            <p className="mt-3 text-sm">
              Next: <em>Simplex Method</em> — the same corner-walking idea for
              problems with more than two variables.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function SimplexMethodPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "sm-q1",
      question:
        "Q1. For Max Z = 4x₁ + 6x₂ with constraints x₁ ≤ 5, x₂ ≤ 8, x₁, x₂ ≥ 0, write the constraint x₂ ≤ 8 with a slack variable.",
      answer: (
        <>
          Add slack <InlineMath>{"s_2 \\ge 0"}</InlineMath>:{" "}
          <InlineMath>{"x_2 + s_2 = 8"}</InlineMath>.
        </>
      ),
    },
    {
      id: "sm-q2",
      question:
        "Q2. In the initial tableau for Max Z = 3x₁ + 5x₂ (this page's example), which variable enters first and why?",
      answer:
        "x₂ enters first because −5 is the most negative coefficient in the Z-row (largest improvement per unit for a maximization problem).",
    },
    {
      id: "sm-q3",
      question:
        "Q3. Perform one simplex iteration only: initial tableau has Z-row [−2, −7, 0, 0 | 0], constraint rows [1, 2, 1, 0 | 8] and [3, 1, 0, 1 | 9]. Which pivot column and row do you choose?",
      answer:
        "Pivot column: x₂ (coefficient −7). Ratio test: row 1 → 8÷2 = 4, row 2 → 9÷1 = 9. Pivot row: row 1 (smallest ratio 4). Pivot element: 2.",
    },
    {
      id: "sm-q4",
      question:
        "Q4. Perform one pivot only on this tableau (max problem): basis s₁, s₂; Z-row [−1, −3, 0, 0 | 0]; rows [2, 1, 1, 0 | 10] and [1, 3, 0, 1 | 12]. What are the new basic variables after the pivot?",
      answer:
        "Entering: x₂ (−3). Ratios: 10÷1 = 10, 12÷3 = 4 → s₂ leaves. After pivot, basic variables are s₁ and x₂.",
    },
    {
      id: "sm-q5",
      question: "Q5. When is a maximization simplex tableau optimal?",
      answer:
        "When every coefficient in the Z-row for non-basic variables is ≥ 0 (no entering variable can improve Z).",
    },
    {
      id: "sm-q6",
      question:
        "Q6. From the optimal tableau on this page, read x₁, x₂, and Z.",
      answer:
        "x₁ = 2 (RHS of x₁ row), x₂ = 6 (RHS of x₂ row), Z = 36 (bottom-right of Z-row).",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Simplex Method"
          description="Learn the classic algorithm that moves from corner to corner of the feasible region — from intuition through the full tableau."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        />
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>See why simplex replaces drawing when there are more than two variables.</li>
          <li>Understand slack variables <InlineMath>{"s_1, s_2, \\ldots"}</InlineMath> and what a tableau row means.</li>
          <li>Read a simplex table: basis, RHS, Z-row, pivot column and row.</li>
          <li>Perform entering/leaving variable logic and the ratio test.</li>
          <li>Extract the optimal <InlineMath>{"x_1, x_2"}</InlineMath> and <InlineMath>{"Z"}</InlineMath> from a final tableau.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why this page follows the graphical method</h2>
          <p>
            On Page 5 you found the optimum by listing <strong>corner points</strong>{" "}
            of a polygon. Simplex does the same corner-walking — but with algebra
            instead of a picture, so it works for 3, 30, or 30,000 variables.
          </p>
          <KeyIdeaBox title="Same idea, different scale">
            <p>
              Graphical method: shade → list vertices → plug into{" "}
              <InlineMath>{"Z"}</InlineMath>. Simplex: start at one vertex → move
              to a better neighbor → repeat until no improvement.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Intuition first</h2>
          <p>
            The graphical method checks corner points of the feasible region
            visually: you shade constraints, find vertices, and compare objective
            values. The simplex method does the same job algebraically.
          </p>
          <p>
            It starts at one corner (a basic feasible solution), then moves to a
            neighboring corner that improves the objective. It repeats until no
            neighboring corner is better — then it stops at the optimum.
          </p>
          <ExampleBox title="Corner-walking picture">
            <p>
              Think of the feasible region as a polygon. Graphical method: draw
              it and test vertices. Simplex: follow edges from vertex to vertex
              using row operations on a table, never leaving the feasible region.
            </p>
          </ExampleBox>
        </section>

        <section>
          <h2>Why simplex is needed</h2>
          <p>
            The graphical method works only when there are two decision variables.
            Real linear programs in logistics, finance, and scheduling often have
            hundreds, thousands, or even millions of variables.
          </p>
          <p>
            Simplex is systematic: the same pivot rules apply whether you have 2
            or 2,000 variables. Computers run it reliably once the problem is in
            standard tableau form.
          </p>
        </section>

        <section>
          <h2>Symbol guide: reading a simplex tableau</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Plain meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"s_1, s_2"}</InlineMath></td>
                  <td className="px-3 py-2">Slack — leftover capacity on a ≤ constraint</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">RHS</td>
                  <td className="px-3 py-2">Right-hand side — the number on the right of each equation (capacity, current value)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">Z-row</td>
                  <td className="px-3 py-2">Bottom row tracking profit; negative entries mean “we could still improve Z”</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">Basis</td>
                  <td className="px-3 py-2">Current basic variables (one per constraint row) — their values sit in RHS</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">Entering</td>
                  <td className="px-3 py-2">Variable that joins the basis next (improves Z)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">Leaving</td>
                  <td className="px-3 py-2">Basic variable that exits to make room — chosen by ratio test</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Pivot</td>
                  <td className="px-3 py-2">One tableau update: swap entering for leaving via row operations</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DefinitionBox title="What does x₁ + s₁ = 4 mean?">
            <p>
              Original constraint <InlineMath>{"x_1 \\le 4"}</InlineMath> becomes{" "}
              <InlineMath>{"x_1 + s_1 = 4"}</InlineMath>. If you produce{" "}
              <InlineMath>{"x_1 = 2"}</InlineMath> units, then{" "}
              <InlineMath>{"s_1 = 2"}</InlineMath> units of capacity remain unused.
              Slack is never negative.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Key concepts</h2>
          <div className="space-y-3">
            <DefinitionBox title="Standard form">
              A maximization LP with all constraints written as equations (using
              slack or surplus variables), right-hand sides non-negative, and all
              decision variables non-negative. Example:{" "}
              <InlineMath>{"x_1 + s_1 = 4"}</InlineMath> instead of{" "}
              <InlineMath>{"x_1 \\le 4"}</InlineMath>.
            </DefinitionBox>
            <DefinitionBox title="Slack variable">
              Added to a <InlineMath>{"\\le"}</InlineMath> constraint to turn it
              into an equation. It measures unused capacity. If{" "}
              <InlineMath>{"x_1 + s_1 = 4"}</InlineMath> and{" "}
              <InlineMath>{"x_1 = 2"}</InlineMath>, then{" "}
              <InlineMath>{"s_1 = 2"}</InlineMath> units of the resource are left
              over.
            </DefinitionBox>
            <DefinitionBox title="Surplus variable">
              Subtracted from a <InlineMath>{"\\ge"}</InlineMath> constraint to
              make an equation. Example:{" "}
              <InlineMath>{"x_1 - s_1 = 3"}</InlineMath> for{" "}
              <InlineMath>{"x_1 \\ge 3"}</InlineMath>. Less common in introductory
              maximization examples than slack variables.
            </DefinitionBox>
            <DefinitionBox title="Artificial variable (basic level)">
              A temporary variable added when a constraint has no obvious basic
              variable (e.g. equality or <InlineMath>{"\\ge"}</InlineMath>{" "}
              constraints). Phase I of simplex drives artificial variables to zero
              to find a starting feasible solution. Not needed for pure{" "}
              <InlineMath>{"\\le"}</InlineMath> maximization problems with slack
              variables only.
            </DefinitionBox>
            <DefinitionBox title="Basic variable">
              A variable that currently appears with coefficient 1 in exactly one
              constraint row and 0 in all other constraint rows. Its value is read
              from the RHS of that row. At most one basic variable per row.
            </DefinitionBox>
            <DefinitionBox title="Non-basic variable">
              Variables not in the current basis. In the standard simplex setup
              they are set to 0; their columns show how entering them would change
              the tableau.
            </DefinitionBox>
            <DefinitionBox title="Tableau">
              A table of all constraint coefficients, slack columns, and the
              objective row. Each row is one equation; the bottom row tracks{" "}
              <InlineMath>{"Z"}</InlineMath> (often written as{" "}
              <InlineMath>{"Z - c_1 x_1 - \\cdots = 0"}</InlineMath>).
            </DefinitionBox>
            <DefinitionBox title="Pivot">
              One simplex move: choose an entering column and leaving row, divide
              the pivot row by the pivot element, then eliminate the entering
              variable from all other rows. This swaps one basic variable for
              another.
            </DefinitionBox>
            <DefinitionBox title="Ratio test">
              For each constraint row with a positive coefficient in the pivot
              column, compute RHS ÷ (pivot-column entry). The smallest non-negative
              ratio picks the leaving row and keeps the solution feasible
              (non-negative RHS).
            </DefinitionBox>
          </div>
        </section>

        <section>
          <h2>Worked example</h2>
          <p>Solve step by step:</p>
          <FormulaCard
            tex={
              "\\begin{aligned} \\max \\; Z &= 3x_1 + 5x_2 \\\\ \\text{s.t. } x_1 &\\le 4 \\\\ 2x_2 &\\le 12 \\\\ 3x_1 + 2x_2 &\\le 18 \\\\ x_1, x_2 &\\ge 0 \\end{aligned}"
            }
            label="Simplex worked example"
            number="6.1"
            caption="Three ≤ constraints → three slack variables s₁, s₂, s₃."
          />
          <DefinitionBox title="Read formula (6.1) in words">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li>Maximize profit <InlineMath>{"Z = 3x_1 + 5x_2"}</InlineMath> (Rs. 3 per unit of product 1, Rs. 5 per unit of product 2).</li>
              <li>Constraint 1: at most 4 units of product 1 capacity.</li>
              <li>Constraint 2: at most 12 units of product 2 capacity (coefficient 2 on <InlineMath>{"x_2"}</InlineMath>).</li>
              <li>Constraint 3: combined usage <InlineMath>{"3x_1 + 2x_2 \\le 18"}</InlineMath>.</li>
            </ul>
          </DefinitionBox>

          <h3>Step 1 — Add slack variables</h3>
          <p>
            Turn each <InlineMath>{"\\le"}</InlineMath> into <InlineMath>{"="}</InlineMath> by
            adding slack on the left:
          </p>
          <ul>
            <li><InlineMath>{"x_1 + s_1 = 4"}</InlineMath> — slack <InlineMath>{"s_1"}</InlineMath> = unused capacity on row 1</li>
            <li><InlineMath>{"2x_2 + s_2 = 12"}</InlineMath> — slack <InlineMath>{"s_2"}</InlineMath> on row 2</li>
            <li><InlineMath>{"3x_1 + 2x_2 + s_3 = 18"}</InlineMath> — slack <InlineMath>{"s_3"}</InlineMath> on row 3</li>
          </ul>
          <p>
            Slack variables <InlineMath>{"s_1, s_2, s_3 \\ge 0"}</InlineMath> turn
            inequalities into equations. Initially they form the basis.
          </p>

          <h3>Step 2 — Objective equation</h3>
          <p>
            Rearrange so all variables are on the left and{" "}
            <InlineMath>{"Z"}</InlineMath> is isolated:
          </p>
          <BlockMath>{"Z - 3x_1 - 5x_2 = 0"}</BlockMath>

          <h3>Step 3 — Initial tableau</h3>
          <p>
            Each row is one equation. Row labels on the left show which variable
            is <strong>basic</strong> (its value = RHS). Columns are coefficients
            of <InlineMath>{"x_1, x_2, s_1, s_2, s_3"}</InlineMath>.
          </p>
          <div className="my-4 rounded-xl border bg-card p-4">
            <SimplexTable
              columns={["x₁", "x₂", "s₁", "s₂", "s₃", "RHS"]}
              rowLabels={["s₁", "s₂", "s₃", "Z"]}
              rows={[
                [1, 0, 1, 0, 0, 4],
                [0, 2, 0, 1, 0, 12],
                [3, 2, 0, 0, 1, 18],
                [-3, -5, 0, 0, 0, 0],
              ]}
            />
          </div>
          <p>
            Basic variables: <InlineMath>{"s_1, s_2, s_3"}</InlineMath> (start at the
            origin corner with <InlineMath>{"x_1 = x_2 = 0"}</InlineMath>). Current{" "}
            <InlineMath>{"Z = 0"}</InlineMath> — no production yet.
          </p>

          <h3>Step 4 — Choose pivot column (entering variable)</h3>
          <p>
            Look at the <strong>Z-row</strong> under decision columns. For
            maximization, the most <strong>negative</strong> entry means the
            largest profit gain per unit if we increase that variable. Here{" "}
            <InlineMath>{"-5"}</InlineMath> in column <InlineMath>{"x_2"}</InlineMath>{" "}
            is worse than <InlineMath>{"-3"}</InlineMath>, so{" "}
            <strong>x₂ enters</strong> the basis.
          </p>

          <h3>Step 5 — Ratio test (choose leaving variable)</h3>
          <p>
            For each row with a <strong>positive</strong> entry in the pivot
            column, compute <strong>RHS ÷ pivot-column entry</strong>. The{" "}
            <em>smallest</em> ratio tells which basic variable hits zero first —
            that one <strong>leaves</strong>.
          </p>
          <ul>
            <li>Row s₁: no positive entry in column x₂ → skip (cannot increase x₂ using this row).</li>
            <li>Row s₂: 12 ÷ 2 = <strong>6</strong></li>
            <li>Row s₃: 18 ÷ 2 = 9</li>
          </ul>
          <p>Smallest ratio is <strong>6</strong> → row s₂ limits us.</p>

          <h3>Step 6 — Choose pivot row</h3>
          <p>
            Row s₂ has the smallest ratio, so <strong>s₂ leaves</strong> and{" "}
            <strong>pivot element = 2</strong>.
          </p>

          <h3>Step 7 — Normalize pivot row</h3>
          <p>Divide row s₂ by 2:</p>
          <BlockMath>{"x_2 + \\tfrac{1}{2}s_2 = 6"}</BlockMath>
          <p>New row: [0, 1, 0, 0.5, 0 | 6]. Basis label changes from s₂ to x₂.</p>

          <h3>Step 8 — Eliminate other entries in pivot column</h3>
          <p>
            Row s₃ had 2 in column x₂. Subtract 2 × (new pivot row) from row s₃:
          </p>
          <BlockMath>{"[3,2,0,0,1,18] - 2\\cdot[0,1,0,\\tfrac{1}{2},0,6] = [3,0,0,-1,1,6]"}</BlockMath>
          <p>
            Z-row had −5 in column x₂. Add 5 × (new pivot row) to Z-row:
          </p>
          <BlockMath>{"[-3,-5,0,0,0,0] + 5\\cdot[0,1,0,\\tfrac{1}{2},0,6] = [-3,0,0,\\tfrac{5}{2},0,30]"}</BlockMath>

          <h3>Step 9 — Repeat until optimal</h3>
          <p>After iteration 1, Z-row still has −3 in column x₁ → x₁ enters.</p>
          <p>Ratio test: s₁ → 4÷1 = 4, s₃ → 6÷3 = <strong>2</strong> → s₃ leaves.</p>
          <p>Normalize s₃ row (divide by 3), then eliminate x₁ from other rows:</p>
          <div className="my-4 rounded-xl border bg-card p-4">
            <SimplexTable
              columns={["x₁", "x₂", "s₁", "s₂", "s₃", "RHS"]}
              rowLabels={["s₁", "x₂", "x₁", "Z"]}
              rows={[
                [0, 0, 1, 1 / 3, -1 / 3, 2],
                [0, 1, 0, 0.5, 0, 6],
                [1, 0, 0, -1 / 3, 1 / 3, 2],
                [0, 0, 0, 1.5, 1, 36],
              ]}
              caption="Optimal tableau — all Z-row coefficients for non-basic vars are ≥ 0"
            />
          </div>

          <h3>Step 10 — Read final solution from the tableau</h3>
          <p>
            When the Z-row has no negative coefficients, stop. Read basic
            variables from the <strong>RHS</strong> of their rows; set all
            non-basic variables to <strong>0</strong>.
          </p>
          <ul>
            <li>
              Basic: <InlineMath>{"x_1 = 2"}</InlineMath>,{" "}
              <InlineMath>{"x_2 = 6"}</InlineMath>,{" "}
              <InlineMath>{"s_1 = 2"}</InlineMath>
            </li>
            <li>
              Non-basic (set to 0): <InlineMath>{"s_2 = 0"}</InlineMath>,{" "}
              <InlineMath>{"s_3 = 0"}</InlineMath>
            </li>
            <li>
              Optimum: <InlineMath>{"Z = 36"}</InlineMath>
            </li>
          </ul>
          <p>
            Check: <InlineMath>{"3(2) + 5(6) = 36"}</InlineMath>; constraints
            x₁ = 2 ≤ 4, 2x₂ = 12 ≤ 12, 3(2)+2(6) = 18 ≤ 18 — all satisfied.
          </p>
        </section>

        <section>
          <h2>Interactive simplex tableau</h2>
          <p>
            Step through the same example. Amber highlights the entering column,
            blue the leaving row, and the indigo ring marks the pivot element.
          </p>
          <SimplexMethodInteractiveTable />
        </section>

        <section>
          <h2>Important cases</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>
              <strong>Unique optimum:</strong> Z-row has no negative (max) entries
              and exactly one optimal corner solution — typical outcome.
            </li>
            <li>
              <strong>Multiple optima:</strong> At optimality, a non-basic variable
              has zero reduced cost in the objective row. Different optimal
              solutions lie along an edge of the feasible region.
            </li>
            <li>
              <strong>Unbounded problem:</strong> Pivot column chosen but no
              positive entry exists for ratio test — objective can grow without
              limit.
            </li>
            <li>
              <strong>Infeasible problem:</strong> No starting basic feasible
              solution exists (constraints contradict). Artificial-variable Phase I
              detects this.
            </li>
            <li>
              <strong>Degeneracy:</strong> A basic variable is zero at a pivot (tie
              in ratio test). Algorithm continues but may take extra steps; cycling
              is rare in practice.
            </li>
          </ul>
        </section>

        <section>
          <h2>Simplex algorithm</h2>
          <h3>In plain English</h3>
          <StepByStepBox
            title="Maximization simplex"
            steps={[
              <>Put the LP in standard form with slack variables.</>,
              <>Build the initial tableau; slack variables give a starting basis.</>,
              <>If the Z-row has no negative coefficients, stop — optimal.</>,
              <>Otherwise pick the entering variable (most negative Z-row coeff).</>,
              <>Run the ratio test to choose the leaving variable.</>,
              <>Pivot: normalize the pivot row, eliminate the entering column elsewhere.</>,
              <>Repeat from the optimality check.</>,
              <>Read basic variable values from RHS; Z from bottom-right.</>,
            ]}
          />

          <h3>Tableau version</h3>
          <FormulaCard
            tex={
              "\\text{Entering: } j = \\arg\\min_{j \\in \\mathcal{N}} \\bar{c}_j \\quad (\\bar{c}_j < 0); \\quad \\text{Leaving: } i = \\arg\\min_{a_{ij}>0} \\frac{b_i}{a_{ij}}"
            }
            label="Entering and leaving rules (maximization)"
            number="6.2"
            caption="Formal pivot rules — same logic as Steps 4–6 in the worked example."
          />
          <DefinitionBox title="Read (6.2) in words">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"\\bar{c}_j"}</InlineMath> — coefficient of variable <InlineMath>{"j"}</InlineMath> in the Z-row (reduced cost).</li>
              <li><strong>Entering:</strong> pick the most negative <InlineMath>{"\\bar{c}_j"}</InlineMath> among non-basic columns.</li>
              <li><strong>Leaving:</strong> for each row with positive entry <InlineMath>{"a_{ij}"}</InlineMath> in that column, compute <InlineMath>{"b_i / a_{ij}"}</InlineMath> (RHS ÷ pivot-column entry).</li>
              <li>Choose the row with the <em>smallest</em> ratio — that basic variable hits zero first.</li>
            </ol>
          </DefinitionBox>

          <h3>Exam checklist</h3>
          <KeyIdeaBox title="Before you hand in">
            <ul className="ml-4 list-disc space-y-1">
              <li>Convert to standard form (slack/surplus/artificial if needed).</li>
              <li>Write Z-row as Z − c₁x₁ − … = 0.</li>
              <li>Identify current basic variables from basis column.</li>
              <li>Check optimality before pivoting.</li>
              <li>Pivot column = most negative in Z-row (max).</li>
              <li>Ratio test only on positive pivot-column entries.</li>
              <li>After pivot, update basis labels.</li>
              <li>Final answer: list x values and Z; verify non-negativity.</li>
            </ul>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Graphical vs simplex comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Aspect</th>
                  <th className="px-3 py-2 text-left font-semibold">Graphical method</th>
                  <th className="px-3 py-2 text-left font-semibold">Simplex method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-medium">Approach</td>
                  <td className="px-3 py-2">Visual (draw and shade)</td>
                  <td className="px-3 py-2">Algebraic (tableau + pivots)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-medium">Variables</td>
                  <td className="px-3 py-2">Exactly 2 decision variables</td>
                  <td className="px-3 py-2">Any number of variables</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-medium">Intuition</td>
                  <td className="px-3 py-2">Easy to see corners and feasible region</td>
                  <td className="px-3 py-2">Less visual, but same corner logic</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-medium">Scalability</td>
                  <td className="px-3 py-2">Classroom tool only</td>
                  <td className="px-3 py-2">Basis of industrial LP solvers</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Execution</td>
                  <td className="px-3 py-2">Manual drawing</td>
                  <td className="px-3 py-2">Systematic algorithm (hand or computer)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Choosing the wrong pivot column (e.g. smallest instead of most negative Z-row entry for max).</li>
            <li>Ratio test errors: dividing by zero or negative pivot-column entries, or ignoring ties incorrectly.</li>
            <li>Forgetting non-negativity — a negative RHS after pivot means the ratio test was wrong.</li>
            <li>Reading the final answer from non-basic columns instead of basic rows' RHS.</li>
            <li>Stopping too early when the Z-row still has a negative coefficient.</li>
            <li>Not converting the objective to Z − c₁x₁ − … = 0 before building the tableau.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Expand each item to reveal the answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            The simplex method solves linear programs by walking from one basic
            feasible corner to a better one using tableau pivots. Slack variables
            turn <InlineMath>{"\\le"}</InlineMath> into <InlineMath>{"="}</InlineMath>;
            the ratio test keeps RHS non-negative; optimality is when the Z-row
            has no negative entries (for maximization).
            <p className="mt-3 text-sm">
              Next: <em>Duality and Sensitivity Analysis</em> — what each
              resource is worth at the optimum and how the solution changes when
              data changes.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function GraphicalMethodInteractivePlot() {
  const [cakeProfit, setCakeProfit] = useState(50);
  const [cookieProfit, setCookieProfit] = useState(30);

  const corners = useMemo(
    () => [
      { x: 0, y: 0, name: "(0,0)" },
      { x: 20, y: 0, name: "(20,0)" },
      { x: 15, y: 12.5, name: "(15,12.5)" },
      { x: 0, y: 20, name: "(0,20)" },
    ],
    [],
  );

  const evaluated = useMemo(
    () =>
      corners.map((p) => ({
        ...p,
        z: cakeProfit * p.x + cookieProfit * p.y,
      })),
    [corners, cakeProfit, cookieProfit],
  );

  const optimum = useMemo(
    () => evaluated.reduce((best, p) => (p.z > best.z ? p : best), evaluated[0]),
    [evaluated],
  );

  const plotData = useMemo(() => {
    const flourX = [0, 20];
    const flourY = [50, 0];
    const sugarX = [0, 40];
    const sugarY = [20, 0];
    return [
      {
        x: [0, 20, 15, 0, 0],
        y: [0, 0, 12.5, 20, 0],
        type: "scatter",
        mode: "lines",
        fill: "toself",
        fillcolor: "rgba(99,102,241,0.18)",
        line: { color: "rgb(79,70,229)", width: 2 },
        name: "Feasible region",
        hoverinfo: "skip",
      },
      {
        x: flourX,
        y: flourY,
        type: "scatter",
        mode: "lines",
        line: { dash: "dot", width: 2 },
        name: "5x1 + 2x2 = 100",
      },
      {
        x: sugarX,
        y: sugarY,
        type: "scatter",
        mode: "lines",
        line: { dash: "dot", width: 2 },
        name: "2x1 + 4x2 = 80",
      },
      {
        x: evaluated.map((p) => p.x),
        y: evaluated.map((p) => p.y),
        customdata: evaluated.map((p) => [p.name, p.z]),
        type: "scatter",
        mode: "markers+text",
        marker: { size: 9, color: "rgb(14,165,233)" },
        text: evaluated.map((p) => p.name),
        textposition: "top center",
        textfont: { size: 10 },
        name: "Corner points",
        hovertemplate:
          "Point %{customdata[0]}<br>x1=%{x}, x2=%{y}<br>Z=%{customdata[1]:.2f}<extra></extra>",
      },
      {
        x: [optimum.x],
        y: [optimum.y],
        customdata: [[optimum.name, optimum.z]],
        type: "scatter",
        mode: "markers+text",
        marker: { size: 14, color: "rgb(239,68,68)", symbol: "star" },
        text: ["Optimal point"],
        textposition: "top center",
        name: "Optimum",
        hovertemplate:
          "Optimal %{customdata[0]}<br>x1=%{x}, x2=%{y}<br>Z=%{customdata[1]:.2f}<extra></extra>",
      },
    ];
  }, [evaluated, optimum]);

  const plotLayout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "Cakes (x1)" }, range: [0, 45] },
      yaxis: { title: { text: "Cookies (x2)" }, range: [0, 55] },
      legend: { orientation: "h", y: -0.25 },
      margin: { l: 50, r: 20, t: 20, b: 70 },
      showlegend: true,
    }),
    [],
  );

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        Change profits using sliders. The objective values at corner points and
        the highlighted optimal point update automatically.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium">Cake profit (Rs.)</span>
          <input
            type="range"
            min={10}
            max={100}
            step={1}
            value={cakeProfit}
            onChange={(e) => setCakeProfit(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-500"
          />
          <span className="text-xs text-muted-foreground">Current: {cakeProfit}</span>
        </label>
        <label className="text-sm">
          <span className="font-medium">Cookie profit (Rs.)</span>
          <input
            type="range"
            min={10}
            max={100}
            step={1}
            value={cookieProfit}
            onChange={(e) => setCookieProfit(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-500"
          />
          <span className="text-xs text-muted-foreground">Current: {cookieProfit}</span>
        </label>
      </div>
      <div className="rounded-lg border bg-background/30 p-3 text-sm">
        <p>
          Objective:{" "}
          <InlineMath>{`Z = ${cakeProfit}x_1 + ${cookieProfit}x_2`}</InlineMath>
        </p>
        <p>
          Current optimum: <strong>{optimum.name}</strong> with{" "}
          <InlineMath>{`Z = ${optimum.z.toFixed(2)}`}</InlineMath>
        </p>
      </div>
      <PlotlyChart
        data={plotData}
        layout={plotLayout}
        ariaLabel="Interactive feasible region for bakery linear program"
        height={420}
      />
    </div>
  );
}

function WhatIsOptimizationPage({ page, index, totalPages }: IntroProps) {
  const headerKeyTerms = useMemo(
    () => [
      "optimization",
      "objective function",
      "decision variable",
      "constraint",
      "feasible solution",
      "optimal solution",
    ],
    [],
  );

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      {/* 1. Page header */}
      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title={page.title}
          description={page.description}
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Key terms:{" "}
            <span className="font-medium text-foreground">
              {headerKeyTerms.join(", ")}
            </span>
          </span>
        </PageHeader>
      </div>

      {/* 2. Learning objectives */}
      <KeyIdeaBox title="What you'll learn on this page">
        <ul className="ml-4 list-disc space-y-1">
          <li>What optimization means in everyday language and in math.</li>
          <li>What it means for a solution to be “best”.</li>
          <li>The difference between minimization and maximization.</li>
          <li>What an objective function is — and how to read <InlineMath>{"f(x)"}</InlineMath>.</li>
          <li>What decision variables are — and what <InlineMath>{"x"}</InlineMath> stands for.</li>
          <li>What constraints are and what “feasible” means.</li>
          <li>How to read symbols like <InlineMath>{"x \\in \\mathbb{R}"}</InlineMath> and <InlineMath>{"x^*"}</InlineMath>.</li>
          <li>Why optimization sits at the heart of data science and ML.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        {/* 3. Main explanation */}
        <section>
          <h2>What is optimization?</h2>
          <p>
            At a high level,{" "}
            <strong>optimization means finding the best possible solution</strong>{" "}
            among many possible choices.
          </p>
          <p>
            In everyday life we constantly optimize without calling it that:
            choosing a route to work, deciding how to allocate study time, or
            planning a budget. In each case we have many options, and we care
            about finding a particularly good one.
          </p>
          <p>
            In real situations, “best” can mean many different things:
          </p>
          <ul>
            <li>shortest travel time</li>
            <li>lowest cost</li>
            <li>highest profit</li>
            <li>lowest prediction error</li>
            <li>highest accuracy</li>
            <li>lowest risk</li>
            <li>maximum efficiency</li>
          </ul>
          <p>
            A computer cannot work directly with vague words like “shortest” or
            “best”. To optimize, we must first{" "}
            <strong>translate “best” into a single number</strong> that measures
            how good each option is. That number is called the{" "}
            <strong>objective function</strong>.
          </p>
        </section>

        {/* 4. Real-life examples */}
        <section>
          <h2>Real-life examples of optimization</h2>

          <h3>Example A: choosing the shortest travel route</h3>
          <p>
            Suppose you want to travel from home to your campus. There are many
            possible routes (different roads, different turns), and traffic
            changes over time.
          </p>
          <ExampleBox title="Shortest travel route">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>Decision variable:</strong> which route you take.
              </li>
              <li>
                <strong>Objective:</strong> minimize total travel time (or
                distance).
              </li>
              <li>
                <strong>Constraints:</strong> only use roads that exist, obey
                one-way restrictions, avoid closed roads, respect toll and
                vehicle restrictions.
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              Mathematically, we want to{" "}
              <InlineMath>{"\\min \\; \\text{total travel time}"}</InlineMath>.
            </p>
          </ExampleBox>

          <h3>Example B: planning your study time</h3>
          <p>
            You have limited hours before an exam and several subjects to study.
            You want to distribute your time to get the highest possible score.
          </p>
          <ExampleBox title="Study time planning">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>Decision variables:</strong> hours spent on each
                subject.
              </li>
              <li>
                <strong>Objective:</strong> maximize expected exam score.
              </li>
              <li>
                <strong>Constraints:</strong> total hours available, minimum
                sleep, maybe a maximum number of hours one can concentrate on a
                single subject.
              </li>
            </ul>
          </ExampleBox>

          <h3>Example C: maximizing business profit</h3>
          <p>
            A small factory produces two products. Each product uses materials
            and labour, and earns a certain profit per unit.
          </p>
          <ExampleBox title="Business profit">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>Decision variables:</strong> how many units of each
                product to produce.
              </li>
              <li>
                <strong>Objective:</strong> maximize total profit.
              </li>
              <li>
                <strong>Constraints:</strong> limited raw materials, labour
                hours, machine capacity, and market demand.
              </li>
            </ul>
          </ExampleBox>

          <h3>Example D: minimizing machine learning error</h3>
          <p>
            In supervised learning, we choose model parameters (weights) so that
            predictions are as close as possible to the observed data.
          </p>
          <ExampleBox title="Machine learning prediction error">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>Decision variables:</strong> model parameters (weights,
                biases, etc.).
              </li>
              <li>
                <strong>Objective:</strong> minimize prediction error, e.g.{" "}
                <InlineMath>{"f(\\theta) = \\text{mean squared error}"}</InlineMath>.
              </li>
              <li>
                <strong>Constraints:</strong> sometimes regularization
                penalties, fairness constraints, or limits on memory and compute
                time.
              </li>
            </ul>
          </ExampleBox>
        </section>

        {/* 5. Beginner notation guide */}
        <section>
          <h2>Reading the math: a beginner&apos;s symbol guide</h2>
          <p>
            Optimization uses short mathematical symbols so we can write problems
            precisely. You do <strong>not</strong> need advanced calculus to
            start — you only need to know what each letter <em>represents</em>.
            Think of symbols as labels on a diagram.
          </p>

          <DefinitionBox title="What is x?">
            <p>
              <InlineMath>{"x"}</InlineMath> is the standard name for a{" "}
              <strong>decision variable</strong> — the thing you are allowed to
              choose. It is just a placeholder, like a blank in a form.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                In “how many hours of Math to study?”, you might call that
                number <InlineMath>{"x"}</InlineMath>.
              </li>
              <li>
                In “how many cakes to bake?”, you might call that{" "}
                <InlineMath>{"x_1"}</InlineMath> and cookies{" "}
                <InlineMath>{"x_2"}</InlineMath> when there are two products.
              </li>
              <li>
                <InlineMath>{"x"}</InlineMath> is <em>not</em> a fixed number
                until you solve the problem. Before solving, it means “whatever
                value we might pick”.
              </li>
            </ul>
          </DefinitionBox>

          <DefinitionBox title="What is f(x)?">
            <p>
              <InlineMath>{"f(x)"}</InlineMath> reads “f of x”. It is the{" "}
              <strong>objective function</strong>: a formula that turns your
              choice <InlineMath>{"x"}</InlineMath> into a single score (cost,
              error, time, profit, etc.).
            </p>
            <p className="mt-2">
              Example: if <InlineMath>{"f(x) = (x-3)^2 + 2"}</InlineMath>, then
              choosing <InlineMath>{"x=5"}</InlineMath> gives{" "}
              <InlineMath>{"f(5)=6"}</InlineMath>. The computer evaluates{" "}
              <InlineMath>{"f"}</InlineMath> for many candidate values of{" "}
              <InlineMath>{"x"}</InlineMath> to find the best one.
            </p>
          </DefinitionBox>

          <DefinitionBox title="What does x ∈ ℝ mean?">
            <p>
              <InlineMath>{"\\mathbb{R}"}</InlineMath> (written “R” in plain
              text) means the <strong>real numbers</strong> — ordinary numbers on
              the number line: …, −1, 0, 0.5, 3, π, …
            </p>
            <p className="mt-2">
              The symbol <InlineMath>{"\\in"}</InlineMath> means “belongs to” or
              “is allowed to be any value in”. So
            </p>
            <BlockMath>{"x \\in \\mathbb{R}"}</BlockMath>
            <p>
              means: <InlineMath>{"x"}</InlineMath> can be any real number
              (unless other constraints restrict it further). You might also see
              constraints like <InlineMath>{"x \\ge 0"}</InlineMath>, which means
              “x must be zero or positive”.
            </p>
          </DefinitionBox>

          <DefinitionBox title="What does x ∈ ℝⁿ mean?">
            <p>
              When you make <strong>several choices at once</strong>, we pack
              them into a <strong>vector</strong> (a list of numbers):
            </p>
            <BlockMath>
              {"x = (x_1, x_2, \\ldots, x_n)"}
            </BlockMath>
            <p>
              Here <InlineMath>{"n"}</InlineMath> is simply <em>how many</em>{" "}
              decision variables you have. The expression{" "}
              <InlineMath>{"\\mathbb{R}^n"}</InlineMath> means “all lists of{" "}
              <InlineMath>{"n"}</InlineMath> real numbers”.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Example: study hours for Math (<InlineMath>{"x_1"}</InlineMath>)
              and Statistics (<InlineMath>{"x_2"}</InlineMath>) give{" "}
              <InlineMath>{"n=2"}</InlineMath>, so{" "}
              <InlineMath>{"x \\in \\mathbb{R}^2"}</InlineMath>.
            </p>
          </DefinitionBox>

          <DefinitionBox title="What do min, max, and x* mean?">
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <InlineMath>{"\\min"}</InlineMath> — find the <strong>smallest</strong>{" "}
                possible value of the objective.
              </li>
              <li>
                <InlineMath>{"\\max"}</InlineMath> — find the <strong>largest</strong>{" "}
                possible value of the objective.
              </li>
              <li>
                <InlineMath>{"x^*"}</InlineMath> (read “x-star”) — the{" "}
                <strong>best choice</strong> you found; the optimal decision.
              </li>
              <li>
                <InlineMath>{"f(x^*)"}</InlineMath> — the objective value at that
                best choice (the optimal score).
              </li>
              <li>
                <InlineMath>{"\\arg\\min"}</InlineMath> — “the x that achieves the
                minimum”. So <InlineMath>{"x^* = \\arg\\min_x f(x)"}</InlineMath>{" "}
                means “x* is the input that makes f as small as possible”.
              </li>
            </ul>
          </DefinitionBox>

          <DefinitionBox title="What are gᵢ(x) and hⱼ(x)? (constraints)">
            <p>
              Constraints are rules your choice must satisfy. We often number
              them with subscripts:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <InlineMath>{"g_i(x) \\le 0"}</InlineMath> — inequality constraint
                number <InlineMath>{"i"}</InlineMath> (≤, at most, or “stay below
                a limit”).
              </li>
              <li>
                <InlineMath>{"h_j(x) = 0"}</InlineMath> — equality constraint
                number <InlineMath>{"j"}</InlineMath> (must match exactly, e.g.
                “total hours = 6”).
              </li>
            </ul>
            <p className="mt-2">
              The subscripts <InlineMath>{"i"}</InlineMath> and{" "}
              <InlineMath>{"j"}</InlineMath> are just counters (1st constraint, 2nd
              constraint, …). You will often see concrete forms instead, such as{" "}
              <InlineMath>{"x + y \\le 5"}</InlineMath> or{" "}
              <InlineMath>{"x \\ge 0"}</InlineMath>.
            </p>
          </DefinitionBox>
        </section>

        {/* 6. Mathematical form */}
        <section>
          <h2>Mathematical form of an optimization problem</h2>
          <p>
            Now we put the pieces together. The standard way to write a
            minimization problem is:
          </p>
          <FormulaCard
            tex={"\\min_{x} \\; f(x)"}
            label="Minimization problem"
            number="1.1"
            caption="Choose x so that f(x) is as small as possible."
          />
          <FormulaCard
            tex={"\\max_{x} \\; f(x)"}
            label="Maximization problem"
            number="1.2"
            caption="Choose x so that f(x) is as large as possible."
          />
          <p>
            Read formula (1.1) left to right:
          </p>
          <ol className="ml-4 list-decimal space-y-2">
            <li>
              <InlineMath>{"\\min_x"}</InlineMath> — “among all allowed values of{" "}
              <InlineMath>{"x"}</InlineMath>, find the one that gives the smallest
              output”.
            </li>
            <li>
              <InlineMath>{"f(x)"}</InlineMath> — the score we are trying to make
              as small as possible.
            </li>
          </ol>
          <p>
            Maximization is the same idea with <InlineMath>{"\\max"}</InlineMath>{" "}
            instead of <InlineMath>{"\\min"}</InlineMath>.
          </p>
          <p>
            In words: <strong>pick x to make f(x) as small (or large) as possible.</strong>
          </p>
          <KeyIdeaBox title="One-line translation">
            <p>
              <InlineMath>{"\\min_x f(x)"}</InlineMath> means:{" "}
              <em>
                “Search over x and find the choice that gives the lowest value of
                f.”
              </em>
            </p>
          </KeyIdeaBox>
          <p>
            Often <InlineMath>{"x"}</InlineMath> is one number, so we write{" "}
            <InlineMath>{"x \\in \\mathbb{R}"}</InlineMath>. When you choose many
            things together (hours for several subjects, units of several
            products), we collect them in a list and write:
          </p>
          <BlockMath>{"x \\in \\mathbb{R}^n"}</BlockMath>
          <p>
            <strong>Constraints</strong> shrink the set of x-values you are
            allowed to try. For example:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <InlineMath>{"x + y \\le 5"}</InlineMath> — total hours at most 5
            </li>
            <li>
              <InlineMath>{"x \\ge 2"}</InlineMath> — at least 2 hours of Math
            </li>
            <li>
              <InlineMath>{"x + y = 6"}</InlineMath> — exactly 6 hours in total
              (equality)
            </li>
          </ul>
          <p>
            In general notation we sometimes write inequalities as{" "}
            <InlineMath>{"g_i(x) \\le 0"}</InlineMath> and equalities as{" "}
            <InlineMath>{"h_j(x) = 0"}</InlineMath>, but the meaning is always:
            <strong> these are the rules x must obey.</strong>
          </p>
          <p>
            The set of all <InlineMath>{"x"}</InlineMath> that satisfy every
            constraint is called the <strong>feasible set</strong> (or{" "}
            <strong>feasible region</strong>). Any <InlineMath>{"x"}</InlineMath>{" "}
            in this set is a <strong>feasible solution</strong> — a choice that
            does not break the rules.
          </p>
          <p>
            An <strong>optimal solution</strong> is a feasible choice that is
            best according to the objective. We label it{" "}
            <InlineMath>{"x^*"}</InlineMath> (“x-star”):
          </p>
          <BlockMath>{"x^* = \\arg\\min_{x} f(x), \\quad f(x^*) = \\min_{x} f(x)."}
          </BlockMath>
          <p>
            Separate the <strong>best choice</strong> from the{" "}
            <strong>best score</strong>:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <InlineMath>{"x^*"}</InlineMath> — the minimizer (the best input)
            </li>
            <li>
              <InlineMath>{"f(x^*)"}</InlineMath> — the minimum value (the best
              output)
            </li>
          </ul>
          <p>Formally:</p>
        </section>

        {/* 6. Minimize vs maximize */}
        <section>
          <h2>Minimize vs. maximize</h2>
          <p>
            In practice we can often turn a maximization problem into a
            minimization problem, and vice versa. So many optimization methods
            focus only on minimization.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">
                    Minimization problems
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Maximization problems
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2">
                    Reduce error (e.g.{" "}
                    <InlineMath>{"\\min f(\\theta)"}</InlineMath> where{" "}
                    <InlineMath>{"f"}</InlineMath> is loss).
                  </td>
                  <td className="px-3 py-2">
                    Increase accuracy (e.g. maximize correct predictions).
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2">Reduce cost or spending.</td>
                  <td className="px-3 py-2">Increase profit or revenue.</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2">Reduce time or waiting.</td>
                  <td className="px-3 py-2">Increase production or throughput.</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Reduce risk or volatility.</td>
                  <td className="px-3 py-2">
                    Increase expected return (for a given risk).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Formally, a maximization problem
          </p>
          <BlockMath>{"\\max_{x} \\, f(x)"}</BlockMath>
          <p>can always be rewritten as the equivalent minimization problem</p>
          <BlockMath>{"\\min_{x} \\, [-f(x)]"}</BlockMath>
          <p>
            because the point that makes <InlineMath>{"f(x)"}</InlineMath>{" "}
            large also makes <InlineMath>{"-f(x)"}</InlineMath> small.
          </p>
        </section>

        {/* 8. Interactive visualization */}
        <section>
          <h2>Visualizing a simple minimum</h2>
          <p>
            Consider the one-dimensional function{" "}
            <InlineMath>{"f(x) = (x - 3)^2 + 2"}</InlineMath>.
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <InlineMath>{"x"}</InlineMath> is the horizontal axis — the value
              you choose.
            </li>
            <li>
              <InlineMath>{"f(x)"}</InlineMath> is the height of the curve — how
              “bad” that choice is (we want the lowest point).
            </li>
            <li>
              The lowest point is at <InlineMath>{"x^* = 3"}</InlineMath> with
              score <InlineMath>{"f(3) = 2"}</InlineMath>.
            </li>
          </ul>
          <p>
            Use the slider to pick different values of <InlineMath>{"x"}</InlineMath>.
            The blue dot shows your current choice; the starred point shows the
            minimum.
          </p>
          <OptimizationIntroVisualization />
        </section>

        {/* 9. Big solved example */}
        <section>
          <h2>Solved example: planning 6 hours of study</h2>
          <OptimizationIntroSolvedExample />
        </section>

        {/* 9. Key terms */}
        <section>
          <h2>Key terms on this page</h2>
          <dl className="space-y-3 text-sm">
            <Term
              term="Optimization"
              definition="The process of choosing the best possible solution from a set of feasible options."
            />
            <Term
              term="Decision variable"
              definition="A quantity we can choose or control; optimization searches over all allowed values of the decision variables."
              math="x, \\; x \\in \\mathbb{R}^n"
            />
            <Term
              term="Objective function"
              definition="A function that assigns a numerical score to each choice; we minimize or maximize this score."
              math="f(x)"
            />
            <Term
              term="Constraint"
              definition="A rule the decision variables must satisfy, such as time, budget, or capacity limits."
              math="g_i(x) \\le 0, \\; h_j(x) = 0"
            />
            <Term
              term="Feasible solution"
              definition="A choice of the decision variables that satisfies all constraints."
            />
            <Term
              term="Optimal solution"
              definition="A feasible solution that gives the best (smallest or largest) objective value."
              math="x^* = \\arg\\min_x f(x)"
            />
            <Term
              term="Minimizer"
              definition="A point x* where the objective attains its minimum value."
              math="x^*"
            />
            <Term
              term="Minimum value"
              definition="The objective value at the minimizer."
              math="f(x^*)"
            />
            <Term
              term="Maximizer"
              definition="A point x* where the objective attains its maximum value."
            />
            <Term
              term="Maximum value"
              definition="The objective value at the maximizer."
            />
          </dl>
        </section>

        {/* 10. Common mistakes */}
        <section>
          <h2>Common mistakes when defining optimization problems</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>
              <strong>Confusing the variable with the objective.</strong>{" "}
              Writing “minimize <InlineMath>{"x"}</InlineMath>” instead of
              “minimize <InlineMath>{"f(x)"}</InlineMath>”.
            </li>
            <li>
              <strong>Forgetting constraints.</strong> Proposing a solution that
              looks good but violates time, budget, or capacity limits.
            </li>
            <li>
              <strong>Assuming every good solution is optimal.</strong> A
              solution can be better than many others but still not the very
              best.
            </li>
            <li>
              <strong>Not defining “best” numerically.</strong> Saying “choose
              the best model” without specifying a metric (error, accuracy,
              F1-score, etc.).
            </li>
            <li>
              <strong>Confusing minimizer with minimum value.</strong>{" "}
              <InlineMath>{"x^*"}</InlineMath> is the minimizer;{" "}
              <InlineMath>{"f(x^*)"}</InlineMath> is the minimum value.
            </li>
          </ul>
        </section>

        {/* 11. Practice questions */}
        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Try these on your own first. Then expand each question to check a
            suggested answer.
          </p>

          <Accordion
            type="multiple"
            className="mt-4 rounded-xl border bg-card px-4 py-2"
          >
            {/* Identify variables / objective / constraints */}
            <AccordionItem value="q1">
              <AccordionTrigger>
                Q1. Identifying parts of an optimization problem (commute)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You want to get to work as quickly as possible. How would you
                  describe the decision variable, objective, and constraints?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> Decision variable: the
                  route you choose. Objective: minimize total travel time.
                  Constraints: only take available roads, respect one-way
                  streets, speed limits, and any road closures.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>
                Q2. Identifying parts (study planning)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You have 5 hours tonight to study three subjects. You want to
                  maximize your expected exam score. What are the decision
                  variables, objective, and constraints?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> Decision variables: hours
                  spent on each subject. Objective: maximize expected exam
                  score. Constraints: total hours ≤ 5, each subject&apos;s hours
                  ≥ 0, and perhaps a maximum number of hours you can reasonably
                  spend on one subject.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>
                Q3. Identifying parts (diet problem)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You want to design a daily diet that meets nutrition
                  requirements at minimum cost. Describe variables, objective,
                  and constraints.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> Decision variables: amount
                  of each food to eat. Objective: minimize total cost.
                  Constraints: chosen foods must supply at least the required
                  calories, protein, etc., and must stay within any upper bounds
                  (e.g. sodium limits).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>
                Q4. Identifying parts (warehouse location)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  A company wants to choose a warehouse location to minimize
                  delivery distance to customers. Identify decision variables,
                  objective, and constraints.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> Decision variables:
                  coordinates of the warehouse (or a discrete choice among
                  candidate cities). Objective: minimize total or average
                  delivery distance. Constraints: warehouse must be located in
                  allowed regions, and possibly must satisfy capacity or
                  regulatory constraints.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Minimization vs maximization */}
            <AccordionItem value="q5">
              <AccordionTrigger>Q5. Minimize or maximize?</AccordionTrigger>
              <AccordionContent>
                <p>
                  For each task, say whether it is more natural to pose it as a
                  minimization or a maximization problem:
                </p>
                <ol className="ml-4 mt-2 list-decimal space-y-1">
                  <li>Choose a portfolio of assets with low risk.</li>
                  <li>Choose a portfolio of assets with high expected return.</li>
                </ol>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> (1) Minimization (minimize
                  risk or variance). (2) Maximization (maximize expected
                  return). In practice, we often combine both using
                  risk-adjusted objectives.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>
                Q6. Turning maximization into minimization
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Show how the problem &quot;maximize accuracy A(x)&quot; can be
                  written as a minimization problem.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong> Write it as{" "}
                  <InlineMath>{"\\min_x \\, [-A(x)]"}</InlineMath>. The{" "}
                  <InlineMath>{"x"}</InlineMath> that maximizes{" "}
                  <InlineMath>{"A(x)"}</InlineMath> is the same{" "}
                  <InlineMath>{"x"}</InlineMath> that minimizes{" "}
                  <InlineMath>{"-A(x)"}</InlineMath>.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Mathematical form */}
            <AccordionItem value="q7">
              <AccordionTrigger>
                Q7. Writing a minimization problem
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  A regression model has parameters{" "}
                  <InlineMath>{"\\theta"}</InlineMath>. Write the mathematical
                  form of the problem “choose parameters to minimize mean
                  squared error <InlineMath>{"\\text{MSE}(\\theta)"}</InlineMath>
                  ”.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong>{" "}
                  <BlockMath>
                    {"\\min_{\\theta} \\, \\text{MSE}(\\theta)"}
                  </BlockMath>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q8">
              <AccordionTrigger>
                Q8. Writing constraints explicitly
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You choose non-negative hours <InlineMath>{"x"}</InlineMath> of
                  study subject A and <InlineMath>{"y"}</InlineMath> of subject
                  B. You have at most 5 hours in total. Write constraints on{" "}
                  <InlineMath>{"x"}</InlineMath> and <InlineMath>{"y"}</InlineMath>.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Suggested answer:</strong>{" "}
                  <BlockMath>{"x \\ge 0, \\quad y \\ge 0, \\quad x + y \\le 5."}</BlockMath>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 12. Summary */}
        <section>
          <h2>Summary and what comes next</h2>
          <SummaryBox>
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Optimization is about finding the <strong>best</strong> feasible
                solution according to a numerical objective.
              </li>
              <li>
                We distinguish between{" "}
                <strong>decision variables, objective function, constraints</strong>
                , feasible solutions, and optimal solutions.
              </li>
              <li>
                Many real tasks (planning study time, allocating resources,
                training models) naturally become optimization problems.
              </li>
              <li>
                Maximization problems can be written as minimization problems by
                negating the objective.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              In the <strong>next page</strong>,{" "}
              <em>Optimization Modelling</em>, we will practice turning real
              stories into precise mathematical models: choosing good variables,
              writing objectives, and encoding constraints.
            </p>
          </SummaryBox>
        </section>
      </div>

      {/* 13. Navigation and progress (reuse shared component) */}
      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function Term({
  term,
  definition,
  math,
}: {
  term: string;
  definition: string;
  math?: string;
}) {
  return (
    <div>
      <dt className="font-semibold">{term}</dt>
      <dd className="mt-1 text-muted-foreground">
        {definition}
        {math ? (
          <span className="ml-1 inline-block">
            (<InlineMath>{math}</InlineMath>)
          </span>
        ) : null}
      </dd>
    </div>
  );
}

function OptimizationIntroVisualization() {
  const [x, setX] = useState(0);

  const data = useMemo(
    () =>
      Array.from({ length: 121 }, (_, i) => {
        const xVal = -3 + i * 0.1;
        const yVal = (xVal - 3) * (xVal - 3) + 2;
        return { x: xVal, y: yVal };
      }),
    [],
  );

  const y = (x - 3) * (x - 3) + 2;
  const distance = Math.abs(x - 3);
  const nearMinimum =
    distance < 0.5 ? "very close to the minimum" : distance < 1.5 ? "near the minimum" : "far from the minimum";

  const series = [{ dataKey: "y", name: "f(x) = (x - 3)² + 2" }];

  return (
    <div className="mt-4 space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-[1.3fr_minmax(0,1fr)] sm:items-center">
        <div className="space-y-2 text-sm">
          <p>
            Use the slider to choose a value of <InlineMath>{"x"}</InlineMath>.
            The graph shows the function{" "}
            <InlineMath>{"f(x) = (x - 3)^2 + 2"}</InlineMath>. The minimum is at{" "}
            <InlineMath>{"x^* = 3"}</InlineMath> with{" "}
            <InlineMath>{"f(x^*) = 2"}</InlineMath>.
          </p>
          <div className="mt-2 rounded-lg bg-muted/60 p-3 text-sm">
            <p className="font-mono">
              x = {x.toFixed(2)},{" "}
              <InlineMath>{"f(x)"}</InlineMath> = {y.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              This point is <strong>{nearMinimum}</strong>.
            </p>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground">
            Choose x (from -1 to 7)
          </label>
          <input
            type="range"
            min={-1}
            max={7}
            step={0.1}
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-500"
            aria-label="Choose x for the function f(x) = (x - 3)^2 + 2"
          />
        </div>
      </div>

      <RechartsLineChart
          data={data}
          xKey="x"
          series={series}
          xLabel="x"
          yLabel="f(x)"
          height={280}
          markers={[
            { x: 3, y: 2, label: "minimum", variant: "min" },
            { x, y, label: "current x", variant: "current" },
          ]}
          ariaLabel="Graph of f(x) = (x - 3)^2 + 2 with minimum and current x highlighted"
        />
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        In later chapters, optimization algorithms will automatically move{" "}
        <InlineMath>{"x"}</InlineMath> toward the minimizer{" "}
        <InlineMath>{"x^*"}</InlineMath> to find the lowest point on such
        curves.
      </p>
    </div>
  );
}

function OptimizationIntroSolvedExample() {
  return (
    <>
      <p>
        <strong>Problem.</strong> A student has 6 hours to study Math and
        Statistics. Each hour of Math gives 8 expected score points. Each hour
        of Statistics gives 6 expected score points. The student must study at
        least 2 hours of Math and at least 1 hour of Statistics. How should the
        student divide study time to maximize expected score?
      </p>
      <DefinitionBox title="Naming the variables first">
        <p>
          Let <InlineMath>{"x"}</InlineMath> = hours of Math study and{" "}
          <InlineMath>{"y"}</InlineMath> = hours of Statistics study. These are
          the only two numbers we get to choose. Everything else (6 hours total,
          8 points per Math hour, etc.) is fixed information from the story.
        </p>
      </DefinitionBox>

      <StepByStepBox
        title="Step-by-step solution"
        steps={[
          <>
            <strong>Define the decision variables.</strong>{" "}
            <InlineMath>{"x"}</InlineMath> = Math hours,{" "}
            <InlineMath>{"y"}</InlineMath> = Statistics hours. Both must be real
            numbers ≥ 0.
          </>,
          <>
            <strong>Write the objective function.</strong> Each hour of Math
            gives 8 points; each hour of Statistics gives 6 points. The total
            expected score is
            <BlockMath>{"f(x, y) = 8x + 6y."}</BlockMath>
            We want to maximize <InlineMath>{"f(x, y)"}</InlineMath>.
          </>,
          <>
            <strong>Write the constraints.</strong> The student has 6 hours in
            total and minimum requirements:
            <BlockMath>
              {"\\begin{aligned} x + y & = 6 \\\\ x & \\ge 2 \\\\ y & \\ge 1 \\end{aligned}"}
            </BlockMath>
            We also implicitly assume <InlineMath>{"x, y \\ge 0"}</InlineMath>.
          </>,
          <>
            <strong>Write the full mathematical model.</strong>
            <BlockMath>
              {
                "\\begin{aligned} \\max_{x, y} \\quad & f(x, y) = 8x + 6y \\\\ \\text{s.t.} \\quad & x + y = 6, \\\\ & x \\ge 2, \\\\ & y \\ge 1. \\end{aligned}"
              }
            </BlockMath>
          </>,
          <>
            <strong>Reason through the solution.</strong> Because{" "}
            <InlineMath>{"x + y = 6"}</InlineMath>, we can write{" "}
            <InlineMath>{"y = 6 - x"}</InlineMath>. Substitute into the
            objective:
            <BlockMath>
              {"f(x) = 8x + 6(6 - x) = 8x + 36 - 6x = 2x + 36."}
            </BlockMath>
            This is a linear function of <InlineMath>{"x"}</InlineMath> that
            increases as <InlineMath>{"x"}</InlineMath> increases (slope 2
            &gt; 0). To maximize <InlineMath>{"f(x)"}</InlineMath>, we should
            choose <InlineMath>{"x"}</InlineMath> as large as possible while
            satisfying the constraints.
          </>,
          <>
            <strong>Apply the constraints.</strong> From{" "}
            <InlineMath>{"x + y = 6"}</InlineMath> and{" "}
            <InlineMath>{"y \\ge 1"}</InlineMath>, we get{" "}
            <InlineMath>{"x \\le 5"}</InlineMath>. We also have{" "}
            <InlineMath>{"x \\ge 2"}</InlineMath>. So{" "}
            <InlineMath>{"2 \\le x \\le 5"}</InlineMath>. Since the slope is
            positive, the maximum occurs at the largest feasible{" "}
            <InlineMath>{"x"}</InlineMath>, which is <InlineMath>{"x = 5"}</InlineMath>.
            Then <InlineMath>{"y = 6 - x = 1"}</InlineMath>.
          </>,
          <>
            <strong>State the optimal solution and value.</strong> The optimal
            study plan is
            <BlockMath>{"x^* = 5, \\quad y^* = 1."}</BlockMath>
            The corresponding expected score is
            <BlockMath>{"f(x^*, y^*) = 8 \\cdot 5 + 6 \\cdot 1 = 40 + 6 = 46."}</BlockMath>
          </>,
          <>
            <strong>Interpret in plain language.</strong> The student should
            study 5 hours of Math and 1 hour of Statistics. This uses all 6
            hours, meets the minimum requirements (at least 2 hours of Math and
            1 hour of Statistics), and gives the highest expected score under
            our simple linear model.
          </>,
        ]}
      />
    </>
  );
}

type ModellingScenarioId =
  | "study-planning"
  | "business-profit"
  | "portfolio-investment"
  | "ml-error";

function OptimizationModellingPage({ page, index, totalPages }: IntroProps) {
  const [scenario, setScenario] = useState<ModellingScenarioId>("study-planning");

  const scenarioModels: Record<
    ModellingScenarioId,
    {
      title: string;
      variables: string[];
      objective: string;
      constraints: string[];
      modelTex: string;
    }
  > = {
    "study-planning": {
      title: "Study planning",
      variables: [
        "x_M = hours of Math study",
        "x_S = hours of Statistics study",
      ],
      objective: "Maximize expected score improvement",
      constraints: [
        "x_M + x_S <= 8 (total available hours)",
        "x_M >= 2, x_S >= 2 (minimum coverage)",
        "x_M, x_S >= 0",
      ],
      modelTex:
        "\\begin{aligned} \\max_{x_M, x_S} \\quad & 9x_M + 7x_S \\\\ \\text{s.t.} \\quad & x_M + x_S \\le 8, \\\\ & x_M \\ge 2,\\; x_S \\ge 2, \\\\ & x_M, x_S \\ge 0. \\end{aligned}",
    },
    "business-profit": {
      title: "Business profit",
      variables: [
        "x_1 = units of Product 1",
        "x_2 = units of Product 2",
      ],
      objective: "Maximize total profit",
      constraints: [
        "Raw material and labor capacity limits",
        "Demand upper bounds",
        "x_1, x_2 >= 0",
      ],
      modelTex:
        "\\begin{aligned} \\max_{x_1, x_2} \\quad & 50x_1 + 35x_2 \\\\ \\text{s.t.} \\quad & 2x_1 + x_2 \\le 100, \\\\ & x_1 + 3x_2 \\le 120, \\\\ & x_1 \\le 40,\\; x_2 \\le 50, \\\\ & x_1, x_2 \\ge 0. \\end{aligned}",
    },
    "portfolio-investment": {
      title: "Portfolio investment",
      variables: [
        "w_1, w_2, ..., w_n = fraction invested in each asset",
      ],
      objective: "Maximize expected return (or minimize risk)",
      constraints: [
        "Sum of weights = 1",
        "No short-selling: w_i >= 0",
        "Optional risk cap",
      ],
      modelTex:
        "\\begin{aligned} \\max_{w} \\quad & \\mu^\\top w \\\\ \\text{s.t.} \\quad & \\mathbf{1}^\\top w = 1, \\\\ & w_i \\ge 0 \\;\\forall i, \\\\ & w^\\top \\Sigma w \\le \\sigma_{\\max}^2. \\end{aligned}",
    },
    "ml-error": {
      title: "Machine learning error",
      variables: ["w, b = model parameters"],
      objective: "Minimize prediction loss",
      constraints: [
        "Sometimes regularization constraints",
        "Optional fairness/compute constraints",
      ],
      modelTex:
        "\\begin{aligned} \\min_{w,b} \\quad & \\frac{1}{n}\\sum_{i=1}^n (wx_i + b - y_i)^2 \\\\ \\text{s.t.} \\quad & \\text{(optional regularization or fairness constraints).} \\end{aligned}",
    },
  };

  const selected = scenarioModels[scenario];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title={page.title}
          description="Learn to convert a practical story into a mathematical optimization model by defining variables, objective, and constraints."
          difficulty={page.difficulty}
          estimatedTime={28}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">
              What is Optimization?
            </span>
            {" · "}
            Key terms:{" "}
            <span className="font-medium text-foreground">
              model, decision variable, objective, constraint, feasibility, domain
            </span>
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Understand what optimization modelling means in plain language.</li>
          <li>Identify decision variables from a real story and name them clearly.</li>
          <li>Turn “best” into a measurable objective function.</li>
          <li>Write constraints that match real rules (time, budget, capacity).</li>
          <li>Read a mathematical model symbol by symbol — even as a beginner.</li>
          <li>Recognize common modelling patterns in business and data science.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Main idea: what is optimization modelling?</h2>
          <p>
            A <strong>model</strong> is a simplified mathematical description of a
            real decision. <strong>Modelling</strong> is the step where you
            translate a story into symbols so a computer (or your own reasoning)
            can search for the best choice.
          </p>
          <p>
            Every model has exactly three ingredients:
          </p>
          <ul>
            <li>
              <strong>Decision variables</strong> (what we can choose)
            </li>
            <li>
              <strong>Objective function</strong> (what we want to improve)
            </li>
            <li>
              <strong>Constraints</strong> (rules we must obey)
            </li>
          </ul>
          <p>
            A useful way to model almost any problem is to repeatedly ask:
          </p>
          <ol>
            <li>
              <strong>What can I change?</strong> These become your decision
              variables.
            </li>
            <li>
              <strong>What am I trying to improve?</strong> This becomes your
              objective function.
            </li>
            <li>
              <strong>What restrictions must I obey?</strong> These become your
              constraints.
            </li>
          </ol>
          <p>
            If these three parts are clear, your model is usually clear. If one
            part is vague, your model will be hard to solve or easy to misread.
          </p>
        </section>

        <section>
          <h2>Notation guide: reading models line by line</h2>
          <p>
            Models on this page use the same symbols as Page 1, plus a few
            extras. Here is a quick decoder — refer back whenever a formula looks
            unfamiliar.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Plain meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"x, x_1, x_2"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">Decision variables — what you choose</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    <InlineMath>{"x_1"}</InlineMath> = cakes,{" "}
                    <InlineMath>{"x_2"}</InlineMath> = cookies
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"x_M, x_S"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">
                    Named variables (subscript = label, not multiplication)
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    Math hours, Statistics hours
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"\\text{s.t.}"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">
                    “Subject to” — the constraints listed below
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    Rules the variables must obey
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"\\le, \\ge, ="}</InlineMath>
                  </td>
                  <td className="px-3 py-2">At most, at least, exactly</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    <InlineMath>{"x \\le 10"}</InlineMath> → no more than 10
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"\\sum_i"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">Sum over all items i</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    <InlineMath>{"\\sum_i x_i"}</InlineMath> = add all spending
                    categories
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"I"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">
                    Often <strong>income</strong> or a fixed budget limit (a given
                    number, not a variable)
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    Monthly salary in Rs.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"p^\\top x"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">
                    Weighted sum: profit per unit × units produced
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    <InlineMath>{"50x_1 + 35x_2"}</InlineMath>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">
                    <InlineMath>{"w, b, \\theta"}</InlineMath>
                  </td>
                  <td className="px-3 py-2">
                    Model parameters you train (slope, bias, weights) — still
                    decision variables in ML optimization
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    <InlineMath>{"\\hat{y} = wx + b"}</InlineMath>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <KeyIdeaBox title="Subscripts are labels, not multiplication">
            <p>
              In <InlineMath>{"x_1"}</InlineMath>, the small 1 is a{" "}
              <strong>name tag</strong> (“variable number 1”), not “x times 1”.
              Similarly <InlineMath>{"x_M"}</InlineMath> means “the x related to
              Math”, not “x × M”.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Reusable modelling framework</h2>
          <StepByStepBox
            title="7-step modelling checklist"
            steps={[
              <>
                <strong>Step 1: Understand the story.</strong> Clarify what is
                fixed data (given numbers) and what is a choice.
              </>,
              <>
                <strong>Step 2: Define decision variables.</strong> Name each
                variable clearly with units.
              </>,
              <>
                <strong>Step 3: Choose objective.</strong> Turn “best” into a
                measurable function to minimize or maximize.
              </>,
              <>
                <strong>Step 4: Write constraints.</strong> Encode budgets,
                capacities, requirements, and logic rules.
              </>,
              <>
                <strong>Step 5: Add domain restrictions.</strong> For example{" "}
                <InlineMath>{"x \\ge 0"}</InlineMath>, integer variables, or
                bounds.
              </>,
              <>
                <strong>Step 6: Check real-world meaning.</strong> Ensure the
                model reflects reality and units are consistent.
              </>,
              <>
                <strong>Step 7: Solve (or prepare to solve).</strong> Decide if
                it is linear/nonlinear, continuous/discrete, and pick a method.
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Real-life mini examples</h2>

          <ExampleBox title="Example 1: Travel route">
            <p>
              <strong>What can change?</strong> Which route you take (this could
              be encoded as a discrete choice or as waypoints).
            </p>
            <p>
              <strong>Objective:</strong> Minimize travel time{" "}
              <InlineMath>{"T(r)"}</InlineMath> where <InlineMath>{"r"}</InlineMath>{" "}
              stands for “route”.
            </p>
            <p>
              <strong>Constraints:</strong> Only use roads that exist; obey
              traffic rules.
            </p>
            <BlockMath>{"\\min_{r \\in \\mathcal{R}} \\; T(r)"}</BlockMath>
            <p className="mt-2 text-sm text-muted-foreground">
              <InlineMath>{"\\mathcal{R}"}</InlineMath> is the set of all
              allowed routes. <InlineMath>{"r \\in \\mathcal{R}"}</InlineMath>{" "}
              means “pick a route r from that set”.
            </p>
          </ExampleBox>

          <ExampleBox title="Example 2: Monthly budget">
            <p>
              <strong>Story.</strong> You split monthly income across spending
              categories (food, rent, transport, savings). You want the most
              satisfaction possible without spending more than you earn.
            </p>
            <p>
              <strong>What can change?</strong> Amount spent in each category.
            </p>
            <p>
              <strong>Objective:</strong> Maximize utility{" "}
              <InlineMath>{"U(x)"}</InlineMath> (a score for how happy the
              budget makes you).
            </p>
            <p>
              <strong>Constraints:</strong> Total spending cannot exceed income.
            </p>
            <BlockMath>
              {"\\begin{aligned} \\max_x \\quad & U(x) \\\\ \\text{s.t.} \\quad & \\sum_i x_i \\le I, \\; x_i \\ge 0. \\end{aligned}"}
            </BlockMath>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Read it line by line:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              <li>
                <InlineMath>{"x_i"}</InlineMath> — amount spent in category{" "}
                <InlineMath>{"i"}</InlineMath> (food, rent, …).
              </li>
              <li>
                <InlineMath>{"\\sum_i x_i"}</InlineMath> — add up spending in{" "}
                <em>all</em> categories.
              </li>
              <li>
                <InlineMath>{"I"}</InlineMath> — your <strong>income</strong> (a
                fixed number for the month, not something you optimize).
              </li>
              <li>
                <InlineMath>{"x_i \\ge 0"}</InlineMath> — you cannot spend a
                negative amount.
              </li>
              <li>
                <InlineMath>{"\\text{s.t.}"}</InlineMath> — “subject to” (here
                are the rules).
              </li>
            </ul>
          </ExampleBox>

          <ExampleBox title="Example 3: Study planning">
            <p>
              <strong>What can change?</strong> Hours per subject.
            </p>
            <p>
              <strong>Objective:</strong> Maximize expected score — here{" "}
              <InlineMath>{"9x_M + 7x_S"}</InlineMath> means 9 points per Math
              hour and 7 per Statistics hour.
            </p>
            <p>
              <strong>Constraints:</strong> At most 8 hours total; no negative
              study time.
            </p>
            <BlockMath>
              {"\\begin{aligned} \\max_{x_M,x_S} \\quad & 9x_M + 7x_S \\\\ \\text{s.t.} \\quad & x_M + x_S \\le 8, \\; x_M, x_S \\ge 0. \\end{aligned}"}
            </BlockMath>
            <p className="mt-2 text-sm text-muted-foreground">
              <InlineMath>{"\\max_{x_M,x_S}"}</InlineMath> means “choose both
              hour values to maximize the score”.
            </p>
          </ExampleBox>

          <ExampleBox title="Example 4: Factory production">
            <p>
              <strong>What can change?</strong> Units of each product (
              <InlineMath>{"x_1"}</InlineMath>, <InlineMath>{"x_2"}</InlineMath>).
            </p>
            <p>
              <strong>Objective:</strong> Maximize profit{" "}
              <InlineMath>{"p^\\top x"}</InlineMath> ={" "}
              <InlineMath>{"p_1 x_1 + p_2 x_2 + \\cdots"}</InlineMath>.
            </p>
            <p>
              <strong>Constraints:</strong> Material and labour limits written as{" "}
              <InlineMath>{"Ax \\le b"}</InlineMath> (each row is one resource
              cap).
            </p>
            <BlockMath>
              {"\\begin{aligned} \\max_x \\quad & p^\\top x \\\\ \\text{s.t.} \\quad & Ax \\le b, \\; x \\ge 0. \\end{aligned}"}
            </BlockMath>
            <p className="mt-2 text-sm text-muted-foreground">
              <InlineMath>{"A"}</InlineMath> and <InlineMath>{"b"}</InlineMath>{" "}
              are <strong>given data</strong> (capacities). Only{" "}
              <InlineMath>{"x"}</InlineMath> is chosen.
            </p>
          </ExampleBox>

          <ExampleBox title="Example 5: Machine learning loss minimization">
            <p>
              <strong>What can change?</strong> Model parameters.
            </p>
            <p>
              <strong>Objective:</strong> Minimize prediction loss.
            </p>
            <p>
              <strong>Constraints:</strong> Sometimes regularization and compute
              limits.
            </p>
            <BlockMath>
              {"\\min_{\\theta} \\; \\frac{1}{n}\\sum_{i=1}^n \\ell(\\hat{y}_i, y_i)"}
            </BlockMath>
          </ExampleBox>
        </section>

        <section>
          <h2>Mathematical model template</h2>
          <p>
            Almost every model on this page follows the same skeleton. Read it
            from top to bottom like a recipe:
          </p>
          <FormulaCard
            tex={
              "\\begin{aligned} \\min\\text{ or }\\max \\quad & f(x) \\\\ \\text{s.t.} \\quad & g_1(x) \\le b_1, \\\\ & g_2(x) \\le b_2, \\\\ & h_1(x) = c_1, \\\\ & x \\ge 0. \\end{aligned}"
            }
            label="General optimization model"
            number="2.1"
            caption="f = objective, g ≤ = inequality rules, h = = exact rules, x ≥ 0 = no negative amounts."
          />
          <DefinitionBox title="Line-by-line meaning of (2.1)">
            <ol className="ml-4 list-decimal space-y-2">
              <li>
                <strong>First line:</strong> Should we minimize or maximize{" "}
                <InlineMath>{"f(x)"}</InlineMath>?
              </li>
              <li>
                <strong>s.t.</strong> — “subject to” — everything below is a
                constraint.
              </li>
              <li>
                <InlineMath>{"g_1(x) \\le b_1"}</InlineMath> — first inequality
                (e.g. flour used ≤ flour available).
              </li>
              <li>
                <InlineMath>{"h_1(x) = c_1"}</InlineMath> — first equality (e.g.
                total hours must equal 6).
              </li>
              <li>
                <InlineMath>{"x \\ge 0"}</InlineMath> — each decision variable is
                zero or positive (no negative production, spending, or hours).
              </li>
            </ol>
          </DefinitionBox>
          <ul>
            <li>
              <strong>Inequality constraints</strong> (
              <InlineMath>{"\\le"}</InlineMath> or{" "}
              <InlineMath>{"\\ge"}</InlineMath>) — “at most” or “at least” limits.
            </li>
            <li>
              <strong>Equality constraints</strong> (
              <InlineMath>{"="}</InlineMath>) — exact balances (every hour
              accounted for).
            </li>
            <li>
              <strong>Non-negativity</strong>{" "}
              <InlineMath>{"x \\ge 0"}</InlineMath> — blocks impossible negative
              quantities.
            </li>
            <li>
              <strong>Domain</strong> — extra rules such as “integer only” or
              “between 0 and 100”.
            </li>
            <li>
              <strong>Vector form</strong>{" "}
              <InlineMath>{"x \\in \\mathbb{R}^n"}</InlineMath> — you are
              choosing <InlineMath>{"n"}</InlineMath> numbers at once (see Page 1).
            </li>
          </ul>
          <KeyIdeaBox title="Given data vs decision variables">
            <p>
              Numbers like <InlineMath>{"I"}</InlineMath> (income),{" "}
              <InlineMath>{"b"}</InlineMath> (capacity limits), prices, and
              coefficients in the objective are usually <strong>fixed inputs</strong>{" "}
              from the problem statement. Symbols like{" "}
              <InlineMath>{"x_1, x_2, x_M"}</InlineMath> are what the solver
              searches over.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Big Example 1: Diet problem</h2>
          <p>
            A person wants to meet nutrition requirements at minimum cost using
            rice and eggs.
          </p>
          <StepByStepBox
            title="Build and solve the diet model"
            steps={[
              <>
                <strong>Data.</strong> Rice: cost Rs. 40, protein 3, calories
                200. Eggs: cost Rs. 70, protein 8, calories 150.
              </>,
              <>
                <strong>Decision variables.</strong>{" "}
                <InlineMath>{"x_1"}</InlineMath> = units of rice,{" "}
                <InlineMath>{"x_2"}</InlineMath> = units of eggs.
              </>,
              <>
                <strong>Objective (minimize cost).</strong>
                <BlockMath>{"\\min \\; C = 40x_1 + 70x_2"}</BlockMath>
              </>,
              <>
                <strong>Protein constraint.</strong>{" "}
                <InlineMath>{"3x_1 + 8x_2 \\ge 24"}</InlineMath>
              </>,
              <>
                <strong>Calorie constraint.</strong>{" "}
                <InlineMath>{"200x_1 + 150x_2 \\ge 900"}</InlineMath>
              </>,
              <>
                <strong>Non-negativity.</strong>{" "}
                <InlineMath>{"x_1, x_2 \\ge 0"}</InlineMath>
              </>,
              <>
                <strong>Full model.</strong>
                <BlockMath>
                  {
                    "\\begin{aligned} \\min_{x_1,x_2} \\quad & 40x_1 + 70x_2 \\\\ \\text{s.t.} \\quad & 3x_1 + 8x_2 \\ge 24, \\\\ & 200x_1 + 150x_2 \\ge 900, \\\\ & x_1, x_2 \\ge 0. \\end{aligned}"
                  }
                </BlockMath>
              </>,
              <>
                <strong>Approximate solution by corner reasoning.</strong> Check
                key feasible boundary points:
                <ul className="ml-4 mt-2 list-disc">
                  <li>
                    Protein-only boundary with{" "}
                    <InlineMath>{"x_1=0"}</InlineMath> gives{" "}
                    <InlineMath>{"x_2=3"}</InlineMath>. Cost = Rs. 210, calories
                    = 450 (not feasible).
                  </li>
                  <li>
                    Calorie-only boundary with{" "}
                    <InlineMath>{"x_2=0"}</InlineMath> gives{" "}
                    <InlineMath>{"x_1=4.5"}</InlineMath>. Cost = Rs. 180,
                    protein = 13.5 (not feasible).
                  </li>
                  <li>
                    Intersection of both active constraints:
                    <InlineMath>{"3x_1 + 8x_2 = 24"}</InlineMath> and{" "}
                    <InlineMath>{"200x_1 + 150x_2 = 900"}</InlineMath>.
                  </li>
                </ul>
              </>,
              <>
                <strong>Solve the intersection.</strong> From calorie equation:{" "}
                <InlineMath>{"4x_1 + 3x_2 = 18"}</InlineMath>. Solving with{" "}
                <InlineMath>{"3x_1 + 8x_2 = 24"}</InlineMath> gives:
                <BlockMath>{"x_2 = \\frac{42}{23} \\approx 1.826, \\quad x_1 = \\frac{72}{23} \\approx 3.130."}</BlockMath>
                Cost:
                <BlockMath>{"C \\approx 40(3.130) + 70(1.826) \\approx 252.17"}</BlockMath>
              </>,
              <>
                <strong>Check nearby feasible corners on axes.</strong>{" "}
                Feasible axis corners include{" "}
                <InlineMath>{"(x_1,x_2)=(8,0)"}</InlineMath> with cost Rs. 320
                and <InlineMath>{"(0,6)"}</InlineMath> with cost Rs. 420. So the
                intersection is much cheaper.
              </>,
              <>
                <strong>Interpretation.</strong> A low-cost feasible plan is
                about 3.13 units of rice and 1.83 units of eggs (or a nearby
                practical rounded combination if integer units are required).
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Big Example 2: Machine learning loss as optimization</h2>
          <p>
            Training a machine learning model is fundamentally an optimization
            task: pick parameters so predictions match the data.
          </p>
          <p>
            For a simple linear model predicting{" "}
            <InlineMath>{"\\hat{y}"}</InlineMath> from input{" "}
            <InlineMath>{"x"}</InlineMath>:
          </p>
          <BlockMath>{"\\hat{y} = wx + b"}</BlockMath>
          <DefinitionBox title="What are w, b, and x here?">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <InlineMath>{"x"}</InlineMath> — input feature (e.g. house size).
                This is <strong>given data</strong>, not chosen by training.
              </li>
              <li>
                <InlineMath>{"w"}</InlineMath> — <strong>weight</strong> (slope):
                how strongly x affects the prediction. A decision variable.
              </li>
              <li>
                <InlineMath>{"b"}</InlineMath> — <strong>bias</strong> (intercept):
                baseline prediction. Also chosen during training.
              </li>
              <li>
                <InlineMath>{"\\hat{y}"}</InlineMath> — predicted output;{" "}
                <InlineMath>{"y"}</InlineMath> — true output we compare against.
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              Do not confuse ML input <InlineMath>{"x"}</InlineMath> with
              optimization vector <InlineMath>{"x"}</InlineMath> on earlier pages —
              context tells you which is which. In loss minimization, the
              parameters <InlineMath>{"w, b"}</InlineMath> (or{" "}
              <InlineMath>{"\\theta"}</InlineMath>) play the role of decision
              variables.
            </p>
          </DefinitionBox>
          <p>
            We choose <InlineMath>{"w"}</InlineMath> and <InlineMath>{"b"}</InlineMath>{" "}
            to minimize prediction error:
          </p>
          <FormulaCard
            tex={"\\text{MSE}(w,b)=\\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2"}
            label="Mean Squared Error"
            number="2.2"
          />
          <ul>
            <li>
              <InlineMath>{"\\hat{y}_i"}</InlineMath>: model prediction for data
              point <InlineMath>{"i"}</InlineMath>
            </li>
            <li>
              <InlineMath>{"y_i"}</InlineMath>: actual observed output
            </li>
            <li>
              <InlineMath>{"(\\hat{y}_i-y_i)"}</InlineMath>: error
            </li>
            <li>
              Squaring penalizes large errors more strongly and avoids positive/
              negative cancellation.
            </li>
            <li>
              Averaging over <InlineMath>{"n"}</InlineMath> samples gives a
              global measure of model quality.
            </li>
          </ul>
          <p>
            So training is:
          </p>
          <BlockMath>{"\\min_{w,b} \\; \\text{MSE}(w,b)"}</BlockMath>
        </section>

        <section>
          <h2>Interactive modelling builder</h2>
          <p>
            Pick a scenario and inspect its variables, objective, constraints,
            and mathematical model.
          </p>
          <div className="mt-4 rounded-xl border bg-card p-4">
            <label className="text-sm font-medium">
              Scenario
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value as ModellingScenarioId)}
                className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm"
                aria-label="Select modelling scenario"
              >
                <option value="study-planning">Study planning</option>
                <option value="business-profit">Business profit</option>
                <option value="portfolio-investment">Portfolio investment</option>
                <option value="ml-error">Machine learning error</option>
              </select>
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">{selected.title}</p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Variables
                </p>
                <ul className="ml-4 mt-1 list-disc text-sm">
                  {selected.variables.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Objective
                </p>
                <p className="text-sm">{selected.objective}</p>
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Constraints
                </p>
                <ul className="ml-4 mt-1 list-disc text-sm">
                  {selected.constraints.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-lg border bg-muted/30 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Mathematical model
              </p>
              <BlockMath>{selected.modelTex}</BlockMath>
              <p className="mt-3 text-sm text-muted-foreground">
                {scenario === "study-planning" &&
                  "Choose hours x_M and x_S to maximize score, subject to time and minimum-study rules."}
                {scenario === "business-profit" &&
                  "Choose units x₁ and x₂ to maximize profit 50x₁ + 35x₂, within material and demand limits."}
                {scenario === "portfolio-investment" &&
                  "Choose portfolio weights wᵢ (fractions that sum to 1) to maximize return μᵀw while respecting risk and no short-selling."}
                {scenario === "ml-error" &&
                  "Choose parameters w and b to minimize average squared prediction error on n training points."}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Simple vs complex models: tradeoffs</h2>
          <p>
            Simple models are easier to understand and solve, but may miss
            important reality. Complex models can be realistic, but harder to
            solve and maintain.
          </p>
          <ul>
            <li>
              <strong>Route optimization:</strong> ignoring traffic gives a
              simpler model, but poor real-world routes.
            </li>
            <li>
              <strong>Portfolio optimization:</strong> ignoring risk may inflate
              expected returns unrealistically.
            </li>
            <li>
              <strong>Factory planning:</strong> ignoring machine capacity may
              suggest impossible production plans.
            </li>
          </ul>
          <p>
            A good modelling habit: start with a clear baseline model, solve it,
            then add complexity step-by-step.
          </p>
        </section>

        <section>
          <h2>Common modelling mistakes</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>
              Objective is not measurable (“improve quality” without a metric).
            </li>
            <li>Missing constraints that matter in practice.</li>
            <li>Using inconsistent units (hours vs minutes, kg vs grams).</li>
            <li>
              Accidentally allowing negative values where impossible.
            </li>
            <li>Unclear variable names that hide meaning.</li>
            <li>Mixing fixed input data with decision variables.</li>
            <li>Overcomplicating the very first model.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Attempt first, then open the suggested answers.
          </p>
          <Accordion
            type="multiple"
            className="mt-4 rounded-xl border bg-card px-4 py-2"
          >
            <AccordionItem value="m-q1">
              <AccordionTrigger>
                Q1. Identify variables (delivery scheduling)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  A company must allocate delivery trucks to 3 zones. What are
                  sensible decision variables?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Let{" "}
                  <InlineMath>{"x_1,x_2,x_3"}</InlineMath> be number of trucks
                  assigned to zones 1, 2, 3.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q2">
              <AccordionTrigger>
                Q2. Choose objective (ad campaign)
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You split budget across online channels. Objective options:
                  maximize conversions, minimize cost, maximize clicks. Which is
                  best?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Depends on business goal; if sales
                  matter, maximize conversions (or profit from conversions) is
                  usually more meaningful than clicks alone.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q3">
              <AccordionTrigger>Q3. Write a time constraint</AccordionTrigger>
              <AccordionContent>
                <p>
                  A student studies Math (<InlineMath>{"x"}</InlineMath>) and
                  Stats (<InlineMath>{"y"}</InlineMath>) with at most 10 hours.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong>{" "}
                  <InlineMath>{"x + y \\le 10"}</InlineMath>, with{" "}
                  <InlineMath>{"x,y \\ge 0"}</InlineMath>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q4">
              <AccordionTrigger>Q4. Non-negativity check</AccordionTrigger>
              <AccordionContent>
                <p>
                  Why should production variables include non-negativity
                  constraints?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Negative production is physically
                  meaningless; include <InlineMath>{"x_i \\ge 0"}</InlineMath>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q5">
              <AccordionTrigger>Q5. Identify bad objective</AccordionTrigger>
              <AccordionContent>
                <p>
                  “Make customers happy” is used as objective without a metric.
                  What is wrong?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Not measurable. Must map to a numeric
                  proxy (e.g., satisfaction score, retention, complaint rate).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q6">
              <AccordionTrigger>Q6. Write full model (simple diet)</AccordionTrigger>
              <AccordionContent>
                <p>
                  Minimize <InlineMath>{"5x_1+4x_2"}</InlineMath> with protein
                  requirement <InlineMath>{"2x_1+x_2\\ge 10"}</InlineMath> and{" "}
                  <InlineMath>{"x_1,x_2\\ge0"}</InlineMath>.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong>
                </p>
                <BlockMath>
                  {"\\begin{aligned} \\min_{x_1,x_2} \\quad & 5x_1+4x_2 \\\\ \\text{s.t.} \\quad & 2x_1+x_2\\ge 10, \\\\ & x_1,x_2\\ge0. \\end{aligned}"}
                </BlockMath>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q7">
              <AccordionTrigger>Q7. Fix mixed-up notation</AccordionTrigger>
              <AccordionContent>
                <p>
                  A model writes <InlineMath>{"\\max 50+20x"}</InlineMath>{" "}
                  where 50 is fixed salary and x is hours worked. What should be
                  clarified?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Clarify decision variable domain
                  (e.g., <InlineMath>{"0 \\le x \\le 40"}</InlineMath>) and
                  whether maximizing income only is realistic (might need fatigue
                  or time constraints).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q8">
              <AccordionTrigger>Q8. Data vs decision variable</AccordionTrigger>
              <AccordionContent>
                <p>
                  In <InlineMath>{"\\max p^\\top x"}</InlineMath>, which is data
                  and which is decision variable?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong>{" "}
                  <InlineMath>{"p"}</InlineMath> is fixed input data (profits per
                  unit); <InlineMath>{"x"}</InlineMath> is the decision vector.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q9">
              <AccordionTrigger>Q9. Add missing capacity constraint</AccordionTrigger>
              <AccordionContent>
                <p>
                  A production model has objective and non-negativity but no
                  machine-hour limit. Why is this dangerous?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Model may suggest unrealistically
                  infinite production. Capacity constraints are essential to
                  bound the feasible set.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="m-q10">
              <AccordionTrigger>Q10. Improve an over-complex first draft</AccordionTrigger>
              <AccordionContent>
                <p>
                  You start with 40 variables and 200 constraints and cannot
                  debug the model. What is a better approach?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Answer:</strong> Start with a smaller core model,
                  validate outputs, then add details incrementally.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Optimization modelling is the bridge between real decisions and
            mathematical optimization. A strong model clearly defines variables,
            objective, constraints, and domain assumptions. Good models are
            simple enough to solve, but rich enough to represent the decision
            reality.
            <p className="mt-3 text-sm">
              Next, we classify models by structure and geometry in{" "}
              <em>Types of Optimization and Convexity</em>.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function TypesAndConvexityPage({ page, index, totalPages }: IntroProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Types of Optimization and Convexity"
          description="Understand core optimization categories and why convexity is one of the most important ideas for making optimization reliable."
          difficulty={page.difficulty}
          estimatedTime={30}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">
              Optimization Modelling
            </span>
            {" · "}
            Key terms:{" "}
            <span className="font-medium text-foreground">
              constrained, discrete, nonlinear, local minimum, global minimum,
              convex
            </span>
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Tell constrained from unconstrained problems — in words and symbols.</li>
          <li>Tell continuous from discrete, linear from nonlinear, deterministic from stochastic.</li>
          <li>Understand local vs global minimum with everyday pictures.</li>
          <li>Understand convex vs non-convex and why convex problems are easier.</li>
          <li>Read compact notation like <InlineMath>{"c^\\top x"}</InlineMath> and <InlineMath>{"\\min_{x \\in \\mathbb{R}} f(x)"}</InlineMath> without fear.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why this page matters</h2>
          <p>
            On Pages 1–2 you learned how to write a model: variables, objective,
            constraints. Before diving into specific methods (like linear
            programming on the next pages), it helps to know{" "}
            <strong>what kind of problem you have</strong>. The category tells you
            which tools are appropriate and how hard the search for a solution
            might be.
          </p>
          <KeyIdeaBox title="Think of it like choosing a vehicle">
            <p>
              A short city trip might need a bicycle; a cross-country move needs
              a truck. Similarly, a two-variable linear program can be solved by
              drawing a picture; a neural network training problem needs entirely
              different algorithms. Classification comes first.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Quick symbol refresher (from Pages 1–2)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Reminder</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x"}</InlineMath></td>
                  <td className="px-3 py-2">Decision variable(s) — what you choose</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"f(x)"}</InlineMath></td>
                  <td className="px-3 py-2">Objective — the score to minimize or maximize</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x \\in \\mathbb{R}"}</InlineMath></td>
                  <td className="px-3 py-2">x can be any real number (continuous)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"c^\\top x"}</InlineMath></td>
                  <td className="px-3 py-2">
                    Weighted sum <InlineMath>{"c_1 x_1 + c_2 x_2 + \\cdots"}</InlineMath> — common linear objective
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono"><InlineMath>{"Ax \\le b"}</InlineMath></td>
                  <td className="px-3 py-2">Several linear “at most” constraints written at once</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Optimization categories</h2>
          <p>
            Every optimization problem can be described along several axes. A
            single problem may belong to more than one category at once (e.g.
            constrained + linear + continuous).
          </p>

          <h3>A) Constrained vs unconstrained</h3>
          <p>
            <strong>Constrained optimization</strong> has explicit rules your
            choice must obey. <strong>Unconstrained optimization</strong> has no
            such rules written as constraints — you only optimize over the
            natural domain of the variables (often all real numbers).
          </p>
          <DefinitionBox title="In plain language">
            <p>
              <strong>Constrained</strong> = “You must stay inside the fence.”
              <br />
              <strong>Unconstrained</strong> = “No fence — but the formula{" "}
              <InlineMath>{"f(x)"}</InlineMath> itself may still blow up or be
              undefined in some places.”
            </p>
          </DefinitionBox>
          <ExampleBox title="Constrained examples">
            <ul className="ml-4 list-disc">
              <li>
                Budget <InlineMath>{"\\le \\text{Rs. }10{,}000"}</InlineMath>
              </li>
              <li>
                Time <InlineMath>{"\\le 6\\text{ hours}"}</InlineMath>
              </li>
              <li>
                <InlineMath>{"x \\ge 0"}</InlineMath>
              </li>
            </ul>
          </ExampleBox>
          <ExampleBox title="Unconstrained example">
            <p>
              <InlineMath>{"\\min_{x \\in \\mathbb{R}} f(x)"}</InlineMath> means:
              find the x that makes <InlineMath>{"f(x)"}</InlineMath> smallest,
              where <InlineMath>{"x"}</InlineMath> can be any real number. There
              is no extra budget or time constraint — only the shape of{" "}
              <InlineMath>{"f"}</InlineMath> matters.
            </p>
          </ExampleBox>

          <h3>B) Continuous vs discrete</h3>
          <p>
            <strong>Continuous variables</strong> can take any value in a range
            (including fractions). <strong>Discrete variables</strong> must be
            whole numbers, counts, or yes/no choices.
          </p>
          <DefinitionBox title="Why the distinction matters">
            <p>
              If you model “number of buses” as continuous, the solver might
              suggest <InlineMath>{"3.6"}</InlineMath> buses — nonsense in
              reality. Discrete problems often need integer programming methods,
              which are harder than continuous linear programming.
            </p>
          </DefinitionBox>
          <ul>
            <li>
              Continuous example: investment fraction ={" "}
              <InlineMath>{"0.25"}</InlineMath>.
            </li>
            <li>
              Discrete example: number of buses ={" "}
              <InlineMath>{"3"}</InlineMath>, not{" "}
              <InlineMath>{"3.6"}</InlineMath>.
            </li>
          </ul>

          <h3>C) Linear vs nonlinear</h3>
          <p>
            <strong>Linear</strong> means every term is a constant times a
            variable to the first power — no squares, no products of variables,
            no sin/log/exp. <strong>Nonlinear</strong> breaks at least one of
            those rules.
          </p>
          <KeyIdeaBox title="Linear checklist">
            <ul className="ml-4 list-disc space-y-1">
              <li>Variables appear only as <InlineMath>{"x_1"}</InlineMath>, <InlineMath>{"x_2"}</InlineMath>, … not <InlineMath>{"x_1^2"}</InlineMath> or <InlineMath>{"x_1 x_2"}</InlineMath></li>
              <li>Coefficients are fixed numbers (50, 3, −1.2)</li>
              <li>Terms are added or subtracted — that is all</li>
            </ul>
          </KeyIdeaBox>
          <p>Nonlinear examples you will see later in ML and physics:</p>

          <ul>
            <li><InlineMath>{"x^2"}</InlineMath> — variable squared</li>
            <li><InlineMath>{"xy"}</InlineMath> — two variables multiplied</li>
            <li><InlineMath>{"\\sin(x)"}</InlineMath>, <InlineMath>{"e^x"}</InlineMath>, <InlineMath>{"\\log(x)"}</InlineMath> — curved functions</li>
          </ul>

          <h3>D) Deterministic vs stochastic</h3>
          <p>
            <strong>Deterministic</strong>: all numbers in the model are known
            and fixed when you solve. <strong>Stochastic</strong>: some inputs
            are random or uncertain (demand tomorrow, stock returns, weather).
          </p>
          <ul>
            <li>Deterministic example: known fixed demand per day.</li>
            <li>Stochastic example: uncertain customer demand distribution.</li>
          </ul>

          <h3>E) Local vs global</h3>
          <p>
            When we minimize <InlineMath>{"f(x)"}</InlineMath>, we care about
            two different questions:
          </p>
          <ul>
            <li>
              <strong>Local minimum</strong> — lowest point in a{" "}
              <em>small neighborhood</em> (a nearby valley).
            </li>
            <li>
              <strong>Global minimum</strong> — lowest point{" "}
              <em>everywhere</em> on the domain (the deepest valley in the whole
              landscape).
            </li>
          </ul>
          <DefinitionBox title="Ball-in-a-valley analogy">
            <p>
              Roll a ball on a bumpy landscape. It may settle in a small dip
              (local minimum) that is still on a hillside compared to a much
              deeper valley elsewhere (global minimum). Optimization algorithms
              can get “stuck” in local minima on non-convex problems.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Convexity: the key idea</h2>
          <p>
            A <strong>convex function</strong> looks like a bowl opening upward
            (or a hill opening downward for maximization). The remarkable fact:
          </p>
          <BlockMath>
            {"\\text{For convex } f, \\; \\text{every local minimum is also a global minimum.}"}
          </BlockMath>
          <p>
            On a convex bowl there is only one valley bottom. Any local minimum
            <em> is</em> the global minimum. Algorithms that descend downhill
            cannot get trapped in a shallow side valley — there isn’t one.
          </p>
          <p>Compare side by side (use the interactive plot below):</p>
          <ul>
            <li>
              <strong>Convex:</strong> <InlineMath>{"f(x)=x^2"}</InlineMath> — one
              minimum at <InlineMath>{"x=0"}</InlineMath>
            </li>
            <li>
              <strong>Non-convex:</strong> <InlineMath>{"f(x)=x^4-4x^2"}</InlineMath>{" "}
              — two global minima and a local maximum in between
            </li>
          </ul>
        </section>

        <section>
          <h2>Interactive visualization 1: convex vs non-convex</h2>
          <p>
            Toggle between the two functions. Markers show{" "}
            <strong>global minima</strong> (blue) and a <strong>local maximum</strong>{" "}
            (red) on the non-convex curve. Notice how the convex case has a single
            lowest point.
          </p>
          <ConvexityFunctionVisualizer />
        </section>

        <section>
          <h2>Convex set</h2>
          <p>
            Convexity applies to <strong>sets</strong> too, not just functions.
            A set is <strong>convex</strong> if whenever you pick two points
            inside it, the straight line segment between them stays entirely
            inside.
          </p>
          <DefinitionBox title="Everyday picture">
            <p>
              A filled circle or rectangle is convex — you can stretch a rubber
              band between any two interior points without leaving the shape. A
              crescent moon or two separate blobs is <em>not</em> convex.
            </p>
          </DefinitionBox>
          <ConvexSetVisualizer />
          <ul>
            <li>Filled circle: convex</li>
            <li>Rectangle: convex</li>
            <li>Crescent shape: non-convex</li>
            <li>Disconnected areas: non-convex</li>
          </ul>
        </section>

        <section>
          <h2>Why convexity matters in data science</h2>
          <ul>
            <li>
              Many loss minimization problems become easier when the loss is
              convex.
            </li>
            <li>
              Convexity improves optimization reliability: fewer bad local traps.
            </li>
            <li>
              Convex problems often allow stronger theory and convergence
              guarantees.
            </li>
            <li>
              Linear regression with squared loss is typically convex in
              parameters.
            </li>
            <li>
              Neural network training is usually non-convex, which is why
              initialization and optimization strategy matter more.
            </li>
          </ul>
        </section>

        <section>
          <h2>Big solved example: comparing two functions</h2>
          <StepByStepBox
            title="Compare convex vs non-convex landscapes"
            steps={[
              <>
                <strong>Function 1:</strong>{" "}
                <InlineMath>{"f_1(x)=(x-2)^2+1"}</InlineMath>
                <ul className="ml-4 mt-2 list-disc">
                  <li>Looks convex (shifted parabola, opens upward).</li>
                  <li>
                    Minimum at <InlineMath>{"x=2"}</InlineMath>, value{" "}
                    <InlineMath>{"f_1(2)=1"}</InlineMath>.
                  </li>
                  <li>
                    Only one valley, so local minimum = global minimum.
                  </li>
                  <li>Easier to optimize robustly.</li>
                </ul>
              </>,
              <>
                <strong>Function 2:</strong>{" "}
                <InlineMath>{"f_2(x)=x^4-4x^2+5"}</InlineMath>
                <ul className="ml-4 mt-2 list-disc">
                  <li>Non-convex-looking with multiple valleys.</li>
                  <li>
                    Derivative:{" "}
                    <InlineMath>{"f_2'(x)=4x^3-8x=4x(x^2-2)"}</InlineMath>, so
                    critical points at{" "}
                    <InlineMath>{"x=0,\\pm\\sqrt{2}"}</InlineMath>.
                  </li>
                  <li>
                    Values:{" "}
                    <InlineMath>{"f_2(0)=5"}</InlineMath>,{" "}
                    <InlineMath>{"f_2(\\pm\\sqrt{2})=1"}</InlineMath>.
                  </li>
                  <li>
                    Two global minima at{" "}
                    <InlineMath>{"x=\\pm\\sqrt{2}"}</InlineMath>, and a local
                    maximum at <InlineMath>{"x=0"}</InlineMath>.
                  </li>
                  <li>
                    Harder to optimize because algorithms can behave differently
                    depending on start point and step strategy.
                  </li>
                </ul>
              </>,
              <>
                <strong>Conclusion:</strong> convex landscapes generally offer
                easier optimization and stronger guarantees.
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Classification table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Type</th>
                  <th className="px-3 py-2 text-left font-semibold">Meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                  <th className="px-3 py-2 text-left font-semibold">Where used</th>
                </tr>
              </thead>
              <tbody>
                <Row t="Constrained" m="Has restrictions" e="x + y ≤ 10, x ≥ 0" u="Budgeting, operations" />
                <Row t="Unconstrained" m="No explicit restrictions" e="min f(x), x∈R" u="Basic fitting tasks" />
                <Row t="Continuous" m="Variables are real-valued" e="x = 0.25" u="Regression, allocation" />
                <Row t="Discrete" m="Variables are count/integer/binary" e="buses = 3" u="Scheduling, routing" />
                <Row t="Linear" m="First-power terms only" e="max cᵀx, Ax≤b" u="Supply chain, planning" />
                <Row t="Nonlinear" m="Contains nonlinear terms" e="x², sin(x), exp(x)" u="ML, control, physics" />
                <Row t="Deterministic" m="All data known" e="Fixed demand numbers" u="Stable planning cases" />
                <Row t="Stochastic" m="Uncertainty included" e="Random demand" u="Finance, forecasting" />
                <Row t="Convex" m="Local min is global" e="f(x)=x²" u="Reliable optimization" />
                <Row t="Non-convex" m="May have many local minima" e="f(x)=x⁴−4x²" u="Deep learning" />
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>Assuming every minimum is global.</li>
            <li>Assuming every smooth function is convex.</li>
            <li>Confusing discrete and continuous variables.</li>
            <li>Ignoring constraints during interpretation.</li>
            <li>Thinking nonlinear automatically means impossible.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <Accordion
            type="multiple"
            className="mt-4 rounded-xl border bg-card px-4 py-2"
          >
            <Q
              id="c-q1"
              q="Is x = 2.4 buses a valid decision value in a bus-allocation model?"
              a="No. Number of buses is discrete/integer."
            />
            <Q
              id="c-q2"
              q="Classify: maximize 5x + 3y subject to x + y ≤ 10, x,y ≥ 0."
              a="Constrained, continuous (if x,y real), linear, deterministic."
            />
            <Q
              id="c-q3"
              q="What is the key guarantee of convex optimization?"
              a="Any local minimum is also a global minimum."
            />
            <Q
              id="c-q4"
              q="Is f(x)=x⁴−4x² convex over all real numbers?"
              a="No, it is non-convex and has multiple minima."
            />
            <Q
              id="c-q5"
              q="Give one constrained and one unconstrained example."
              a="Constrained: min cost with budget ≤ B. Unconstrained: min f(x) over x∈R."
            />
            <Q
              id="c-q6"
              q="Known fixed demand vs uncertain demand: deterministic or stochastic?"
              a="Known demand: deterministic. Uncertain demand: stochastic."
            />
            <Q
              id="c-q7"
              q="Can nonlinear problems be solved in practice?"
              a="Yes. Many practical algorithms solve nonlinear problems; they are often just harder than linear ones."
            />
            <Q
              id="c-q8"
              q="Which is easier to optimize globally: f(x)=x² or f(x)=x⁴−4x²?"
              a="f(x)=x² because it is convex."
            />
            <Q
              id="c-q9"
              q="What is a local minimum?"
              a="A point lower than nearby points, not necessarily the lowest globally."
            />
            <Q
              id="c-q10"
              q="If a feasible region is disconnected, can it be convex?"
              a="No. Convex sets must contain line segments between any two points in the set."
            />
          </Accordion>
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            You now know the core optimization categories and how they influence
            modelling and solver behavior. Convexity is especially important
            because it turns local search into globally reliable optimization.
            <p className="mt-3 text-sm">
              Next: <em>Linear Programming</em>, where these ideas become a
              concrete and highly practical optimization framework.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

interface BakerySolution {
  x1: number;
  x2: number;
  profit: number;
  flourUsed: number;
  sugarUsed: number;
  flourBinding: boolean;
  sugarBinding: boolean;
}

/** Corner-search solver for the 2-variable bakery LP (educational, not a general solver). */
function solveBakeryPrimal(flour: number, sugar: number): BakerySolution {
  const eps = 1e-6;
  const candidates: [number, number][] = [
    [0, 0],
    [0, Math.min(flour / 2, sugar / 4)],
    [Math.min(flour / 5, sugar / 2), 0],
  ];
  const x1i = (2 * flour - sugar) / 8;
  const x2i = (flour - 5 * x1i) / 2;
  if (x1i >= -eps && x2i >= -eps) candidates.push([x1i, x2i]);

  let best = { x1: 0, x2: 0, profit: 0 };
  for (const [x1, x2] of candidates) {
    if (x1 < -eps || x2 < -eps) continue;
    if (5 * x1 + 2 * x2 > flour + eps) continue;
    if (2 * x1 + 4 * x2 > sugar + eps) continue;
    const profit = 50 * x1 + 30 * x2;
    if (profit > best.profit) best = { x1, x2, profit };
  }

  const flourUsed = 5 * best.x1 + 2 * best.x2;
  const sugarUsed = 2 * best.x1 + 4 * best.x2;
  return {
    ...best,
    flourUsed,
    sugarUsed,
    flourBinding: Math.abs(flourUsed - flour) < 0.05,
    sugarBinding: Math.abs(sugarUsed - sugar) < 0.05,
  };
}

function bakeryFeasiblePolygon(flour: number, sugar: number): Point2D[] {
  const pts: Point2D[] = [{ x: 0, y: 0 }];
  const x2 = Math.min(flour / 2, sugar / 4);
  if (x2 > 0) pts.push({ x: 0, y: x2 });
  const x1i = (2 * flour - sugar) / 8;
  const x2i = (flour - 5 * x1i) / 2;
  if (x1i >= 0 && x2i >= 0) pts.push({ x: x1i, y: x2i });
  const x1 = Math.min(flour / 5, sugar / 2);
  if (x1 > 0) pts.push({ x: x1, y: 0 });
  return pts;
}

function DualitySensitivityPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "ds-q1",
      question: "Q1. In the bakery primal, what do x₁ and x₂ represent?",
      answer:
        "x₁ = number of cakes produced, x₂ = number of cookies produced.",
    },
    {
      id: "ds-q2",
      question: "Q2. In the bakery dual, what do y₁ and y₂ represent?",
      answer:
        "y₁ = marginal value (shadow price) of 1 kg flour, y₂ = marginal value of 1 kg sugar.",
    },
    {
      id: "ds-q3",
      question: "Q3. State weak duality in one sentence for a maximization primal.",
      answer:
        "Any feasible dual objective value is an upper bound on the primal optimum (dual ≤ primal at optimum for min dual / max primal pairing).",
    },
    {
      id: "ds-q4",
      question: "Q4. What does strong duality guarantee at optimum?",
      answer:
        "Primal optimal value equals dual optimal value (for feasible LPs with optimum).",
    },
    {
      id: "ds-q5",
      question: "Q5. If flour constraint has slack, what is likely true about y₁?",
      answer:
        "y₁ is likely zero (non-binding resource → zero shadow price under complementary slackness).",
    },
    {
      id: "ds-q6",
      question: "Q6. A binding constraint means what physically?",
      answer:
        "The resource is fully used; no leftover capacity at the optimal solution.",
    },
    {
      id: "ds-q7",
      question: "Q7. Shadow price Rs. 7 for flour means what?",
      answer:
        "One extra kg of flour (within valid range) can increase maximum profit by about Rs. 7 while the basis stays unchanged.",
    },
    {
      id: "ds-q8",
      question: "Q8. Why is max primal paired with min dual?",
      answer:
        "Dual variables price resources; minimizing total resource value while meeting product-value requirements mirrors the primal production decision from the resource side.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Duality and Sensitivity Analysis"
          description="Understand primal–dual pairs, shadow prices, and how optimal solutions respond when problem data changes."
          difficulty={page.difficulty}
          estimatedTime={32}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">Simplex Method</span>
            {" · "}
            Key terms:{" "}
            <span className="font-medium text-foreground">
              primal, dual, shadow price, binding constraint, reduced cost,
              sensitivity
            </span>
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Understand primal vs dual as two views of the same bakery problem.</li>
          <li>Read dual variables <InlineMath>{"y_1, y_2"}</InlineMath> as resource values (shadow prices).</li>
          <li>Explain weak and strong duality in plain language.</li>
          <li>Tell binding from non-binding constraints and what that means for shadow prices.</li>
          <li>Use sensitivity analysis to ask “what if profit or capacity changes?”</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why duality matters after simplex</h2>
          <p>
            Simplex tells you <em>how much</em> to produce. Duality asks a
            companion question: <em>how valuable is each resource</em> at that
            optimum? The dual variables <InlineMath>{"y_1, y_2"}</InlineMath>{" "}
            answer that — they are the shadow prices you would see in a solver
            report.
          </p>
        </section>

        <section>
          <h2>Symbol guide: primal vs dual</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Primal meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Dual meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x_1, x_2"}</InlineMath></td>
                  <td className="px-3 py-2">Products to make (cakes, cookies)</td>
                  <td className="px-3 py-2">— (appear inside dual constraints)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"y_1, y_2"}</InlineMath></td>
                  <td className="px-3 py-2">— (appear inside primal constraints)</td>
                  <td className="px-3 py-2">Value per kg of flour, sugar (shadow prices)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"Z"}</InlineMath></td>
                  <td className="px-3 py-2">Total profit to maximize</td>
                  <td className="px-3 py-2">—</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"W"}</InlineMath></td>
                  <td className="px-3 py-2">—</td>
                  <td className="px-3 py-2">Total resource value to minimize</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono"><InlineMath>{"100, 80"}</InlineMath></td>
                  <td className="px-3 py-2">RHS — kg of flour and sugar available</td>
                  <td className="px-3 py-2">Coefficients in dual objective <InlineMath>{"100y_1 + 80y_2"}</InlineMath></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Duality intuition: two views of the same bakery</h2>
          <p>
            Every linear program has a companion problem called its{" "}
            <strong>dual</strong>. The original problem is the{" "}
            <strong>primal</strong>.
          </p>
          <KeyIdeaBox title="Two questions, one bakery">
            <p>
              <strong>Primal asks:</strong> “How many products should we
              produce?”
            </p>
            <p className="mt-2">
              <strong>Dual asks:</strong> “What is the value of our limited
              resources?”
            </p>
          </KeyIdeaBox>
          <p>In the bakery story:</p>
          <ul>
            <li>
              Primal decision variables:{" "}
              <InlineMath>{"x_1"}</InlineMath> = cakes,{" "}
              <InlineMath>{"x_2"}</InlineMath> = cookies.
            </li>
            <li>
              Dual variables: <InlineMath>{"y_1"}</InlineMath> = value of 1 kg
              flour, <InlineMath>{"y_2"}</InlineMath> = value of 1 kg sugar.
            </li>
          </ul>
          <p>
            The primal focuses on <em>production decisions</em>. The dual
            focuses on <em>resource values</em>.
          </p>
        </section>

        <section>
          <h2>Bakery primal problem</h2>
          <p>
            This is the same model from Pages 4–6. <InlineMath>{"x_1"}</InlineMath>{" "}
            and <InlineMath>{"x_2"}</InlineMath> are what we choose; 50 and 30 are
            fixed profits per unit; 100 and 80 are fixed resource limits.
          </p>
          <FormulaCard
            tex={
              "\\begin{aligned} \\max \\quad & Z = 50x_1 + 30x_2 \\\\ \\text{s.t.} \\quad & 5x_1 + 2x_2 \\le 100 \\quad \\text{(flour, kg)} \\\\ & 2x_1 + 4x_2 \\le 80 \\quad \\text{(sugar, kg)} \\\\ & x_1, x_2 \\ge 0. \\end{aligned}"
            }
            label="Bakery primal LP"
            number="7.1"
            caption="Primal = production problem (maximize profit)."
          />
          <DefinitionBox title="Line-by-line (7.1)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"\\max Z"}</InlineMath> — maximize total profit in Rs.</li>
              <li>Row 1: flour used ≤ 100 kg (5 kg per cake + 2 kg per cookie).</li>
              <li>Row 2: sugar used ≤ 80 kg.</li>
              <li><InlineMath>{"x_1, x_2 \\ge 0"}</InlineMath> — non-negative production.</li>
            </ol>
          </DefinitionBox>
          <p>
            At the optimum: <InlineMath>{"x_1^* \\approx 15"}</InlineMath>,{" "}
            <InlineMath>{"x_2^* \\approx 12.5"}</InlineMath>,{" "}
            <InlineMath>{"Z^* = 1125"}</InlineMath> Rs. Both resources are fully
            used (binding).
          </p>
        </section>

        <section>
          <h2>Build the dual step by step</h2>
          <StepByStepBox
            title="From primal to dual"
            steps={[
              <>
                <strong>Step 1: Introduce dual variables.</strong> One dual
                variable per primal constraint (resource):
                <InlineMath>{"y_1"}</InlineMath> = value of 1 kg flour,{" "}
                <InlineMath>{"y_2"}</InlineMath> = value of 1 kg sugar.
              </>,
              <>
                <strong>Step 2: Dual objective.</strong> For a maximization
                primal with “≤” constraints, the dual is minimization of total
                resource value:
                <BlockMath>{"\\min \\; W = 100y_1 + 80y_2"}</BlockMath>
              </>,
              <>
                <strong>Step 3: Dual constraints (one per primal variable).</strong>
                Each product’s resource consumption must be worth at least its
                profit:
                <BlockMath>
                  {"\\begin{aligned} 5y_1 + 2y_2 &\\ge 50 \\quad \\text{(cake)} \\\\ 2y_1 + 4y_2 &\\ge 30 \\quad \\text{(cookie)} \\end{aligned}"}
                </BlockMath>
              </>,
              <>
                <strong>Step 4: Dual sign restrictions.</strong>{" "}
                <InlineMath>{"y_1, y_2 \\ge 0"}</InlineMath>.
              </>,
              <>
                <strong>Full dual model.</strong>
                <FormulaCard
                  tex={
                    "\\begin{aligned} \\min \\quad & W = 100y_1 + 80y_2 \\\\ \\text{s.t.} \\quad & 5y_1 + 2y_2 \\ge 50 \\\\ & 2y_1 + 4y_2 \\ge 30 \\\\ & y_1, y_2 \\ge 0. \\end{aligned}"
                  }
                  label="Bakery dual LP"
                  number="7.2"
                />
              </>,
              <>
                <strong>Why max becomes min.</strong> Primal maximizes output
                value subject to scarce resources. Dual minimizes the total
                “cost” of resources while ensuring each product’s resource bill
                is at least as valuable as its profit. At optimum, these two
                perspectives meet.
              </>,
            ]}
          />
          <DefinitionBox title="Line-by-line (7.2)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"\\min W"}</InlineMath> — minimize total imputed value of all resources.</li>
              <li><InlineMath>{"100y_1 + 80y_2"}</InlineMath> — 100 kg flour at price <InlineMath>{"y_1"}</InlineMath> plus 80 kg sugar at <InlineMath>{"y_2"}</InlineMath>.</li>
              <li>Cake constraint: flour and sugar “billed” to one cake must be worth at least Rs. 50 profit.</li>
              <li>Cookie constraint: same idea for Rs. 30 cookie profit.</li>
              <li><InlineMath>{"y_1, y_2 \\ge 0"}</InlineMath> — shadow prices cannot be negative.</li>
            </ol>
          </DefinitionBox>
          <KeyIdeaBox title="Why the dual constraints look like that">
            <p>
              Each primal <strong>variable</strong> (cake, cookie) becomes one dual{" "}
              <strong>constraint</strong>. Coefficients are how much of each resource
              that product uses — the same numbers as in the primal rows, but now
              multiplied by shadow prices and compared to profit.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Weak and strong duality</h2>
          <DefinitionBox title="Weak duality — in one sentence">
            <p>
              For a maximization primal, any feasible dual total{" "}
              <InlineMath>{"W"}</InlineMath> is a <strong>floor</strong> on how
              low resource pricing can go while still “covering” product profits —
              and it cannot exceed the best primal profit you could achieve.
            </p>
            <BlockMath>{"W \\le Z \\text{ for any feasible primal–dual pair}"}</BlockMath>
          </DefinitionBox>
          <DefinitionBox title="Strong duality — at optimum">
            <p>
              When both problems are solved optimally, the numbers match exactly:
            </p>
            <BlockMath>{"Z^* = W^*"}</BlockMath>
            <p className="mt-2 text-sm text-muted-foreground">
              Maximum profit = minimum total resource value at the right shadow
              prices. The bakery’s Rs. 1125 profit equals the imputed value of
              100 kg flour plus 80 kg sugar priced at <InlineMath>{"y_1^*, y_2^*"}</InlineMath>.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Complementary slackness (plain language)</h2>
          <p>
            Complementary slackness links <strong>leftover capacity</strong> to{" "}
            <strong>zero shadow price</strong>:
          </p>
          <ul>
            <li>
              If a resource is <strong>unused</strong> (constraint has slack),
              its shadow price is <strong>zero</strong>.
            </li>
            <li>
              If a product is <strong>produced</strong> (variable positive),
              its profit is exactly justified by the resource values in the dual
              constraint (constraint is tight).
            </li>
          </ul>
          <p>
            In the bakery optimum, both flour and sugar are fully used, so both{" "}
            <InlineMath>{"y_1, y_2"}</InlineMath> are typically positive. If
            sugar were leftover, <InlineMath>{"y_2"}</InlineMath> would drop to
            zero.
          </p>
        </section>

        <section>
          <h2>Sensitivity analysis</h2>
          <p>
            Sensitivity analysis asks:{" "}
            <strong>what happens if the input data changes?</strong>
          </p>
          <ul>
            <li>Profit of cake changes from Rs. 50 to another value.</li>
            <li>Profit of cookie changes.</li>
            <li>Flour availability increases from 100 kg.</li>
            <li>Sugar availability decreases.</li>
            <li>A new machine-hour constraint is added.</li>
          </ul>
          <p>
            We care about both the new optimum and whether the{" "}
            <em>structure</em> of the solution (which constraints bind) stays
            the same.
          </p>
        </section>

        <section>
          <h2>Shadow price</h2>
          <p>
            The <strong>shadow price</strong> of a resource is how much the
            optimal objective improves if that resource increases by one unit,
            within an allowable range where the current basis remains valid.
          </p>
          <ExampleBox title="Illustrative shadow price">
            <p>
              If flour shadow price is Rs. 7, one extra kg of flour can increase
              maximum profit by about Rs. 7 — but only while flour stays a
              binding resource and the optimal production mix does not switch
              corners.
            </p>
          </ExampleBox>
          <p>
            Shadow price is <strong>not</strong> the same as market price. It
            is an optimization-derived marginal value at the current optimum.
          </p>
        </section>

        <section>
          <h2>Binding vs non-binding constraints</h2>
          <ul>
            <li>
              <strong>Binding:</strong> resource fully used; constraint has zero
              slack.
            </li>
            <li>
              <strong>Non-binding:</strong> resource left over; constraint has
              positive slack.
            </li>
          </ul>
          <ExampleBox title="Bakery at optimum (100 kg flour, 80 kg sugar)">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                Flour used: <InlineMath>{"5(15)+2(12.5)=100"}</InlineMath> →{" "}
                <strong>binding</strong>.
              </li>
              <li>
                Sugar used: <InlineMath>{"2(15)+4(12.5)=80"}</InlineMath> →{" "}
                <strong>binding</strong>.
              </li>
            </ul>
            <p className="mt-2 text-sm">
              If flour were increased to 120 kg while sugar stayed 80 kg, flour
              might become non-binding and its shadow price would drop to zero.
            </p>
          </ExampleBox>
        </section>

        <section>
          <h2>Reduced cost (basic level)</h2>
          <p>
            Suppose a product is <strong>not produced</strong> at the optimum (
            <InlineMath>{"x_j = 0"}</InlineMath>). The <strong>reduced cost</strong>{" "}
            tells how much its profit coefficient would need to increase before
            that product enters the optimal mix.
          </p>
          <ExampleBox title="Cookie intuition">
            <p>
              If cookies are not baked at optimum, cookie profit (Rs. 30) is not
              high enough to justify the flour and sugar they would consume. The
              reduced cost answers: “How many more rupees per cookie would make
              cookies worth producing?”
            </p>
          </ExampleBox>
          <p className="text-sm text-muted-foreground">
            In the simplex Z-row, reduced costs appear as the coefficients of
            non-basic variables at optimality.
          </p>
        </section>

        <section>
          <h2>Interactive sensitivity explorer</h2>
          <p>
            Move the flour and sugar sliders. Watch the feasible region shrink or
            grow, the optimum move, and approximate shadow prices (finite-difference
            estimate: profit gain from +1 kg). If a resource has slack at the
            optimum, its shadow price drops toward zero.
          </p>
          <DualitySensitivityExplorer />
        </section>

        <section>
          <h2>Reference tables</h2>

          <h3>Primal vs dual</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Primal</th>
                  <th className="px-3 py-2 text-left font-semibold">Dual</th>
                </tr>
              </thead>
              <tbody>
                <TableRow2 t="Maximize profit" d="Minimize resource value" />
                <TableRow2 t="Variables = products (x₁, x₂)" d="Variables = resource prices (y₁, y₂)" />
                <TableRow2 t="Constraints = resource limits (≤)" d="Constraints = product value requirements (≥)" />
                <TableRow2 t="RHS = available resources (100, 80)" d="Objective coeffs = resource availability" />
                <TableRow2 t="Optimal Z* = max profit" d="Optimal W* = min resource value (= Z*)" />
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">Constraint vs resource interpretation</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Primal row</th>
                  <th className="px-3 py-2 text-left font-semibold">Meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Dual variable</th>
                </tr>
              </thead>
              <tbody>
                <TableRow3 c1="5x₁ + 2x₂ ≤ 100" c2="Flour capacity" c3="y₁ = flour shadow price" />
                <TableRow3 c1="2x₁ + 4x₂ ≤ 80" c2="Sugar capacity" c3="y₂ = sugar shadow price" />
                <TableRow3 c1="x₁ ≥ 0" c2="Non-negative cakes" c3="Dual constraint for cake" />
                <TableRow3 c1="x₂ ≥ 0" c2="Non-negative cookies" c3="Dual constraint for cookie" />
              </tbody>
            </table>
          </div>

          <h3 className="mt-8">Sensitivity terms</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Term</th>
                  <th className="px-3 py-2 text-left font-semibold">Meaning</th>
                  <th className="px-3 py-2 text-left font-semibold">Bakery example</th>
                </tr>
              </thead>
              <tbody>
                <TableRow3 c1="Shadow price" c2="Objective gain per +1 unit of resource" c3="Value of 1 extra kg flour" />
                <TableRow3 c1="Allowable range" c2="RHS range where shadow price stays valid" c3="Flour 100→120 may change basis" />
                <TableRow3 c1="Binding constraint" c2="Resource fully used" c3="Both flour and sugar at optimum" />
                <TableRow3 c1="Reduced cost" c2="Needed objective improvement for unused variable" c3="If x₂=0, how much cookie profit must rise" />
                <TableRow3 c1="Objective coefficient change" c2="Profit per cake/cookie changes" c3="Sensitivity of optimal mix" />
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>
              Thinking dual is unrelated to primal — they are tightly linked
              pairs.
            </li>
            <li>
              Confusing shadow price with market purchase price.
            </li>
            <li>
              Using shadow prices outside the allowable sensitivity range.
            </li>
            <li>
              Ignoring whether constraints are binding when interpreting dual
              values.
            </li>
            <li>
              Assuming every resource increase improves profit (non-binding
              resources may not).
            </li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Duality gives a second lens on the same LP: production decisions in
            the primal, resource values in the dual. At optimum, strong duality
            says these values match. Sensitivity analysis and shadow prices tell
            us how the solution responds when profits or resource limits change.
            <p className="mt-3 text-sm">
              Next: <em>Unconstrained Optimization</em>, where we remove
              explicit constraints and use calculus-based methods.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function DualitySensitivityExplorer() {
  const [flour, setFlour] = useState(100);
  const [sugar, setSugar] = useState(80);

  const solution = useMemo(
    () => solveBakeryPrimal(flour, sugar),
    [flour, sugar],
  );
  const region = useMemo(
    () => bakeryFeasiblePolygon(flour, sugar),
    [flour, sugar],
  );
  const flourShadow = useMemo(() => {
    const bumped = solveBakeryPrimal(flour + 1, sugar);
    return bumped.profit - solution.profit;
  }, [flour, sugar, solution.profit]);
  const sugarShadow = useMemo(() => {
    const bumped = solveBakeryPrimal(flour, sugar + 1);
    return bumped.profit - solution.profit;
  }, [flour, sugar, solution.profit]);

  const xMax = Math.max(flour / 5, sugar / 2, solution.x1) * 1.15;
  const yMax = Math.max(flour / 2, sugar / 4, solution.x2) * 1.15;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 flex justify-between font-medium">
            Flour available (kg)
            <span className="font-mono text-muted-foreground">{flour}</span>
          </span>
          <input
            type="range"
            min={60}
            max={150}
            step={1}
            value={flour}
            onChange={(e) => setFlour(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Flour availability in kg"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 flex justify-between font-medium">
            Sugar available (kg)
            <span className="font-mono text-muted-foreground">{sugar}</span>
          </span>
          <input
            type="range"
            min={40}
            max={120}
            step={1}
            value={sugar}
            onChange={(e) => setSugar(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Sugar availability in kg"
          />
        </label>
      </div>

      <div className="mt-4 rounded-lg bg-muted/40 p-3 text-sm">
        <p className="font-medium">Updated constraints</p>
        <BlockMath>
          {`\\begin{aligned} 5x_1 + 2x_2 &\\le ${flour} \\\\ 2x_1 + 4x_2 &\\le ${sugar} \\end{aligned}`}
        </BlockMath>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-3 text-sm">
          <p className="font-semibold">Approximate optimum</p>
          <p className="mt-1 font-mono">
            x₁ ≈ {solution.x1.toFixed(2)}, x₂ ≈ {solution.x2.toFixed(2)}
          </p>
          <p className="font-mono">Z ≈ Rs. {solution.profit.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border p-3 text-sm">
          <p className="font-semibold">Binding status</p>
          <p>
            Flour:{" "}
            {solution.flourBinding ? (
              <strong>binding</strong>
            ) : (
              <span className="text-muted-foreground">non-binding (slack)</span>
            )}
          </p>
          <p>
            Sugar:{" "}
            {solution.sugarBinding ? (
              <strong>binding</strong>
            ) : (
              <span className="text-muted-foreground">non-binding (slack)</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
        <p>
          Approx. shadow price (finite difference +1 kg): flour ≈ Rs.{" "}
          {flourShadow.toFixed(2)}, sugar ≈ Rs. {sugarShadow.toFixed(2)}.
        </p>
        <p className="mt-1">
          {solution.flourBinding
            ? "Extra flour can raise profit while flour stays binding."
            : "Flour has slack — extra flour may not increase profit."}{" "}
          {solution.sugarBinding
            ? "Sugar is binding at this setting."
            : "Sugar has slack at this setting."}
        </p>
      </div>

      <div className="mt-4">
        <FeasibleRegionPlot
          region={region}
          constraints={[
            {
              x: [0, xMax],
              y: [flour / 2, Math.max(0, (flour - 5 * xMax) / 2)],
              label: `Flour: 5x₁+2x₂≤${flour}`,
            },
            {
              x: [0, xMax],
              y: [sugar / 4, Math.max(0, (sugar - 2 * xMax) / 4)],
              label: `Sugar: 2x₁+4x₂≤${sugar}`,
            },
          ]}
          optimum={{
            x: solution.x1,
            y: solution.x2,
            label: "optimum",
          }}
          xRange={[0, xMax]}
          yRange={[0, yMax]}
          height={360}
          ariaLabel={`Bakery feasible region with flour limit ${flour} kg and sugar limit ${sugar} kg`}
        />
      </div>
    </div>
  );
}

function TableRow2({ t, d }: { t: string; d: string }) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-2 text-muted-foreground">{t}</td>
      <td className="px-3 py-2 text-muted-foreground">{d}</td>
    </tr>
  );
}

function TableRow3({
  c1,
  c2,
  c3,
}: {
  c1: string;
  c2: string;
  c3: string;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-2 font-medium">{c1}</td>
      <td className="px-3 py-2 text-muted-foreground">{c2}</td>
      <td className="px-3 py-2 text-muted-foreground">{c3}</td>
    </tr>
  );
}

function UnconstrainedOptimizationPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "uo-q1",
      question: "Q1. What is unconstrained optimization?",
      answer:
        "Choosing x to minimize or maximize f(x) without explicit inequality/equality constraints (beyond the natural domain of x).",
    },
    {
      id: "uo-q2",
      question: "Q2. State the first-order condition for a smooth interior minimum.",
      answer: (
        <>
          At a critical point, <InlineMath>{"f'(x^*) = 0"}</InlineMath> (or{" "}
          <InlineMath>{"\\nabla f(x^*) = 0"}</InlineMath> in many variables).
        </>
      ),
    },
    {
      id: "uo-q3",
      question: "Q3. If f''(x*) > 0, what does that suggest?",
      answer: "The point is a local minimum (concave-up curvature at x*).",
    },
    {
      id: "uo-q4",
      question: "Q4. Find the critical point of f(x) = x² - 4x + 7.",
      answer: (
        <>
          <InlineMath>{"f'(x)=2x-4=0 \\Rightarrow x^*=2"}</InlineMath>. Since{" "}
          <InlineMath>{"f''(x)=2>0"}</InlineMath>, it is a local (and global) minimum.
        </>
      ),
    },
    {
      id: "uo-q5",
      question: "Q5. For f(x) = x⁴ - 4x², name one local maximum.",
      answer: (
        <>
          <InlineMath>{"x=0"}</InlineMath> is a local maximum because{" "}
          <InlineMath>{"f''(0)<0"}</InlineMath>.
        </>
      ),
    },
    {
      id: "uo-q6",
      question: "Q6. What is a saddle point in two variables?",
      answer:
        "A point where the gradient is zero but the surface curves up in one direction and down in another (e.g. x² - y² at the origin).",
    },
    {
      id: "uo-q7",
      question: "Q7. Can a local minimum be worse than the global minimum?",
      answer:
        "Yes. A local minimum is best only in a neighborhood; the global minimum is best over the entire domain.",
    },
    {
      id: "uo-q8",
      question: "Q8. Why is f(x) = (x - 3)² + 2 called a shifted bowl?",
      answer:
        "It is a parabola with the same bowl shape as x², but shifted right to x = 3 and up by 2 units.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Unconstrained Optimization"
          description="Learn how to find minima and maxima when there are no explicit constraints — using derivatives, critical points, and curvature."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">Duality &amp; Sensitivity</span>
            {" · "}
            Key terms:{" "}
            <span className="font-medium text-foreground">
              critical point, gradient, Hessian, local vs global, saddle
            </span>
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>See how unconstrained problems differ from LP (no <InlineMath>{"Ax \\le b"}</InlineMath>).</li>
          <li>Use <InlineMath>{"f'(x)"}</InlineMath>, <InlineMath>{"f''(x)"}</InlineMath>, and <InlineMath>{"\\nabla f"}</InlineMath> to find and classify minima.</li>
          <li>Distinguish minimizer <InlineMath>{"x^*"}</InlineMath> from minimum value <InlineMath>{"f(x^*)"}</InlineMath> (Page 1 notation).</li>
          <li>Recognize local vs global optima and saddle points on simple curves.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why this page follows linear programming</h2>
          <p>
            Pages 4–7 asked: “What is the best <InlineMath>{"x"}</InlineMath> I can
            choose <em>inside</em> a feasible region?” Unconstrained optimization
            removes those walls: <InlineMath>{"x"}</InlineMath> can be any real
            number (or any point in <InlineMath>{"\\mathbb{R}^n"}</InlineMath>)
            and we use <strong>calculus</strong> instead of corners and tableaus.
          </p>
        </section>

        <section>
          <h2>Symbol guide: derivatives and optima</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Plain meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"f(x)"}</InlineMath></td>
                  <td className="px-3 py-2">Objective function — what we minimize or maximize</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"f'(x)"}</InlineMath></td>
                  <td className="px-3 py-2">First derivative — slope of the curve at <InlineMath>{"x"}</InlineMath></td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"f''(x)"}</InlineMath></td>
                  <td className="px-3 py-2">Second derivative — curvature (bowl up or down)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"\\nabla f"}</InlineMath></td>
                  <td className="px-3 py-2">Gradient — vector of partial derivatives in many variables</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x^*"}</InlineMath></td>
                  <td className="px-3 py-2">Optimal input (minimizer or maximizer) — same star notation as Page 1</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">Critical point</td>
                  <td className="px-3 py-2">Where <InlineMath>{"f'(x)=0"}</InlineMath> (or <InlineMath>{"\\nabla f = 0"}</InlineMath>) — candidate for min/max</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">Saddle</td>
                  <td className="px-3 py-2">Gradient zero but not a peak or valley — up one way, down another</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>What is unconstrained optimization?</h2>
          <p>
            In <strong>unconstrained optimization</strong>, we choose{" "}
            <InlineMath>{"x"}</InlineMath> to make <InlineMath>{"f(x)"}</InlineMath>{" "}
            as small (or large) as possible, without explicit resource or feasibility
            constraints like <InlineMath>{"Ax \\le b"}</InlineMath>.
          </p>
          <FormulaCard
            tex={"\\min_{x} \\; f(x)"}
            label="Unconstrained minimization"
            number="8.1"
            caption="Find the input x that makes f as small as possible — no extra constraints."
          />
          <DefinitionBox title="Line-by-line (8.1)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"\\min"}</InlineMath> — we want the smallest possible value of <InlineMath>{"f"}</InlineMath>.</li>
              <li><InlineMath>{"x"}</InlineMath> — the variable we are free to choose (could be one number or a vector).</li>
              <li><InlineMath>{"f(x)"}</InlineMath> — how “bad” (or good, if maximizing) that choice is.</li>
            </ol>
          </DefinitionBox>
          <p>
            Here <InlineMath>{"x"}</InlineMath> can vary freely in its allowed
            domain (often all real numbers, or all of{" "}
            <InlineMath>{"\\mathbb{R}^n"}</InlineMath>). This is different from{" "}
            <strong>constrained optimization</strong>, where feasible points must
            satisfy extra rules.
          </p>
          <ExampleBox title="Constrained vs unconstrained">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong>Constrained:</strong> maximize profit subject to flour and
                sugar limits.
              </li>
              <li>
                <strong>Unconstrained:</strong> minimize{" "}
                <InlineMath>{"f(x) = x^2 - 6x + 10"}</InlineMath> for any real{" "}
                <InlineMath>{"x"}</InlineMath>.
              </li>
            </ul>
          </ExampleBox>
        </section>

        <section>
          <h2>Key vocabulary</h2>
          <DefinitionBox title="Minimizer vs minimum value">
            <p>
              <InlineMath>{"x^*"}</InlineMath> is the <strong>minimizer</strong> — the
              best input. <InlineMath>{"f(x^*)"}</InlineMath> is the{" "}
              <strong>minimum value</strong> — how low the function goes. Do not
              confuse the two: <InlineMath>{"x^* = 3"}</InlineMath> is a location on
              the axis; <InlineMath>{"f(3) = 1"}</InlineMath> is a height on the graph.
            </p>
          </DefinitionBox>
          <ul>
            <li>
              <strong>Local minimum:</strong> best in a small neighborhood around{" "}
              <InlineMath>{"x^*"}</InlineMath> — like the bottom of one valley.
            </li>
            <li>
              <strong>Global minimum:</strong> best over the entire domain — the
              lowest point anywhere on the curve.
            </li>
            <li>
              <strong>Local maximum:</strong> highest in a neighborhood — a small hilltop.
            </li>
            <li>
              <strong>Saddle point:</strong> gradient is zero, but the point is
              neither a peak nor a valley (up in one direction, down in another).
            </li>
          </ul>
          <KeyIdeaBox title="Local vs global — hiking analogy">
            <p>
              A <strong>local</strong> minimum is the bottom of the valley you are
              standing in. The <strong>global</strong> minimum might be in a
              different valley across a ridge. Derivatives find flat spots; you
              still must check whether a flat spot is the best overall.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Example shapes (1D and 2D)</h2>
          <div className="space-y-4">
            <ExampleBox title="Bowl shapes">
              <p>
                <InlineMath>{"f(x) = x^2"}</InlineMath> and{" "}
                <InlineMath>{"f(x) = (x-3)^2 + 2"}</InlineMath> are smooth bowls
                with one global minimum.
              </p>
              <p>
                <InlineMath>{"f(x,y) = x^2 + y^2"}</InlineMath> is a bowl in two
                dimensions — easy for descent methods.
              </p>
            </ExampleBox>
            <ExampleBox title="Hills, valleys, and saddles">
              <p>
                <InlineMath>{"f(x) = x^4 - 4x^2"}</InlineMath> looks like a
                mountain range with two valleys and a hill in the middle.
              </p>
              <p>
                <InlineMath>{"f(x,y) = x^2 - y^2"}</InlineMath> is a classic{" "}
                <strong>saddle</strong>: it curves up along <InlineMath>{"x"}</InlineMath>{" "}
                and down along <InlineMath>{"y"}</InlineMath> at the origin.
              </p>
            </ExampleBox>
          </div>
        </section>

        <section>
          <h2>Interactive visualization</h2>
          <p>
            Toggle between three one-variable functions. Markers show local or
            global minima (and a local maximum where applicable).
          </p>
          <UnconstrainedFunctionVisualizer />
        </section>

        <section>
          <h2>Derivative intuition</h2>
          <p>
            Imagine walking along the graph of <InlineMath>{"f"}</InlineMath>. The
            derivative <InlineMath>{"f'(x)"}</InlineMath> tells whether you are going
            uphill (positive slope), downhill (negative), or flat (zero). At a
            smooth interior minimum, you cannot go downhill in either direction — so
            the slope must be zero.
          </p>
          <DefinitionBox title="First-order condition (FOC)">
            <p>At an interior critical point of a smooth function:</p>
            <BlockMath>{"f'(x^*) = 0 \\quad \\text{or} \\quad \\nabla f(x^*) = 0"}</BlockMath>
            <p className="mt-2 text-sm text-muted-foreground">
              This is <strong>necessary</strong> for a local min/max but not
              sufficient — <InlineMath>{"f'(x)=0"}</InlineMath> also happens at
              saddles and maxima.
            </p>
          </DefinitionBox>
          <DefinitionBox title="Second-order condition (SOC) — one variable">
            <p>After finding <InlineMath>{"x^*"}</InlineMath> with <InlineMath>{"f'(x^*)=0"}</InlineMath>, check curvature:</p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><InlineMath>{"f''(x^*) > 0"}</InlineMath> — bowl opens upward → <strong>local minimum</strong></li>
              <li><InlineMath>{"f''(x^*) < 0"}</InlineMath> — bowl opens downward → <strong>local maximum</strong></li>
              <li><InlineMath>{"f''(x^*) = 0"}</InlineMath> — test inconclusive; need higher-order information</li>
            </ul>
          </DefinitionBox>
          <p className="text-sm text-muted-foreground">
            In many variables, the Hessian (matrix of second partial derivatives)
            plays the same role as <InlineMath>{"f''"}</InlineMath> in one dimension.
          </p>
        </section>

        <section>
          <h2>Big solved example</h2>
          <p>
            <strong>Problem.</strong> Find the minimum of{" "}
            <InlineMath>{"f(x) = x^2 - 6x + 10"}</InlineMath>.
          </p>
          <p className="text-sm text-muted-foreground">
            Read in words: a parabola opening upward. We want the lowest point.
          </p>
          <StepByStepBox
            title="Complete solution"
            steps={[
              <>
                <strong>Differentiate:</strong>{" "}
                <InlineMath>{"f'(x) = 2x - 6"}</InlineMath> — slope at any{" "}
                <InlineMath>{"x"}</InlineMath>.
              </>,
              <>
                <strong>First-order condition:</strong> set slope to zero:{" "}
                <InlineMath>{"2x - 6 = 0 \\Rightarrow x^* = 3"}</InlineMath>. This
                is the only critical point.
              </>,
              <>
                <strong>Second-order check:</strong>{" "}
                <InlineMath>{"f''(x) = 2 > 0"}</InlineMath>, so{" "}
                <InlineMath>{"x^* = 3"}</InlineMath> is a local minimum. For an
                upward parabola, local = global.
              </>,
              <>
                <strong>Minimum value:</strong>{" "}
                <InlineMath>{"f(3) = 9 - 18 + 10 = 1"}</InlineMath>. Answer: minimizer{" "}
                <InlineMath>{"x^* = 3"}</InlineMath>, minimum value <InlineMath>{"1"}</InlineMath>.
              </>,
              <>
                <strong>Graphical check:</strong> lowest point of the bowl is at{" "}
                <InlineMath>{"(3, 1)"}</InlineMath> — use the interactive plot below to verify.
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Local vs global example</h2>
          <p>
            Consider <InlineMath>{"f(x) = x^4 - 4x^2 + 5"}</InlineMath> — two valleys
            and one hill between them.
          </p>
          <StepByStepBox
            title="Classify critical points"
            steps={[
              <>
                <strong>FOC:</strong>{" "}
                <InlineMath>{"f'(x) = 4x^3 - 8x = 4x(x^2 - 2) = 0"}</InlineMath>.
                Critical points: <InlineMath>{"x = 0, \\pm\\sqrt{2}"}</InlineMath>.
              </>,
              <>
                <strong>SOC at</strong> <InlineMath>{"x = 0"}</InlineMath>:{" "}
                <InlineMath>{"f''(0) = -8 < 0"}</InlineMath> → local <strong>maximum</strong> (hilltop).
              </>,
              <>
                <strong>SOC at</strong> <InlineMath>{"x = \\pm\\sqrt{2}"}</InlineMath>:{" "}
                <InlineMath>{"f''(\\sqrt{2}) = 16 > 0"}</InlineMath> → local{" "}
                <strong>minima</strong> (valley floors).
              </>,
              <>
                <strong>Compare heights:</strong> <InlineMath>{"f(0)=5"}</InlineMath>,{" "}
                <InlineMath>{"f(\\pm\\sqrt{2}) = 1"}</InlineMath>. Global minima are at{" "}
                <InlineMath>{"x = \\pm\\sqrt{2}"}</InlineMath> with value 1 — two
                different minimizers, same minimum value.
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Assuming every critical point is a minimum.</li>
            <li>Confusing minimizer <InlineMath>{"x^*"}</InlineMath> with minimum value <InlineMath>{"f(x^*)"}</InlineMath>.</li>
            <li>Calling a local minimum global without checking the whole domain.</li>
            <li>Forgetting that <InlineMath>{"f'(x^*)=0"}</InlineMath> is necessary but not always sufficient.</li>
            <li>Ignoring saddle points in two or more variables.</li>
            <li>Applying second-derivative test when <InlineMath>{"f''(x^*)=0"}</InlineMath>.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Try each question, then expand for a suggested answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Unconstrained optimization minimizes or maximizes{" "}
            <InlineMath>{"f(x)"}</InlineMath> without explicit feasibility
            constraints. Set <InlineMath>{"f'(x^*)=0"}</InlineMath> (or{" "}
            <InlineMath>{"\\nabla f(x^*)=0"}</InlineMath>) to find critical
            points; use <InlineMath>{"f''"}</InlineMath> or the Hessian to
            classify them. Remember <InlineMath>{"x^*"}</InlineMath> is the
            minimizer and <InlineMath>{"f(x^*)"}</InlineMath> is the value — and
            local optima need not be global on wavy landscapes.
            <p className="mt-3 text-sm">
              Next: <em>Gradient Descent and Line Search</em> — how to find{" "}
              <InlineMath>{"x^*"}</InlineMath> numerically when calculus by hand
              is impractical.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function GradientDescentPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "gd-q1",
      question: "Q1. What does the gradient point toward?",
      answer: "The direction of steepest increase of f.",
    },
    {
      id: "gd-q2",
      question: "Q2. Why use the negative gradient for minimization?",
      answer: "Negative gradient points downhill — the direction of steepest decrease.",
    },
    {
      id: "gd-q3",
      question: "Q3. Write one gradient descent update step.",
      answer: (
        <>
          <InlineMath>{"x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)"}</InlineMath>{" "}
          with step size <InlineMath>{"\\alpha_k > 0"}</InlineMath>.
        </>
      ),
    },
    {
      id: "gd-q4",
      question: "Q4. For f(x,y)=x²+y² at (3,4), what is ∇f?",
      answer: (
        <>
          <InlineMath>{"\\nabla f = (2x, 2y)"}</InlineMath>, so{" "}
          <InlineMath>{"\\nabla f(3,4) = (6,8)"}</InlineMath>.
        </>
      ),
    },
    {
      id: "gd-q5",
      question: "Q5. With α=0.1, what is the next point from (3,4)?",
      answer: (
        <>
          <InlineMath>{"(3,4) + 0.1(-6,-8) = (2.4, 3.2)"}</InlineMath>.
        </>
      ),
    },
    {
      id: "gd-q6",
      question: "Q6. What happens if the step size is too large?",
      answer: "Iterates can overshoot and diverge instead of converging to the minimum.",
    },
    {
      id: "gd-q7",
      question: "Q7. Why does gradient descent zig-zag in f(x,y)=10x²+y²?",
      answer:
        "The valley is much narrower in y than x (ill-conditioned), so steps alternate across steep walls.",
    },
    {
      id: "gd-q8",
      question: "Q8. Name two reasonable stopping conditions.",
      answer:
        "Small gradient norm (||∇f|| below tolerance) or maximum iterations reached.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Gradient Descent and Line Search"
          description="Learn gradient descent as repeatedly walking downhill, and how step-size choice (line search) affects convergence."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">Unconstrained Optimization</span>
            {" · "}
            Key terms:{" "}
            <span className="font-medium text-foreground">
              gradient, learning rate, step size, line search, iteration
            </span>
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>See gradient descent as “walk downhill” after Page 8’s calculus conditions.</li>
          <li>Read the update <InlineMath>{"x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)"}</InlineMath> symbol by symbol.</li>
          <li>Understand step size <InlineMath>{"\\alpha_k"}</InlineMath> (learning rate) and why it matters.</li>
          <li>Know what line search does and when gradient descent zig-zags.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why this page follows unconstrained optimization</h2>
          <p>
            Page 8 showed how to find <InlineMath>{"x^*"}</InlineMath> with
            derivatives when <InlineMath>{"f"}</InlineMath> is simple. For machine
            learning and large models, we cannot solve{" "}
            <InlineMath>{"f'(x)=0"}</InlineMath> by hand — we{" "}
            <strong>iterate</strong>: start at a guess <InlineMath>{"x_0"}</InlineMath>,
            take a small step downhill, repeat.
          </p>
          <KeyIdeaBox title="Calculus → algorithm">
            <p>
              FOC says the minimum has zero slope. Gradient descent{" "}
              <em>approaches</em> that point by always moving opposite the slope —
              the same idea, turned into a computer loop.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Symbol guide: gradient descent</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Plain meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x_k"}</InlineMath></td>
                  <td className="px-3 py-2">Current point at iteration <InlineMath>{"k"}</InlineMath> (parameters we are tuning)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"x_{k+1}"}</InlineMath></td>
                  <td className="px-3 py-2">Next point after one update step</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"\\nabla f(x_k)"}</InlineMath></td>
                  <td className="px-3 py-2">Gradient — direction of steepest <em>increase</em> of <InlineMath>{"f"}</InlineMath></td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"-\\nabla f(x_k)"}</InlineMath></td>
                  <td className="px-3 py-2">Negative gradient — steepest <em>decrease</em> (downhill)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"\\alpha_k"}</InlineMath></td>
                  <td className="px-3 py-2">Step size or <strong>learning rate</strong> — how far to walk this iteration</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"p_k"}</InlineMath></td>
                  <td className="px-3 py-2">Search direction (for GD, <InlineMath>{"p_k = -\\nabla f(x_k)"}</InlineMath>)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono"><InlineMath>{"k"}</InlineMath></td>
                  <td className="px-3 py-2">Iteration counter — 0, 1, 2, … until we stop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Main idea: walking downhill</h2>
          <p>
            For one variable, the derivative <InlineMath>{"f'(x)"}</InlineMath>{" "}
            tells the slope. Move opposite the slope to go downhill.
          </p>
          <p>
            For many variables, the <strong>gradient</strong>{" "}
            <InlineMath>{"\\nabla f(x)"}</InlineMath> points in the direction of
            steepest <em>increase</em>. So:
          </p>
          <ul>
            <li>
              <strong>Gradient</strong> = uphill direction (steepest climb)
            </li>
            <li>
              <strong>Negative gradient</strong> = downhill direction (steepest descent)
            </li>
          </ul>
          <DefinitionBox title="Partial derivative reminder (2D)">
            <p>
              For <InlineMath>{"f(x,y)"}</InlineMath>,{" "}
              <InlineMath>{"\\partial f / \\partial x"}</InlineMath> is slope if you
              only move in the <InlineMath>{"x"}</InlineMath> direction (holding{" "}
              <InlineMath>{"y"}</InlineMath> fixed). The gradient stacks these:{" "}
              <InlineMath>{"\\nabla f = (\\partial f/\\partial x, \\partial f/\\partial y)"}</InlineMath>.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Gradient descent update</h2>
          <FormulaCard
            tex={"x_{k+1} = x_k + \\alpha_k p_k"}
            label="General iterative update"
            number="9.1"
            caption="Any descent method: new point = old point + step size × direction."
          />
          <DefinitionBox title="Line-by-line (9.1)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"x_k"}</InlineMath> — where we are now.</li>
              <li><InlineMath>{"p_k"}</InlineMath> — which direction to move (unit not required).</li>
              <li><InlineMath>{"\\alpha_k"}</InlineMath> — how far to move along <InlineMath>{"p_k"}</InlineMath>.</li>
              <li><InlineMath>{"x_{k+1}"}</InlineMath> — landing point after this step.</li>
            </ol>
          </DefinitionBox>
          <p>For gradient descent, the search direction is</p>
          <BlockMath>{"p_k = -\\nabla f(x_k)"}</BlockMath>
          <FormulaCard
            tex={"x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)"}
            label="Gradient descent"
            number="9.2"
            caption="The formula behind most neural-network training loops."
          />
          <DefinitionBox title="Line-by-line (9.2)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li>Compute gradient at current <InlineMath>{"x_k"}</InlineMath>.</li>
              <li>Flip sign — move opposite uphill.</li>
              <li>Scale by <InlineMath>{"\\alpha_k"}</InlineMath> — do not overshoot.</li>
              <li>Repeat until gradient is small or budget runs out.</li>
            </ol>
          </DefinitionBox>
        </section>

        <section>
          <h2>Numerical example: f(x, y) = x² + y²</h2>
          <p>
            Start at <InlineMath>{"x_0 = (3, 4)"}</InlineMath>. Read in words: a
            circular bowl centered at the origin; we want to slide toward{" "}
            <InlineMath>{"(0,0)"}</InlineMath>.
          </p>
          <StepByStepBox
            title="One iteration with α = 0.1"
            steps={[
              <>
                Gradient: <InlineMath>{"\\nabla f(x,y) = (2x, 2y)"}</InlineMath>.
              </>,
              <>
                At <InlineMath>{"(3,4)"}</InlineMath>:{" "}
                <InlineMath>{"\\nabla f(3,4) = (6,8)"}</InlineMath>.
              </>,
              <>
                Negative gradient: <InlineMath>{"(-6,-8)"}</InlineMath>.
              </>,
              <>
                Update: <InlineMath>{"(3,4) + 0.1(-6,-8) = (2.4, 3.2)"}</InlineMath>.
              </>,
              <>
                Objective decreased: <InlineMath>{"f(3,4)=25"}</InlineMath> →{" "}
                <InlineMath>{"f(2.4,3.2)=16"}</InlineMath>.
              </>,
            ]}
          />
          <p>
            Each step moves toward the origin <InlineMath>{"(0,0)"}</InlineMath>,
            where the global minimum value is 0.
          </p>
        </section>

        <section>
          <h2>Interactive contour visualization</h2>
          <p>
            Explore gradient descent on <InlineMath>{"f(x,y)=x^2+y^2"}</InlineMath>{" "}
            starting from <InlineMath>{"(3,4)"}</InlineMath>. Adjust step size α
            and number of iterations.
          </p>
          <GradientDescentBowlDemo />
        </section>

        <section>
          <h2>Line search</h2>
          <p>
            Formula (9.2) fixes the <em>direction</em>; line search chooses the{" "}
            <em>step length</em> <InlineMath>{"\\alpha_k"}</InlineMath>. Think of
            standing on a hillside: negative gradient says which way to face; line
            search says how many meters to walk before checking again.
          </p>
          <ul>
            <li>
              <strong>Too small α:</strong> progress is slow (many iterations).
            </li>
            <li>
              <strong>Too large α:</strong> overshooting and possible divergence.
            </li>
          </ul>
          <p>Common strategies:</p>
          <ul>
            <li>
              <strong>Fixed step size:</strong> same α every iteration (simple,
              but needs tuning).
            </li>
            <li>
              <strong>Exact line search:</strong> pick α to minimize{" "}
              <InlineMath>{"f(x_k + \\alpha p_k)"}</InlineMath> along the ray —
              best α for that direction.
            </li>
            <li>
              <strong>Backtracking line search:</strong> start with a trial α,
              shrink until the function drops enough.
            </li>
            <li>
              <strong>Armijo condition (intuition):</strong> accept a step only if
              <InlineMath>{"f"}</InlineMath> decreases by a fair fraction of what
              the linear (tangent) model predicted — blocks useless micro-steps
              and wild jumps.
            </li>
          </ul>
          <DefinitionBox title="Machine learning connection">
            <p>
              In deep learning, <InlineMath>{"\\alpha_k"}</InlineMath> is often
              called the <strong>learning rate</strong>. Same symbol, same idea:
              too high → loss explodes; too low → training crawls.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Zig-zag problem in narrow valleys</h2>
          <p>
            For <InlineMath>{"f(x,y) = 10x^2 + y^2"}</InlineMath>, the bowl is
            much steeper in <InlineMath>{"x"}</InlineMath> than in{" "}
            <InlineMath>{"y"}</InlineMath> (elongated valley). Gradient descent
            bounces between walls instead of gliding along the valley floor —
            Page 10’s Newton and quasi-Newton methods address this with curvature.
          </p>
          <GradientDescentZigZagDemo />
        </section>

        <section>
          <h2>Stopping conditions</h2>
          <p>Practical algorithms stop when any of these holds:</p>
          <ul>
            <li>
              Gradient norm is small:{" "}
              <InlineMath>{"\\|\\nabla f(x_k)\\| < \\varepsilon"}</InlineMath>
            </li>
            <li>Objective value stops changing meaningfully.</li>
            <li>Maximum number of iterations is reached.</li>
            <li>Step size becomes very small.</li>
          </ul>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Using the positive gradient instead of the negative gradient.</li>
            <li>Choosing α too large and watching the method diverge.</li>
            <li>Stopping before the gradient is small enough.</li>
            <li>Expecting fast convergence on ill-conditioned valleys without better methods.</li>
            <li>Forgetting that gradient descent finds local minima, not always global ones.</li>
            <li>Not monitoring the objective value across iterations.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <p className="text-sm text-muted-foreground">
            Try each question, then expand for a suggested answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Gradient descent minimizes <InlineMath>{"f"}</InlineMath> by stepping
            in the negative gradient direction. The update{" "}
            <InlineMath>{"x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)"}</InlineMath>{" "}
            is simple and scales to millions of parameters, but step-size choice
            is critical. Line search adapts <InlineMath>{"\\alpha_k"}</InlineMath>;
            narrow valleys can cause slow zig-zagging.
            <p className="mt-3 text-sm">
              Next: <em>Hessian, Newton, and Quasi-Newton Methods</em> — use
              curvature to take smarter steps than raw gradient descent.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function HessianNewtonPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "hn-q1",
      question: "Q1. What does the Hessian describe that the gradient does not?",
      answer:
        "Curvature (how the slope changes). Gradient gives slope only.",
    },
    {
      id: "hn-q2",
      question: "Q2. If H is positive definite at x*, what does that suggest?",
      answer: "A local minimum (bowl-shaped curvature in all directions).",
    },
    {
      id: "hn-q3",
      question: "Q3. Write the Newton linear system for step pₖ.",
      answer: (
        <>
          <InlineMath>{"H_k p_k = -g_k"}</InlineMath>, where{" "}
          <InlineMath>{"H_k = \\nabla^2 f(x_k)"}</InlineMath> and{" "}
          <InlineMath>{"g_k = \\nabla f(x_k)"}</InlineMath>.
        </>
      ),
    },
    {
      id: "hn-q4",
      question: "Q4. For f(x)=x²−4x+5, one Newton step from x=10 gives what?",
      answer: (
        <>
          <InlineMath>{"x_{\\text{new}} = 10 - 16/2 = 2"}</InlineMath>, which is
          the exact minimum.
        </>
      ),
    },
    {
      id: "hn-q5",
      question: "Q5. Why can Newton fail when the Hessian is indefinite?",
      answer:
        "The Newton direction may point toward a saddle or maximum instead of a minimum.",
    },
    {
      id: "hn-q6",
      question: "Q6. What is the main idea of quasi-Newton methods?",
      answer:
        "Approximate the Hessian (or its inverse) from gradient differences to avoid costly second derivatives.",
    },
    {
      id: "hn-q7",
      question: "Q7. Why is L-BFGS popular in machine learning?",
      answer:
        "It captures curvature information with limited memory, scaling to large parameter counts.",
    },
    {
      id: "hn-q8",
      question: "Q8. Compare cost per iteration: GD vs Newton.",
      answer:
        "GD: cheap (gradient only). Newton: expensive (Hessian + linear solve).",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Hessian, Newton, and Quasi-Newton Methods"
          description="Use curvature from the Hessian to take smarter optimization steps — and learn when approximations like BFGS are the practical choice."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">Gradient Descent</span>
            {" · "}
            Key terms: Hessian, Newton direction, quasi-Newton, BFGS, L-BFGS
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Read the Hessian as a table of second derivatives (curvature).</li>
          <li>Understand Newton’s step <InlineMath>{"H_k p_k = -g_k"}</InlineMath> as “use slope + curvature.”</li>
          <li>Know when Newton is fast, expensive, or unreliable.</li>
          <li>See quasi-Newton (BFGS, L-BFGS) as a practical middle ground after Page 9.</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Why this page follows gradient descent</h2>
          <p>
            Gradient descent uses <strong>first-order</strong> information (slope
            only). It can zig-zag in narrow valleys because it does not know how
            steep the walls are in different directions. Newton’s method adds{" "}
            <strong>second-order</strong> information — curvature from the
            Hessian — to pick a better step.
          </p>
          <KeyIdeaBox title="Slope vs curvature">
            <p>
              Gradient: “Which way is downhill right now?” Hessian: “How sharply
              does the ground bend in each direction?” Together they approximate a
              local bowl and jump toward its bottom.
            </p>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Symbol guide: Hessian and Newton</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Symbol</th>
                  <th className="px-3 py-2 text-left font-semibold">Plain meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"H"}</InlineMath> or <InlineMath>{"\\nabla^2 f"}</InlineMath></td>
                  <td className="px-3 py-2">Hessian — matrix of second partial derivatives (curvature)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"f_{xx}, f_{yy}, f_{xy}"}</InlineMath></td>
                  <td className="px-3 py-2">Entries of <InlineMath>{"H"}</InlineMath> — how slope changes along each axis</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"g_k"}</InlineMath></td>
                  <td className="px-3 py-2">Gradient at <InlineMath>{"x_k"}</InlineMath> (same as Page 9)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono"><InlineMath>{"p_k"}</InlineMath></td>
                  <td className="px-3 py-2">Newton step — solution of <InlineMath>{"H_k p_k = -g_k"}</InlineMath></td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-2 font-mono">PD / ND / indefinite</td>
                  <td className="px-3 py-2">Positive definite = bowl; negative definite = hill; indefinite = saddle mix</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono"><InlineMath>{"B_k"}</InlineMath></td>
                  <td className="px-3 py-2">Quasi-Newton approximation of the Hessian (BFGS builds this)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Hessian: slope vs curvature</h2>
          <p>
            The <strong>gradient</strong> tells you the slope (first derivatives).
            The <strong>Hessian</strong> tells you <strong>curvature</strong>{" "}
            (second derivatives) — how the slope itself changes.
          </p>
          <ul>
            <li>Gradient → “Which way is downhill?”</li>
            <li>Hessian → “How bowl-shaped or saddle-shaped is the landscape?”</li>
          </ul>
          <p>For <InlineMath>{"f(x, y)"}</InlineMath>, the Hessian is:</p>
          <BlockMath>
            {
              "H = \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix}"
            }
          </BlockMath>
          <p>
            In smooth cases <InlineMath>{"f_{xy} = f_{yx}"}</InlineMath> (symmetric
            Hessian).
          </p>
          <DefinitionBox title="1D link to Page 8">
            <p>
              When there is one variable, the Hessian is just the number{" "}
              <InlineMath>{"f''(x)"}</InlineMath>. Newton’s 1D formula{" "}
              <InlineMath>{"x_{\\text{new}} = x - f'(x)/f''(x)"}</InlineMath> is
              the same idea as solving <InlineMath>{"f''(x)\\,p = -f'(x)"}</InlineMath>.
            </p>
          </DefinitionBox>
        </section>

        <section>
          <h2>Shape examples from the Hessian</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ExampleBox title="Bowl (minimum)">
              <p>
                <InlineMath>{"f(x,y)=x^2+y^2"}</InlineMath>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <InlineMath>{"H = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}"}</InlineMath>{" "}
                — positive definite.
              </p>
            </ExampleBox>
            <ExampleBox title="Hill (maximum)">
              <p>
                <InlineMath>{"f(x,y)=-x^2-y^2"}</InlineMath>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <InlineMath>{"H = \\begin{pmatrix} -2 & 0 \\\\ 0 & -2 \\end{pmatrix}"}</InlineMath>{" "}
                — negative definite.
              </p>
            </ExampleBox>
            <ExampleBox title="Saddle">
              <p>
                <InlineMath>{"f(x,y)=x^2-y^2"}</InlineMath>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <InlineMath>{"H = \\begin{pmatrix} 2 & 0 \\\\ 0 & -2 \\end{pmatrix}"}</InlineMath>{" "}
                — indefinite (up in x, down in y).
              </p>
            </ExampleBox>
          </div>
          <DefinitionBox title="Positive definite vs indefinite — plain language">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><strong>Positive definite:</strong> bowl in every direction → Newton step toward a minimum is sensible.</li>
              <li><strong>Negative definite:</strong> inverted bowl → maximum, not minimum.</li>
              <li><strong>Indefinite:</strong> saddle — curves up one way, down another; raw Newton can point the wrong way.</li>
            </ul>
          </DefinitionBox>
        </section>

        <section>
          <h2>Interactive visualization: bowl, hill, saddle</h2>
          <p>
            Toggle between three classic surfaces. Default view is a{" "}
            <strong>2D contour plot</strong>; optional 3D surface is available
            when it helps intuition.
          </p>
          <HessianShapeContourDemo />
        </section>

        <section>
          <h2>Newton method intuition</h2>
          <p>
            Gradient descent uses slope only. Newton&apos;s method fits a{" "}
            <strong>local quadratic bowl</strong> using slope + curvature, then
            jumps to the bottom of that bowl.
          </p>
          <FormulaCard
            tex={"H_k p_k = -g_k"}
            label="Newton linear system"
            number="10.1"
            caption="Find step pₖ so curvature × step cancels the gradient."
          />
          <DefinitionBox title="Line-by-line (10.1)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"H_k"}</InlineMath> — Hessian at current point (curvature matrix).</li>
              <li><InlineMath>{"g_k = \\nabla f(x_k)"}</InlineMath> — gradient (slope vector).</li>
              <li><InlineMath>{"p_k"}</InlineMath> — unknown step; solve the linear system.</li>
              <li>Right-hand side <InlineMath>{"-g_k"}</InlineMath> — move opposite uphill, scaled by curvature.</li>
            </ol>
          </DefinitionBox>
          <FormulaCard
            tex={"x_{k+1} = x_k + p_k"}
            label="Newton update"
            number="10.2"
            caption="Same pattern as (9.1), but pₖ comes from curvature, not −∇f."
          />
          <DefinitionBox title="Line-by-line (10.2)">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li>Start from current <InlineMath>{"x_k"}</InlineMath>.</li>
              <li>Add Newton direction <InlineMath>{"p_k"}</InlineMath> (no separate α if you trust the model).</li>
              <li>Equivalently: <InlineMath>{"x_{k+1} = x_k - H_k^{-1} g_k"}</InlineMath> when <InlineMath>{"H_k"}</InlineMath> is invertible.</li>
            </ol>
          </DefinitionBox>
        </section>

        <section>
          <h2>One-variable Newton example</h2>
          <p>
            <InlineMath>{"f(x) = x^2 - 4x + 5"}</InlineMath> — upward parabola.
            Minimum at <InlineMath>{"x^* = 2"}</InlineMath> from Page 8 calculus;
            Newton reaches it in one step from far away.
          </p>
          <BlockMath>{"x_{\\text{new}} = x - \\dfrac{f'(x)}{f''(x)}"}</BlockMath>
          <StepByStepBox
            title="Newton from x₀ = 10"
            steps={[
              <>
                <InlineMath>{"f'(10)=16"}</InlineMath>,{" "}
                <InlineMath>{"f''(10)=2"}</InlineMath>.
              </>,
              <>
                <InlineMath>{"x_1 = 10 - 16/2 = 2"}</InlineMath>.
              </>,
              <>
                At <InlineMath>{"x=2"}</InlineMath>,{" "}
                <InlineMath>{"f'(2)=0"}</InlineMath> — already at the minimum.
                Newton converged in <strong>one step</strong> for this quadratic.
              </>,
            ]}
          />
        </section>

        <section>
          <h2>Why Newton is fast</h2>
          <p>
            Newton minimizes this <strong>quadratic model</strong> of{" "}
            <InlineMath>{"f"}</InlineMath> near <InlineMath>{"x_k"}</InlineMath>:
          </p>
          <BlockMath>
            {
              "m_k(p) = f(x_k) + g_k^\\top p + \\tfrac{1}{2} p^\\top H_k p"
            }
          </BlockMath>
          <DefinitionBox title="Read mₖ(p) in words">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li><InlineMath>{"f(x_k)"}</InlineMath> — height where we stand now.</li>
              <li><InlineMath>{"g_k^\\top p"}</InlineMath> — linear slope term (first-order).</li>
              <li><InlineMath>{"\\tfrac{1}{2} p^\\top H_k p"}</InlineMath> — curvature correction (second-order).</li>
            </ol>
          </DefinitionBox>
          <p>
            For a true quadratic function, one Newton step lands exactly at the
            minimum. Near a smooth minimum, convergence is often much faster than
            gradient descent — but only when <InlineMath>{"H_k"}</InlineMath> is
            well-behaved.
          </p>
        </section>

        <section>
          <h2>Why Newton can be expensive</h2>
          <ul>
            <li>Computing the Hessian costs <InlineMath>{"O(n^2)"}</InlineMath> or more.</li>
            <li>Storing <InlineMath>{"H"}</InlineMath> is expensive in high dimensions.</li>
            <li>Solving <InlineMath>{"H p = -g"}</InlineMath> each iteration adds cost.</li>
            <li>
              <InlineMath>{"H_k"}</InlineMath> may be indefinite or singular — raw
              Newton is not always a descent direction.
            </li>
          </ul>
        </section>

        <section>
          <h2>Quasi-Newton methods</h2>
          <p>
            Quasi-Newton methods <strong>avoid forming the exact Hessian</strong>.
            They build a curvature approximation <InlineMath>{"B_k"}</InlineMath>{" "}
            from gradient differences across steps — “remembering” how the slope
            changed as we walked.
          </p>
          <ul>
            <li>
              <strong>BFGS:</strong> updates a matrix approximation using recent
              step and gradient changes; strong default for medium-sized problems.
            </li>
            <li>
              <strong>L-BFGS:</strong> limited-memory version — stores only a few
              vectors instead of the full matrix; popular for large ML models.
            </li>
          </ul>
          <FormulaCard
            tex={"B_{k+1} \\approx \\nabla^2 f(x_{k+1})"}
            label="Quasi-Newton idea"
            number="10.3"
            caption="Approximate curvature instead of computing every fᵢⱼ."
          />
          <DefinitionBox title="Line-by-line (10.3)">
            <p className="text-sm">
              After each step, update <InlineMath>{"B_k"}</InlineMath> so it
              matches observed changes in gradient (secant condition). Solve{" "}
              <InlineMath>{"B_k p_k = -g_k"}</InlineMath> like Newton, but cheaply.
            </p>
          </DefinitionBox>
          <KeyIdeaBox title="When to use which method">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li><strong>Gradient descent:</strong> huge models, cheap steps, many epochs.</li>
              <li><strong>Newton:</strong> small smooth problems, need few iterations.</li>
              <li><strong>L-BFGS:</strong> classical ML, scientific computing — better than GD in stiff valleys.</li>
            </ul>
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Comparison: gradient descent vs Newton vs quasi-Newton</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Uses curvature?</th>
                  <th className="px-3 py-2 text-left font-semibold">Cost / step</th>
                  <th className="px-3 py-2 text-left font-semibold">Typical behavior</th>
                </tr>
              </thead>
              <tbody>
                <Row
                  t="Gradient descent"
                  m="No (gradient only)"
                  e="Low"
                  u="Simple; can be slow in ill-conditioned valleys"
                />
                <Row
                  t="Newton"
                  m="Yes (exact Hessian)"
                  e="High"
                  u="Very fast near minimum; needs PD Hessian"
                />
                <Row
                  t="Quasi-Newton (BFGS/L-BFGS)"
                  m="Approximate"
                  e="Medium"
                  u="Strong practical balance; L-BFGS scales well"
                />
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>Applying Newton when the Hessian is indefinite (step may ascend).</li>
            <li>Assuming Newton always converges globally.</li>
            <li>Ignoring the cost of Hessian computation in large problems.</li>
            <li>Confusing the Hessian with the gradient.</li>
            <li>Expecting BFGS to match exact Newton on tiny problems only — it is for efficiency at scale.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            The Hessian encodes curvature. Newton&apos;s method solves{" "}
            <InlineMath>{"H_k p_k = -g_k"}</InlineMath> for a step that fits the
            local quadratic landscape — fast when it works, but costly and delicate
            when <InlineMath>{"H_k"}</InlineMath> is hard to obtain or not positive
            definite. Quasi-Newton methods (BFGS, L-BFGS) approximate curvature and
            are widely used in practice.
            <p className="mt-3 text-sm">
              Next: <em>Trust Region Methods</em> — controlling how far we trust
              the local model.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function TrustRegionPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "tr-q1",
      question: "Q1. What is the trust-region radius Δₖ?",
      answer:
        "The maximum step length ||p|| allowed because the local model is only trusted within that neighborhood.",
    },
    {
      id: "tr-q2",
      question: "Q2. Write the trust-region subproblem objective model mₖ(p).",
      answer: (
        <>
          <InlineMath>{"m_k(p)=f_k+g_k^\\top p+\\tfrac{1}{2}p^\\top B_k p"}</InlineMath>{" "}
          with <InlineMath>{"\\|p\\|\\le\\Delta_k"}</InlineMath>.
        </>
      ),
    },
    {
      id: "tr-q3",
      question: "Q3. What does a ratio ρₖ near 1 mean?",
      answer:
        "Actual reduction matched predicted reduction — the local model was accurate.",
    },
    {
      id: "tr-q4",
      question: "Q4. Line search vs trust region: what is chosen first?",
      answer:
        "Line search: direction first, then step length. Trust region: trusted radius first, then best step inside.",
    },
    {
      id: "tr-q5",
      question: "Q5. What is the Cauchy point?",
      answer:
        "A simple approximate trust-region step along the negative gradient, scaled to stay inside the region.",
    },
    {
      id: "tr-q6",
      question: "Q6. If ρₖ is very small, what should happen to Δₖ?",
      answer: "Shrink the trust-region radius — the model was unreliable.",
    },
    {
      id: "tr-q7",
      question: "Q7. Why is trust region safer than pure Newton far from the minimum?",
      answer:
        "It limits step length so a bad quadratic model cannot send the iterate too far.",
    },
    {
      id: "tr-q8",
      question: "Q8. Actual vs predicted reduction — which is from the true function?",
      answer: "Actual reduction uses true f values; predicted uses the model mₖ.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Trust Region Methods"
          description="Optimize safely by trusting a local quadratic model only within a controlled radius — and adapt that radius from how well the model performs."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">
              Hessian, Newton, and Quasi-Newton Methods
            </span>
            {" · "}
            Key terms: trust region, Cauchy point, ρₖ, actual/predicted reduction
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Local quadratic model and trust-region radius</li>
          <li>Trust-region subproblem</li>
          <li>Actual vs predicted reduction and acceptance ratio ρₖ</li>
          <li>Cauchy point</li>
          <li>Line search vs trust region</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose-content mt-8">
        <section>
          <h2>Main intuition</h2>
          <p>
            Newton and quasi-Newton methods build a <strong>local quadratic
            model</strong> of <InlineMath>{"f"}</InlineMath>. That model is
            accurate only <em>near</em> the current point.
          </p>
          <KeyIdeaBox title="The core question">
            How far can we trust this model?
          </KeyIdeaBox>
          <p>
            Trust-region methods answer by restricting the step: solve the model
            only inside a ball of radius <InlineMath>{"\\Delta_k"}</InlineMath>.
          </p>
        </section>

        <section>
          <h2>Map analogy</h2>
          <ExampleBox title="Local map of a city">
            <p>
              Imagine you have a detailed street map centered on your current
              location. The map is accurate for nearby streets but becomes
              unreliable far away.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>You travel only within a <strong>trusted distance</strong> Δ.</li>
              <li>
                If predictions match reality, you <strong>expand</strong> trust
                (larger Δ next time).
              </li>
              <li>
                If the map misled you, you <strong>shrink</strong> trust (smaller
                Δ).
              </li>
            </ul>
          </ExampleBox>
        </section>

        <section>
          <h2>Mathematical model</h2>
          <FormulaCard
            tex={
              "m_k(p) = f_k + g_k^\\top p + \\tfrac{1}{2} p^\\top B_k p \\quad \\text{s.t.} \\quad \\|p\\| \\le \\Delta_k"
            }
            label="Trust-region subproblem"
            number="11.1"
          />
          <ul>
            <li>
              <InlineMath>{"m_k(p)"}</InlineMath>: quadratic model of{" "}
              <InlineMath>{"f"}</InlineMath> near <InlineMath>{"x_k"}</InlineMath>
            </li>
            <li>
              <InlineMath>{"f_k = f(x_k)"}</InlineMath>: current objective value
            </li>
            <li>
              <InlineMath>{"g_k = \\nabla f(x_k)"}</InlineMath>: gradient at{" "}
              <InlineMath>{"x_k"}</InlineMath>
            </li>
            <li>
              <InlineMath>{"B_k"}</InlineMath>: curvature matrix (often Hessian or
              quasi-Newton approximation)
            </li>
            <li>
              <InlineMath>{"p"}</InlineMath>: proposed step vector
            </li>
            <li>
              <InlineMath>{"\\Delta_k"}</InlineMath>: trust-region radius
            </li>
          </ul>
        </section>

        <section>
          <h2>Actual vs predicted reduction</h2>
          <p>
            <strong>Actual reduction</strong> — what really happened to{" "}
            <InlineMath>{"f"}</InlineMath>:
          </p>
          <BlockMath>
            {"\\text{ared}_k = f_k - f(x_k + p_k)"}
          </BlockMath>
          <p>
            <strong>Predicted reduction</strong> — what the model expected:
          </p>
          <BlockMath>
            {"\\text{pred}_k = m_k(0) - m_k(p_k) = -m_k(p_k) + f_k"}
          </BlockMath>
          <p>Acceptance ratio:</p>
          <FormulaCard
            tex={"\\rho_k = \\dfrac{\\text{ared}_k}{\\text{pred}_k}"}
            label="Gain ratio"
            number="11.2"
          />
          <ul>
            <li>
              <InlineMath>{"\\rho_k \\approx 1"}</InlineMath>: model was good →
              can increase <InlineMath>{"\\Delta_k"}</InlineMath>.
            </li>
            <li>
              <InlineMath>{"\\rho_k"}</InlineMath> small or negative: model was
              poor → shrink <InlineMath>{"\\Delta_k"}</InlineMath> or reject step.
            </li>
          </ul>
        </section>

        <section>
          <h2>Line search vs trust region</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Line search</th>
                  <th className="px-3 py-2 text-left font-semibold">Trust region</th>
                </tr>
              </thead>
              <tbody>
                <TableRow2
                  t="Choose search direction p first (e.g. −∇f or Newton)"
                  d="Choose trusted radius Δ first"
                />
                <TableRow2
                  t="Then pick step length α along that ray"
                  d="Then find best p inside ||p|| ≤ Δ"
                />
                <TableRow2
                  t="Risk: long step along a bad direction"
                  d="Risk: limited by radius; model fit checked via ρₖ"
                />
                <TableRow2
                  t="Used in many gradient methods"
                  d="Used in robust Newton-style solvers"
                />
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Cauchy point</h2>
          <p>
            The <strong>Cauchy point</strong> is a simple approximate solution of
            the trust-region subproblem: move along the <strong>negative
            gradient</strong> until you hit the boundary of the trust region.
          </p>
          <BlockMath>
            {
              "p_k^C = -\\dfrac{\\Delta_k}{\\|g_k\\|} g_k \\quad \\text{(when } g_k \\neq 0 \\text{)}"
            }
          </BlockMath>
          <p>Why it is useful:</p>
          <ul>
            <li>Simple and cheap to compute</li>
            <li>Provides a safe descent direction under standard conditions</li>
            <li>Foundation for more accurate subproblem solvers (e.g. dogleg)</li>
          </ul>
        </section>

        <section>
          <h2>Interactive trust-region explorer</h2>
          <p>
            On <InlineMath>{"f(x,y)=(x-1)^2+2(y-0.5)^2"}</InlineMath> at{" "}
            <InlineMath>{"x_k=(2,1)"}</InlineMath>, adjust the trust-region
            radius and see the Cauchy step relative to the circle.
          </p>
          <TrustRegionExplorerDemo />
        </section>

        <section>
          <h2>Trust-region algorithm (outline)</h2>
          <StepByStepBox
            title="Basic trust-region loop"
            steps={[
              <>Start at initial point <InlineMath>{"x_0"}</InlineMath>.</>,
              <>Build local model <InlineMath>{"m_k"}</InlineMath> from <InlineMath>{"f_k, g_k, B_k"}</InlineMath>.</>,
              <>Choose trust-region radius <InlineMath>{"\\Delta_k"}</InlineMath>.</>,
              <>Solve subproblem approximately (e.g. Cauchy or dogleg) for <InlineMath>{"p_k"}</InlineMath>.</>,
              <>Compute actual and predicted reduction; form <InlineMath>{"\\rho_k"}</InlineMath>.</>,
              <>Accept step if <InlineMath>{"\\rho_k"}</InlineMath> is above a threshold; otherwise reject.</>,
              <>Increase <InlineMath>{"\\Delta_k"}</InlineMath> if model was good; decrease if poor.</>,
              <>Repeat until convergence.</>,
            ]}
          />
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li>Using predicted reduction when the step was rejected.</li>
            <li>Expanding Δ when ρₖ is poor.</li>
            <li>Confusing trust region with fixed learning rate.</li>
            <li>Assuming Cauchy point is always the final step (it is often a building block).</li>
            <li>Ignoring that Bₖ must be chosen carefully (e.g. modified Newton).</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Trust-region methods limit steps to where the local quadratic model is
            reliable. The ratio <InlineMath>{"\\rho_k"}</InlineMath> compares
            actual and predicted progress to accept steps and adapt{" "}
            <InlineMath>{"\\Delta_k"}</InlineMath>. This is often more robust than
            unconstrained Newton steps far from the solution.
            <p className="mt-3 text-sm">
              Next: <em>Eigenvalues and Conjugate Gradient</em>.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

// Helper types and functions for eigenvalue / CG demos
type Vec2 = [number, number];
type Mat2 = [[number, number], [number, number]];

function matvec2(A: Mat2, v: Vec2): Vec2 {
  return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
}

function dot2(a: Vec2, b: Vec2) {
  return a[0] * b[0] + a[1] * b[1];
}

function symmetricEigen2(a: number, b: number, d: number) {
  const mean = (a + d) / 2;
  const diff = (a - d) / 2;
  const root = Math.sqrt(diff * diff + b * b);
  const l1 = mean + root;
  const l2 = mean - root;
  const vec = (lambda: number): Vec2 => {
    let v: Vec2 = Math.abs(b) > 1e-9 ? [lambda - d, b] : [1, 0];
    if (Math.abs(b) < 1e-9 && Math.abs(lambda - a) < 1e-9) v = [1, 0];
    else if (Math.abs(b) < 1e-9) v = [0, 1];
    const norm = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / norm, v[1] / norm];
  };
  return { l1, l2, v1: vec(l1), v2: vec(l2) };
}

function steepestDescentQuadratic(H: Mat2, x0: Vec2, maxIter: number): Vec2[] {
  let x: Vec2 = [...x0];
  const path: Vec2[] = [[...x]];
  for (let k = 0; k < maxIter; k++) {
    const g = matvec2(H, x);
    const gg = dot2(g, g);
    if (gg < 1e-14) break;
    const Hg = matvec2(H, g);
    const alpha = gg / dot2(g, Hg);
    x = [x[0] - alpha * g[0], x[1] - alpha * g[1]];
    path.push([...x]);
  }
  return path;
}

function conjugateGradientQuadratic(H: Mat2, x0: Vec2, maxIter: number): Vec2[] {
  let x: Vec2 = [...x0];
  let g = matvec2(H, x);
  let d: Vec2 = [-g[0], -g[1]];
  const path: Vec2[] = [[...x]];
  let rsold = dot2(g, g);
  if (rsold < 1e-14) return path;
  for (let k = 0; k < maxIter; k++) {
    const Hd = matvec2(H, d);
    const denom = dot2(d, Hd);
    if (Math.abs(denom) < 1e-14) break;
    const alpha = rsold / denom;
    x = [x[0] + alpha * d[0], x[1] + alpha * d[1]];
    g = matvec2(H, x);
    const rsnew = dot2(g, g);
    path.push([...x]);
    if (Math.sqrt(rsnew) < 1e-8) break;
    const beta = rsnew / rsold;
    d = [-g[0] + beta * d[0], -g[1] + beta * d[1]];
    rsold = rsnew;
  }
  return path;
}

const EIGEN_MATRIX_PRESETS: Record<
  string,
  { label: string; matrix: Mat2; description: string }
> = {
  example: {
    label: "A = [[4, 1], [1, 4]]",
    matrix: [
      [4, 1],
      [1, 4],
    ],
    description: "Worked example — eigenvalues 5 and 3.",
  },
  recap: {
    label: "A = [[2, 1], [1, 3]]",
    matrix: [
      [2, 1],
      [1, 3],
    ],
    description: "Linear system recap matrix.",
  },
  ill: {
    label: "A = [[10, 0], [0, 1]]",
    matrix: [
      [10, 0],
      [0, 1],
    ],
    description: "Ill-conditioned — narrow valley (κ = 10).",
  },
};

function EigenvalueVectorDemo() {
  const palette = useChartPalette();
  const [preset, setPreset] = useState("example");
  const [angleDeg, setAngleDeg] = useState(40);

  const { matrix, description } = EIGEN_MATRIX_PRESETS[preset]!;
  const [[a, b], [, d]] = matrix;
  const { l1, l2, v1, v2 } = useMemo(
    () => symmetricEigen2(a, b, d),
    [a, b, d],
  );

  const v = useMemo(() => {
    const rad = (angleDeg * Math.PI) / 180;
    return [Math.cos(rad), Math.sin(rad)] as Vec2;
  }, [angleDeg]);

  const Av = useMemo(() => matvec2(matrix, v), [matrix, v]);

  const plotData = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        x: [0, v[0]],
        y: [0, v[1]],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.muted, width: 3 },
        marker: { size: 8 },
        name: "Input vector v",
      },
      {
        x: [0, Av[0]],
        y: [0, Av[1]],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.primary, width: 3 },
        marker: { size: 8 },
        name: "Transformed Av",
      },
      {
        x: [0, v1[0]],
        y: [0, v1[1]],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.danger, width: 2, dash: "dash" },
        marker: { size: 6 },
        name: `Eigenvector 1 (λ₁=${l1.toFixed(2)})`,
      },
      {
        x: [0, v2[0]],
        y: [0, v2[1]],
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.accent, width: 2, dash: "dash" },
        marker: { size: 6 },
        name: `Eigenvector 2 (λ₂=${l2.toFixed(2)})`,
      },
    ],
    [Av, l1, l2, palette, v, v1, v2],
  );

  const layout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { range: [-1.5, 1.5], gridcolor: palette.grid, zerolinecolor: palette.axis },
      yaxis: {
        range: [-1.5, 1.5],
        gridcolor: palette.grid,
        zerolinecolor: palette.axis,
        scaleanchor: "x",
      },
      legend: { orientation: "h", y: -0.25 },
    }),
    [palette],
  );

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 font-medium">Matrix example</span>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Matrix example"
          >
            {Object.entries(EIGEN_MATRIX_PRESETS).map(([key, p]) => (
              <option key={key} value={key}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 flex items-center justify-between font-medium">
            Input direction (degrees)
            <span className="font-mono text-muted-foreground">{angleDeg}°</span>
          </span>
          <input
            type="range"
            min={0}
            max={359}
            step={1}
            value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Input vector angle"
          />
        </label>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-sm">
        Eigenvalues: <strong>λ₁ = {l1.toFixed(3)}</strong>,{" "}
        <strong>λ₂ = {l2.toFixed(3)}</strong> (condition number{" "}
        {(Math.max(l1, l2) / Math.min(l1, l2)).toFixed(2)}).
      </p>
      <PlotlyChart
        data={plotData}
        layout={layout}
        height={380}
        ariaLabel="2D vectors showing input v, transformed Av, and eigenvector directions"
      />
      <EigenvalueVisualizer matrix={matrix} height={360} />
    </div>
  );
}

function CgVsSteepestDescentDemo() {
  const palette = useChartPalette();
  const H: Mat2 = [
    [20, 0],
    [0, 2],
  ];
  const x0: Vec2 = [-3.5, 3.2];
  const a = 10;
  const b = 1;

  const sdPath = useMemo(() => steepestDescentQuadratic(H, x0, 25), []);
  const cgPath = useMemo(() => conjugateGradientQuadratic(H, x0, 25), []);

  const contour = useMemo(() => {
    const range = 4;
    const n = 55;
    const axis: number[] = [];
    for (let i = 0; i < n; i++) axis.push(-range + (2 * range * i) / (n - 1));
    const z = axis.map((y) => axis.map((x) => a * x * x + b * y * y));
    return { axis, z };
  }, [a, b]);

  const data = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        x: contour.axis,
        y: contour.axis,
        z: contour.z,
        type: "contour",
        colorscale: palette.isDark ? "Viridis" : "Blues",
        reversescale: !palette.isDark,
        showscale: false,
        contours: { coloring: "lines" },
        line: { width: 1 },
        hoverinfo: "skip",
      },
      {
        x: sdPath.map((p) => p[0]),
        y: sdPath.map((p) => p[1]),
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.danger, width: 2 },
        marker: { size: 5 },
        name: "Steepest descent",
      },
      {
        x: cgPath.map((p) => p[0]),
        y: cgPath.map((p) => p[1]),
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.secondary, width: 2.5 },
        marker: { size: 6 },
        name: "Conjugate gradient",
      },
      {
        x: [x0[0]],
        y: [x0[1]],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.accent, size: 10 },
        text: ["start"],
        textposition: "top center",
        name: "Start",
      },
      {
        x: [0],
        y: [0],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.accent, size: 11, symbol: "star" },
        text: ["minimum"],
        textposition: "bottom center",
        name: "Minimum",
      },
    ],
    [cgPath, contour, palette, sdPath, x0],
  );

  const layout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "x" }, range: [-4, 4], gridcolor: palette.grid },
      yaxis: {
        title: { text: "y" },
        range: [-4, 4],
        gridcolor: palette.grid,
        scaleanchor: "x",
      },
      legend: { orientation: "h", y: -0.2 },
    }),
    [palette],
  );

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        Contours of <InlineMath>{"f(x,y)=10x^2+y^2"}</InlineMath> (narrow valley).
        Steepest descent zig-zags ({sdPath.length - 1} steps shown); conjugate
        gradient reaches the minimum in {cgPath.length - 1} steps for this quadratic.
      </p>
      <PlotlyChart
        data={data}
        layout={layout}
        height={420}
        ariaLabel="Contour plot comparing steepest descent and conjugate gradient paths"
      />
    </div>
  );
}

type FiniteDiffMethod = "forward" | "backward" | "central";

function FiniteDifferenceDemo() {
  const palette = useChartPalette();
  const [x0, setX0] = useState(3);
  const [h, setH] = useState(0.1);
  const [method, setMethod] = useState<FiniteDiffMethod>("forward");

  const f = (x: number) => x * x;
  const exact = 2 * x0;

  const estimate = useMemo(() => {
    switch (method) {
      case "forward":
        return (f(x0 + h) - f(x0)) / h;
      case "backward":
        return (f(x0) - f(x0 - h)) / h;
      case "central":
        return (f(x0 + h) - f(x0 - h)) / (2 * h);
    }
  }, [h, method, x0]);

  const error = Math.abs(estimate - exact);

  const curve = useMemo(() => {
    const xs: number[] = [];
    const ys: number[] = [];
    const lo = Math.min(x0 - 1.5, x0 - h - 0.3);
    const hi = Math.max(x0 + 1.5, x0 + h + 0.3);
    for (let i = 0; i <= 80; i++) {
      const x = lo + ((hi - lo) * i) / 80;
      xs.push(x);
      ys.push(f(x));
    }
    return { xs, ys };
  }, [x0, h]);

  const secant = useMemo(() => {
    if (method === "forward") {
      return {
        x: [x0, x0 + h],
        y: [f(x0), f(x0 + h)],
        labels: ["x", "x+h"],
        xMarker: null,
      };
    }
    if (method === "backward") {
      return {
        x: [x0 - h, x0],
        y: [f(x0 - h), f(x0)],
        labels: ["x−h", "x"],
        xMarker: null,
      };
    }
    const yMid = f(x0);
    return {
      x: [x0 - h, x0 + h],
      y: [f(x0 - h), f(x0 + h)],
      labels: ["x−h", "x+h"],
      xMarker: { x: x0, y: yMid, label: "x" },
    };
  }, [estimate, h, method, x0]);

  const tangent = useMemo(() => {
    const extent = 0.9;
    return {
      x: [x0 - extent, x0 + extent],
      y: [f(x0) - exact * extent, f(x0) + exact * extent],
    };
  }, [exact, x0]);

  const plotData = useMemo<Array<Record<string, unknown>>>(
    () => [
      {
        x: curve.xs,
        y: curve.ys,
        type: "scatter",
        mode: "lines",
        line: { color: palette.primary, width: 2 },
        name: "f(x) = x²",
      },
      {
        x: tangent.x,
        y: tangent.y,
        type: "scatter",
        mode: "lines",
        line: { color: palette.secondary, width: 2, dash: "dot" },
        name: `Exact tangent (slope = ${exact.toFixed(2)})`,
      },
      {
        x: secant.x,
        y: secant.y,
        type: "scatter",
        mode: "lines+markers+text",
        line: { color: palette.danger, width: 2, dash: "dash" },
        marker: { size: 9, color: palette.danger },
        text: secant.labels,
        textposition: "top center",
        textfont: { size: 11, color: palette.text },
        name: "Finite-difference secant",
      },
      ...(secant.xMarker
        ? [
            {
              x: [secant.xMarker.x],
              y: [secant.xMarker.y],
              type: "scatter",
              mode: "markers+text",
              marker: { size: 10, color: palette.accent },
              text: [secant.xMarker.label],
              textposition: "bottom center",
              name: "Evaluation point",
            },
          ]
        : []),
    ],
    [curve, exact, palette, secant, tangent],
  );

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 flex justify-between font-medium">
            x
            <span className="font-mono text-muted-foreground">{x0.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.1}
            value={x0}
            onChange={(e) => setX0(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="x value"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 flex justify-between font-medium">
            h
            <span className="font-mono text-muted-foreground">{h.toFixed(3)}</span>
          </span>
          <input
            type="range"
            min={0.01}
            max={0.5}
            step={0.01}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="w-full accent-indigo-500"
            aria-label="Step size h"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 font-medium">Method</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as FiniteDiffMethod)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Finite difference method"
          >
            <option value="forward">Forward</option>
            <option value="backward">Backward</option>
            <option value="central">Central</option>
          </select>
        </label>
      </div>
      <div className="grid gap-2 rounded-lg bg-muted/40 p-3 text-sm sm:grid-cols-3">
        <div>
          Estimated <InlineMath>{"f'(x)"}</InlineMath>:{" "}
          <strong className="font-mono">{estimate.toFixed(4)}</strong>
        </div>
        <div>
          Exact <InlineMath>{"f'(x)"}</InlineMath>:{" "}
          <strong className="font-mono">{exact.toFixed(4)}</strong>
        </div>
        <div>
          Absolute error: <strong className="font-mono">{error.toFixed(6)}</strong>
        </div>
      </div>
      <PlotlyChart
        data={plotData}
        layout={{
          xaxis: { title: { text: "x" }, gridcolor: palette.grid },
          yaxis: { title: { text: "f(x)" }, gridcolor: palette.grid },
          showlegend: true,
          legend: { orientation: "h", y: -0.2 },
        }}
        height={360}
        ariaLabel="Plot of f(x)=x squared with finite difference secant line"
      />
    </div>
  );
}

function SparseMatrixDemo() {
  const [mode, setMode] = useState<"dense" | "sparse">("sparse");

  const dense = useMemo(
    () => [
      [1, 2, 0, 1],
      [3, 1, 4, 0],
      [0, 2, 1, 1],
      [1, 0, 2, 3],
    ],
    [],
  );

  const sparseJacobian = useMemo(
    () => [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 1],
    ],
    [],
  );

  const matrix = mode === "dense" ? dense : sparseJacobian;
  const total = matrix.length * (matrix[0]?.length ?? 0);
  const zeros = matrix.flat().filter((v) => Math.abs(v) < 1e-9).length;
  const pctZeros = Math.round((zeros / total) * 100);

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium">Example:</span>
        <button
          type="button"
          onClick={() => setMode("sparse")}
          className={`rounded-md px-3 py-1.5 text-sm ${mode === "sparse" ? "bg-primary text-primary-foreground" : "border bg-background"}`}
        >
          Sparse Jacobian (3×4)
        </button>
        <button
          type="button"
          onClick={() => setMode("dense")}
          className={`rounded-md px-3 py-1.5 text-sm ${mode === "dense" ? "bg-primary text-primary-foreground" : "border bg-background"}`}
        >
          Dense 4×4
        </button>
      </div>
      <p className="text-sm text-muted-foreground">
        {mode === "sparse"
          ? "Each equation depends on only two neighbouring variables — many zero derivatives."
          : "A small dense matrix with fewer structural zeros."}
      </p>
      <MatrixVisualizer
        matrix={matrix}
        mode="sparsity"
        showValues={mode === "dense"}
        rowLabels={mode === "sparse" ? ["f₁", "f₂", "f₃"] : undefined}
        colLabels={mode === "sparse" ? ["x₁", "x₂", "x₃", "x₄"] : undefined}
        ariaLabel={`Sparsity pattern of a ${mode} matrix example`}
      />
      <p className="text-sm">
        Zeros: <strong>{zeros}</strong> of <strong>{total}</strong> entries (
        <strong>{pctZeros}%</strong>).
      </p>
    </div>
  );
}

function OptimizationChapterCompletionCard() {
  const { total, completed, percent } = useChapterProgress(optimizationPageIds);
  const allComplete = completed === total;

  return (
    <div
      className={`rounded-xl border p-6 ${allComplete ? "border-emerald-500/40 bg-emerald-500/10" : "bg-card"}`}
    >
      <h3 className="text-lg font-semibold">
        {allComplete ? "Chapter complete!" : "Optimization chapter progress"}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {allComplete
          ? `You have marked all ${total} Optimization pages complete. Great work — you have finished the first full chapter of this course.`
          : `You have completed ${completed} of ${total} pages (${percent}%). Mark each page complete as you finish it to track your progress.`}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to={ROUTES.progress}
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          View your progress
        </Link>
        <Link
          to={ROUTES.optimization}
          className="inline-flex items-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Back to Optimization overview
        </Link>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        <strong>Coming soon:</strong> Chapter 2 — Statistics. Stay tuned for
        probability, inference, and data analysis.
      </p>
    </div>
  );
}
function EigenvaluesConjugateGradientPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "ecg-q1",
      question: "Q1. What does Av = λv mean geometrically?",
      answer:
        "A stretches vector v without rotating it — v stays on the same line, scaled by λ.",
    },
    {
      id: "ecg-q2",
      question: "Q2. For the 2×2 system with matrix [[2,1],[1,3]] and rhs [5,7], write the two scalar equations.",
      answer: "2x₁ + x₂ = 5 and x₁ + 3x₂ = 7.",
    },
    {
      id: "ecg-q3",
      question: "Q3. What are the eigenvalues of [[4,1],[1,4]]?",
      answer: "λ₁ = 5 and λ₂ = 3 from (λ−5)(λ−3) = 0.",
    },
    {
      id: "ecg-q4",
      question: "Q4. If all Hessian eigenvalues are positive, what kind of critical point do you have?",
      answer: "A local minimum (positive definite curvature in all directions).",
    },
    {
      id: "ecg-q5",
      question: "Q5. Why does a large spread in Hessian eigenvalues hurt gradient descent?",
      answer:
        "It creates narrow valleys; steepest descent zig-zags across the valley floor.",
    },
    {
      id: "ecg-q6",
      question: "Q6. In Ax = b, what is the residual r?",
      answer: "r = b − Ax — how far the current x is from satisfying the equations.",
    },
    {
      id: "ecg-q7",
      question: "Q7. When is conjugate gradient preferred over direct solvers?",
      answer:
        "For large sparse SPD systems where direct factorization is too slow or memory-heavy.",
    },
    {
      id: "ecg-q8",
      question: "Q8. How does CG differ from steepest descent in choosing directions?",
      answer:
        "CG picks conjugate directions that do not undo progress along previous directions; SD always uses the current gradient.",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Eigenvalues and Conjugate Gradient"
          description="Connect eigenvalues to optimization curvature, understand why large systems are hard, and see how conjugate gradient solves Ax = b more efficiently than naive steepest descent."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">Trust Region Methods</span>
            {" · "}
            Key terms: eigenvalue, eigenvector, residual, conjugate direction
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Matrix-vector multiplication and linear systems <InlineMath>{"Ax=b"}</InlineMath></li>
          <li>Eigenvalues and eigenvectors: <InlineMath>{"Av=\\lambda v"}</InlineMath></li>
          <li>Hessian eigenvalues and curvature (minimum, maximum, saddle)</li>
          <li>Why large systems are hard; the role of the residual</li>
          <li>Steepest descent zig-zagging and conjugate directions</li>
          <li>Conjugate gradient intuition for solving <InlineMath>{"Ax=b"}</InlineMath></li>
        </ul>
      </KeyIdeaBox>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-10">
        <section>
          <h2>Matrix and vector recap</h2>
          <p>
            A <strong>vector</strong> is an ordered list of numbers — e.g.{" "}
            <InlineMath>{"\\mathbf{x}=(x_1,x_2)^\\top"}</InlineMath>. A{" "}
            <strong>matrix</strong> is a rectangular grid of numbers.{" "}
            <strong>Matrix-vector multiplication</strong> combines rows of the matrix
            with entries of the vector.
          </p>
          <BlockMath>
            {"\\begin{pmatrix}2 & 1\\\\ 1 & 3\\end{pmatrix}\\begin{pmatrix}x_1\\\\ x_2\\end{pmatrix}=\\begin{pmatrix}5\\\\ 7\\end{pmatrix}"}
          </BlockMath>
          <p>As two scalar equations:</p>
          <BlockMath>{"2x_1 + x_2 = 5 \\qquad x_1 + 3x_2 = 7"}</BlockMath>
          <p>
            Solving <InlineMath>{"Ax=b"}</InlineMath> means finding the vector{" "}
            <InlineMath>{"\\mathbf{x}"}</InlineMath> that makes the linear system true.
          </p>
        </section>

        <section>
          <h2>Eigenvalue explanation</h2>
          <BlockMath>{"A\\mathbf{v} = \\lambda \\mathbf{v}"}</BlockMath>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <InlineMath>{"A"}</InlineMath> is a square matrix
            </li>
            <li>
              <InlineMath>{"\\mathbf{v}"}</InlineMath> is an <strong>eigenvector</strong> (non-zero)
            </li>
            <li>
              <InlineMath>{"\\lambda"}</InlineMath> is the matching <strong>eigenvalue</strong>
            </li>
            <li>
              <strong>Direction stays the same</strong> — only the length scales by{" "}
              <InlineMath>{"\\lambda"}</InlineMath>
            </li>
          </ul>
        </section>

        <section>
          <h2>Eigenvalue example</h2>
          <BlockMath>
            {"A=\\begin{pmatrix}4 & 1\\\\ 1 & 4\\end{pmatrix},\\quad A-\\lambda I=\\begin{pmatrix}4-\\lambda & 1\\\\ 1 & 4-\\lambda\\end{pmatrix}"}
          </BlockMath>
          <StepByStepBox
            title="Characteristic polynomial"
            steps={[
              <>
                Set <InlineMath>{"\\det(A-\\lambda I)=0"}</InlineMath>
              </>,
              <InlineMath key="s2">{"(4-\\lambda)^2 - 1 = 0"}</InlineMath>,
              <InlineMath key="s3">{"\\lambda^2 - 8\\lambda + 15 = 0"}</InlineMath>,
              <>
                <InlineMath>{"(\\lambda-5)(\\lambda-3)=0"}</InlineMath> so{" "}
                <InlineMath>{"\\lambda_1=5"}</InlineMath>,{" "}
                <InlineMath>{"\\lambda_2=3"}</InlineMath>
              </>,
            ]}
          />
          <p>
            <InlineMath>{"\\lambda_1=5"}</InlineMath> stretches its eigenvector more than{" "}
            <InlineMath>{"\\lambda_2=3"}</InlineMath>. The ratio 5/3 measures how
            unevenly the matrix stretches different directions — related to conditioning.
          </p>
        </section>

        <section>
          <h2>Eigenvalues in optimization</h2>
          <p>
            For a symmetric Hessian <InlineMath>{"H"}</InlineMath> at a critical point:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>All eigenvalues positive → <strong>local minimum</strong></li>
            <li>All eigenvalues negative → <strong>local maximum</strong></li>
            <li>Mixed signs → <strong>saddle point</strong></li>
          </ul>
          <KeyIdeaBox title="Narrow valleys">
            When eigenvalues differ a lot, contours form long thin valleys. Gradient
            descent takes small steps along the steep wall and overshoots across the
            flat direction — the classic <strong>zig-zag</strong> pattern.
          </KeyIdeaBox>
        </section>

        <section>
          <h2>Interactive eigenvalue visualization</h2>
          <VisualizationCard title="Vectors, Av, and eigen-directions">
            <EigenvalueVectorDemo />
          </VisualizationCard>
        </section>

        <section>
          <h2>Conjugate gradient motivation</h2>
          <p>
            Many optimization subproblems require solving{" "}
            <InlineMath>{"Ax=b"}</InlineMath> (Newton systems, normal equations,
            KKT blocks). For large <InlineMath>{"n"}</InlineMath>:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Direct methods (e.g. LU) become slow — <InlineMath>{"O(n^3)"}</InlineMath></li>
            <li>Storing full factorizations is memory expensive</li>
            <li>
              <strong>Iterative methods</strong> like conjugate gradient (CG) are preferred
              when <InlineMath>{"A"}</InlineMath> is sparse and symmetric positive definite
            </li>
          </ul>
        </section>

        <section>
          <h2>Steepest descent vs conjugate gradient</h2>
          <p>
            <strong>Steepest descent</strong> always moves along the current downhill
            direction (negative gradient). On ill-conditioned quadratics it wastes
            progress by reversing earlier components.
          </p>
          <p>
            <strong>Conjugate gradient</strong> builds search directions that are{" "}
            <InlineMath>{"A"}</InlineMath>-conjugate:{" "}
            <InlineMath>{"\\mathbf{d}_i^\\top A \\mathbf{d}_j = 0"}</InlineMath> for{" "}
            <InlineMath>{"i\\neq j"}</InlineMath>. Each step does not spoil earlier
            progress — far fewer iterations on quadratic models.
          </p>
        </section>

        <section>
          <h2>CG algorithm intuition</h2>
          <ol className="ml-4 list-decimal space-y-2">
            <li>Start with initial guess <InlineMath>{"\\mathbf{x}_0"}</InlineMath></li>
            <li>
              Compute residual <InlineMath>{"\\mathbf{r}_0 = \\mathbf{b} - A\\mathbf{x}_0"}</InlineMath>
            </li>
            <li>Set search direction <InlineMath>{"\\mathbf{p}_0 = \\mathbf{r}_0"}</InlineMath></li>
            <li>
              Move along <InlineMath>{"\\mathbf{p}_k"}</InlineMath> with step size chosen to
              minimize error along that line
            </li>
            <li>Update residual <InlineMath>{"\\mathbf{r}_{k+1}"}</InlineMath></li>
            <li>
              Build new conjugate direction from{" "}
              <InlineMath>{"\\mathbf{r}_{k+1}"}</InlineMath> and{" "}
              <InlineMath>{"\\mathbf{p}_k"}</InlineMath>
            </li>
            <li>Repeat until <InlineMath>{"\\|\\mathbf{r}_k\\|"}</InlineMath> is small</li>
          </ol>
          <p className="text-sm text-muted-foreground">
            For an <InlineMath>{"n\\times n"}</InlineMath> SPD system, CG finishes in at
            most <InlineMath>{"n"}</InlineMath> steps in exact arithmetic — often far fewer
            in practice.
          </p>
        </section>

        <section>
          <h2>Interactive visualization: paths on a quadratic</h2>
          <VisualizationCard title="Steepest descent vs conjugate gradient">
            <CgVsSteepestDescentDemo />
          </VisualizationCard>
        </section>

        <section>
          <h2>Steepest descent vs conjugate gradient</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left">Aspect</th>
                  <th className="p-2 text-left">Steepest descent</th>
                  <th className="p-2 text-left">Conjugate gradient</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Search direction</td>
                  <td className="p-2">Negative gradient</td>
                  <td className="p-2">
                    <InlineMath>{"A"}</InlineMath>-conjugate combinations of residuals
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">On narrow valleys</td>
                  <td className="p-2">Zig-zags, slow convergence</td>
                  <td className="p-2">Reaches minimum in few steps (exact quadratic)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Memory per step</td>
                  <td className="p-2">Low</td>
                  <td className="p-2">Low (few vectors)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Best for</td>
                  <td className="p-2">Simple smooth problems, teaching</td>
                  <td className="p-2">Large sparse SPD linear systems</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Requires</td>
                  <td className="p-2">Gradients only</td>
                  <td className="p-2">
                    Matrix-vector products with <InlineMath>{"A"}</InlineMath>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Common mistakes</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Confusing eigenvalues of <InlineMath>{"A"}</InlineMath> with eigenvalues of the Hessian — context matters.</li>
            <li>Using CG when <InlineMath>{"A"}</InlineMath> is not symmetric positive definite — CG can break down.</li>
            <li>Expecting steepest descent to be fast on ill-conditioned problems without preconditioning.</li>
            <li>Forgetting that CG solves linear systems; nonlinear CG is a related but different family.</li>
            <li>Ignoring that eigenvector directions are the principal axes of quadratic curvature.</li>
          </ul>
        </section>

        <section>
          <h2>Practice questions</h2>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            Eigenvalues describe how a matrix stretches space — and the Hessian&apos;s
            eigenvalues describe curvature. Large eigenvalue spreads create narrow
            valleys where steepest descent zig-zags. Conjugate gradient iteratively
            solves <InlineMath>{"Ax=b"}</InlineMath> with conjugate directions that
            converge much faster on SPD systems, which appear throughout optimization.
            <p className="mt-3 text-sm">
              Next: <em>Numerical Derivatives and Sparsity</em> — estimating
              gradients when formulas are unavailable, and exploiting zeros at scale.
            </p>
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}

function NumericalDerivativesSparsityPage({ page, index, totalPages }: IntroProps) {
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: "nds-q1",
      question: "Q1. When might you need numerical derivatives?",
      answer:
        "When the function is a black box, code is unavailable for autodiff, or the formula is too messy for symbolic differentiation.",
    },
    {
      id: "nds-q2",
      question: "Q2. Write the central difference formula for f′(x).",
      answer: "f′(x) ≈ [f(x+h) − f(x−h)] / (2h).",
    },
    {
      id: "nds-q3",
      question: "Q3. For f(x)=x² at x=3 with h=0.1, what is the forward-difference estimate?",
      answer: "[f(3.1)−f(3)]/0.1 = (9.61−9)/0.1 = 6.1 (exact 6).",
    },
    {
      id: "nds-q4",
      question: "Q4. What is the numerical gradient of f(x,y)=x²+y² at (1,2)?",
      answer: "Approximately (2x, 2y) = (2, 4) using partial finite differences.",
    },
    {
      id: "nds-q5",
      question: "Q5. What does the Jacobian contain?",
      answer: "All first partial derivatives of a vector-valued function — ∂Fᵢ/∂xⱼ.",
    },
    {
      id: "nds-q6",
      question: "Q6. For f(x,y)=x²+3xy+y², what is ∂²f/∂x∂y?",
      answer: "3 — the (1,2) entry of the Hessian.",
    },
    {
      id: "nds-q7",
      question: "Q7. Why are Jacobians often sparse?",
      answer:
        "Each component equation usually depends on only a few variables, so most partial derivatives are zero.",
    },
    {
      id: "nds-q8",
      question: "Q8. How does sparsity save memory?",
      answer: "Store only nonzero entries and their indices instead of every matrix element.",
    },
    {
      id: "nds-q9",
      question: "Q9. What is the simplex method used for?",
      answer: "Solving linear programs by moving along edges of the feasible polytope.",
    },
    {
      id: "nds-q10",
      question: "Q10. State the weak duality inequality.",
      answer: "For any feasible primal and dual, objective(primal) ≤ objective(dual).",
    },
    {
      id: "nds-q11",
      question: "Q11. What makes a set convex?",
      answer: "The line segment between any two points in the set stays in the set.",
    },
    {
      id: "nds-q12",
      question: "Q12. Newton's method solves which linear system each step?",
      answer: "Hₖ pₖ = −gₖ using the Hessian Hₖ and gradient gₖ.",
    },
    {
      id: "nds-q13",
      question: "Q13. What does a trust-region radius Δₖ control?",
      answer: "How far we trust the local quadratic model — maximum step length.",
    },
    {
      id: "nds-q14",
      question: "Q14. Why is central difference often more accurate than forward difference?",
      answer: "Its truncation error is O(h²) vs O(h) for forward/backward, for smooth f.",
    },
    {
      id: "nds-q15",
      question: "Q15. Name two topics from this chapter that help with millions of variables.",
      answer:
        "Sparse Jacobians/Hessians and iterative methods like conjugate gradient (plus L-BFGS, trust regions).",
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Optimization", to: ROUTES.optimization },
          { label: page.shortTitle },
        ]}
      />

      <div className="mt-6">
        <PageHeader
          eyebrow={`Page ${index + 1} of ${totalPages}`}
          title="Numerical Derivatives and Sparsity"
          description="Estimate gradients and curvature when formulas are unavailable, and see why sparse structure makes large-scale optimization possible."
          difficulty={page.difficulty}
          estimatedTime={page.estimatedTime}
        >
          <span className="text-xs text-muted-foreground">
            Prerequisite:{" "}
            <span className="font-medium text-foreground">
              Eigenvalues and Conjugate Gradient
            </span>
            {" · "}
            Final page of the Optimization chapter
          </span>
        </PageHeader>
      </div>

      <KeyIdeaBox title="Learning objectives">
        <ul className="ml-4 list-disc space-y-1">
          <li>Why numerical derivatives are needed</li>
          <li>Forward, backward, and central finite differences; step size h</li>
          <li>Numerical gradients, Jacobians, and Hessians</li>
          <li>Sparse matrices and sparse derivative patterns</li>
          <li>Why sparsity saves memory and computation at scale</li>
        </ul>
      </KeyIdeaBox>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-10">
        <section>
          <h2>Why numerical derivatives?</h2>
          <p>
            Sometimes exact derivative formulas are unavailable. The function may be a{" "}
            <strong>black box</strong> (simulation, legacy code). The formula may be too
            complicated for hand differentiation.{" "}
            <strong>Numerical derivatives</strong> estimate slope from nearby function
            values — a fallback when automatic or symbolic differentiation is not practical.
          </p>
        </section>

        <section>
          <h2>Finite difference formulas</h2>
          <FormulaCard
            label="Forward difference"
            tex="f'(x) \\approx \\dfrac{f(x+h) - f(x)}{h}"
          />
          <FormulaCard
            label="Backward difference"
            tex="f'(x) \\approx \\dfrac{f(x) - f(x-h)}{h}"
          />
          <FormulaCard
            label="Central difference"
            tex="f'(x) \\approx \\dfrac{f(x+h) - f(x-h)}{2h}"
          />
          <p>
            <strong>Central difference</strong> is often more accurate for smooth
            functions but needs two extra evaluations per derivative (both{" "}
            <InlineMath>{"x+h"}</InlineMath> and <InlineMath>{"x-h"}</InlineMath>).
          </p>
        </section>

        <section>
          <h2>Numerical example</h2>
          <ExampleBox title="f(x) = x² at x = 3, h = 0.1">
            <p>
              Exact: <InlineMath>{"f'(x)=2x"}</InlineMath>, so{" "}
              <InlineMath>{"f'(3)=6"}</InlineMath>.
            </p>
            <p>Forward difference:</p>
            <BlockMath>
              {"\\frac{f(3.1)-f(3)}{0.1}=\\frac{9.61-9}{0.1}=\\frac{0.61}{0.1}=6.1"}
            </BlockMath>
            <p>
              Error = 0.1. Central difference gives 6.0 with this h — try the demo below.
            </p>
          </ExampleBox>
        </section>

        <section>
          <h2>Interactive finite difference visualizer</h2>
          <VisualizationCard title="f(x) = x² — estimate vs exact">
            <FiniteDifferenceDemo />
          </VisualizationCard>
        </section>

        <section>
          <h2>Numerical gradient</h2>
          <p>
            For <InlineMath>{"f(x,y)=x^2+y^2"}</InlineMath>, the gradient stacks partial
            derivatives:
          </p>
          <BlockMath>
            {"\\nabla f = \\begin{pmatrix}\\partial f/\\partial x \\\\ \\partial f/\\partial y\\end{pmatrix} = \\begin{pmatrix}2x \\\\ 2y\\end{pmatrix}"}
          </BlockMath>
          <p>
            A <strong>numerical gradient</strong> approximates each partial with finite
            differences — e.g. at <InlineMath>{"(1,2)"}</InlineMath>:{" "}
            <InlineMath>{"\\approx (2,4)"}</InlineMath>.
          </p>
        </section>

        <section>
          <h2>Jacobian</h2>
          <p>
            The <strong>Jacobian</strong> is the matrix of first derivatives for a
            vector-valued function{" "}
            <InlineMath>{"\\mathbf{F}:\\mathbb{R}^n\\to\\mathbb{R}^m"}</InlineMath>.
          </p>
          <BlockMath>
            {"\\mathbf{F}(x,y)=\\begin{pmatrix}x^2+y\\\\ x+y^2\\end{pmatrix},\\quad J=\\begin{pmatrix}2x & 1\\\\ 1 & 2y\\end{pmatrix}"}
          </BlockMath>
        </section>

        <section>
          <h2>Hessian</h2>
          <p>
            The <strong>Hessian</strong> collects second derivatives of a scalar function.
          </p>
          <BlockMath>
            {"f(x,y)=x^2+3xy+y^2,\\quad H=\\begin{pmatrix}2 & 3\\\\ 3 & 2\\end{pmatrix}"}
          </BlockMath>
          <p>
            Entry <InlineMath>{"H_{ij}=\\partial^2 f/\\partial x_i\\partial x_j"}</InlineMath>.
          </p>
        </section>

        <section>
          <h2>Sparsity</h2>
          <p>
            A <strong>sparse matrix</strong> has mostly zeros. In large models each
            equation depends on only a few variables:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <InlineMath>{"f_1"}</InlineMath> depends on <InlineMath>{"x_1,x_2"}</InlineMath>
            </li>
            <li>
              <InlineMath>{"f_2"}</InlineMath> depends on <InlineMath>{"x_2,x_3"}</InlineMath>
            </li>
            <li>
              <InlineMath>{"f_3"}</InlineMath> depends on <InlineMath>{"x_3,x_4"}</InlineMath>
            </li>
          </ul>
          <BlockMath>
            {"J \\approx \\begin{pmatrix}* & * & 0 & 0\\\\ 0 & * & * & 0\\\\ 0 & 0 & * & *\\end{pmatrix}"}
          </BlockMath>
          <p>Stars mark nonzero derivatives; zeros mean no direct dependence.</p>
        </section>

        <section>
          <h2>Sparse Hessian</h2>
          <p>
            If two variables never interact in the model, mixed second derivatives are
            zero. A <strong>sparse Hessian</strong> stores only nonzero curvature
            couplings — critical when <InlineMath>{"n"}</InlineMath> is huge.
          </p>
        </section>

        <section>
          <h2>Interactive sparse matrix viewer</h2>
          <VisualizationCard title="Dense vs sparse pattern">
            <SparseMatrixDemo />
          </VisualizationCard>
        </section>

        <section>
          <h2>Why this matters in large-scale optimization</h2>
          <p>
            Real engineering and data-science problems may have{" "}
            <strong>thousands to millions</strong> of variables. A dense{" "}
            <InlineMath>{"n\\times n"}</InlineMath> Hessian needs{" "}
            <InlineMath>{"O(n^2)"}</InlineMath> storage — impossible at scale. Sparse
            formats and matrix-free methods (only products, never full storage) make
            trust-region, quasi-Newton, and CG-based solvers practical.
          </p>
        </section>

        <section>
          <h2>Final chapter revision</h2>
          <DefinitionBox title="Optimization chapter — what you covered">
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li>
                <Link to={optimizationPagePath("what-is-optimization")} className="text-primary hover:underline">
                  What is optimization
                </Link>{" "}
                — goals, constraints, vocabulary
              </li>
              <li>
                <Link to={optimizationPagePath("modelling")} className="text-primary hover:underline">
                  Modelling
                </Link>{" "}
                — turning problems into math
              </li>
              <li>
                <Link to={optimizationPagePath("linear-programming")} className="text-primary hover:underline">
                  Linear programming
                </Link>{" "}
                — LP structure
              </li>
              <li>
                <Link to={optimizationPagePath("graphical-method")} className="text-primary hover:underline">
                  Graphical method
                </Link>{" "}
                — 2D intuition
              </li>
              <li>
                <Link to={optimizationPagePath("simplex-method")} className="text-primary hover:underline">
                  Simplex method
                </Link>{" "}
                — tableaus and pivoting
              </li>
              <li>
                <Link to={optimizationPagePath("duality-sensitivity")} className="text-primary hover:underline">
                  Duality & sensitivity
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("types-and-convexity")} className="text-primary hover:underline">
                  Types & convexity
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("unconstrained-optimization")} className="text-primary hover:underline">
                  Unconstrained optimization
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("gradient-descent")} className="text-primary hover:underline">
                  Gradient descent
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("hessian-newton")} className="text-primary hover:underline">
                  Hessian & Newton
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("trust-region")} className="text-primary hover:underline">
                  Trust region
                </Link>
              </li>
              <li>
                <Link to={optimizationPagePath("eigenvalues-conjugate-gradient")} className="text-primary hover:underline">
                  Eigenvalues & conjugate gradient
                </Link>
              </li>
              <li>Numerical derivatives & sparsity — this page</li>
            </ol>
          </DefinitionBox>
        </section>

        <section>
          <h2>Final practice set</h2>
          <p className="text-sm text-muted-foreground">
            Fifteen mixed questions covering the whole Optimization chapter. Expand each
            for a suggested answer.
          </p>
          <PracticeQuestions questions={practiceQuestions} />
        </section>

        <section>
          <h2>Chapter completion</h2>
          <OptimizationChapterCompletionCard />
        </section>

        <section>
          <h2>Summary</h2>
          <SummaryBox>
            When derivatives are hard to obtain, finite differences approximate them
            from function values — with accuracy traded against step size and evaluation
            cost. Jacobians and Hessians organize first- and second-order information;
            sparsity lets us store and compute them for enormous models. Together with
            the rest of this chapter — from LP and simplex through gradient methods,
            Newton, trust regions, and CG — you now have a map of classical optimization
            as used in data science and engineering.
          </SummaryBox>
        </section>
      </div>

      <PageNavigation
        pageId={page.id}
        previousSlug={page.previousPage}
        nextSlug={page.nextPage}
      />
    </article>
  );
}
type UnconstrainedFnKind = "parabola" | "shifted" | "wiggle";

function UnconstrainedFunctionVisualizer() {
  const [kind, setKind] = useState<UnconstrainedFnKind>("parabola");

  const config = useMemo(() => {
    const sqrt2 = Math.SQRT2;
    switch (kind) {
      case "shifted":
        return {
          fn: (x: number) => (x - 3) ** 2 + 2,
          domain: [-1, 7] as [number, number],
          markers: [{ x: 3, label: "global min", variant: "min" as const }],
          caption:
            "Shifted bowl: global minimum at x = 3 with f(3) = 2.",
        };
      case "wiggle":
        return {
          fn: (x: number) => x ** 4 - 4 * x ** 2,
          domain: [-2.5, 2.5] as [number, number],
          markers: [
            { x: 0, label: "local max", variant: "max" as const },
            { x: sqrt2, label: "global min", variant: "min" as const },
            { x: -sqrt2, label: "global min", variant: "min" as const },
          ],
          caption:
            "Mountain-range shape: local maximum at x = 0; global minima near x = ±√2.",
        };
      default:
        return {
          fn: (x: number) => x * x,
          domain: [-4, 4] as [number, number],
          markers: [{ x: 0, label: "global min", variant: "min" as const }],
          caption: "Simple bowl: global minimum at x = 0.",
        };
    }
  }, [kind]);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm ${
            kind === "parabola"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setKind("parabola")}
          aria-pressed={kind === "parabola"}
        >
          f(x) = x²
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm ${
            kind === "shifted"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setKind("shifted")}
          aria-pressed={kind === "shifted"}
        >
          f(x) = (x − 3)² + 2
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-1.5 text-sm ${
            kind === "wiggle"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setKind("wiggle")}
          aria-pressed={kind === "wiggle"}
        >
          f(x) = x⁴ − 4x²
        </button>
      </div>
      <FunctionPlot2D
        fn={config.fn}
        domain={config.domain}
        markers={config.markers}
        ariaLabel={`Plot of ${kind} function with marked critical points`}
        height={340}
      />
      <p className="mt-3 text-sm text-muted-foreground">{config.caption}</p>
    </div>
  );
}

function GradientDescentBowlDemo() {
  const palette = useChartPalette();
  const [alpha, setAlpha] = useState(0.1);
  const [iterations, setIterations] = useState(15);
  const start: [number, number] = [3, 4];

  const result = useMemo(() => {
    let [x, y] = start;
    const path: Array<[number, number]> = [start];
    for (let i = 0; i < iterations; i++) {
      const gx = 2 * x;
      const gy = 2 * y;
      x -= alpha * gx;
      y -= alpha * gy;
      if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > 50 || Math.abs(y) > 50) {
        path.push([x, y]);
        break;
      }
      path.push([x, y]);
    }
    const final = path[path.length - 1];
    return {
      path,
      fStart: start[0] ** 2 + start[1] ** 2,
      fFinal: final[0] ** 2 + final[1] ** 2,
      final,
      diverged: path.some(([px, py]) => Math.abs(px) > 10 || Math.abs(py) > 10),
    };
  }, [alpha, iterations]);

  const contour = useMemo(() => {
    const range = 5;
    const n = 60;
    const axis: number[] = [];
    for (let i = 0; i < n; i++) axis.push(-range + (2 * range * i) / (n - 1));
    const z = axis.map((yy) => axis.map((xx) => xx * xx + yy * yy));
    return { axis, z };
  }, []);

  const plotData = useMemo(
    () => [
      {
        x: contour.axis,
        y: contour.axis,
        z: contour.z,
        type: "contour",
        colorscale: palette.isDark ? "Viridis" : "Blues",
        reversescale: !palette.isDark,
        showscale: false,
        contours: { coloring: "lines" },
        line: { width: 1 },
        hoverinfo: "skip",
      },
      {
        x: result.path.map((p) => p[0]),
        y: result.path.map((p) => p[1]),
        type: "scatter",
        mode: "lines+markers",
        line: { color: palette.danger, width: 2 },
        marker: { color: palette.danger, size: 6 },
        name: "Descent path",
      },
      {
        x: [start[0]],
        y: [start[1]],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.accent, size: 11 },
        text: ["start"],
        textposition: "top center",
        name: "Start",
      },
      {
        x: [result.final[0]],
        y: [result.final[1]],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.danger, size: 10 },
        text: ["end"],
        textposition: "top center",
        name: "End",
      },
      {
        x: [0],
        y: [0],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.secondary, size: 12, symbol: "star" },
        text: ["minimum"],
        textposition: "bottom center",
        name: "Minimum",
      },
    ],
    [contour, palette, result.final, result.path, start],
  );

  const plotLayout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "x" }, range: [-5, 5], gridcolor: palette.grid },
      yaxis: {
        title: { text: "y" },
        range: [-5, 5],
        gridcolor: palette.grid,
        scaleanchor: "x",
      },
      showlegend: false,
    }),
    [palette],
  );

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium">Step size α</span>
          <input
            type="range"
            min={0.01}
            max={0.5}
            step={0.01}
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-500"
            aria-label="Step size alpha"
          />
          <span className="text-xs text-muted-foreground">Current: {alpha.toFixed(2)}</span>
        </label>
        <label className="text-sm">
          <span className="font-medium">Iterations</span>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="mt-1 w-full accent-indigo-500"
            aria-label="Number of iterations"
          />
          <span className="text-xs text-muted-foreground">Current: {iterations}</span>
        </label>
      </div>
      <div className="rounded-lg border bg-muted/30 p-3 text-sm">
        <p>
          Start: <InlineMath>{"(3,4)"}</InlineMath>,{" "}
          <InlineMath>{`f = ${result.fStart}`}</InlineMath>
        </p>
        <p>
          After {result.path.length - 1} step(s):{" "}
          <InlineMath>{`(${result.final[0].toFixed(3)}, ${result.final[1].toFixed(3)})`}</InlineMath>,{" "}
          <InlineMath>{`f = ${result.fFinal.toFixed(3)}`}</InlineMath>
        </p>
      </div>
      {result.diverged ? (
        <p className="rounded-md bg-amber-500/15 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          Step size is too large — iterates are diverging. Try a smaller α.
        </p>
      ) : null}
      <PlotlyChart
        data={plotData}
        layout={plotLayout}
        ariaLabel="Contour plot of f(x,y)=x²+y² with gradient descent path from (3,4)"
        height={400}
      />
    </div>
  );
}

function GradientDescentZigZagDemo() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="mb-3 text-sm text-muted-foreground">
        Contours of <InlineMath>{"f(x,y)=10x^2+y^2"}</InlineMath>. Steep walls in
        the x-direction cause zig-zagging.
      </p>
      <GradientDescentVisualizer a={10} b={1} start={[-3.5, 3]} height={400} />
    </div>
  );
}

type HessianShapeKind = "bowl" | "hill" | "saddle";

function HessianShapeContourDemo() {
  const palette = useChartPalette();
  const [kind, setKind] = useState<HessianShapeKind>("bowl");
  const [show3d, setShow3d] = useState(false);

  const config = useMemo(() => {
    switch (kind) {
      case "hill":
        return {
          fn: (x: number, y: number) => -x * x - y * y,
          label: "Hill: f(x,y) = −x² − y²",
          hessian: "H = \\begin{pmatrix} -2 & 0 \\\\ 0 & -2 \\end{pmatrix}",
          note: "Negative definite — opens downward (maximum at origin).",
          criticalMarker: { x: 0, y: 0, label: "maximum" },
        };
      case "saddle":
        return {
          fn: (x: number, y: number) => x * x - y * y,
          label: "Saddle: f(x,y) = x² − y²",
          hessian: "H = \\begin{pmatrix} 2 & 0 \\\\ 0 & -2 \\end{pmatrix}",
          note: "Indefinite — curves up in x, down in y.",
          criticalMarker: { x: 0, y: 0, label: "saddle" },
        };
      default:
        return {
          fn: (x: number, y: number) => x * x + y * y,
          label: "Bowl: f(x,y) = x² + y²",
          hessian: "H = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}",
          note: "Positive definite — bowl with minimum at origin.",
          criticalMarker: { x: 0, y: 0, label: "minimum" },
        };
    }
  }, [kind]);

  const grid = useMemo(() => {
    const range = 3;
    const n = 55;
    const axis: number[] = [];
    for (let i = 0; i < n; i++) axis.push(-range + (2 * range * i) / (n - 1));
    const z = axis.map((yy) => axis.map((xx) => config.fn(xx, yy)));
    return { axis, z };
  }, [config]);

  const plotData = useMemo(() => {
    if (show3d) {
      return [
        {
          x: grid.axis,
          y: grid.axis,
          z: grid.z,
          type: "surface",
          colorscale: palette.isDark ? "Viridis" : "Blues",
          showscale: false,
        },
      ];
    }
    const traces: Array<Record<string, unknown>> = [
      {
        x: grid.axis,
        y: grid.axis,
        z: grid.z,
        type: "contour",
        colorscale: palette.isDark ? "Viridis" : "Blues",
        reversescale: !palette.isDark,
        showscale: false,
        contours: { coloring: "lines" },
        line: { width: 1 },
        hoverinfo: "skip",
      },
    ];
    if (config.criticalMarker) {
      traces.push({
        x: [config.criticalMarker.x],
        y: [config.criticalMarker.y],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.secondary, size: 12, symbol: "star" },
        text: [config.criticalMarker.label],
        textposition: "top center",
      });
    }
    return traces;
  }, [config.criticalMarker, grid, palette, show3d]);

  const plotLayout = useMemo<Record<string, unknown>>(
    () =>
      show3d
        ? {
            scene: {
              xaxis: { title: { text: "x" } },
              yaxis: { title: { text: "y" } },
              zaxis: { title: { text: "f" } },
            },
          }
        : {
            xaxis: { title: { text: "x" }, range: [-3, 3], gridcolor: palette.grid },
            yaxis: {
              title: { text: "y" },
              range: [-3, 3],
              gridcolor: palette.grid,
              scaleanchor: "x",
            },
            showlegend: false,
          },
    [palette, show3d],
  );

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {(
          [
            ["bowl", "Bowl x²+y²"],
            ["hill", "Hill −x²−y²"],
            ["saddle", "Saddle x²−y²"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={`rounded-md px-3 py-1.5 text-sm ${
              kind === k
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`ml-auto rounded-md px-3 py-1.5 text-sm ${
            show3d
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setShow3d((v) => !v)}
          aria-pressed={show3d}
        >
          {show3d ? "2D contour" : "3D surface (optional)"}
        </button>
      </div>
      <PlotlyChart
        data={plotData}
        layout={plotLayout}
        height={400}
        ariaLabel={`${config.label} visualization`}
      />
      <p className="mt-3 text-sm">
        <InlineMath>{config.hessian}</InlineMath>
      </p>
      <p className="text-sm text-muted-foreground">{config.note}</p>
    </div>
  );
}

function TrustRegionExplorerDemo() {
  const palette = useChartPalette();
  const [delta, setDelta] = useState(1.2);
  const xk = useMemo(() => ({ x: 2, y: 1 }), []);
  const min = useMemo(() => ({ x: 1, y: 0.5 }), []);

  const f = (x: number, y: number) =>
    (x - min.x) ** 2 + 2 * (y - min.y) ** 2;
  const gx = 2 * (xk.x - min.x);
  const gy = 4 * (xk.y - min.y);
  const gNorm = Math.hypot(gx, gy);

  const cauchy = useMemo(() => {
    if (gNorm < 1e-9) return { px: 0, py: 0 };
    const scale = delta / gNorm;
    return { px: -scale * gx, py: -scale * gy };
  }, [delta, gx, gy, gNorm]);

  const stepEnd = { x: xk.x + cauchy.px, y: xk.y + cauchy.py };
  const stepLen = Math.hypot(cauchy.px, cauchy.py);
  const inside = stepLen <= delta + 1e-6;

  const grid = useMemo(() => {
    const range = 3;
    const n = 55;
    const axis: number[] = [];
    for (let i = 0; i < n; i++) axis.push(-1 + (2 * range * i) / (n - 1));
    const z = axis.map((yy) => axis.map((xx) => f(xx, yy)));
    return { axis, z };
  }, [min.x, min.y]);

  const circle = useMemo(() => {
    const pts = 80;
    const cx: number[] = [];
    const cy: number[] = [];
    for (let i = 0; i <= pts; i++) {
      const t = (2 * Math.PI * i) / pts;
      cx.push(xk.x + delta * Math.cos(t));
      cy.push(xk.y + delta * Math.sin(t));
    }
    return { cx, cy };
  }, [delta, xk]);

  const gradScale = Math.min(delta * 0.9, 1.5);
  const gradEnd = {
    x: xk.x - (gradScale * gx) / (gNorm || 1),
    y: xk.y - (gradScale * gy) / (gNorm || 1),
  };

  const plotData = useMemo(
    () => [
      {
        x: grid.axis,
        y: grid.axis,
        z: grid.z,
        type: "contour",
        colorscale: palette.isDark ? "Viridis" : "Blues",
        reversescale: !palette.isDark,
        showscale: false,
        contours: { coloring: "lines" },
        line: { width: 1 },
        hoverinfo: "skip",
      },
      {
        x: circle.cx,
        y: circle.cy,
        type: "scatter",
        mode: "lines",
        line: { color: palette.accent, width: 2, dash: "dot" },
        name: "Trust region",
      },
      {
        x: [xk.x, gradEnd.x],
        y: [xk.y, gradEnd.y],
        type: "scatter",
        mode: "lines+markers+text",
        line: { color: palette.muted, width: 2 },
        marker: { size: [10, 5], color: palette.muted },
        text: ["xₖ", ""],
        textposition: "top center",
        name: "−∇f direction",
      },
      {
        x: [xk.x, stepEnd.x],
        y: [xk.y, stepEnd.y],
        type: "scatter",
        mode: "lines+markers+text",
        line: { color: palette.danger, width: 3 },
        marker: { size: [10, 9], color: palette.danger },
        text: ["", "Cauchy step"],
        textposition: "top center",
        name: "Cauchy step",
      },
      {
        x: [xk.x],
        y: [xk.y],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.primary, size: 11 },
        text: ["current xₖ"],
        textposition: "bottom left",
        name: "Current iterate",
      },
      {
        x: [min.x],
        y: [min.y],
        type: "scatter",
        mode: "markers+text",
        marker: { color: palette.secondary, size: 12, symbol: "star" },
        text: ["minimum"],
        textposition: "bottom center",
        name: "Minimum",
      },
    ],
    [circle, gradEnd, grid, min, palette, stepEnd, xk],
  );

  const plotLayout = useMemo<Record<string, unknown>>(
    () => ({
      xaxis: { title: { text: "x" }, range: [-0.5, 3.5], gridcolor: palette.grid },
      yaxis: {
        title: { text: "y" },
        range: [-1, 2.5],
        gridcolor: palette.grid,
        scaleanchor: "x",
      },
      showlegend: false,
    }),
    [palette],
  );

  const pred = -(
    gx * cauchy.px +
    gy * cauchy.py +
    0.5 *
      (2 * cauchy.px * cauchy.px +
        4 * cauchy.py * cauchy.py)
  );
  const ared = f(xk.x, xk.y) - f(stepEnd.x, stepEnd.y);
  const rho = pred > 1e-9 ? ared / pred : 0;

  return (
    <div className="rounded-xl border bg-card p-4">
      <label className="block text-sm">
        <span className="mb-1 flex justify-between font-medium">
          Trust-region radius Δ
          <span className="font-mono text-muted-foreground">{delta.toFixed(2)}</span>
        </span>
        <input
          type="range"
          min={0.3}
          max={2.5}
          step={0.05}
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          className="w-full accent-indigo-500"
          aria-label="Trust region radius"
        />
      </label>
      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <p>
          Cauchy step length: <strong>{stepLen.toFixed(3)}</strong>{" "}
          {inside ? "(inside region)" : "(outside — should not happen)"}
        </p>
        <p>
          Approx. <InlineMath>{"\\rho_k"}</InlineMath>:{" "}
          <strong>{rho.toFixed(2)}</strong>
        </p>
      </div>
      <div className="mt-4">
        <PlotlyChart
          data={plotData}
          layout={plotLayout}
          height={400}
          ariaLabel="Trust region contour plot with Cauchy step and gradient direction"
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Dotted circle: <InlineMath>{"\\|p\\| \\le \\Delta"}</InlineMath>. Red
        segment: Cauchy step along <InlineMath>{"-\\nabla f"}</InlineMath>. Gray
        segment: steepest-descent direction (scaled for display).
      </p>
    </div>
  );
}

function ConvexityFunctionVisualizer() {
  const [kind, setKind] = useState<"convex" | "non-convex">("convex");

  const data = useMemo(
    () =>
      Array.from({ length: 141 }, (_, i) => {
        const x = -3.5 + i * 0.05;
        const y1 = x * x;
        const y2 = x ** 4 - 4 * x * x;
        return { x, convex: y1, nonConvex: y2 };
      }),
    [],
  );

  const series =
    kind === "convex"
      ? [{ dataKey: "convex", name: "f(x)=x²" }]
      : [{ dataKey: "nonConvex", name: "f(x)=x⁴-4x²" }];

  const sqrt2 = Math.SQRT2;
  const markers =
    kind === "convex"
      ? [{ x: 0, y: 0, label: "global min", variant: "min" as const }]
      : [
          { x: 0, y: 0, label: "local max", variant: "max" as const },
          { x: sqrt2, y: -4, label: "global min", variant: "min" as const },
          { x: -sqrt2, y: -4, label: "global min", variant: "min" as const },
        ];

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          className={`rounded-md px-3 py-1.5 text-sm ${
            kind === "convex"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setKind("convex")}
          aria-pressed={kind === "convex"}
        >
          Convex: f(x)=x²
        </button>
        <button
          className={`rounded-md px-3 py-1.5 text-sm ${
            kind === "non-convex"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setKind("non-convex")}
          aria-pressed={kind === "non-convex"}
        >
          Non-convex: f(x)=x⁴−4x²
        </button>
      </div>

      <RechartsLineChart
          data={data}
          xKey="x"
          series={series}
          xLabel="x"
          yLabel="f(x)"
          height={288}
          markers={markers}
          ariaLabel="Interactive comparison of convex and non-convex functions with critical points marked"
        />

      {kind === "convex" ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Minimum at <InlineMath>{"x=0"}</InlineMath>,{" "}
          <InlineMath>{"f(0)=0"}</InlineMath>. Any local minimum is global.
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Two global minima near <InlineMath>{"x=\\pm\\sqrt{2}"}</InlineMath>{" "}
          and a local maximum at <InlineMath>{"x=0"}</InlineMath>.
        </p>
      )}
    </div>
  );
}

function ConvexSetVisualizer() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border bg-card p-3">
        <p className="mb-2 text-sm font-medium">Convex set examples</p>
        <svg viewBox="0 0 280 180" className="w-full">
          <circle cx="70" cy="90" r="45" fill="rgba(99,102,241,0.25)" stroke="rgb(99,102,241)" />
          <rect x="150" y="45" width="90" height="90" rx="6" fill="rgba(14,165,233,0.25)" stroke="rgb(14,165,233)" />
          <line x1="40" y1="90" x2="100" y2="90" stroke="#334155" strokeDasharray="4 4" />
          <line x1="160" y1="60" x2="230" y2="120" stroke="#334155" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="rounded-xl border bg-card p-3">
        <p className="mb-2 text-sm font-medium">Non-convex set examples</p>
        <svg viewBox="0 0 280 180" className="w-full">
          <path
            d="M60 90 a40 40 0 1 1 0 1 M80 90 a20 20 0 1 0 0 1"
            fill="rgba(244,63,94,0.2)"
            stroke="rgb(244,63,94)"
            fillRule="evenodd"
          />
          <circle cx="200" cy="60" r="25" fill="rgba(251,191,36,0.25)" stroke="rgb(251,191,36)" />
          <circle cx="230" cy="125" r="25" fill="rgba(251,191,36,0.25)" stroke="rgb(251,191,36)" />
          <line x1="175" y1="60" x2="255" y2="125" stroke="#334155" strokeDasharray="4 4" />
        </svg>
      </div>
    </div>
  );
}

function Row({
  t,
  m,
  e,
  u,
}: {
  t: string;
  m: string;
  e: string;
  u: string;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-2 font-medium">{t}</td>
      <td className="px-3 py-2 text-muted-foreground">{m}</td>
      <td className="px-3 py-2 text-muted-foreground">{e}</td>
      <td className="px-3 py-2 text-muted-foreground">{u}</td>
    </tr>
  );
}

function Q({ id, q, a }: { id: string; q: string; a: string }) {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{q}</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-muted-foreground">
          <strong>Answer:</strong> {a}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
}
