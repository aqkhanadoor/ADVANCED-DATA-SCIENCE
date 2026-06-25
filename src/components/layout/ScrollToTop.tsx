import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to the top of the page whenever the route changes. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
