"use client";

import { useLayoutEffect, useEffect, type ReactNode } from "react";
import { useSky } from "./SkyProvider";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SkyTheme({ children }: { children: ReactNode }) {
  const { season, segment, topColor, bottomColor, tickIntervalSec, isInstant } =
    useSky();

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset.season = season;
    root.dataset.segment = segment;
    root.style.setProperty("--sky-gradient-top", topColor);
    root.style.setProperty("--sky-gradient-bottom", bottomColor);

    let rafId: number | undefined;

    if (isInstant) {
      // Lock in baseline color instantly with 0s transition
      root.style.setProperty("--sky-transition-duration", "0s");
      root.style.setProperty("--theme-transition-duration", "0s");

      // Wait until after initial frame is painted before enabling transitions
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          root.style.setProperty(
            "--sky-transition-duration",
            `${tickIntervalSec}s`,
          );
          root.style.setProperty("--theme-transition-duration", "0.5s");
        });
      });
    } else {
      // Regular tick: update target colors and let CSS transition over tick duration
      root.style.setProperty(
        "--sky-transition-duration",
        `${tickIntervalSec}s`,
      );
      root.style.setProperty("--theme-transition-duration", "0.5s");
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      delete root.dataset.season;
      delete root.dataset.segment;
    };
  }, [season, segment, topColor, bottomColor, tickIntervalSec, isInstant]);

  return children;
}
