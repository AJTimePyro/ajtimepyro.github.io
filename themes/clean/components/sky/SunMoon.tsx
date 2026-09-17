"use client";

import { useEffect, useState } from "react";
import { useSky } from "../../SkyProvider";
import { getMoonPhase } from "../../utils/lunarPhase";

function getSunCoordinates(progress: number, dayFraction: number) {
  const safeFraction = dayFraction > 0 ? dayFraction : 0.5;
  const t = Math.min(Math.max(progress / safeFraction, 0), 1);
  const arc = -4 * (t - 0.5) ** 2 + 1;
  return {
    x: 20 + t * 60,
    y: 85 - arc * 70,
  };
}

function getMoonCoordinates(progress: number, dayFraction: number) {
  const nightFraction = 1 - dayFraction;
  const safeFraction = nightFraction > 0 ? nightFraction : 0.5;
  const rawT = (progress - dayFraction + 1) % 1;
  const t = Math.min(Math.max(rawT / safeFraction, 0), 1);
  const arc = -4 * (t - 0.5) ** 2 + 1;
  return {
    x: 25 + t * 50,
    y: 80 - arc * 50,
  };
}

export default function SunMoon() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { progress, segment, dayFraction, tickIntervalSec, isInstant } =
    useSky();

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-3"
        aria-hidden="true"
      />
    );
  }

  const sun = getSunCoordinates(progress, dayFraction);
  const moon = getMoonCoordinates(progress, dayFraction);
  const isGoldenHour = segment === "sunrise" || segment === "sunset";
  const moveDuration = isInstant ? 0 : tickIntervalSec;
  const moveTransition = `left ${moveDuration}s linear, top ${moveDuration}s linear, opacity 2s ease`;

  const { Icon: MoonIcon, name: moonName, illumination } = getMoonPhase();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-3"
      aria-hidden="true"
    >
      {/* ── Sun ── */}
      <div
        className="transition-opacity duration-[2s]"
        style={{ opacity: "var(--sun-opacity, 0)" }}
      >
        {/* Outer corona */}
        <div
          className="absolute rounded-full blur-[45px]"
          style={{
            left: `${sun.x}%`,
            top: `${sun.y}%`,
            width: "clamp(160px, 24vw, 320px)",
            height: "clamp(160px, 24vw, 320px)",
            transform: "translate(-50%, -50%)",
            background: isGoldenHour
              ? "radial-gradient(circle, rgba(255, 172, 77, 0.45) 0%, rgba(255, 102, 26, 0.2) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(255, 223, 128, 0.35) 0%, rgba(246, 187, 85, 0.15) 50%, transparent 75%)",
            transition: moveTransition,
          }}
        />

        {/* Sun disc */}
        <div
          className="absolute rounded-full blur-[20px]"
          style={{
            left: `${sun.x}%`,
            top: `${sun.y}%`,
            width: "clamp(64px, 8vw, 110px)",
            height: "clamp(64px, 8vw, 110px)",
            transform: "translate(-50%, -50%)",
            background: isGoldenHour
              ? "radial-gradient(circle, rgb(255, 231, 173) 10%, rgb(255, 179, 92) 60%, rgb(255, 102, 26) 100%)"
              : "radial-gradient(circle, rgb(255, 250, 224) 15%, rgb(253, 231, 165) 60%, rgb(247, 197, 110) 100%)",
            transition: moveTransition,
          }}
        />
      </div>

      {/* ── Moon ── */}
      <div
        className="transition-opacity duration-[2s]"
        style={{ opacity: "var(--moon-opacity, 0)" }}
      >
        {/* Lunar halo */}
        <div
          className="absolute rounded-full blur-[25px]"
          style={{
            left: `${moon.x}%`,
            top: `${moon.y}%`,
            width: "clamp(80px, 12vw, 150px)",
            height: "clamp(80px, 12vw, 150px)",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(194, 213, 240, 0.25) 0%, rgba(159, 181, 223, 0.1) 50%, transparent 70%)",
            opacity: Math.max(0.15, illumination),
            transition: moveTransition,
          }}
        />

        {/* Lunar phase icon */}
        <MoonIcon
          className="absolute text-[rgb(218,222,231)] pointer-events-none"
          style={{
            left: `${moon.x}%`,
            top: `${moon.y}%`,
            width: "clamp(30px, 4.2vw, 50px)",
            height: "clamp(30px, 4.2vw, 50px)",
            transform: "translate(-50%, -50%)",
            filter: `drop-shadow(0 0 ${Math.round(3 + illumination * 7)}px rgba(194, 213, 240, ${(0.25 + illumination * 0.45).toFixed(2)}))`,
            transition: moveTransition,
          }}
          aria-label={`Moon: ${moonName} (${Math.round(illumination * 100)}% illuminated)`}
        />
      </div>
    </div>
  );
}
