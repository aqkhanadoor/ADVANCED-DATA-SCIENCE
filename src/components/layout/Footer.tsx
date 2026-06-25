import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            A practical, beginner-friendly platform for the mathematics and
            programming behind modern data science.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Learn</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to={ROUTES.optimization} className="hover:text-foreground">
                Chapter 1 · Optimization
              </Link>
            </li>
            <li className="opacity-60">Chapter 2 · Statistics (soon)</li>
            <li className="opacity-60">Chapter 3 · Python (soon)</li>
            <li className="opacity-60">Chapter 4 · AI &amp; ML (soon)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Resources</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to={ROUTES.glossary} className="hover:text-foreground">
                Glossary
              </Link>
            </li>
            <li>
              <Link to={ROUTES.formulas} className="hover:text-foreground">
                Formula reference
              </Link>
            </li>
            <li>
              <Link to={ROUTES.progress} className="hover:text-foreground">
                Your progress
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Advanced Data Science. Built for learners.
        </p>
      </div>
    </footer>
  );
}
