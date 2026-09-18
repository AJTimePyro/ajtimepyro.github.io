"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSkyGradientColors, type CurrentSkyState } from "./utils/skyColors";

export type TimeOverrideAction = Date | null | ((prev: Date) => Date | null);

export interface SkyContextValue extends CurrentSkyState {
  currentDate: Date;
  isSimulated: boolean;
  isInstant: boolean;
  tickIntervalSec: number;
  setTimeOverride: (update: TimeOverrideAction) => void;
  resetToRealTime: () => void;
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
  const [overrideDate, setOverrideDate] = useState<Date | null>(null);
  const [liveDate, setLiveDate] = useState<Date>(() => new Date());
  const [isInstant, setIsInstant] = useState(true);

  const currentDate = overrideDate ?? liveDate;
  const skyState = getSkyGradientColors(currentDate);

  useEffect(() => {
    const t = setTimeout(() => setIsInstant(false), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (overrideDate) return;

    const intervalMs = tickIntervalSec * 1000;
    const now = Date.now();
    const delay = Math.max(
      100,
      Math.ceil((now + 100) / intervalMs) * intervalMs - now,
    );

    const timer = setTimeout(() => setLiveDate(new Date()), delay);
    const onVisibility = () => {
      if (!document.hidden) setLiveDate(new Date());
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [overrideDate, liveDate, tickIntervalSec]);

  const setTimeOverride = useCallback((update: TimeOverrideAction) => {
    setIsInstant(true);
    setOverrideDate((prev) => {
      if (typeof update === "function") {
        return update(prev ?? new Date());
      }
      return update;
    });
  }, []);

  const resetToRealTime = useCallback(() => {
    setIsInstant(true);
    setOverrideDate(null);
    setLiveDate(new Date());
    setTimeout(() => setIsInstant(false), 150);
  }, []);

  const value: SkyContextValue = {
    ...skyState,
    currentDate,
    isSimulated: overrideDate !== null,
    isInstant,
    tickIntervalSec,
    setTimeOverride,
    resetToRealTime,
  };

  return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
}
