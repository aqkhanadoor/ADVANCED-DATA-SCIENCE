import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  /** Set of completed page ids (stored as an array for serialization). */
  completedPages: string[];
  /** The page id the learner is currently on. */
  currentPage: string | null;
  /** The last learning page the learner visited (for "continue learning"). */
  lastVisitedPage: string | null;

  markComplete: (pageId: string) => void;
  markIncomplete: (pageId: string) => void;
  toggleComplete: (pageId: string) => void;
  isComplete: (pageId: string) => boolean;
  setCurrentPage: (pageId: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedPages: [],
      currentPage: null,
      lastVisitedPage: null,

      markComplete: (pageId) =>
        set((state) =>
          state.completedPages.includes(pageId)
            ? state
            : { completedPages: [...state.completedPages, pageId] },
        ),

      markIncomplete: (pageId) =>
        set((state) => ({
          completedPages: state.completedPages.filter((id) => id !== pageId),
        })),

      toggleComplete: (pageId) =>
        get().isComplete(pageId)
          ? get().markIncomplete(pageId)
          : get().markComplete(pageId),

      isComplete: (pageId) => get().completedPages.includes(pageId),

      setCurrentPage: (pageId) =>
        set({ currentPage: pageId, lastVisitedPage: pageId }),

      resetProgress: () =>
        set({ completedPages: [], currentPage: null, lastVisitedPage: null }),
    }),
    {
      name: "ads-progress",
      version: 1,
    },
  ),
);

/**
 * Compute completion stats for a given set of page ids.
 */
export function useChapterProgress(pageIds: string[]) {
  const completedPages = useProgressStore((s) => s.completedPages);
  const completedInChapter = pageIds.filter((id) =>
    completedPages.includes(id),
  );
  const total = pageIds.length;
  const completed = completedInChapter.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent };
}
