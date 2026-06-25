/**
 * Metadata and placeholder content for every page in the Optimization chapter.
 *
 * Full long-form lessons are intentionally NOT written yet — each page ships
 * with structured placeholders (objectives, sections, a visualization slot,
 * an example, and a practice prompt) so the learning experience is complete
 * end-to-end while content is authored incrementally.
 */

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/** Identifies which visualization component the page template should render. */
export type VisualizationKind =
  | "function-plot-2d"
  | "feasible-region"
  | "gradient-descent"
  | "simplex-table"
  | "matrix"
  | "eigenvalue"
  | "recharts-line"
  | "plotly-surface";

export interface PageFormula {
  /** TeX source (without delimiters). */
  tex: string;
  /** Short human label / caption. */
  label: string;
}

export interface PageVisualization {
  kind: VisualizationKind;
  title: string;
  caption: string;
}

export interface PageSection {
  heading: string;
  /** Short placeholder body for the section. */
  placeholder: string;
}

export interface OptimizationPage {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  difficulty: Difficulty;
  /** Estimated reading/working time in minutes. */
  estimatedTime: number;
  /** Slugs of pages recommended before this one. */
  prerequisites: string[];
  learningObjectives: string[];
  sections: PageSection[];
  formulas: PageFormula[];
  keyTerms: string[];
  visualizations: PageVisualization[];
  /** Real-life example placeholder. */
  example: { title: string; placeholder: string };
  /** Practice prompt placeholder. */
  practice: { prompt: string };
  /** Filled in by `withNavigation` — slug of the next/previous page. */
  nextPage: string | null;
  previousPage: string | null;
}

type RawPage = Omit<OptimizationPage, "nextPage" | "previousPage">;

