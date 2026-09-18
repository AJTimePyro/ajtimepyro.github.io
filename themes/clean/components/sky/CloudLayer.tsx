"use client";

import { useEffect, useRef, useState } from "react";
import { useSky } from "../../SkyProvider";
import { getDaySeed, getSecondsIntoDay, mulberry32 } from "../../utils/skySeed";
import type { Season } from "@/types/sky";

interface Puff {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  animName: string;
  flipped: boolean;
  puffs: Puff[];
}

// Horizontal viewport width (px) per cloud for each season (lower = denser sky)
const SEASON_CLOUD_INTERVAL: Record<Season, number> = {
  winter: 700,
  summer: 700,
  spring: 480,
  autumn: 480,
  monsoon: 320,
};

const PUFF_BLUEPRINT: Puff[] = [
  { x: 4, y: 2, w: 54, h: 46, opacity: 0.84 },
  { x: 38, y: 4, w: 56, h: 44, opacity: 0.82 },
  { x: 24, y: 18, w: 46, h: 74, opacity: 1.0 },
  { x: 10, y: 12, w: 34, h: 56, opacity: 0.88 },
  { x: 56, y: 10, w: 34, h: 52, opacity: 0.78 },
];

function generatePuffs(rand: () => number): Puff[] {
  return PUFF_BLUEPRINT.map((p) => ({
    x: Math.round(p.x + (rand() * 4 - 2)),
    y: Math.round(p.y + (rand() * 4 - 2)),
    w: Math.round(p.w + (rand() * 6 - 3)),
    h: Math.round(p.h + (rand() * 6 - 3)),
    opacity: p.opacity,
  }));
}

function getCloudCount(
  season: Season,
  width: number,
  override?: number,
): number {
  if (override !== undefined) return override;
  return Math.max(1, Math.round(width / SEASON_CLOUD_INTERVAL[season]));
}

function generateClouds(
  seed: number,
  count: number,
  seconds: number,
  screenWidth: number,
): Cloud[] {
  const rand = mulberry32(seed);
  const clouds: Cloud[] = [];
  const safeCount = Math.max(1, count);
  const slotWidth = 78 / safeCount;
  const sizeScale = Math.max(0.68, Math.min(1.22, screenWidth / 1280));

  for (let i = 0; i < count; i++) {
    const tier = i % 3;
    let top: number;
    let baseWidth: number;
    let blur: number;
    let opacity: number;
    let duration: number;

    if (tier === 0) {
      top = Math.round(16 + rand() * 5);
      baseWidth = 230 + rand() * 30;
      blur = 4.5;
      opacity = 1.05;
      duration = 260;
    } else if (tier === 1) {
      top = Math.round(2 + rand() * 4);
      baseWidth = 160 + rand() * 25;
      blur = 6.5;
      opacity = 0.75;
      duration = 340;
    } else {
      top = Math.round(9 + rand() * 5);
      baseWidth = 195 + rand() * 30;
      blur = 5.5;
      opacity = 0.9;
      duration = 300;
    }

    const width = Math.round(baseWidth * sizeScale);
    const height = Math.round(width * 0.31);
    const left = Math.round(4 + i * slotWidth + rand() * (slotWidth * 0.4));
    const phase = Math.floor(rand() * duration);
    const elapsed = (seconds + phase) % duration;

    clouds.push({
      id: i,
      x: left,
      y: top,
      width,
      height,
      blur,
      opacity,
      duration,
      delay: -Number(elapsed.toFixed(1)),
      animName: `cloud-drift-${(i % 5) + 1}`,
      flipped: rand() > 0.5,
      puffs: generatePuffs(rand),
    });
  }

  return clouds;
}

export default function CloudLayer({ count }: { count?: number }) {
  const { season, currentDate } = useSky();
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const daySeed = getDaySeed(currentDate);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.45)),
      );
      const opacity = 1 - progress;
      containerRef.current.style.opacity = String(opacity);
      containerRef.current.style.visibility =
        opacity <= 0 ? "hidden" : "visible";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const sec = getSecondsIntoDay(currentDate);
    const cloudCount = getCloudCount(season, w, count);
    setClouds(generateClouds(daySeed, cloudCount, sec, w));
  }, [season, count, daySeed]);

  if (clouds.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-2"
      aria-hidden="true"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 50%, transparent 80%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 50%, transparent 80%)",
      }}
    >
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute transition-opacity duration-[2s]"
          style={{
            top: `${cloud.y}%`,
            left: `${cloud.x}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            filter: `blur(${cloud.blur}px)`,
            opacity: `calc(max(0.28, var(--cloud-season-opacity, 0.2) * var(--cloud-night-mult, 1) * 2.2) * ${cloud.opacity})`,
            animation: `${cloud.animName} ${cloud.duration}s ease-in-out ${cloud.delay}s infinite`,
            transform: cloud.flipped ? "scaleX(-1)" : undefined,
          }}
        >
          {cloud.puffs.map((puff, j) => (
            <div
              key={j}
              className="absolute rounded-full"
              style={{
                left: `${puff.x}%`,
                bottom: `${puff.y}%`,
                width: `${puff.w}%`,
                height: `${puff.h}%`,
                backgroundColor: "var(--cloud-color)",
                opacity: puff.opacity,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
