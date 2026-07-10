// Code-drawn product graphics (v3 redesign, 2026-07) — bento tiles, inline
// "mockups", and a system-architecture map. All pure SVG/CSS (no stock assets),
// brand palette, animated, reduced-motion-safe (motion gated in globals.css).
// Server components — no client JS.

/* ------------------------------------------------------------------ tiles */

export function MiniMetrics() {
  const bars = [42, 60, 48, 78, 56, 92, 68, 84, 62, 90, 72, 88];
  return (
    <div className="bz-tile flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="bz-tile-k">observability</span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] text-[#34d399]">
          <span className="bz-ping h-1.5 w-1.5 rounded-full bg-[#34d399] shadow-[0_0_7px_#34d399]" />
          live
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-bold tabular-nums text-paper">99.98</span>
        <span className="font-mono text-sm text-paper/50">% uptime</span>
        <span className="ml-auto font-mono text-xs text-azure">p95 42ms</span>
      </div>
      <div className="bz-spark mt-auto h-10 pt-3">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function MiniTerminal() {
  return (
    <div className="bz-tile flex h-full flex-col font-mono text-[0.7rem] leading-relaxed">
      <span className="bz-tile-k mb-2">deploy</span>
      <div className="bz-term-lines flex flex-col">
        <p className="bz-tl text-paper/60">
          <span className="bz-p">$</span> bezacore ship
        </p>
        <p className="bz-tl text-paper/60">
          <span className="bz-dim">→</span> build <span className="bz-ok">ok</span>
        </p>
        <p className="bz-tl text-paper/60">
          <span className="bz-dim">→</span> infra <span className="bz-ok">ok</span>
        </p>
        <p className="bz-tl text-paper/60">
          <span className="bz-ok">✓</span> live <span className="bz-dim">· 42ms</span> <span className="bz-cur" />
        </p>
      </div>
    </div>
  );
}

export function MiniPipeline() {
  const stages = ["build", "test", "deploy", "live"];
  const x = (i: number) => 16 + i * 56;
  return (
    <div className="bz-tile flex h-full flex-col">
      <span className="bz-tile-k mb-3">pipeline</span>
      <svg viewBox="0 0 200 48" className="w-full" aria-hidden="true" fill="none">
        <path d="M16 18 H184" stroke="#1b2340" strokeWidth="2" />
        <path className="bz-pulse" d="M16 18 H184" stroke="#34d399" />
        {stages.map((s, i) => (
          <g key={s}>
            <circle
              className="bz-ping"
              cx={x(i)}
              cy="18"
              r="5"
              fill="#34d399"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
            <text x={x(i)} y="42" textAnchor="middle" fill="#8b94ad" fontSize="8">
              {s}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-auto pt-2 font-mono text-[0.62rem] text-paper/40">passing · 37 deploys / wk</p>
    </div>
  );
}

export function MiniGlobe() {
  return (
    <div className="bz-tile flex h-full items-center justify-center">
      <span className="bz-tile-k absolute left-4 top-4">edge</span>
      <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true" fill="none">
        <circle cx="60" cy="60" r="46" stroke="var(--color-azure)" strokeOpacity="0.35" />
        <g className="bz-spin" stroke="var(--color-cobalt)" strokeOpacity="0.4">
          <ellipse cx="60" cy="60" rx="46" ry="17" />
          <ellipse cx="60" cy="60" rx="30" ry="46" />
          <ellipse cx="60" cy="60" rx="12" ry="46" />
          <line x1="14" y1="60" x2="106" y2="60" />
        </g>
        {/* orbiting satellite */}
        <g className="bz-spin">
          <circle cx="60" cy="14" r="3" fill="var(--color-amber)" />
        </g>
        <circle className="bz-ping" cx="42" cy="42" r="2.5" fill="var(--color-amber)" />
        <circle
          className="bz-ping"
          cx="82"
          cy="66"
          r="2.5"
          fill="var(--color-amber)"
          style={{ animationDelay: "1s" }}
        />
        <circle
          className="bz-ping"
          cx="64"
          cy="86"
          r="2.5"
          fill="var(--color-gold)"
          style={{ animationDelay: "2s" }}
        />
      </svg>
    </div>
  );
}

export function MiniAgentFlow() {
  const nodes = [
    { x: 18, label: "prompt", c: "var(--color-amber)" },
    { x: 74, label: "retrieve", c: "var(--color-azure)" },
    { x: 130, label: "tools", c: "var(--color-azure)" },
    { x: 186, label: "answer", c: "var(--color-gold)" },
  ];
  return (
    <div className="bz-tile flex h-full flex-col">
      <span className="bz-tile-k mb-3">agent</span>
      <svg viewBox="0 0 204 56" className="w-full" aria-hidden="true" fill="none">
        <path d="M18 20 H186" stroke="#1b2340" strokeWidth="2" />
        <path className="bz-pulse" d="M18 20 H186" stroke="var(--color-azure)" />
        {nodes.map((n, i) => (
          <g key={n.label}>
            <circle
              className="bz-ping"
              cx={n.x}
              cy="20"
              r="5"
              fill="#070a15"
              stroke={n.c}
              strokeWidth="2"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <circle cx={n.x} cy="20" r="2" fill={n.c} />
            <text x={n.x} y="44" textAnchor="middle" fill="#8b94ad" fontSize="8">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function MiniCode() {
  return (
    <div className="bz-tile flex h-full flex-col font-mono text-[0.7rem] leading-relaxed">
      <span className="bz-tile-k mb-2">infrastructure as code</span>
      <pre className="whitespace-pre text-paper/70">
        <span className="text-azure">resource</span> <span className="text-amber">&quot;google_cloud_run&quot;</span>{" "}
        <span className="text-paper/90">&quot;app&quot;</span> {"{"}
        {"\n  "}service = <span className="text-[#34d399]">&quot;bezacore&quot;</span>
        {"\n  "}region&nbsp;&nbsp;= <span className="text-[#34d399]">&quot;us-east1&quot;</span>
        {"\n  "}scale&nbsp;&nbsp;&nbsp;= {"{"} min = <span className="text-amber">1</span>, max = <span className="text-amber">8</span> {"}"}
        {"\n"}
        {"}"}
      </pre>
      <p className="mt-auto flex items-center gap-2 pt-2 text-[0.62rem] text-paper/45">
        <span className="bz-ping h-1.5 w-1.5 rounded-full bg-[#34d399] shadow-[0_0_7px_#34d399]" />
        terraform apply · 6 added, 0 changed <span className="bz-cur" />
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- showcase */

export function BentoShowcase() {
  return (
    <div className="grid auto-rows-[164px] grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="col-span-2">
        <MiniMetrics />
      </div>
      <MiniTerminal />
      <MiniGlobe />
      <MiniPipeline />
      <div className="col-span-2">
        <MiniCode />
      </div>
      <MiniAgentFlow />
    </div>
  );
}

/* ---------------------------------------------------------- architecture */

type Tier = { label: string; accent: string; nodes: string[] };

const TIERS: Tier[] = [
  { label: "Clients", accent: "var(--color-amber)", nodes: ["Web app", "Mobile", "APIs"] },
  { label: "Deliver", accent: "var(--color-gold)", nodes: ["CDN / LB", "CI/CD"] },
  { label: "Compute", accent: "var(--color-azure)", nodes: ["Cloud Run", "GKE", "Functions"] },
  { label: "Data", accent: "var(--color-cobalt)", nodes: ["Cloud SQL", "BigQuery", "Storage"] },
  { label: "Intelligence", accent: "var(--color-gold)", nodes: ["Agents", "RAG", "LLMs · MCP"] },
];

const NW = 128; // node width
const NH = 40; // node height
const COL_GAP = 196;
const X0 = 24;
const TOP = 54;
const ROW_GAP = 20;
const CANVAS_W = X0 + (TIERS.length - 1) * COL_GAP + NW; // right edge
const BODY_H = 3 * NH + 2 * ROW_GAP; // tallest tier (3 nodes)
const CANVAS_H = TOP + BODY_H + 84; // + observability band

// Node vertical center for node j within a k-node tier (vertically centered in
// the body band).
function nodeY(k: number, j: number): number {
  const total = k * NH + (k - 1) * ROW_GAP;
  const start = TOP + (BODY_H - total) / 2;
  return start + j * (NH + ROW_GAP) + NH / 2;
}
const colX = (i: number) => X0 + i * COL_GAP;

export function ArchitectureDiagram() {
  // connectors between adjacent tiers (faint mesh + travelling pulses)
  const edges: { d: string; pulse: boolean; delay: number; accent: string }[] = [];
  for (let i = 0; i < TIERS.length - 1; i++) {
    const a = TIERS[i];
    const b = TIERS[i + 1];
    const x1 = colX(i) + NW;
    const x2 = colX(i + 1);
    a.nodes.forEach((_, ja) => {
      const y1 = nodeY(a.nodes.length, ja);
      b.nodes.forEach((__, jb) => {
        const y2 = nodeY(b.nodes.length, jb);
        const mx = (x2 - x1) * 0.5;
        edges.push({
          d: `M${x1} ${y1} C${x1 + mx} ${y1}, ${x2 - mx} ${y2}, ${x2} ${y2}`,
          pulse: (ja + jb) % 2 === 0,
          delay: (ja + jb + i) * 0.5,
          accent: b.accent,
        });
      });
    });
  }

  // Observability band spans the tiers it actually watches — Compute, Data, and
  // Intelligence — so every vertical connector lands on it (nothing dangles).
  const obsY = TOP + BODY_H + 44;
  const obsX = colX(2);
  const obsW = colX(4) + NW - obsX;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        className="w-full min-w-[720px]"
        aria-hidden="true"
        fill="none"
      >
        {/* tier connectors — faint mesh */}
        {edges.map((e, i) => (
          <path key={`b${i}`} d={e.d} stroke="#1b2340" strokeWidth="1.5" strokeOpacity="0.7" />
        ))}
        {/* travelling pulses on a subset */}
        {edges
          .filter((e) => e.pulse)
          .map((e, i) => (
            <path
              key={`p${i}`}
              className={`bz-pulse ${i % 2 ? "bz-pulse-slow" : ""}`}
              d={e.d}
              stroke={e.accent}
              style={{ animationDelay: `${e.delay}s` }}
            />
          ))}

        {/* observability band + links up into compute/data */}
        <rect
          x={obsX}
          y={obsY}
          width={obsW}
          height="38"
          rx="10"
          fill="#0a0f20"
          stroke="#34d399"
          strokeOpacity="0.45"
        />
        <text
          x={obsX + obsW / 2}
          y={obsY + 24}
          textAnchor="middle"
          fill="var(--color-paper)"
          fontSize="12"
          fontWeight="600"
        >
          Observability · monitoring · alerts · logs
        </text>
        {[colX(2) + NW / 2, colX(3) + NW / 2, colX(4) + NW / 2].map((cx, i) => (
          <g key={`obs${i}`}>
            <path
              d={`M${cx} ${obsY} V${TOP + BODY_H - 6}`}
              stroke="#1b2340"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            <path
              className="bz-pulse bz-pulse-slow"
              d={`M${cx} ${TOP + BODY_H - 6} V${obsY}`}
              stroke="#34d399"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </g>
        ))}

        {/* tiers: header + nodes */}
        {TIERS.map((t, i) => (
          <g key={t.label}>
            <text
              x={colX(i) + NW / 2}
              y="26"
              textAnchor="middle"
              fill="#8b94ad"
              fontSize="10"
              letterSpacing="1.5"
              style={{ textTransform: "uppercase" }}
            >
              {t.label.toUpperCase()}
            </text>
            {t.nodes.map((n, j) => {
              const cy = nodeY(t.nodes.length, j);
              return (
                <g key={n}>
                  <rect
                    x={colX(i)}
                    y={cy - NH / 2}
                    width={NW}
                    height={NH}
                    rx="10"
                    fill="#0a0f20"
                    stroke={t.accent}
                    strokeOpacity="0.5"
                  />
                  <circle
                    className="bz-ping"
                    cx={colX(i) + 14}
                    cy={cy}
                    r="3"
                    fill={t.accent}
                    style={{ animationDelay: `${(i + j) * 0.4}s` }}
                  />
                  <text
                    x={colX(i) + 28}
                    y={cy + 4}
                    fill="var(--color-paper)"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {n}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
