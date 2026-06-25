import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Layout for learning pages: a sticky sidebar chapter outline beside a
 * readability-constrained content column.
 */
export function LearnLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
        <div className="min-w-0 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
