"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Guided journey. The firefly births to the first node, then TRAVELS along a
// vertical thread to whichever node you scroll toward — powering it on arrival
// (a real event, not a scroll-fade) and dimming the ones the energy has left.
// Reduced-motion => all nodes shown, no animation.
export function LightJourney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stations = useRef<HTMLDivElement[]>([]);
  const setStation = (i: number) => (el: HTMLDivElement | null) => {
    if (el) stations.current[i] = el;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stations.current.forEach((s) => s.classList.add("lit"));
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let start = 0;
    const landAt = 8.5;
    let fx = -1;
    let fy = -1;
    const trail: Array<{ x: number; y: number }> = [];
    const lit: boolean[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const centerOf = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2;
    };

    const draw = (t: number) => {
      if (!start) start = t;
      const e = (t - start) / 1000;
      const cx = w / 2;
      const cyV = h / 2;
      if (fx < 0) {
        fx = cx;
        fy = cyV;
      }
      ctx.clearRect(0, 0, w, h);

      const env = e > 1.2 ? Math.min(1, (e - 1.2) / 2.3) : 0;
      const intro = e < landAt;

      if (intro) {
        // firefly birth — wanders, converges to the first node (centered)
        if (e > 1.2) {
          const p = (e - 1.2) / (landAt - 1.2);
          const pe = 1 - Math.pow(1 - p, 3);
          const ampX = w * 0.44 * (1 - pe * 0.15);
          const ampY = h * 0.18 * (1 - pe * 0.3);
          const wob = 1 - pe;
          fx = cx + Math.cos(pe * Math.PI * 1.5) * ampX + Math.sin(e * 2.1) * w * 0.03 * wob;
          fy = cyV + Math.sin(pe * Math.PI * 2) * ampY + Math.cos(e * 1.7) * h * 0.02 * wob;
        }
      } else {
        // travel to the node nearest the viewport center
        let best = 0;
        let bd = Infinity;
        stations.current.forEach((s, i) => {
          const d = Math.abs(centerOf(s) - cyV);
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        const targetY = centerOf(stations.current[best]);
        fx += (cx - fx) * 0.08;
        fy += (targetY - fy) * 0.07;

        // power-up on arrival; dim the others
        stations.current.forEach((s, i) => {
          if (i === best) {
            s.classList.remove("dim");
            if (Math.abs(fy - centerOf(s)) < 90) {
              s.classList.add("lit");
              lit[i] = true;
            }
          } else if (lit[i]) {
            s.classList.add("dim");
          }
        });
      }

      // vertical thread the firefly rides
      if (e > landAt - 0.4) {
        const a = Math.min(1, (e - (landAt - 0.4)) / 1.4);
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(59,130,246,${0.08 * a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, h);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      }

      // trail (energy streak behind the moving firefly)
      trail.unshift({ x: fx, y: fy });
      if (trail.length > 14) trail.pop();
      ctx.globalCompositeOperation = "lighter";
      trail.forEach((pt, i) => {
        const a = (1 - i / trail.length) * 0.35 * env;
        ctx.fillStyle = `rgba(96,165,250,${a})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (1 - i / trail.length) * 3 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // the firefly
      const flick = intro
        ? 0.5 + 0.5 * Math.abs(Math.sin(e * 4.5))
        : 0.85 + 0.15 * Math.sin(e * 2);
      const I = env * flick;
      if (I > 0.01) {
        const R = 42;
        const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, R);
        g.addColorStop(0, `rgba(96,165,250,${0.85 * I})`);
        g.addColorStop(0.25, `rgba(59,130,246,${0.4 * I})`);
        g.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(fx, fy, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(219,234,254,${I})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // ripple as it first lands on node 1
      if (e > landAt && e < landAt + 1.6) {
        const rp = e - landAt;
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(96,165,250,${(1 - rp / 1.6) * 0.38})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cyV, rp * 210, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      {/* opaque black canvas — covers chrome, firefly drawn on top */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 h-full w-full"
        style={{ background: "#000000" }}
        aria-hidden="true"
      />

      <div className="relative z-[55]">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div ref={setStation(0)} className="j-station flex flex-col items-center gap-5">
            <div className="j-wordmark">
              <Image
                src="/brand/bezacore-wordmark.png"
                alt="BezaCore Labs"
                width={300}
                height={75}
                priority
              />
            </div>
            <p className="text-lg text-paper/70">Software for the work that matters.</p>
          </div>
        </section>

        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div ref={setStation(1)} className="j-station flex max-w-2xl flex-col items-center gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fire">
              Currently building
            </p>
            <h2 className="j-head text-5xl font-semibold tracking-tight sm:text-6xl">
              Intelligrace
            </h2>
            <p className="text-lg leading-relaxed text-paper/70">
              A modular operations platform for small churches and Christian
              nonprofits, built one module at a time.
            </p>
          </div>
        </section>
      </div>

      <Link
        href="/"
        className="fixed bottom-5 left-5 z-[60] text-xs text-paper/40 underline-offset-4 hover:text-paper/80 hover:underline"
      >
        ← home
      </Link>
    </div>
  );
}
