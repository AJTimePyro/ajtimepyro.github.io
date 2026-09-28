import { useEffect, useRef } from "react";
import { useSky } from "../../SkyProvider";

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
}

interface RainTier {
  lineWidth: number;
  alpha: number;
  drops: Drop[];
}

const WIND_SLANT = 0.16; // ~9-degree natural wind slant

function getRainColor(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--monsoon-rain-color")
      .trim() || "rgba(190, 215, 238, 0.6)"
  );
}

function createTiers(w: number, h: number): RainTier[] {
  const total = Math.max(120, Math.min(260, Math.round(w / 6.5)));
  const configs = [
    {
      count: Math.round(total * 0.35),
      lineWidth: 0.85,
      alpha: 0.28,
      len: [14, 26],
      speed: [15, 21],
    },
    {
      count: Math.round(total * 0.45),
      lineWidth: 1.2,
      alpha: 0.5,
      len: [24, 42],
      speed: [22, 30],
    },
    {
      count: Math.round(total * 0.2),
      lineWidth: 1.8,
      alpha: 0.8,
      len: [42, 68],
      speed: [30, 42],
    },
  ];

  return configs.map(({ count, lineWidth, alpha, len, speed }) => ({
    lineWidth,
    alpha,
    drops: Array.from({ length: count }, () => ({
      x: Math.random() * (w + 300) - 200,
      y: Math.random() * (h + 150) - 100,
      length: len[0] + Math.random() * (len[1] - len[0]),
      speed: speed[0] + Math.random() * (speed[1] - speed[0]),
    })),
  }));
}

export default function RainEffect() {
  const { segment } = useSky();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rainColorRef = useRef<string>("rgba(190, 215, 238, 0.6)");

  useEffect(() => {
    rainColorRef.current = getRainColor();
  }, [segment]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastTime = 0;
    const tiers = createTiers(width, height);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (time: number) => {
      if (!lastTime) lastTime = time;
      // Normalized delta time (1.0 at 60 FPS, 0.5 at 120 FPS), clamped against tab-switch spikes
      const dt = Math.min(Math.max((time - lastTime) / 16.67, 0.2), 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = rainColorRef.current;
      ctx.lineCap = "round";

      for (const tier of tiers) {
        ctx.beginPath();
        ctx.lineWidth = tier.lineWidth;
        ctx.globalAlpha = tier.alpha;

        for (const d of tier.drops) {
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.length * WIND_SLANT, d.y + d.length);

          d.x += d.speed * WIND_SLANT * dt;
          d.y += d.speed * dt;

          if (d.y > height + d.length) {
            // Random offset prevents horizontal wave clustering on re-entry
            d.y = -d.length - Math.random() * 40;
            d.x = Math.random() * (width + 300) - 200;
          }
        }

        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(animId);
      if (!document.hidden) {
        lastTime = 0;
        animId = requestAnimationFrame(render);
      }
    };

    resize();
    animId = requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-2 select-none"
      aria-hidden="true"
    />
  );
}
