"use client";

import { useEffect, useRef } from "react";

// Generative "flow-field" atmosphere (v3 signature — the restrained slice of the
// living-light vision). Warm + cool particles drift along a smooth pseudo-field
// behind the hero + CTA, leaving faint glowing trails. Canvas (not SVG) per the
// design guidance for generative graphics. Cheap + capped, paused when
// off-screen, and reduced-motion users get a single static frame — never a
// blank canvas, never motion they didn't opt into.
export function FlowField({
  count = 80,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const warm: [number, number, number] = [245, 158, 11]; // gold
    const cool: [number, number, number] = [59, 130, 246]; // azure
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let ps: { x: number; y: number; sp: number; warm: boolean; life: number }[] = [];
    let raf = 0;
    let running = false;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const seed = () => {
      ps = [];
      for (let i = 0; i < count; i++) {
        ps.push({
          x: Math.random() * W,
          y: Math.random() * H,
          sp: 0.2 + Math.random() * 0.5,
          warm: Math.random() < 0.4,
          life: Math.random(),
        });
      }
    };
    const angle = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0016 + t) * 1.4 + Math.cos(y * 0.0018 - t * 0.7) * 1.4;

    const frame = (ts: number) => {
      const t = ts * 0.00015;
      ctx.fillStyle = "rgba(5,6,9,0.16)"; // fade to trail
      ctx.fillRect(0, 0, W, H);
      for (const p of ps) {
        const a = angle(p.x, p.y, t);
        p.x += Math.cos(a) * p.sp * 1.5;
        p.y += Math.sin(a) * p.sp * 1.5;
        p.life -= 0.004;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H || p.life <= 0) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.life = 1;
        }
        const c = p.warm ? warm : cool;
        const al = 0.5 * Math.min(1, p.life * 1.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.warm ? 1.4 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${al})`;
        ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
        ctx.shadowBlur = p.warm ? 8 : 6;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    };
    const still = () => {
      ctx.fillStyle = "#050609";
      ctx.fillRect(0, 0, W, H);
      for (const p of ps) {
        const c = p.warm ? warm : cool;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.5)`;
        ctx.fill();
      }
    };

    size();
    seed();
    if (reduce) {
      still();
      return;
    }

    const onResize = () => {
      size();
      seed();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(frame);
          } else if (!e.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    return () => {
      window.removeEventListener("resize", onResize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className={`bz-field ${className}`} />;
}
