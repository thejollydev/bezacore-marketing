// "Circuit-powered headline" hero — circuit traces that converge behind the
// headline (masked via .hero-circuit), with pulses traveling along them and
// glowing junction nodes. Pairs with a gradient headline whose flow shares the
// same palette/direction, so the light reads as continuing through the words.
// Pure SVG + CSS, no client JS.
const PATHS = [
  "M0 120 H300 V260 H560 V120 H900 V340 H1200",
  "M0 460 H220 V360 H520 V480 H820 V300 H1200",
  "M150 600 V440 H420 V520 H700 V380 H1000 V600",
  "M1200 80 H980 V220 H720 V60 H400 V200 H120 V40 H0",
];

// Junction points, weighted toward the left-center focus area.
const NODES: Array<[number, number]> = [
  [300, 260],
  [220, 360],
  [150, 440],
  [420, 520],
  [560, 300],
  [120, 200],
];

export function HeroCircuitFusion() {
  return (
    <div className="hero-circuit" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {PATHS.map((d, i) => (
          <path key={`base-${i}`} d={d} className="hero-trace-base" />
        ))}
        {PATHS.map((d, i) => (
          <path
            key={`pulse-${i}`}
            d={d}
            className={i % 2 ? "hero-trace-cool" : "hero-trace-warm"}
          />
        ))}
        {NODES.map(([cx, cy], i) => (
          <circle
            key={`node-${i}`}
            cx={cx}
            cy={cy}
            r={3.5}
            className={i % 2 ? "hero-node hero-node-cool" : "hero-node"}
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
