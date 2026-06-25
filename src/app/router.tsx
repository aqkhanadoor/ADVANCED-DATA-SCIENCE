import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { LearnLayout } from "@/components/layout/LearnLayout";
import { HomePage } from "@/pages/HomePage";
import { GlossaryPage } from "@/pages/GlossaryPage";
import { FormulasPage } from "@/pages/FormulasPage";
import { ProgressPage } from "@/pages/ProgressPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OptimizationLandingPage } from "@/pages/optimization/OptimizationLandingPage";
import { OptimizationPageTemplate } from "@/pages/optimization/OptimizationPageTemplate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "glossary", element: <GlossaryPage /> },
      { path: "formulas", element: <FormulasPage /> },
      { path: "progress", element: <ProgressPage /> },
      {
        path: "learn/optimization",
        children: [
          { index: true, element: <OptimizationLandingPage /> },
          {
            element: <LearnLayout />,
            children: [{ path: ":slug", element: <OptimizationPageTemplate /> }],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
