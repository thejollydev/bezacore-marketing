import { Container } from "./Container";
import { CTALink } from "./Button";

// The hero's foreground copy + CTAs, extracted so every background treatment
// (and the real homepage) renders the exact same content. Copy is verbatim
// from content/v2-studio.md (locked 2026-06-27). Sits above the background
// layers via z-10.
// `headlineClassName` + `animateHeadline=false` support the gradient-headline
// treatment (where the headline's own animation replaces the rise-in).
export function HeroContent({
  headlineClassName = "",
  animateHeadline = true,
}: {
  headlineClassName?: string;
  animateHeadline?: boolean;
} = {}) {
  return (
    <Container className="relative z-10 flex flex-col items-start gap-8 py-28 sm:py-36">
      {/* Brand rallying line (slogan, locked 2026-06-28) — sits above the
          descriptive tagline H1 as a Plex Mono eyebrow. Distinct from the
          tagline: rally first, capability statement second. */}
      <div className="flex flex-col gap-4">
        <p
          className="rise font-mono text-xs font-semibold uppercase tracking-[0.28em] text-fire"
          style={{ animationDelay: "0ms" }}
        >
          Build Better. Build Beyond.
        </p>
        <h1
          className={`${animateHeadline ? "rise " : ""}max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl ${headlineClassName}`}
          style={animateHeadline ? { animationDelay: "150ms" } : undefined}
        >
          Software, AI, and the infrastructure to run it.
        </h1>
      </div>
      <p
        className="rise max-w-xl text-lg leading-relaxed text-paper/70"
        style={{ animationDelay: "480ms" }}
      >
        A studio that builds and runs cloud-native software — apps, AI and AI
        agents, and the infrastructure behind them.
      </p>
      <div
        className="rise flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: "780ms" }}
      >
        <CTALink href="/services" variant="primary">
          See services
        </CTALink>
        <CTALink href="/work" variant="secondary">
          See the work
        </CTALink>
      </div>
    </Container>
  );
}
