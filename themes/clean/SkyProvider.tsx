"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSkyGradientColors, type CurrentSkyState } from "./utils/skyColors";

export interface SkyContextValue extends CurrentSkyState {
  tickIntervalSec: number;
  isInstant: boolean;
}

const SkyContext = createContext<SkyContextValue | null>(null);

export function useSky(): SkyContextValue {
  const ctx = useContext(SkyContext);
  if (!ctx) throw new Error("useSky must be used within a SkyProvider");
  return ctx;
}

interface SkyProviderProps {
  children: ReactNode;
  tickIntervalSec?: number;
}

export default function SkyProvider({
  children,
  tickIntervalSec = 90,
}: SkyProviderProps) {
  const getSnapshot = (isInstant: boolean): SkyContextValue => ({
    ...getSkyGradientColors(new Date()),
    tickIntervalSec,
    isInstant,
  });

  const [sky, setSky] = useState<SkyContextValue>(() => getSnapshot(true));

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function scheduleNextTick() {
      const now = Date.now();
      const intervalMs = tickIntervalSec * 1000;
      const nextBoundaryMs = Math.ceil((now + 100) / intervalMs) * intervalMs;
      const delayMs = Math.max(100, nextBoundaryMs - now);

      timerId = setTimeout(() => {
        if (document.hidden) return;
        setSky(getSnapshot(false));
        scheduleNextTick();
      }, delayMs);
    }

    scheduleNextTick();

    const onVisibilityChange = () => {
      clearTimeout(timerId);

      // When refocusing the tab, instantly sync to the current clock time
      if (!document.hidden) {
        setSky(getSnapshot(true));
        scheduleNextTick();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [tickIntervalSec]);

  return <SkyContext.Provider value={sky}>{children}</SkyContext.Provider>;
}
