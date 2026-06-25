import { useState } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/components/layout/navLinks";
import { optimizationPages } from "@/content/optimizationPages";
import { optimizationPagePath } from "@/lib/routes";
import { useProgressStore } from "@/store/progressStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Mobile navigation: a slide-in dialog menu with the primary links and the
 * full optimization chapter outline.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const completedPages = useProgressStore((s) => s.completedPages);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="left-auto right-0 top-0 h-full max-h-screen w-[88%] max-w-sm translate-x-0 translate-y-0 rounded-none rounded-l-xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
        </DialogHeader>
        <nav className="-mr-2 overflow-y-auto pr-2" aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const active = link.matchPrefix
                ? location.pathname.startsWith(link.to)
                : location.pathname === link.to;
              return (
                <li key={link.to}>
                  <DialogClose asChild>
                    <RouterNavLink
                      to={link.to}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/60",
                      )}
                    >
                      {link.label}
                    </RouterNavLink>
                  </DialogClose>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Chapter 1 · Optimization
          </p>
          <ol className="mt-2 space-y-0.5">
            {optimizationPages.map((page, i) => {
              const to = optimizationPagePath(page.slug);
              const active = location.pathname === to;
              const done = completedPages.includes(page.id);
              return (
                <li key={page.id}>
                  <DialogClose asChild>
                    <RouterNavLink
                      to={to}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                        active
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/60",
                      )}
                    >
                      <span className="w-4 shrink-0 text-xs tabular-nums text-muted-foreground">
                        {done ? (
                          <Check className="size-4 text-emerald-500" aria-label="completed" />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span className="truncate">{page.shortTitle}</span>
                    </RouterNavLink>
                  </DialogClose>
                </li>
              );
            })}
          </ol>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
