"use client";

import { useEffect, useRef } from "react";

// Fixed weaving "circuit board": faint base traces, ambient traveling-light
// pulses, a scroll-progress pulse, and a light NODE that rides the traces
// toward the cursor (glides along the wires, not a halo). rAF-throttled;
// reduced-motion => static lit board, no tracking.
const TRACES = [
  "M-20 140 H260 V60 H520 V220 H820 V120 H1120 V300 H1460",
  "M-20 380 H180 V300 H440 V460 H700 V360 H980 V520 H1460",
  "M-20 640 H320 V560 H600 V700 H900 V600 H1200 V760 H1460",
  "M120 -20 V120 H360 V340 H300 V620 H520 V920",
  "M760 -20 V160 H700 V420 H860 V680 H820 V920",
  "M1180 -20 V200 H1100 V440 H1240 V700 H1180 V920",
];
const NODES: Array<[number, number]> = [
  [260, 140],
  [520, 220],
  [820, 120],
  [440, 460],
  [700, 360],
  [600, 700],
  [900, 600],
  [360, 340],
  [700, 420],
  [1100, 440],
];

const TRAIL = 8;

export function LivingCircuit() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const trailRefs = useRef<SVGCircleElement[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const node = nodeRef.current;
    if (!svg || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Sample points along the base traces once.
    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>(".board-trace-base"),
    );
    const pts: Array<{ x: number; y: number }> = [];
    for (const p of paths) {
      const len = p.getTotalLength();
      for (let d = 0; d <= len; d += 20) {
        const pt = p.getPointAtLength(d);
        pts.push({ x: pt.x, y: pt.y });
      }
    }

    // tx/ty = the cursor (a free "ghost" we chase slowly); the rendered node is
    // the ghost PROJECTED onto the nearest wire — so it never leaves the rails,
    // and a low lerp makes it feel pulled, not magnetized.
    let tx = 720;
    let ty = 450;
    let vx = 720;
    let vy = 450;
    let raf = 0;
    const hist: Array<{ x: number; y: number }> = [];

    const toSvg = (cx: number, cy: number) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: cx, y: cy };
      const inv = ctm.inverse();
      return {
        x: cx * inv.a + cy * inv.c + inv.e,
        y: cx * inv.b + cy * inv.d + inv.f,
      };
    };

    const onMove = (e: PointerEvent) => {
      const s = toSvg(e.clientX, e.clientY);
      tx = s.x;
      ty = s.y;
    };

    const loop = () => {
      vx += (tx - vx) * 0.05;
      vy += (ty - vy) * 0.05;
      // project the slow ghost onto the nearest wire sample
      let bx = vx;
      let by = vy;
      let bd = Infinity;
      for (const pt of pts) {
        const dx = pt.x - vx;
        const dy = pt.y - vy;
        const dd = dx * dx + dy * dy;
        if (dd < bd) {
          bd = dd;
          bx = pt.x;
          by = pt.y;
        }
      }
      hist.unshift({ x: bx, y: by });
      if (hist.length > TRAIL + 1) hist.pop();
      node.setAttribute("cx", String(bx));
      node.setAttribute("cy", String(by));
      trailRefs.current.forEach((c, i) => {
        const h = hist[i + 1];
        if (h) {
          c.setAttribute("cx", String(h.x));
          c.setAttribute("cy", String(h.y));
        }
      });
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pr = max > 0 ? window.scrollY / max : 0;
      if (dotRef.current) dotRef.current.style.top = `${pr * 100}%`;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="living-board" aria-hidden="true">
      <svg ref={svgRef} className="living-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {TRACES.map((d, i) => (
          <path key={`base-${i}`} d={d} className="board-trace-base" />
        ))}
        {TRACES.map((d, i) => (
          <path
            key={`pulse-${i}`}
            d={d}
            className={i % 2 ? "board-pulse-cool" : "board-pulse-warm"}
            style={{ animationDelay: `${i * -1.3}s` }}
          />
        ))}
        {NODES.map(([cx, cy], i) => (
          <circle
            key={`node-${i}`}
            cx={cx}
            cy={cy}
            r={3}
            className={i % 2 ? "board-node board-node-cool" : "board-node"}
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
        {Array.from({ length: TRAIL }).map((_, i) => (
          <circle
            key={`trail-${i}`}
            ref={(el) => {
              if (el) trailRefs.current[i] = el;
            }}
            r={4 - i * 0.4}
            className="board-cursor-trail"
            style={{ opacity: 0.4 * (1 - i / TRAIL) }}
          />
        ))}
        <circle ref={nodeRef} cx={720} cy={450} r={5} className="board-cursor-node" />
      </svg>
      <div className="living-progress">
        <div ref={dotRef} className="living-progress-dot" />
      </div>
    </div>
  );
}
