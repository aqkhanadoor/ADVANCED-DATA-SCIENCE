/**
 * Central route definitions. Keep all path strings here so navigation,
 * breadcrumbs and the router stay in sync.
 */

export const ROUTES = {
  home: "/",
  glossary: "/glossary",
  formulas: "/formulas",
  progress: "/progress",
  optimization: "/learn/optimization",
} as const;

export const OPTIMIZATION_BASE = "/learn/optimization";

/** Build the full path for an optimization page given its slug. */
export function optimizationPagePath(slug: string): string {
  return `${OPTIMIZATION_BASE}/${slug}`;
}

export type ChapterId = "optimization" | "statistics" | "python" | "ai-ml";

/** Build the landing path for a chapter. */
export function chapterPath(chapterId: ChapterId): string {
  return `/learn/${chapterId}`;
}
