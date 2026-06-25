import { ROUTES } from "@/lib/routes";

export interface NavLink {
  label: string;
  to: string;
  /** Match nested routes (e.g. /learn/optimization/*). */
  matchPrefix?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", to: ROUTES.home },
  { label: "Optimization", to: ROUTES.optimization, matchPrefix: true },
  { label: "Glossary", to: ROUTES.glossary },
  { label: "Formulas", to: ROUTES.formulas },
  { label: "Progress", to: ROUTES.progress },
];
