"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Minimal "guiding light" prototype — the soul. Pure black (covers chrome).
// Two birth modes to compare: "firefly" (wanders in, flickers, converges) and
// "drop" (hangs + swells at the top, then falls). On settling, a ripple powers
// up the wordmark, then the tagline. Reduced-motion => shown immediately.
type Mode = "firefly" | "drop";

export function GuidingLight({ mode = "firefly" }: { mode?: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0); // 0 dark · 1 wordmark · 2 tagline

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let start = 0;
    let phaseRef = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      if (!start) start = t;
      const e = (t - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      const settleX = w * 0.5;
      const settleY = h * 0.44;
      let x = settleX;
      let y = settleY;
      let env = 0;
      let flick = 1;
      let coreR = 2;
      let landAt: number;

      if (mode === "firefly") {
        landAt = 8.5;
        env = e > 1.2 ? Math.min(1, (e - 1.2) / 2.3) : 0;
        const settled = e > landAt;
        if (e > 1.2 && !settled) {
          // deliberate full-width sweep over the wander window:
          // right edge -> near left edge -> back to center, + gentle wobble.
          const p = (e - 1.2) / (landAt - 1.2); // 0..1
          // ease-out so the light DECELERATES into its landing instead of
          // snapping (velocity -> 0 as p -> 1)
          const pe = 1 - Math.pow(1 - p, 3);
          const ampX = w * 0.44 * (1 - pe * 0.15);
          const ampY = h * 0.18 * (1 - pe * 0.3);
          const wobble = 1 - pe; // calm the jitter as it settles
          x = settleX + Math.cos(pe * Math.PI * 1.5) * ampX + Math.sin(e * 2.1) * w * 0.03 * wobble;
          y = settleY + Math.sin(pe * Math.PI * 2) * ampY + Math.cos(e * 1.7) * h * 0.02 * wobble;
        }
        flick = settled
          ? 0.85 + 0.15 * Math.sin(e * 2)
          : 0.5 + 0.5 * Math.abs(Math.sin(e * 4.5));
      } else {
        landAt = 4.9;
        env = e > 1.2 ? Math.min(1, (e - 1.2) / 1.5) : 0;
        const topY = h * 0.16;
        if (e <= 4) {
          // hang off the "leaf" and swell
          y = topY + Math.sin(e * 1.5) * 6;
          coreR = 2 + Math.min(1, Math.max(0, (e - 1.2) / 2.6)) * 3.5;
        } else if (e < landAt) {
          // accelerate down (gravity)
          const p = (e - 4) / (landAt - 4);
          y = topY + (settleY - topY) * (p * p);
          coreR = 5.5 - 3 * p;
        } else {
          y = settleY;
          coreR = 2.5;
        }
        flick = 0.9 + 0.1 * Math.sin(e * 2);
      }

      const I = env * flick;
      if (I > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        const R = 42;
        const g = ctx.createRadialGradient(x, y, 0, x, y, R);
        g.addColorStop(0, `rgba(96,165,250,${0.85 * I})`);
        g.addColorStop(0.25, `rgba(59,130,246,${0.4 * I})`);
        g.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(219,234,254,${I})`;
        ctx.beginPath();
        ctx.arc(x, y, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      // ripple on landing
      if (e > landAt) {
        const rp = e - landAt;
        if (rp < 1.6) {
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = `rgba(96,165,250,${(1 - rp / 1.6) * 0.38})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(settleX, settleY, rp * 210, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
      }

      // reveal cues, relative to landing, fired once
      let np = phaseRef;
      if (e > landAt + 1.4) np = 1;
      if (e > landAt + 3.2) np = 2;
      if (np !== phaseRef) {
        phaseRef = np;
        setPhase(np);
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
  }, [mode]);

  return (
    <div className="fixed inset-0 z-50" style={{ background: "#000000" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        {/* opacity driven directly by phase => guaranteed black until powered */}
        <div className="gl-reveal" style={{ opacity: phase >= 1 ? 1 : 0 }}>
          <Image
            src="/brand/bezacore-wordmark.png"
            alt="BezaCore Labs"
            width={300}
            height={75}
            priority
          />
        </div>
        <p
          className={`gl-tagline${phase >= 2 ? " gl-on" : ""}`}
          style={{ opacity: phase >= 2 ? 1 : 0 }}
        >
          Software for the work that matters.
        </p>
      </div>

      {/* controls + home fade in only after the sequence, keeping the intro black */}
      <div
        className="fixed right-5 top-5 z-[60] flex gap-3 text-xs transition-opacity duration-700"
        style={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        <Link href="/alive" className={mode === "firefly" ? "text-paper" : "text-paper/40 hover:text-paper/80"}>
          firefly
        </Link>
        <Link href="/alive?b=drop" className={mode === "drop" ? "text-paper" : "text-paper/40 hover:text-paper/80"}>
          water drop
        </Link>
      </div>
      <Link
        href="/"
        className="fixed left-5 top-5 z-[60] text-xs text-paper/40 underline-offset-4 transition-opacity duration-700 hover:text-paper/80 hover:underline"
        style={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        ← home
      </Link>
    </div>
  );
}
