import { Container } from "@/components/Container";
import { CTALink } from "@/components/Button";
import { Kicker } from "@/components/Kicker";
import { HeroContent } from "@/components/HeroContent";
import { HeroCircuitFusion } from "@/components/HeroCircuitFusion";

// Homepage — Hero + Intelligrace product card. Copy is verbatim from
// content/v1-locked.md. Hero = "circuit-powered headline" (the headline carries
// the gradient flow, so its own animation replaces the rise-in).
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* HERO — circuit-powered headline */}
      <section className="grain relative overflow-hidden">
        <div className="hero-circuit-glow" aria-hidden="true" />
        <HeroCircuitFusion />
        <HeroContent
          animateHeadline={false}
          headlineClassName="hero-headline-gradient"
        />
      </section>

      {/* INTELLIGRACE PRODUCT CARD */}
      <section className="py-20">
        <Container>
          <div className="rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 sm:p-12">
            <div className="flex flex-col items-start gap-5">
              <Kicker>Currently building</Kicker>
              <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                Intelligrace
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-paper/70">
                Intelligrace is a modular operations platform for small churches
                and Christian nonprofits, built one module at a time. The goal is
                to give small mission-driven organizations the kind of
                operational software that larger ones take for granted — without
                requiring full-time technical staff.
              </p>
              <div className="pt-2">
                <CTALink href="/intelligrace" variant="secondary">
                  See what&apos;s in development
                </CTALink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
