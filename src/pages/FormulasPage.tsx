import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FormulaCard } from "@/components/math/FormulaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  formulas,
  formulaCategories,
  getFormulasByCategory,
} from "@/content/formulas";
import { getOptimizationPageBySlug } from "@/content/optimizationPages";
import { optimizationPagePath, ROUTES } from "@/lib/routes";

export function FormulasPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", to: ROUTES.home }, { label: "Formulas" }]}
      />
      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight">Formula reference</h1>
        <p className="mt-2 text-muted-foreground">
          Every important formula in the course, rendered with KaTeX and grouped
          by topic. Each links back to the page where it&apos;s introduced.
        </p>
      </header>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          {formulaCategories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <FormulaList entries={formulas} />
        </TabsContent>
        {formulaCategories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <FormulaList entries={getFormulasByCategory(cat)} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function FormulaList({ entries }: { entries: typeof formulas }) {
  return (
    <div className="space-y-1">
      {entries.map((f) => {
        const page = f.pageSlug ? getOptimizationPageBySlug(f.pageSlug) : undefined;
        return (
          <div key={f.id}>
            <FormulaCard tex={f.tex} label={f.name} caption={f.description} />
            {page ? (
              <p className="-mt-3 mb-4 px-1 text-xs text-muted-foreground">
                Introduced in{" "}
                <Link
                  to={optimizationPagePath(page.slug)}
                  className="text-primary hover:underline"
                >
                  {page.title}
                </Link>
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
