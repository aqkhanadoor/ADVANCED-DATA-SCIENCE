import { useEffect, useState } from "react";

/**
 * Returns `true` only after the component has mounted on the client. Useful for
 * gating theme-dependent rendering (next-themes) to avoid a first-paint flash.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  // Intentional one-time mount flag; this is the documented pattern for
  // theme-aware UI and runs exactly once.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}
