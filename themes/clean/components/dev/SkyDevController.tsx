"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  X,
  Calendar,
  Clock,
  Sun,
  Moon,
  FastForward,
  Sparkles,
} from "lucide-react";
import { useSky } from "../../SkyProvider";
import type { Season, TimeSegment } from "@/types/sky";
import {
  seasonToDate,
  segmentToDate,
  formatDateForInput,
  formatDisplayTime,
} from "../../utils/skyDevHelpers";
import { getMoonPhase } from "../../utils/lunarPhase";
import { getSunTimes } from "../../utils/sunTimes";

const SEASONS: { id: Season; label: string; icon: string }[] = [
  { id: "winter", label: "Winter", icon: "❄️" },
  { id: "spring", label: "Spring", icon: "🌸" },
  { id: "summer", label: "Summer", icon: "☀️" },
  { id: "monsoon", label: "Monsoon", icon: "🌧️" },
  { id: "autumn", label: "Autumn", icon: "🍂" },
];

const SEGMENTS: { id: TimeSegment; label: string; color: string }[] = [
  { id: "predawn", label: "Predawn", color: "#2d3748" },
  { id: "sunrise", label: "Sunrise", color: "#f6ad55" },
  { id: "morning", label: "Morning", color: "#90cdf4" },
  { id: "noon", label: "Noon", color: "#63b3ed" },
  { id: "afternoon", label: "Afternoon", color: "#cbd5e0" },
  { id: "sunset", label: "Sunset", color: "#ed8936" },
  { id: "dusk", label: "Dusk", color: "#805ad5" },
  { id: "night", label: "Night", color: "#1a202c" },
];

const SPEEDS = [
  { value: 1, label: "1x", desc: "Real speed" },
  { value: 10, label: "10x", desc: "10 sec/sec" },
  { value: 60, label: "60x", desc: "1 min/sec" },
  { value: 300, label: "300x", desc: "5 min/sec" },
  { value: 1200, label: "1200x", desc: "20 min/sec" },
];

