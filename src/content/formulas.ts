export interface FormulaEntry {
  id: string;
  /** TeX source (without delimiters). */
  tex: string;
  name: string;
  description: string;
  category: FormulaCategory;
  /** Slug of the optimization page where this formula is introduced. */
  pageSlug?: string;
}

export type FormulaCategory =
  | "Foundations"
  | "Linear Programming"
  | "Unconstrained Optimization"
  | "Iterative Methods"
  | "Linear Algebra"
  | "Numerical Methods";

export const formulaCategories: FormulaCategory[] = [
  "Foundations",
  "Linear Programming",
  "Unconstrained Optimization",
  "Iterative Methods",
  "Linear Algebra",
  "Numerical Methods",
];

export const formulas: FormulaEntry[] = [
  {
    id: "general-min",
    tex: "\\min_{x \\in \\mathbb{R}^n} \\; f(x)",
    name: "General Minimization",
    description: "The canonical form of an unconstrained optimization problem.",
    category: "Foundations",
    pageSlug: "what-is-optimization",
  },
  {
    id: "max-as-min",
    tex: "\\max_{x} f(x) = -\\min_{x} \\, [-f(x)]",
    name: "Maximization as Minimization",
    description: "Any maximization problem can be rewritten as a minimization.",
    category: "Foundations",
    pageSlug: "what-is-optimization",
  },
  {
    id: "convexity",
    tex: "f(\\lambda x + (1-\\lambda) y) \\le \\lambda f(x) + (1-\\lambda) f(y)",
    name: "Convexity Inequality",
    description: "Defines a convex function for all λ ∈ [0, 1].",
    category: "Foundations",
    pageSlug: "types-and-convexity",
  },
  {
    id: "convex-hessian",
    tex: "\\nabla^2 f(x) \\succeq 0",
    name: "Convexity via Hessian",
    description: "A twice-differentiable function is convex iff its Hessian is positive semidefinite.",
    category: "Foundations",
    pageSlug: "types-and-convexity",
  },
  {
    id: "lp-standard",
    tex: "\\min_{x} \\; c^\\top x \\quad \\text{s.t.} \\quad Ax \\le b, \\; x \\ge 0",
    name: "Linear Program (Standard Form)",
    description: "A linear objective with linear inequality constraints.",
    category: "Linear Programming",
    pageSlug: "linear-programming",
  },
  {
    id: "lp-dual",
    tex: "\\max_{y} \\; b^\\top y \\quad \\text{s.t.} \\quad A^\\top y \\le c, \\; y \\ge 0",
    name: "Dual Linear Program",
    description: "The dual of the standard-form linear program.",
    category: "Linear Programming",
    pageSlug: "duality-sensitivity",
  },
  {
    id: "strong-duality",
    tex: "c^\\top x^\\star = b^\\top y^\\star",
    name: "Strong Duality",
    description: "Primal and dual optimal objective values coincide.",
    category: "Linear Programming",
    pageSlug: "duality-sensitivity",
  },
  {
    id: "reduced-cost",
    tex: "\\bar{c}_j = c_j - c_B^\\top B^{-1} A_j",
    name: "Reduced Cost",
    description: "Guides the choice of entering variable in the simplex method.",
    category: "Linear Programming",
    pageSlug: "simplex-method",
  },
  {
    id: "first-order",
    tex: "\\nabla f(x^\\star) = 0",
    name: "First-Order Condition",
    description: "A necessary condition for a smooth function's local minimum.",
    category: "Unconstrained Optimization",
    pageSlug: "unconstrained-optimization",
  },
  {
    id: "second-order",
    tex: "\\nabla^2 f(x^\\star) \\succeq 0",
    name: "Second-Order Condition",
    description: "Curvature condition distinguishing minima from other critical points.",
    category: "Unconstrained Optimization",
    pageSlug: "unconstrained-optimization",
  },
  {
    id: "gradient-descent",
    tex: "x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)",
    name: "Gradient Descent Update",
    description: "Step opposite the gradient with step size αₖ.",
    category: "Iterative Methods",
    pageSlug: "gradient-descent",
  },
  {
    id: "armijo",
    tex: "f(x_k - \\alpha \\nabla f(x_k)) \\le f(x_k) - c\\,\\alpha \\lVert \\nabla f(x_k) \\rVert^2",
    name: "Armijo (Sufficient Decrease)",
    description: "A line-search condition guaranteeing enough progress per step.",
    category: "Iterative Methods",
    pageSlug: "gradient-descent",
  },
  {
    id: "newton",
    tex: "x_{k+1} = x_k - \\left[\\nabla^2 f(x_k)\\right]^{-1} \\nabla f(x_k)",
    name: "Newton's Method",
    description: "Uses curvature to jump toward the minimum of a quadratic model.",
    category: "Iterative Methods",
    pageSlug: "hessian-newton",
  },
  {
    id: "trust-region",
    tex: "\\min_{p} \\; f_k + g_k^\\top p + \\tfrac{1}{2} p^\\top B_k p \\quad \\text{s.t.} \\quad \\lVert p \\rVert \\le \\Delta_k",
    name: "Trust-Region Subproblem",
    description: "Minimize the local model within a radius Δₖ.",
    category: "Iterative Methods",
    pageSlug: "trust-region",
  },
  {
    id: "eigen",
    tex: "Av = \\lambda v",
    name: "Eigenvalue Equation",
    description: "v is an eigenvector with eigenvalue λ.",
    category: "Linear Algebra",
    pageSlug: "eigenvalues-conjugate-gradient",
  },
  {
    id: "condition-number",
    tex: "\\kappa(A) = \\dfrac{\\lambda_{\\max}}{\\lambda_{\\min}}",
    name: "Condition Number",
    description: "Ratio of extreme eigenvalues; controls convergence speed.",
    category: "Linear Algebra",
    pageSlug: "eigenvalues-conjugate-gradient",
  },
  {
    id: "linear-system",
    tex: "Ax = b",
    name: "Linear System",
    description: "Solving linear systems underlies many optimization steps.",
    category: "Linear Algebra",
  },
  {
    id: "central-difference",
    tex: "f'(x) \\approx \\dfrac{f(x+h) - f(x-h)}{2h}",
    name: "Central Difference",
    description: "Second-order accurate numerical derivative.",
    category: "Numerical Methods",
    pageSlug: "numerical-derivatives-sparsity",
  },
  {
    id: "forward-difference",
    tex: "f'(x) \\approx \\dfrac{f(x+h) - f(x)}{h}",
    name: "Forward Difference",
    description: "First-order accurate numerical derivative.",
    category: "Numerical Methods",
    pageSlug: "numerical-derivatives-sparsity",
  },
];

export function getFormulasByCategory(
  category: FormulaCategory,
): FormulaEntry[] {
  return formulas.filter((f) => f.category === category);
}
