import type { ChapterId } from "@/lib/routes";
import { optimizationPageIds } from "@/content/optimizationPages";

export interface Chapter {
  id: ChapterId;
  number: number;
  title: string;
  tagline: string;
  description: string;
  /** Lucide icon name (resolved in the UI). */
  icon: "Target" | "Sigma" | "Code2" | "BrainCircuit";
  status: "available" | "coming-soon";
  /** Page ids belonging to this chapter, used for progress tracking. */
  pageIds: string[];
  /** Accent gradient classes for the chapter card. */
  gradient: string;
}

export const chapters: Chapter[] = [
  {
    id: "optimization",
    number: 1,
    title: "Optimization",
    tagline: "Making the best possible choice",
    description:
      "From linear programming to gradient descent — learn how machines find the best solution among countless possibilities.",
    icon: "Target",
    status: "available",
    pageIds: optimizationPageIds,
    gradient: "from-indigo-500 to-sky-500",
  },
  {
    id: "statistics",
    number: 2,
    title: "Statistics",
    tagline: "Reasoning under uncertainty",
    description:
      "Probability, distributions, estimation, and hypothesis testing — the language of data and uncertainty.",
    icon: "Sigma",
    status: "coming-soon",
    pageIds: [],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "python",
    number: 3,
    title: "Python",
    tagline: "The toolbox of data science",
    description:
      "Write clean, efficient Python for data manipulation, numerical computing, and analysis.",
    icon: "Code2",
    status: "coming-soon",
    pageIds: [],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "ai-ml",
    number: 4,
    title: "AI & ML",
    tagline: "Learning from data",
    description:
      "Build intuition for machine learning models, neural networks, and the ideas powering modern AI.",
    icon: "BrainCircuit",
    status: "coming-soon",
    pageIds: [],
    gradient: "from-fuchsia-500 to-purple-500",
  },
];

export function getChapter(id: ChapterId): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}
