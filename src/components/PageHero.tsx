import { type ReactNode } from "react";
import { Container } from "./Container";
import { FlowField } from "./FlowField";

// Interior-page hero (v3 redesign) — the same generative flow-field atmosphere
// as the homepage, dialed lower, so every route reads as one site. `title` is a
// ReactNode so pages can gradient a phrase with <span className="text-gradient">.
// Reduced-motion users get FlowField's static frame; content is never hidden.
export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-paper/10">
      <FlowField count={45} />
      <div aria-hidden="true" className="bz-field-veil" />
      <Container className="relative z-10 py-20 sm:py-24">
        {kicker ? (
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-amber">
            {kicker}
          </span>
        ) : null}
        <h1
          className={`${kicker ? "mt-4 " : ""}max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-paper [overflow-wrap:anywhere] sm:text-5xl`}
        >
          {title}
        </h1>
        {children ? (
          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70">{children}</div>
        ) : null}
      </Container>
    </section>
  );
}