export default function SkyDevController() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(60);

  const {
    currentDate,
    season,
    segment,
    isSimulated,
    progress,
    setTimeOverride,
    resetToRealTime,
  } = useSky();

  const { sunrise, sunset } = getSunTimes(currentDate);
  const moonPhase = getMoonPhase(currentDate);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "d"
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const deltaMs = Math.min(now - lastTime, 200);
      lastTime = now;

      setTimeOverride((prev) => new Date(prev.getTime() + deltaMs * speed));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speed, setTimeOverride]);

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  const handleSliderChange = (minutes: number) => {
    setTimeOverride((prev) => {
      const next = new Date(prev);
      next.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
      return next;
    });
  };

  const handleDateChange = (dateStr: string) => {
    if (!dateStr) return;
    const [y, m, d] = dateStr.split("-").map(Number);
    setTimeOverride((prev) => {
      const next = new Date(prev);
      next.setFullYear(y, m - 1, d);
      return next;
    });
  };

  const handleStepDays = (delta: number) => {
    setTimeOverride((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + delta);
      return next;
    });
  };

  const handleSetToday = () => {
    const now = new Date();
    setTimeOverride((prev) => {
      const next = new Date(prev);
      next.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      return next;
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    resetToRealTime();
  };

  const formatSolarTime = (h: number) => {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900/95 border border-white/10 text-neutral-400 hover:text-white text-xs backdrop-blur-md transition-all shadow-lg select-none opacity-40 hover:opacity-100"
        title="Sky Time Traveler (Ctrl+Shift+D)"
        aria-label="Toggle Sky Dev Controller"
      >
        <Sparkles className="size-3 text-amber-400" />
        <span className="font-mono text-[10px]">
          {isOpen ? "Close Controller" : "Sky Ctrl"}
        </span>
      </button>

      {isOpen && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Sky Time Controller"
          className="fixed bottom-12 right-3 sm:right-6 z-9999 w-[calc(100vw-1.5rem)] sm:w-120 max-h-[85vh] overflow-y-auto rounded-2xl bg-neutral-950/95 border border-white/15 shadow-2xl backdrop-blur-2xl text-neutral-100 p-5 font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className={`size-2.5 rounded-full ${
                  isSimulated
                    ? "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                }`}
              />
              <div>
                <h3 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span>Sky Time Controller</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 font-normal">
                    {isSimulated
                      ? isPlaying
                        ? `${speed}x PLAYING`
                        : "SIMULATED"
                      : "LIVE DEVICE"}
                  </span>
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono">
                  {formatDisplayTime(currentDate)} • {season.toUpperCase()} •{" "}
                  {segment.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded">
                Ctrl+Shift+D
              </kbd>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-medium">Sky Segment Presets</span>
              <span className="text-[10px] text-neutral-400">
                Solar midpoint
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {SEGMENTS.map((seg) => (
                <button
                  key={seg.id}
                  onClick={() =>
                    setTimeOverride(segmentToDate(seg.id, currentDate))
                  }
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium transition-all border ${
                    segment === seg.id
                      ? "bg-white/20 border-amber-400/80 text-white shadow-md scale-[1.02]"
                      : "bg-neutral-900/80 border-white/5 text-neutral-300 hover:bg-neutral-800 hover:border-white/20"
                  }`}
                >
                  <div
                    className="size-2 rounded-full mb-1"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-[11px] truncate w-full text-center">
                    {seg.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-medium">Season Presets</span>
              <span className="text-[10px] text-neutral-400">
                Calendar month
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {SEASONS.map((seas) => (
                <button
                  key={seas.id}
                  onClick={() =>
                    setTimeOverride(seasonToDate(seas.id, currentDate))
                  }
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-xs font-medium transition-all border ${
                    season === seas.id
                      ? "bg-white/20 border-cyan-400/80 text-white shadow-md scale-[1.02]"
                      : "bg-neutral-900/80 border-white/5 text-neutral-300 hover:bg-neutral-800 hover:border-white/20"
                  }`}
                >
                  <span className="text-sm mb-0.5">{seas.icon}</span>
                  <span className="text-[10px] truncate w-full text-center">
                    {seas.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 bg-neutral-900/70 border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-neutral-300 flex items-center gap-1.5">
                <Clock className="size-3.5 text-amber-400" />
                24-Hour Scrubber
              </span>
              <span className="font-mono text-xs text-amber-300 font-semibold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {String(Math.floor(currentMinutes / 60)).padStart(2, "0")}:
                {String(currentMinutes % 60).padStart(2, "0")}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={1439}
              step={1}
              value={currentMinutes}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1 mb-3">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 text-neutral-400 shrink-0" />
                <input
                  type="date"
                  value={formatDateForInput(currentDate)}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="bg-neutral-800/90 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono cursor-pointer hover:border-white/20 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStepDays(-1)}
                  title="Previous Day (-1d)"
                  className="px-2 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-mono transition-colors"
                >
                  -1d
                </button>
                <button
                  type="button"
                  onClick={handleSetToday}
                  title="Reset to today's date"
                  className="px-2 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-mono transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => handleStepDays(1)}
                  title="Next Day (+1d)"
                  className="px-2 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-mono transition-colors"
                >
                  +1d
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 bg-neutral-900/70 border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-neutral-300 flex items-center gap-1.5">
                <FastForward className="size-3.5 text-cyan-400" />
                Fast-Forward Engine
              </span>
              <span className="text-[10px] text-neutral-400">
                Live animation
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isPlaying
                    ? "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="size-3.5 fill-current" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 fill-current" /> Play Cycle
                  </>
                )}
              </button>

              <div className="flex items-center gap-1 flex-1">
                {SPEEDS.map((sp) => (
                  <button
                    key={sp.value}
                    onClick={() => setSpeed(sp.value)}
                    title={sp.desc}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      speed === sp.value
                        ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                        : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-[1fr_1.35fr_0.85fr] gap-2 text-[11px] bg-neutral-900/40 border border-white/5 rounded-xl p-2.5 text-neutral-400 font-mono">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <Sun className="size-3 text-amber-400 shrink-0" /> Sun
              </span>
              <span className="text-neutral-200 text-xs truncate">
                {formatSolarTime(sunrise)} — {formatSolarTime(sunset)}
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <Moon className="size-3 text-blue-300 shrink-0" /> Moon
              </span>
              <span className="text-neutral-200 text-xs truncate">
                {moonPhase.name} ({Math.round(moonPhase.illumination * 100)}%)
              </span>
            </div>

            <div className="flex flex-col min-w-0 text-right sm:text-left">
              <span className="text-[10px] text-neutral-400">Day Cycle</span>
              <span className="text-neutral-200 text-xs">
                {(progress * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors font-medium"
            >
              <RotateCcw className="size-3.5 text-emerald-400" />
              Sync Live Clock
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors font-medium"
            >
              <RefreshCw className="size-3.5 text-neutral-400" />
              Reload Page
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
