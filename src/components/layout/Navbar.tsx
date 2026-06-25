import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS } from "@/components/layout/navLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { Progress } from "@/components/ui/Progress";
import { useChapterProgress } from "@/store/progressStore";
import { optimizationPageIds } from "@/content/optimizationPages";
import { cn } from "@/lib/cn";

export function Navbar() {
  const location = useLocation();
  const { percent } = useChapterProgress(optimizationPageIds);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = link.matchPrefix
              ? location.pathname.startsWith(link.to)
              : location.pathname === link.to;
            return (
              <RouterNavLink
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </RouterNavLink>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div
            className="hidden w-40 flex-col gap-1 lg:flex"
            title={`Course progress: ${percent}% complete`}
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-medium tabular-nums">{percent}%</span>
            </div>
            <Progress value={percent} aria-label={`Course progress ${percent}%`} />
          </div>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
