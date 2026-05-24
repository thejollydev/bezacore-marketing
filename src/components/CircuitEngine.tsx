"use client";

import { useEffect, useRef } from "react";

// First cut of the BezaCore "living circuit" engine. A black canvas holds a
// circuit GRAPH (nodes + edges). On load it ignites at a drop point and power
// floods outward along the edges, lighting the board out of darkness. The
// cursor is an energy source: nearby edges charge + brighten, then discharge
// into a wake. Reduced-motion => fully lit, static.
type GNode = { x: number; y: number; active: boolean; glow: number };
type GEdge = { a: number; b: number; fill: number; charge: number; warm: boolean };

export function CircuitEngine() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: GNode[] = [];
    let edges: GEdge[] = [];
    let raf = 0;
    let last = 0;
    let mx = -9999;
    let my = -9999;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(5, Math.round(w / 120));
      const rows = Math.max(5, Math.round(h / 120));
      const cw = w / cols;
      const ch = h / rows;
      const idx = (c: number, r: number) => r * cols + c;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: (c + 0.5) * cw + (Math.random() - 0.5) * 26,
            y: (r + 0.5) * ch + (Math.random() - 0.5) * 26,
            active: false,
            glow: 0,
          });
        }
      }

      edges = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (c < cols - 1 && Math.random() < 0.82) {
            edges.push({ a: idx(c, r), b: idx(c + 1, r), fill: 0, charge: 0, warm: (c + r) % 2 === 0 });
          }
          if (r < rows - 1 && Math.random() < 0.82) {
            edges.push({ a: idx(c, r), b: idx(c, r + 1), fill: 0, charge: 0, warm: (c + r) % 2 === 1 });
          }
        }
      }

      // ignition ("drop") point — upper-center
      const dropX = w * 0.5;
      const dropY = h * 0.3;
      let src = 0;
      let bd = Infinity;
      nodes.forEach((n, i) => {
        const dd = (n.x - dropX) ** 2 + (n.y - dropY) ** 2;
        if (dd < bd) {
          bd = dd;
          src = i;
        }
      });
      nodes[src].active = true;
      nodes[src].glow = 1;

      if (reduce) {
        nodes.forEach((n) => {
          n.active = true;
          n.glow = 1;
        });
        edges.forEach((e) => (e.fill = 1));
      }
    };

    const update = (dt: number) => {
      // propagate power along edges that touch an active node
      for (const e of edges) {
        if ((nodes[e.a].active || nodes[e.b].active) && e.fill < 1) {
          e.fill = Math.min(1, e.fill + dt * 1.05);
          if (e.fill >= 1) {
            nodes[e.a].active = true;
            nodes[e.b].active = true;
          }
        }
      }
      for (const n of nodes) {
        if (n.active) n.glow = Math.min(1, n.glow + dt * 0.8);
      }
      // cursor energy field: charge nearby edges, decay the rest (wake)
      const R = 160;
      for (const e of edges) {
        const cxm = (nodes[e.a].x + nodes[e.b].x) / 2;
        const cym = (nodes[e.a].y + nodes[e.b].y) / 2;
        const d = Math.hypot(cxm - mx, cym - my);
        if (d < R) e.charge = Math.min(1, e.charge + dt * 2.2 * (1 - d / R));
        else e.charge = Math.max(0, e.charge - dt * 0.85);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const e of edges) {
        const A = nodes[e.a];
        const B = nodes[e.b];
        const lit = Math.max(e.fill * 0.55 * Math.max(A.glow, B.glow), e.charge);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        if (lit <= 0.02) {
          ctx.globalAlpha = 0.05;
          ctx.strokeStyle = "#1d4ed8";
          ctx.lineWidth = 1;
        } else {
          ctx.globalAlpha = Math.min(1, lit);
          ctx.strokeStyle = e.warm ? "#fbbf24" : "#3b82f6";
          ctx.lineWidth = 1 + lit * 1.6;
        }
        ctx.stroke();
      }
      for (const n of nodes) {
        if (n.glow <= 0.02) continue;
        const rad = 9 + n.glow * 9;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rad);
        g.addColorStop(0, `rgba(251,191,36,${0.7 * n.glow})`);
        g.addColorStop(1, "rgba(251,191,36,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (t: number) => {
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      update(dt);
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onResize = () => build();

    build();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 h-full w-full"
      style={{ background: "#020203" }}
      aria-hidden="true"
    />
  );
}
