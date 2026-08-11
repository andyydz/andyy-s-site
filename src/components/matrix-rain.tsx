import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

const GLYPHS = "01{}[]<>/\\|+=*0x1010".split("");

type Props = {
  className?: string;
  /** 0..1 */
  opacity?: number;
  /** ms over which columns fade in */
  rampMs?: number;
  speed?: number;
  color?: string;
};

export function MatrixRain({
  className,
  opacity = 0.06,
  rampMs = 1500,
  speed = 1,
  color = "#33ff66",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cols = 0;
    let drops: number[] = [];
    let active: number[] = [];
    const fontSize = 14;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.parentElement?.getBoundingClientRect() ?? {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      active = Array.from({ length: cols }, () => Math.random());
    };

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50 / speed) return;
      last = t;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.fillStyle = "rgba(7,9,7,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      const progress = Math.min(1, (t - start) / rampMs);
      for (let i = 0; i < cols; i++) {
        if (active[i] > progress) continue;
        ctx.fillStyle = color;
        ctx.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          i * fontSize,
          drops[i] * fontSize,
        );
        drops[i] += 1;
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, rampMs, speed, color]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity, position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
