import { Container } from "./Container";
import { CTALink } from "./Button";

// The hero's foreground copy + CTAs, extracted so every background treatment
// (and the real homepage) renders the exact same content. Copy is verbatim
// from content/v1-locked.md. Sits above the background layers via z-10.
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
      <h1
        className={`${animateHeadline ? "rise " : ""}max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl ${headlineClassName}`}
        style={animateHeadline ? { animationDelay: "150ms" } : undefined}
      >
        Software for the work that matters.
      </h1>
      <p
        className="rise max-w-xl text-lg leading-relaxed text-paper/70"
        style={{ animationDelay: "480ms" }}
      >
        A Michigan software company building tools for small mission-driven
        organizations — starting with Intelligrace, a platform for small
        churches and Christian nonprofits. Not chasing scale. Not in a hurry.
      </p>
      <div
        className="rise flex flex-col gap-3 sm:flex-row"
        style={{ animationDelay: "780ms" }}
      >
        <CTALink href="/intelligrace" variant="primary">
          Learn about Intelligrace
        </CTALink>
        <CTALink href="/about" variant="secondary">
          About BezaCore Labs
        </CTALink>
      </div>
    </Container>
  );
}
