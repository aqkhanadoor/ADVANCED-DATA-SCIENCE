export interface GlossaryTerm {
  /** Stable id used to cross-reference from pages (kebab-case). */
  id: string;
  term: string;
  definition: string;
  /** Optional TeX expression illustrating the term. */
  tex?: string;
  /** Related glossary term ids. */
  related?: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    id: "objective-function",
    term: "Objective Function",
    definition:
      "The quantity we want to make as large or as small as possible. Written f(x), it maps a choice of variables to a single number we judge the choice by.",
    tex: "f(x)",
    related: ["decision-variable", "constraint"],
  },
  {
    id: "decision-variable",
    term: "Decision Variable",
    definition:
      "A quantity we are free to choose. Optimization searches over all valid settings of the decision variables.",
    tex: "x \\in \\mathbb{R}^n",
    related: ["objective-function", "constraint"],
  },
  {
    id: "constraint",
    term: "Constraint",
    definition:
      "A rule that a solution must satisfy, such as a budget limit or a physical capacity. Constraints define which choices are allowed.",
    tex: "c_i(x) \\ge 0",
    related: ["feasible-region", "decision-variable"],
  },
  {
    id: "parameter",
    term: "Parameter",
    definition:
      "A fixed value given by the problem (not chosen by us), such as prices or capacities, that appears in the objective or constraints.",
    related: ["decision-variable"],
  },
  {
    id: "feasible-region",
    term: "Feasible Region",
    definition:
      "The set of all points that satisfy every constraint. The optimum must lie inside this region.",
    related: ["constraint", "vertex"],
  },
  {
    id: "convex-set",
    term: "Convex Set",
    definition:
      "A set where the straight line between any two members stays entirely inside the set.",
    related: ["convex-function"],
  },
  {
    id: "convex-function",
    term: "Convex Function",
    definition:
      "A function that curves upward like a bowl: the line segment between two points on the graph never dips below the curve.",
    tex: "f(\\lambda x + (1-\\lambda) y) \\le \\lambda f(x) + (1-\\lambda) f(y)",
    related: ["convex-set", "global-minimum"],
  },
  {
    id: "local-minimum",
    term: "Local Minimum",
    definition:
      "A point that is lower than all nearby points, but not necessarily the lowest overall.",
    related: ["global-minimum", "critical-point"],
  },
  {
    id: "global-minimum",
    term: "Global Minimum",
    definition:
      "The lowest value the objective takes anywhere in the feasible region.",
    related: ["local-minimum", "convex-function"],
  },
  {
    id: "linear-program",
    term: "Linear Program (LP)",
    definition:
      "An optimization problem where the objective and all constraints are linear functions of the variables.",
    tex: "\\min_x c^\\top x \\;\\text{s.t.}\\; Ax \\le b",
    related: ["feasible-region", "vertex", "simplex"],
  },
  {
    id: "vertex",
    term: "Vertex (Corner Point)",
    definition:
      "A corner of the feasible region where constraint boundaries meet. The optimum of an LP always occurs at a vertex.",
    related: ["feasible-region", "linear-program"],
  },
  {
    id: "half-plane",
    term: "Half-Plane",
    definition:
      "The region on one side of a line. Each linear inequality constraint carves out a half-plane.",
    related: ["feasible-region"],
  },
  {
    id: "simplex",
    term: "Simplex Method",
    definition:
      "An algorithm that solves linear programs by walking from vertex to vertex of the feasible region, improving the objective each step.",
    related: ["tableau", "pivot", "linear-program"],
  },
  {
    id: "tableau",
    term: "Tableau",
    definition:
      "The table of coefficients the simplex method updates as it pivots between vertices.",
    related: ["simplex", "pivot"],
  },
  {
    id: "pivot",
    term: "Pivot",
    definition:
      "A single step of the simplex method that swaps a variable into and out of the basis, moving to an adjacent vertex.",
    related: ["simplex", "tableau"],
  },
  {
    id: "basic-feasible-solution",
    term: "Basic Feasible Solution",
    definition:
      "A feasible solution corresponding to a vertex of the feasible region, used by the simplex method.",
    tex: "x_B = B^{-1} b",
    related: ["vertex", "simplex"],
  },
  {
    id: "reduced-cost",
    term: "Reduced Cost",
    definition:
      "How much the objective would change per unit increase of a non-basic variable; guides which variable enters the basis.",
    related: ["simplex", "pivot"],
  },
  {
    id: "dual-problem",
    term: "Dual Problem",
    definition:
      "A companion optimization problem derived from the original (primal). Its optimal value matches the primal's under strong duality.",
    related: ["shadow-price", "strong-duality"],
  },
  {
    id: "shadow-price",
    term: "Shadow Price",
    definition:
      "The value of relaxing a constraint by one unit — given by the corresponding dual variable.",
    related: ["dual-problem", "sensitivity-analysis"],
  },
  {
    id: "strong-duality",
    term: "Strong Duality",
    definition:
      "The property that the primal and dual optimal values are equal, which holds for feasible linear programs.",
    tex: "c^\\top x^\\star = b^\\top y^\\star",
    related: ["dual-problem"],
  },
  {
    id: "sensitivity-analysis",
    term: "Sensitivity Analysis",
    definition:
      "The study of how the optimal solution changes when the problem's data (costs, limits) change.",
    related: ["shadow-price"],
  },
  {
    id: "gradient",
    term: "Gradient",
    definition:
      "The vector of partial derivatives. It points in the direction of steepest increase of a function.",
    tex: "\\nabla f(x)",
    related: ["hessian", "critical-point"],
  },
  {
    id: "hessian",
    term: "Hessian",
    definition:
      "The matrix of second partial derivatives, describing the local curvature of a function.",
    tex: "\\nabla^2 f(x)",
    related: ["gradient", "newton-method"],
  },
  {
    id: "critical-point",
    term: "Critical Point",
    definition:
      "A point where the gradient is zero. It may be a minimum, maximum, or saddle point.",
    tex: "\\nabla f(x) = 0",
    related: ["saddle-point", "local-minimum"],
  },
  {
    id: "saddle-point",
    term: "Saddle Point",
    definition:
      "A critical point that is a minimum along some directions and a maximum along others.",
    related: ["critical-point", "hessian"],
  },
  {
    id: "learning-rate",
    term: "Learning Rate (Step Size)",
    definition:
      "How far gradient descent moves on each step. Too large overshoots; too small is slow.",
    tex: "\\alpha",
    related: ["step-size", "line-search"],
  },
  {
    id: "step-size",
    term: "Step Size",
    definition:
      "The length of each update in an iterative optimization method.",
    related: ["learning-rate", "line-search"],
  },
  {
    id: "line-search",
    term: "Line Search",
    definition:
      "A procedure that chooses a step size guaranteeing sufficient decrease of the objective along a search direction.",
    related: ["step-size", "gradient"],
  },
  {
    id: "newton-method",
    term: "Newton's Method",
    definition:
      "An optimization method that uses both the gradient and the Hessian to jump toward the minimum of a local quadratic model.",
    tex: "x_{k+1} = x_k - [\\nabla^2 f(x_k)]^{-1}\\nabla f(x_k)",
    related: ["hessian", "quasi-newton"],
  },
  {
    id: "quasi-newton",
    term: "Quasi-Newton Method",
    definition:
      "A family of methods (such as BFGS) that approximate the Hessian to gain Newton-like speed without computing second derivatives.",
    related: ["newton-method", "hessian"],
  },
  {
    id: "quadratic-model",
    term: "Quadratic Model",
    definition:
      "A local second-order approximation of a function used by Newton and trust-region methods.",
    related: ["hessian", "trust-region"],
  },
  {
    id: "trust-region",
    term: "Trust Region",
    definition:
      "A neighborhood around the current point within which a local model is trusted; the step is constrained to stay inside it.",
    related: ["quadratic-model", "step-size"],
  },
  {
    id: "eigenvalue",
    term: "Eigenvalue",
    definition:
      "A scalar λ such that a matrix stretches a special vector (its eigenvector) by exactly that factor.",
    tex: "Av = \\lambda v",
    related: ["eigenvector", "condition-number"],
  },
  {
    id: "eigenvector",
    term: "Eigenvector",
    definition:
      "A nonzero vector whose direction is unchanged when a matrix is applied to it.",
    tex: "Av = \\lambda v",
    related: ["eigenvalue"],
  },
  {
    id: "condition-number",
    term: "Condition Number",
    definition:
      "The ratio of the largest to smallest eigenvalue; large values make optimization slow and unstable.",
    tex: "\\kappa(A) = \\lambda_{\\max} / \\lambda_{\\min}",
    related: ["eigenvalue", "conjugate-gradient"],
  },
  {
    id: "conjugate-gradient",
    term: "Conjugate Gradient",
    definition:
      "An efficient iterative method for solving large symmetric linear systems and quadratic problems.",
    related: ["condition-number", "eigenvalue"],
  },
  {
    id: "finite-difference",
    term: "Finite Difference",
    definition:
      "An approximation of a derivative using function values at nearby points.",
    tex: "f'(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}",
    related: ["truncation-error", "rounding-error"],
  },
  {
    id: "sparsity",
    term: "Sparsity",
    definition:
      "The property that most entries of a matrix or vector are zero, which can be exploited for speed and memory.",
    related: ["finite-difference"],
  },
  {
    id: "truncation-error",
    term: "Truncation Error",
    definition:
      "The error from approximating a limit (like a derivative) with a finite step size.",
    related: ["finite-difference", "rounding-error"],
  },
  {
    id: "rounding-error",
    term: "Rounding Error",
    definition:
      "The error from representing real numbers with finite precision; amplified when subtracting nearly equal numbers.",
    related: ["finite-difference", "truncation-error"],
  },
];

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.id === id);
}
