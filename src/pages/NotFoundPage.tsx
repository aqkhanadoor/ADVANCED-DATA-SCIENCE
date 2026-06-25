import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&apos;t find that page. It may have moved, or the link might be
        incorrect.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to={ROUTES.home}>
            <Home className="size-4" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={ROUTES.optimization}>Go to Chapter 1</Link>
        </Button>
      </div>
    </div>
  );
}
