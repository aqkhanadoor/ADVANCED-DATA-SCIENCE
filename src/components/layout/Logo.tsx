import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.home}
      className={cn(
        "group flex items-center gap-2.5 font-semibold tracking-tight focus-visible:outline-none",
        className,
      )}
      aria-label="Advanced Data Science — home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm">
        <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true">
          <path
            d="M7 22 L13 12 L18 18 L25 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="9" r="2.2" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-bold">Advanced</span>
        <span className="text-sm font-bold text-muted-foreground">Data Science</span>
      </span>
    </Link>
  );
}
