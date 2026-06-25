# Advanced Data Science

A beautiful, beginner-friendly educational website for an **Advanced Data Science** course. It teaches the mathematical and programming ideas behind modern data science through intuitive explanations, real-life examples, mathematical derivations, interactive graphs, and beautifully rendered formulas.

**Chapter 1 · Optimization** is available now. Statistics, Python, and AI &amp; ML are coming soon.

## Tech stack

| Area | Tooling |
| --- | --- |
| Core | React 19.2.7, React DOM 19.2.7, TypeScript 6.0.3, React Router DOM 7.18.0, Node ≥ 24 |
| Build | Vite 8.1.0, `@vitejs/plugin-react` 6.0.3, ESLint 9.39.4, `typescript-eslint` 8.62.0 |
| Styling | Tailwind CSS 4.3.1, `@tailwindcss/vite`, `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`, Radix UI, `lucide-react` 1.21.0, `next-themes` 0.4.6 |
| Math &amp; viz | KaTeX 0.17.0, `plotly.js-dist-min` 3.6.0, `react-plotly.js` 4.0.0, Recharts 3.9.0 |
| State | Zustand 5.0.14 (persisted to `localStorage`) |
| Deploy | Wrangler 4.104.0 → Cloudflare Pages |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on Vite's default port (printed in the terminal).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |
| `npm run deploy` | Build and deploy `dist/` to Cloudflare Pages (`wrangler pages deploy dist`) |

## Deployment (Cloudflare Pages)

The build output directory is `dist`. A SPA fallback is configured via `public/_redirects` (`/* /index.html 200`) so client-side routes work on refresh.

```bash
npm run deploy
# or
npm run build && wrangler pages deploy dist
```

## Project structure

```
src/
  app/router.tsx          # Route configuration (React Router DOM)
  components/
    layout/               # AppLayout, LearnLayout, Navbar, Sidebar, Footer, MobileNav, ...
    ui/                   # Button, Card, Badge, Progress, Tabs, Accordion, Dialog, Callout boxes
    math/                 # InlineMath, BlockMath, FormulaCard (KaTeX)
    charts/               # PlotlyChart, RechartsLineChart, FunctionPlot2D, FeasibleRegionPlot, ...
    learning/             # ChapterCard, VisualizationCard, VisualizationSlot
  content/                # chapters, optimizationPages, glossary, formulas (data layer)
  pages/                  # HomePage, GlossaryPage, FormulasPage, ProgressPage, NotFoundPage, optimization/*
  store/progressStore.ts  # Zustand progress store (persisted)
  lib/                    # cn, math, routes, useMounted
  styles/globals.css      # Tailwind v4 theme + tokens
  main.tsx / App.tsx
```

## Content architecture

Lesson metadata is data-driven, not hardcoded in components. Each optimization page in `src/content/optimizationPages.ts` carries `id`, `slug`, `title`, `shortTitle`, `description`, `difficulty`, `estimatedTime`, `prerequisites`, `nextPage`, `previousPage`, `formulas`, `keyTerms`, and `visualizations`. The generic `OptimizationPageTemplate` renders any page from this metadata.

> The long-form lesson prose is intentionally left as structured placeholders for now. Every page already ships with objectives, sections, key formulas, an interactive visualization, a worked-example box, a practice prompt, key terms, and previous/next navigation.

## Visualizations

Charts are 2D by default (function plots, LP feasible regions, gradient-descent contour paths, eigenvector transformations). 3D (Plotly surface) is available only where it genuinely aids understanding, with a 2D alternative always provided. Plotly is lazy-loaded into its own chunk so it only downloads when a chart is shown.

## Accessibility

Semantic HTML, keyboard-navigable controls, Radix primitives, visible focus rings, ARIA labels on charts/icons, a skip-to-content link, and meaning conveyed by text + icon (never color alone).
