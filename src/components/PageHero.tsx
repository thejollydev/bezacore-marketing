import { type ReactNode } from "react";
import { Container } from "./Container";
import { Kicker } from "./Kicker";
import { HeroCircuitFusion } from "./HeroCircuitFusion";

// Interior-page hero — the SAME treatment as the homepage hero (circuit traces
// + traveling pulses + soft glow + film grain + flowing gradient headline), so
// every page reads as the same site. Restrained scale (no oversized type).
export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-paper/10">
      <div className="hero-circuit-glow" aria-hidden="true" />
      <HeroCircuitFusion />
      <Container className="relative z-10 py-24 sm:py-28">
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <h1
          className={`${kicker ? "mt-4 " : ""}hero-headline-gradient max-w-3xl [overflow-wrap:anywhere] text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl`}
        >
          {title}
        </h1>
        {children ? (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{children}</div>
        ) : null}
      </Container>
    </section>
  );
}
