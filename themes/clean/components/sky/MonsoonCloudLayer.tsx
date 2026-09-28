import { useEffect, useRef } from "react";
import { useSky } from "../../SkyProvider";

interface CloudColors {
  dark: string;
  mid: string;
  light: string;
}

function getCloudColors(): CloudColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    dark: styles.getPropertyValue("--monsoon-cloud-dark").trim() || "#0c1820",
    mid: styles.getPropertyValue("--monsoon-cloud-mid").trim() || "#14222c",
    light: styles.getPropertyValue("--monsoon-cloud-light").trim() || "#1c2e3a",
  };
}

/**
 * Draws a solid cloud ceiling from the top (y=0) down to an organically undulating bottom edge.
 */
function drawCloudBand(
  ctx: CanvasRenderingContext2D,
  width: number,
  baseY: number,
  amplitude: number,
  phase: number,
  color: string,
) {
  // Scale wave segments dynamically with screen width (~320px per billow)
  const segments = Math.max(4, Math.round(width / 320));
  const step = width / segments;

  // Seamless right-edge connection point
  const rightY = baseY + Math.sin(phase + segments * 1.6) * amplitude;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, rightY);

  for (let i = segments; i > 0; i--) {
    const xEnd = (i - 1) * step;
    const cpX = (i - 0.5) * step;
    const cpY = baseY + Math.sin(phase + i * 1.6) * amplitude;
    const yEnd = baseY + Math.sin(phase + (i - 1) * 1.6) * amplitude;
    ctx.quadraticCurveTo(cpX, cpY, xEnd, yEnd);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export default function MonsoonCloudLayer() {
  const { segment } = useSky();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isHiddenByScrollRef = useRef(false);
  const colorsRef = useRef<CloudColors>({
    dark: "#0c1820",
    mid: "#14222c",
    light: "#1c2e3a",
  });

  useEffect(() => {
    colorsRef.current = getCloudColors();
  }, [segment]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.45)),
      );
      const opacity = 1 - progress;
      isHiddenByScrollRef.current = opacity <= 0;
      containerRef.current.style.opacity = String(opacity);
      containerRef.current.style.visibility =
        opacity <= 0 ? "hidden" : "visible";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || window.innerWidth;
      height =
        canvas.clientHeight ||
        Math.min(130, Math.max(95, window.innerHeight * 0.11));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (time: number) => {
      // Skip rendering if scrolled past viewport or unmeasured
      if (!isHiddenByScrollRef.current && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        const { dark, mid, light } = colorsRef.current;
        // ~90-120s per full wave oscillation
        const phase = time * 0.00007;

        drawCloudBand(ctx, width, height * 0.58, 6, phase, dark);
        drawCloudBand(ctx, width, height * 0.72, 8, phase + 2.1, mid);
        drawCloudBand(ctx, width, height * 0.86, 7, phase + 4.2, light);
      }

      animId = requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(animId);
      if (!document.hidden) {
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
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-0 pointer-events-none overflow-hidden z-3 select-none"
      aria-hidden="true"
      style={{
        height: "clamp(95px, 11vh, 130px)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
