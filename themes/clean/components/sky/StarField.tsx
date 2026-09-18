"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useSky } from "../../SkyProvider";
import { getNightSeed, mulberry32 } from "../../utils/skySeed";

interface StarStyle extends CSSProperties {
  "--star-min-op": number;
  "--star-base-op": number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  baseOpacity: number;
  minOpacity: number;
  duration: number;
  delay: number;
  glow?: number;
}

const STAR_COLORS = [
  "#ffffff",
  "#ffffff",
  "#e8eeff",
  "#e8eeff",
  "#fff4e0",
  "#f1f5f9",
];

function generateStars(seed: number, count = 85): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const x = Number((rand() * 99 + 0.5).toFixed(2));
    const y = Number((rand() * 83 + 1).toFixed(2));

    const tier = rand();
    let size: number;
    let glow: number | undefined;
    let baseOpacity: number;

    if (tier < 0.7) {
      size = Number((1.0 + rand() * 0.4).toFixed(2));
      baseOpacity = Number((0.4 + rand() * 0.35).toFixed(2));
    } else if (tier < 0.95) {
      size = Number((1.6 + rand() * 0.6).toFixed(2));
      baseOpacity = Number((0.72 + rand() * 0.22).toFixed(2));
      if (rand() > 0.45) glow = 2.5;
    } else {
      size = Number((2.6 + rand() * 0.8).toFixed(2));
      baseOpacity = Number((0.92 + rand() * 0.08).toFixed(2));
      glow = Number((4.5 + rand() * 3).toFixed(1));
    }

    const color = STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)];
    const minOpacity = Number((baseOpacity * (0.6 + rand() * 0.2)).toFixed(2));
    const duration = Number((2.5 + rand() * 4).toFixed(2));
    const delay = Number((rand() * 6.5).toFixed(2));

    stars.push({
      id: i,
      x,
      y,
      size,
      color,
      baseOpacity,
      minOpacity,
      duration,
      delay,
      glow,
    });
  }

  return stars;
}

export default function StarField() {
  const { currentDate } = useSky();
  const [stars, setStars] = useState<Star[]>([]);
  const nightSeed = getNightSeed(currentDate);

  useEffect(() => {
    setStars(generateStars(nightSeed));
  }, [nightSeed]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-1 transition-opacity duration-[3s] ease-in-out"
      aria-hidden="true"
      style={{ opacity: "var(--star-opacity, 0)" }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.glow
                ? `0 0 ${star.glow}px ${star.color}, 0 0 ${star.glow * 1.8}px ${star.color}`
                : "none",
              animation: `star-shimmer ${star.duration}s ease-in-out ${star.delay}s infinite`,
              "--star-min-op": star.minOpacity,
              "--star-base-op": star.baseOpacity,
            } as StarStyle
          }
        />
      ))}
    </div>
  );
}
