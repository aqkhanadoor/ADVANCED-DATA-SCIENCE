import katex from "katex";

export interface RenderMathOptions {
  displayMode?: boolean;
}

/**
 * Render a TeX string to an HTML string using KaTeX.
 *
 * Uses `throwOnError: false` so that an authoring typo degrades gracefully to
 * a visible (red) error string rather than crashing the page.
 */
export function renderMathToString(
  tex: string,
  { displayMode = false }: RenderMathOptions = {},
): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
    output: "htmlAndMathml",
    trust: false,
  });
}

/**
 * A few common TeX snippets reused across the course so authors don't have to
 * remember the exact escaping.
 */
export const TEX = {
  gradient: "\\nabla f(x)",
  hessian: "\\nabla^2 f(x)",
  rn: "x \\in \\mathbb{R}^n",
  linearSystem: "Ax = b",
  eigen: "Av = \\lambda v",
  minimize: "\\min_{x \\in \\mathbb{R}^n} \\; f(x)",
  quadratic: "f(x) = x^2",
  paraboloid: "f(x, y) = x^2 + y^2",
} as const;
