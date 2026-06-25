import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { InlineMath } from "@/components/math/InlineMath";
import { glossary } from "@/content/glossary";
import { ROUTES } from "@/lib/routes";

export function GlossaryPage() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  // Deep-link to a specific term via #term-id.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-primary");
        const timer = setTimeout(
          () => el.classList.remove("ring-2", "ring-primary"),
          1600,
        );
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  const sorted = useMemo(
    () => [...glossary].sort((a, b) => a.term.localeCompare(b.term)),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q),
    );
  }, [sorted, query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", to: ROUTES.home }, { label: "Glossary" }]}
      />
      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
        <p className="mt-2 text-muted-foreground">
          Plain-language definitions of every key term used across the course.
        </p>
      </header>

      <div className="relative mt-6">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          aria-label="Search glossary terms"
          className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length} term{filtered.length === 1 ? "" : "s"}
      </p>

      <dl className="mt-4 space-y-4">
        {filtered.map((term) => (
          <Card
            key={term.id}
            id={term.id}
            className="scroll-mt-24 p-5 transition-shadow"
          >
            <div className="flex flex-wrap items-center gap-2">
              <dt className="text-lg font-semibold">{term.term}</dt>
              {term.tex ? (
                <Badge variant="secondary">
                  <InlineMath>{term.tex}</InlineMath>
                </Badge>
              ) : null}
            </div>
            <dd className="mt-2 text-sm text-muted-foreground">
              {term.definition}
            </dd>
            {term.related && term.related.length > 0 ? (
              <dd className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Related:</span>
                {term.related.map((rid) => {
                  const rel = glossary.find((g) => g.id === rid);
                  if (!rel) return null;
                  return (
                    <Link
                      key={rid}
                      to={`${ROUTES.glossary}#${rid}`}
                      className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground hover:text-foreground"
                    >
                      {rel.term}
                    </Link>
                  );
                })}
              </dd>
            ) : null}
          </Card>
        ))}
      </dl>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          No terms match “{query}”.
        </p>
      ) : null}
    </div>
  );
}
