"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: a media query is an
 * external store, so this reads it during render, keeps it in sync, and needs no
 * setState-in-an-effect. The server snapshot is `false`, which matches the markup the
 * server sends; if the real preference is `reduce`, React re-renders on hydration before
 * anything has had a chance to move.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
