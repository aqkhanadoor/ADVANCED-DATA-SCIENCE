import { useState } from "react";
import { SimplexTable } from "@/components/charts/SimplexTable";
import { InlineMath } from "@/components/math/InlineMath";

const COLUMNS = ["x₁", "x₂", "s₁", "s₂", "s₃", "RHS"];

interface SimplexStep {
  label: string;
  rowLabels: string[];
  rows: number[][];
  pivot?: [number, number];
  pivotColumn?: number;
  pivotRow?: number;
  basicVariables: string[];
  objectiveValue: number;
  entering?: string;
  leaving?: string;
  ratios?: string;
  note: string;
}

const STEPS: SimplexStep[] = [
  {
    label: "Initial tableau",
    rowLabels: ["s₁", "s₂", "s₃", "Z"],
    rows: [
      [1, 0, 1, 0, 0, 4],
      [0, 2, 0, 1, 0, 12],
      [3, 2, 0, 0, 1, 18],
      [-3, -5, 0, 0, 0, 0],
    ],
    pivotColumn: 1,
    pivotRow: 1,
    pivot: [1, 1],
    basicVariables: ["s₁", "s₂", "s₃"],
    objectiveValue: 0,
    entering: "x₂",
    leaving: "s₂",
    ratios: "s₂: 12 ÷ 2 = 6, s₃: 18 ÷ 2 = 9 → choose s₂ (smallest)",
    note: "Most negative objective coefficient is −5 in column x₂. Ratio test picks row s₂.",
  },
  {
    label: "After 1st pivot (x₂ enters, s₂ leaves)",
    rowLabels: ["s₁", "x₂", "s₃", "Z"],
    rows: [
      [1, 0, 1, 0, 0, 4],
      [0, 1, 0, 0.5, 0, 6],
      [3, 0, 0, -1, 1, 6],
      [-3, 0, 0, 2.5, 0, 30],
    ],
    pivotColumn: 0,
    pivotRow: 2,
    pivot: [2, 0],
    basicVariables: ["s₁", "x₂", "s₃"],
    objectiveValue: 30,
    entering: "x₁",
    leaving: "s₃",
    ratios: "s₁: 4 ÷ 1 = 4, s₃: 6 ÷ 3 = 2 → choose s₃ (smallest)",
    note: "x₂ is now basic. Next entering variable is x₁ (−3 in Z-row).",
  },
  {
    label: "Optimal tableau (x₁ enters, s₃ leaves)",
    rowLabels: ["s₁", "x₂", "x₁", "Z"],
    rows: [
      [0, 0, 1, 1 / 3, -1 / 3, 2],
      [0, 1, 0, 0.5, 0, 6],
      [1, 0, 0, -1 / 3, 1 / 3, 2],
      [0, 0, 0, 1.5, 1, 36],
    ],
    basicVariables: ["s₁", "x₂", "x₁"],
    objectiveValue: 36,
    note: "All Z-row coefficients for non-basic variables are ≥ 0. Optimum reached.",
  },
];

/**
 * Step-through simplex tableau for Max Z = 3x₁ + 5x₂ (standard textbook example).
 */
export function SimplexMethodInteractiveTable() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">
          Step {stepIndex + 1} of {STEPS.length}: {step.label}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
            disabled={isLast}
            className="rounded-md border bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-40"
          >
            Next step
          </button>
        </div>
      </div>

      <SimplexTable
        columns={COLUMNS}
        rowLabels={step.rowLabels}
        rows={step.rows}
        pivot={step.pivot}
        pivotColumn={step.pivotColumn}
        pivotRow={step.pivotRow}
        caption="Max Z = 3x₁ + 5x₂ with slack variables s₁, s₂, s₃"
      />

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-muted-foreground">Basic variables</dt>
          <dd className="font-mono">{step.basicVariables.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-medium text-muted-foreground">Current Z</dt>
          <dd className="font-mono">{step.objectiveValue}</dd>
        </div>
        {step.entering ? (
          <div>
            <dt className="font-medium text-muted-foreground">Entering variable</dt>
            <dd className="font-mono">{step.entering}</dd>
          </div>
        ) : null}
        {step.leaving ? (
          <div>
            <dt className="font-medium text-muted-foreground">Leaving variable</dt>
            <dd className="font-mono">{step.leaving}</dd>
          </div>
        ) : null}
        {step.ratios ? (
          <div className="sm:col-span-2">
            <dt className="font-medium text-muted-foreground">Ratio test</dt>
            <dd>{step.ratios}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-3 text-sm text-muted-foreground">{step.note}</p>

      {isLast ? (
        <p className="mt-2 text-sm">
          <strong>Solution:</strong>{" "}
          <InlineMath>{"x_1 = 2"}</InlineMath>,{" "}
          <InlineMath>{"x_2 = 6"}</InlineMath>,{" "}
          <InlineMath>{"Z = 36"}</InlineMath>. Non-basic slack variables{" "}
          <InlineMath>{"s_2 = 0"}</InlineMath>,{" "}
          <InlineMath>{"s_3 = 0"}</InlineMath>;{" "}
          <InlineMath>{"s_1 = 2"}</InlineMath> (unused capacity on first constraint).
        </p>
      ) : null}

      <p className="mt-3 text-xs text-muted-foreground">
        Amber column = pivot (entering) column. Blue row = pivot (leaving) row.
        Indigo ring = pivot element.
      </p>
    </div>
  );
}