const RAW_PAGES: RawPage[] = [
  {
    id: "what-is-optimization",
    slug: "what-is-optimization",
    title: "What is Optimization?",
    shortTitle: "What is Optimization?",
    description:
      "Build intuition for what it means to optimize: choosing the best option from a set of possibilities by minimizing or maximizing an objective.",
    difficulty: "Beginner",
    estimatedTime: 12,
    prerequisites: [],
    learningObjectives: [
      "Explain optimization in plain language using everyday decisions.",
      "Identify the objective function, decision variables, and constraints in a simple problem.",
      "Recognize the difference between minimization and maximization.",
    ],
    sections: [
      {
        heading: "The big idea",
        placeholder:
          "Optimization is the art and science of making the best choice. This section will develop that intuition from everyday examples.",
      },
      {
        heading: "Objective, variables, and constraints",
        placeholder:
          "Every optimization problem has something we want to make as good as possible, knobs we can turn, and rules we must respect.",
      },
      {
        heading: "Minimization vs. maximization",
        placeholder:
          "Maximizing profit is the same as minimizing negative profit — we'll see why the two views are interchangeable.",
      },
    ],
    formulas: [
      { tex: "\\min_{x \\in \\mathbb{R}^n} \\; f(x)", label: "General minimization problem" },
      { tex: "\\max_{x} \\; f(x) = -\\min_{x} \\; -f(x)", label: "Max as min" },
    ],
    keyTerms: ["objective-function", "decision-variable", "constraint", "feasible-region"],
    visualizations: [
      {
        kind: "function-plot-2d",
        title: "Minimum of a simple curve",
        caption: "The lowest point of f(x) = x² is the solution to a tiny optimization problem.",
      },
    ],
    example: {
      title: "Planning your commute",
      placeholder:
        "Choosing the fastest route to work is an optimization problem: minimize travel time subject to the roads available.",
    },
    practice: {
      prompt:
        "Describe a decision you made today as an optimization problem. What was the objective? What were the constraints?",
    },
  },
  {
    id: "modelling",
    slug: "modelling",
    title: "Optimization Modelling",
    shortTitle: "Modelling",
    description:
      "Translate a messy real-world situation into a precise mathematical model with variables, an objective, and constraints.",
    difficulty: "Beginner",
    estimatedTime: 15,
    prerequisites: ["what-is-optimization"],
    learningObjectives: [
      "Turn a word problem into decision variables.",
      "Write an objective function from a goal stated in words.",
      "Express real-world limits as mathematical constraints.",
    ],
    sections: [
      {
        heading: "From story to symbols",
        placeholder:
          "Modelling is the bridge between a real problem and the mathematics that can solve it.",
      },
      {
        heading: "Choosing good decision variables",
        placeholder: "The right variables make a model simple; the wrong ones make it impossible.",
      },
      {
        heading: "Writing constraints",
        placeholder: "Budgets, capacities, and physical limits all become inequalities or equalities.",
      },
    ],
    formulas: [
      { tex: "\\min_{x} \\; c^\\top x", label: "Linear objective" },
      { tex: "\\text{subject to } \\; a_i^\\top x \\le b_i", label: "Resource constraint" },
    ],
    keyTerms: ["decision-variable", "objective-function", "constraint", "parameter"],
    visualizations: [
      {
        kind: "recharts-line",
        title: "Cost as a function of a decision",
        caption: "How an objective value changes as we vary one decision variable.",
      },
    ],
    example: {
      title: "A bakery's production plan",
      placeholder:
        "Decide how many loaves and cakes to bake to maximize profit given limited flour and oven time.",
    },
    practice: {
      prompt:
        "Model the bakery problem: define variables for loaves and cakes, write the profit objective, and list two constraints.",
    },
  },
  {
    id: "types-and-convexity",
    slug: "types-and-convexity",
    title: "Types of Optimization and Convexity",
    shortTitle: "Types & Convexity",
    description:
      "Survey the landscape of optimization problems and meet convexity — the single most important property that makes problems easy to solve.",
    difficulty: "Intermediate",
    estimatedTime: 18,
    prerequisites: ["modelling"],
    learningObjectives: [
      "Classify problems as linear/nonlinear and constrained/unconstrained.",
      "Define a convex set and a convex function intuitively.",
      "Explain why convex problems have no bad local minima.",
    ],
    sections: [
      {
        heading: "A map of optimization problems",
        placeholder: "Linear vs. nonlinear, discrete vs. continuous, constrained vs. unconstrained.",
      },
      {
        heading: "Convex sets and convex functions",
        placeholder: "A function is convex if the line between any two points lies above the curve.",
      },
      {
        heading: "Why convexity matters",
        placeholder: "For convex problems, any local minimum is a global minimum.",
      },
    ],
    formulas: [
      {
        tex: "f(\\lambda x + (1-\\lambda) y) \\le \\lambda f(x) + (1-\\lambda) f(y)",
        label: "Convexity condition",
      },
      { tex: "\\nabla^2 f(x) \\succeq 0", label: "Convexity via the Hessian" },
    ],
    keyTerms: ["convex-set", "convex-function", "local-minimum", "global-minimum"],
    visualizations: [
      {
        kind: "function-plot-2d",
        title: "Convex vs. non-convex curves",
        caption: "Compare a convex bowl with a wiggly non-convex function and its many local minima.",
      },
    ],
    example: {
      title: "Why a bowl is easy and a mountain range is hard",
      placeholder:
        "Rolling a ball into a bowl always finds the bottom; in a mountain range it can get stuck in a valley.",
    },
    practice: {
      prompt: "Sketch a function that is non-convex and mark its local and global minima.",
    },
  },
  {
    id: "linear-programming",
    slug: "linear-programming",
    title: "Linear Programming",
    shortTitle: "Linear Programming",
    description:
      "Study problems where both the objective and the constraints are linear — the workhorse of operations research.",
    difficulty: "Intermediate",
    estimatedTime: 20,
    prerequisites: ["types-and-convexity"],
    learningObjectives: [
      "Write a linear program in standard form.",
      "Understand the feasible region as an intersection of half-planes.",
      "Explain why an optimum sits at a vertex.",
    ],
    sections: [
      { heading: "Standard form", placeholder: "Objective, constraints, and non-negativity together." },
      { heading: "The feasible region", placeholder: "A convex polytope formed by linear constraints." },
      { heading: "Optimal vertices", placeholder: "The optimum of an LP lies at a corner of the region." },
    ],
    formulas: [
      { tex: "\\min_{x} \\; c^\\top x \\quad \\text{s.t.} \\quad Ax \\le b,\\; x \\ge 0", label: "LP in standard form" },
    ],
    keyTerms: ["linear-program", "feasible-region", "vertex", "half-plane"],
    visualizations: [
      {
        kind: "feasible-region",
        title: "A 2D feasible region",
        caption: "The shaded polygon shows all feasible points; the optimum sits at a vertex.",
      },
    ],
    example: {
      title: "Diet problem",
      placeholder: "Choose foods to meet nutrition requirements at minimum cost.",
    },
    practice: {
      prompt: "Write the diet problem as a linear program with two foods and two nutrient constraints.",
    },
  },
  {
    id: "graphical-method",
    slug: "graphical-method",
    title: "Graphical Method",
    shortTitle: "Graphical Method",
    description:
      "Solve two-variable linear programs by drawing the feasible region and sliding the objective line.",
    difficulty: "Beginner",
    estimatedTime: 14,
    prerequisites: ["linear-programming"],
    learningObjectives: [
      "Plot constraints as lines and shade feasible half-planes.",
      "Identify corner points of the feasible region.",
      "Find the optimum by evaluating the objective at each vertex.",
    ],
    sections: [
      { heading: "Drawing the constraints", placeholder: "Each inequality becomes a boundary line." },
      { heading: "Sliding the objective", placeholder: "Move the objective line until it last touches the region." },
      { heading: "Reading off the answer", placeholder: "Check each vertex to find the best feasible point." },
    ],
    formulas: [
      { tex: "c^\\top x = k", label: "Objective level line" },
    ],
    keyTerms: ["feasible-region", "vertex", "objective-function", "half-plane"],
    visualizations: [
      {
        kind: "feasible-region",
        title: "Sliding the objective line",
        caption: "The optimum is the last feasible point touched by the moving objective line.",
      },
    ],
    example: {
      title: "Maximizing profit with two products",
      placeholder: "A factory makes two products with limited labor and material.",
    },
    practice: {
      prompt: "Solve a two-variable LP graphically and verify the optimum is at a vertex.",
    },
  },
  {
    id: "simplex-method",
    slug: "simplex-method",
    title: "Simplex Method",
    shortTitle: "Simplex Method",
    description:
      "Learn the classic algorithm that walks from vertex to vertex of the feasible region to reach the optimum.",
    difficulty: "Advanced",
    estimatedTime: 25,
    prerequisites: ["graphical-method"],
    learningObjectives: [
      "Set up a simplex tableau from a linear program.",
      "Perform a pivot to move to a better vertex.",
      "Recognize the optimality condition.",
    ],
    sections: [
      { heading: "The tableau", placeholder: "Organize the LP into a table of coefficients." },
      { heading: "Pivoting", placeholder: "Choose entering and leaving variables, then update the tableau." },
      { heading: "Optimality", placeholder: "Stop when no improving direction remains." },
    ],
    formulas: [
      { tex: "x_B = B^{-1} b", label: "Basic feasible solution" },
      { tex: "\\bar{c}_j = c_j - c_B^\\top B^{-1} A_j", label: "Reduced cost" },
    ],
    keyTerms: ["simplex", "tableau", "pivot", "basic-feasible-solution", "reduced-cost"],
    visualizations: [
      {
        kind: "simplex-table",
        title: "A simplex tableau",
        caption: "Watch a pivot transform the tableau as the algorithm moves to a better vertex.",
      },
    ],
    example: {
      title: "Solving the factory problem with simplex",
      placeholder: "Apply the tableau pivots to the two-product factory model.",
    },
    practice: {
      prompt: "Perform one pivot step on the provided tableau and identify the new basic variables.",
    },
  },
  {
    id: "duality-sensitivity",
    slug: "duality-sensitivity",
    title: "Duality and Sensitivity Analysis",
    shortTitle: "Duality & Sensitivity",
    description:
      "Every linear program has a shadow companion — its dual — that reveals the value of resources and how robust a solution is.",
    difficulty: "Advanced",
    estimatedTime: 22,
    prerequisites: ["simplex-method"],
    learningObjectives: [
      "Form the dual of a linear program.",
      "Interpret dual variables as shadow prices.",
      "Analyze how the optimum changes as data changes.",
    ],
    sections: [
      { heading: "The dual problem", placeholder: "Constraints become variables and vice versa." },
      { heading: "Shadow prices", placeholder: "Dual values measure the worth of one more unit of a resource." },
      { heading: "Sensitivity", placeholder: "How much can data change before the optimal basis changes?" },
    ],
    formulas: [
      { tex: "\\max_{y} \\; b^\\top y \\quad \\text{s.t.} \\quad A^\\top y \\le c,\\; y \\ge 0", label: "Dual LP" },
      { tex: "c^\\top x^\\star = b^\\top y^\\star", label: "Strong duality" },
    ],
    keyTerms: ["dual-problem", "shadow-price", "strong-duality", "sensitivity-analysis"],
    visualizations: [
      {
        kind: "recharts-line",
        title: "Objective vs. resource level",
        caption: "The slope of the optimal value with respect to a resource is its shadow price.",
      },
    ],
    example: {
      title: "What is one more hour of labor worth?",
      placeholder: "The dual tells the factory how much an extra labor hour adds to profit.",
    },
    practice: {
      prompt: "Write the dual of the factory LP and interpret each dual variable.",
    },
  },
  {
    id: "unconstrained-optimization",
    slug: "unconstrained-optimization",
    title: "Unconstrained Optimization",
    shortTitle: "Unconstrained",
    description:
      "When there are no constraints, calculus takes over: find where the gradient vanishes and check curvature.",
    difficulty: "Intermediate",
    estimatedTime: 18,
    prerequisites: ["types-and-convexity"],
    learningObjectives: [
      "State the first-order optimality condition.",
      "Use the second-order condition to classify critical points.",
      "Distinguish minima, maxima, and saddle points.",
    ],
    sections: [
      { heading: "First-order conditions", placeholder: "At a minimum the gradient is zero." },
      { heading: "Second-order conditions", placeholder: "Curvature decides whether it's a min, max, or saddle." },
      { heading: "Critical points", placeholder: "Not every stationary point is a minimum." },
    ],
    formulas: [
      { tex: "\\nabla f(x^\\star) = 0", label: "First-order condition" },
      { tex: "\\nabla^2 f(x^\\star) \\succeq 0", label: "Second-order condition" },
    ],
    keyTerms: ["gradient", "hessian", "critical-point", "saddle-point"],
    visualizations: [
      {
        kind: "function-plot-2d",
        title: "Critical points of a curve",
        caption: "Where the slope is zero, the curve has a minimum, maximum, or inflection.",
      },
    ],
    example: {
      title: "Least-squares fit",
      placeholder: "Fitting a line to data minimizes squared error — an unconstrained problem.",
    },
    practice: {
      prompt: "Find the critical points of f(x) = x³ − 3x and classify each one.",
    },
  },
  {
    id: "gradient-descent",
    slug: "gradient-descent",
    title: "Gradient Descent and Line Search",
    shortTitle: "Gradient Descent",
    description:
      "The engine behind modern machine learning: repeatedly step downhill in the direction of steepest descent.",
    difficulty: "Intermediate",
    estimatedTime: 22,
    prerequisites: ["unconstrained-optimization"],
    learningObjectives: [
      "Derive the gradient descent update rule.",
      "Explain the role of the step size (learning rate).",
      "Describe how line search chooses a good step.",
    ],
    sections: [
      { heading: "Stepping downhill", placeholder: "Move opposite the gradient to decrease the objective." },
      { heading: "Choosing a step size", placeholder: "Too big diverges; too small crawls." },
      { heading: "Line search", placeholder: "Pick a step that guarantees sufficient decrease." },
    ],
    formulas: [
      { tex: "x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)", label: "Gradient descent update" },
      { tex: "f(x_k - \\alpha \\nabla f(x_k)) \\le f(x_k) - c\\,\\alpha \\lVert \\nabla f(x_k) \\rVert^2", label: "Armijo condition" },
    ],
    keyTerms: ["gradient", "learning-rate", "line-search", "step-size"],
    visualizations: [
      {
        kind: "gradient-descent",
        title: "Descent path on a contour plot",
        caption: "Follow the iterates as they zig-zag down toward the minimum on a 2D contour map.",
      },
    ],
    example: {
      title: "Training a simple model",
      placeholder: "Gradient descent tunes model parameters to minimize prediction error.",
    },
    practice: {
      prompt: "Run two iterations of gradient descent on f(x) = x² from x₀ = 4 with α = 0.3.",
    },
  },
  {
    id: "hessian-newton",
    slug: "hessian-newton",
    title: "Hessian, Newton, and Quasi-Newton Methods",
    shortTitle: "Newton Methods",
    description:
      "Use curvature information from the Hessian to take smarter, faster steps toward the optimum.",
    difficulty: "Advanced",
    estimatedTime: 24,
    prerequisites: ["gradient-descent"],
    learningObjectives: [
      "Interpret the Hessian as local curvature.",
      "Derive Newton's update from a quadratic model.",
      "Explain why quasi-Newton methods approximate the Hessian.",
    ],
    sections: [
      { heading: "The Hessian", placeholder: "A matrix of second derivatives describing curvature." },
      { heading: "Newton's method", placeholder: "Jump to the minimum of a local quadratic model." },
      { heading: "Quasi-Newton (BFGS)", placeholder: "Approximate the Hessian to avoid costly second derivatives." },
    ],
    formulas: [
      { tex: "x_{k+1} = x_k - \\left[\\nabla^2 f(x_k)\\right]^{-1} \\nabla f(x_k)", label: "Newton's update" },
      { tex: "B_{k+1} \\approx \\nabla^2 f(x_{k+1})", label: "Quasi-Newton approximation" },
    ],
    keyTerms: ["hessian", "newton-method", "quasi-newton", "quadratic-model"],
    visualizations: [
      {
        kind: "matrix",
        title: "Reading a Hessian",
        caption: "A heatmap of the Hessian entries reveals curvature in each direction.",
      },
    ],
    example: {
      title: "Newton vs. gradient descent",
      placeholder: "On a curved valley, Newton's method reaches the minimum in far fewer steps.",
    },
    practice: {
      prompt: "Apply one Newton step to f(x) = x² + 4x from x₀ = 0.",
    },
  },
  {
    id: "trust-region",
    slug: "trust-region",
    title: "Trust Region Methods",
    shortTitle: "Trust Region",
    description:
      "Instead of trusting a step length, trust a region: only believe the local model within a controlled radius.",
    difficulty: "Advanced",
    estimatedTime: 20,
    prerequisites: ["hessian-newton"],
    learningObjectives: [
      "Explain the trust-region idea versus line search.",
      "Set up the trust-region subproblem.",
      "Describe how the radius expands and contracts.",
    ],
    sections: [
      { heading: "Trusting a region", placeholder: "Limit the step to where the model is reliable." },
      { heading: "The subproblem", placeholder: "Minimize the quadratic model inside a ball of radius Δ." },
      { heading: "Adapting the radius", placeholder: "Grow the region after good steps, shrink after bad ones." },
    ],
    formulas: [
      {
        tex: "\\min_{p} \\; m_k(p) = f_k + g_k^\\top p + \\tfrac{1}{2} p^\\top B_k p \\quad \\text{s.t.} \\quad \\lVert p \\rVert \\le \\Delta_k",
        label: "Trust-region subproblem",
      },
    ],
    keyTerms: ["trust-region", "quadratic-model", "step-size", "hessian"],
    visualizations: [
      {
        kind: "function-plot-2d",
        title: "Model vs. true function",
        caption: "The quadratic model is trustworthy only within the trust region radius.",
      },
    ],
    example: {
      title: "When line search struggles",
      placeholder: "Trust-region methods stay robust where pure Newton steps overshoot.",
    },
    practice: {
      prompt: "Given a quadratic model, find the trust-region step for radius Δ = 1.",
    },
  },
  {
    id: "eigenvalues-conjugate-gradient",
    slug: "eigenvalues-conjugate-gradient",
    title: "Eigenvalues and Conjugate Gradient",
    shortTitle: "Eigenvalues & CG",
    description:
      "Eigenvalues describe how curvature stretches space, and the conjugate gradient method exploits this to solve huge systems efficiently.",
    difficulty: "Advanced",
    estimatedTime: 24,
    prerequisites: ["hessian-newton"],
    learningObjectives: [
      "Interpret eigenvalues and eigenvectors of a symmetric matrix.",
      "Connect the condition number to convergence speed.",
      "Outline the conjugate gradient algorithm.",
    ],
    sections: [
      { heading: "Eigenvalues and eigenvectors", placeholder: "Directions that a matrix only stretches, never rotates." },
      { heading: "Conditioning", placeholder: "The ratio of largest to smallest eigenvalue controls difficulty." },
      { heading: "Conjugate gradient", placeholder: "Solve large symmetric systems without forming an inverse." },
    ],
    formulas: [
      { tex: "Av = \\lambda v", label: "Eigenvalue equation" },
      { tex: "\\kappa(A) = \\dfrac{\\lambda_{\\max}}{\\lambda_{\\min}}", label: "Condition number" },
    ],
    keyTerms: ["eigenvalue", "eigenvector", "condition-number", "conjugate-gradient"],
    visualizations: [
      {
        kind: "eigenvalue",
        title: "How a matrix transforms vectors",
        caption: "Eigenvectors keep their direction; other vectors get rotated and stretched.",
      },
    ],
    example: {
      title: "Why ill-conditioned problems are slow",
      placeholder: "A stretched bowl makes gradient descent zig-zag; CG fixes this.",
    },
    practice: {
      prompt: "Find the eigenvalues of the 2×2 matrix [[2, 0], [0, 5]] and its condition number.",
    },
  },
  {
    id: "numerical-derivatives-sparsity",
    slug: "numerical-derivatives-sparsity",
    title: "Numerical Derivatives and Sparsity",
    shortTitle: "Numerical & Sparsity",
    description:
      "When formulas for derivatives are unavailable, approximate them numerically — and exploit sparsity to scale to millions of variables.",
    difficulty: "Advanced",
    estimatedTime: 20,
    prerequisites: ["gradient-descent"],
    learningObjectives: [
      "Approximate derivatives with finite differences.",
      "Balance truncation and rounding error when choosing a step.",
      "Explain how sparsity reduces computation.",
    ],
    sections: [
      { heading: "Finite differences", placeholder: "Estimate slopes from nearby function values." },
      { heading: "Choosing the step", placeholder: "Too large is inaccurate; too small amplifies rounding error." },
      { heading: "Sparsity", placeholder: "Most entries are zero — store and compute only what matters." },
    ],
    formulas: [
      { tex: "f'(x) \\approx \\dfrac{f(x+h) - f(x-h)}{2h}", label: "Central difference" },
      { tex: "f'(x) \\approx \\dfrac{f(x+h) - f(x)}{h}", label: "Forward difference" },
    ],
    keyTerms: ["finite-difference", "sparsity", "truncation-error", "rounding-error"],
    visualizations: [
      {
        kind: "matrix",
        title: "A sparse matrix",
        caption: "Colored cells are non-zero; the vast empty space is what sparsity exploits.",
      },
    ],
    example: {
      title: "Gradients without calculus",
      placeholder: "When a model is a black box, finite differences still give us a gradient.",
    },
    practice: {
      prompt: "Estimate f'(2) for f(x) = x² using a central difference with h = 0.1.",
    },
  },
];

function withNavigation(pages: RawPage[]): OptimizationPage[] {
  return pages.map((page, index) => ({
    ...page,
    previousPage: index > 0 ? pages[index - 1].slug : null,
    nextPage: index < pages.length - 1 ? pages[index + 1].slug : null,
  }));
}

export const optimizationPages: OptimizationPage[] = withNavigation(RAW_PAGES);

export const optimizationPageSlugs: string[] = optimizationPages.map((p) => p.slug);
export const optimizationPageIds: string[] = optimizationPages.map((p) => p.id);

export function getOptimizationPageBySlug(
  slug: string,
): OptimizationPage | undefined {
  return optimizationPages.find((p) => p.slug === slug);
}
