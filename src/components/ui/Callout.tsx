import * as React from "react";
import {
  Info,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  ClipboardList,
  Sparkles,
  ListChecks,
  ListOrdered,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const calloutVariants = cva("relative rounded-xl border-l-4 p-4 pl-5", {
  variants: {
    tone: {
      neutral: "border-l-border bg-muted/40",
      info: "border-l-sky-500 bg-sky-500/10",
      example: "border-l-indigo-500 bg-indigo-500/10",
      definition: "border-l-violet-500 bg-violet-500/10",
      warning: "border-l-amber-500 bg-amber-500/10",
      practice: "border-l-emerald-500 bg-emerald-500/10",
      key: "border-l-fuchsia-500 bg-fuchsia-500/10",
      summary: "border-l-teal-500 bg-teal-500/10",
      formula: "border-l-blue-500 bg-blue-500/10",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
  icon?: LucideIcon;
  /** Short text label for assistive tech describing the box type. */
  srLabel?: string;
}

/**
 * Generic callout. Specialized boxes below configure tone, icon, and label so
 * meaning is conveyed by text + icon, not color alone.
 */
export function Callout({
  className,
  tone,
  title,
  icon: Icon = Info,
  srLabel,
  children,
  ...props
}: CalloutProps) {
  return (
    <aside className={cn(calloutVariants({ tone }), className)} {...props}>
      {(title || srLabel) && (
        <div className="mb-2 flex items-center gap-2">
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold">
            {srLabel ? <span className="sr-only">{srLabel}: </span> : null}
            {title}
          </p>
        </div>
      )}
      <div className="text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </aside>
  );
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function FormulaBox({ title = "Formula", children, ...props }: BoxProps) {
  return (
    <Callout tone="formula" icon={Sigma} title={title} srLabel="Formula" {...props}>
      {children}
    </Callout>
  );
}

export function ExampleBox({
  title = "Real-life example",
  children,
  ...props
}: BoxProps) {
  return (
    <Callout tone="example" icon={Lightbulb} title={title} srLabel="Example" {...props}>
      {children}
    </Callout>
  );
}

export function DefinitionBox({
  title = "Definition",
  children,
  ...props
}: BoxProps) {
  return (
    <Callout
      tone="definition"
      icon={BookOpen}
      title={title}
      srLabel="Definition"
      {...props}
    >
      {children}
    </Callout>
  );
}

export function WarningBox({
  title = "Watch out",
  children,
  ...props
}: BoxProps) {
  return (
    <Callout
      tone="warning"
      icon={AlertTriangle}
      title={title}
      srLabel="Warning"
      {...props}
    >
      {children}
    </Callout>
  );
}

export function PracticeBox({
  title = "Practice",
  children,
  ...props
}: BoxProps) {
  return (
    <Callout
      tone="practice"
      icon={ClipboardList}
      title={title}
      srLabel="Practice"
      {...props}
    >
      {children}
    </Callout>
  );
}

export function KeyIdeaBox({
  title = "Key idea",
  children,
  ...props
}: BoxProps) {
  return (
    <Callout tone="key" icon={Sparkles} title={title} srLabel="Key idea" {...props}>
      {children}
    </Callout>
  );
}

export function SummaryBox({ title = "Summary", children, ...props }: BoxProps) {
  return (
    <Callout
      tone="summary"
      icon={ListChecks}
      title={title}
      srLabel="Summary"
      {...props}
    >
      {children}
    </Callout>
  );
}

export interface StepByStepBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  steps: React.ReactNode[];
}

export function StepByStepBox({
  title = "Step by step",
  steps,
  className,
  ...props
}: StepByStepBoxProps) {
  return (
    <Callout
      tone="info"
      icon={ListOrdered}
      title={title}
      srLabel="Step by step"
      className={className}
      {...props}
    >
      <ol className="mt-1 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-700 dark:text-sky-300">
              {i + 1}
            </span>
            <div className="pt-0.5">{step}</div>
          </li>
        ))}
      </ol>
    </Callout>
  );
}
