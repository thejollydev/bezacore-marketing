import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { CTALink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

// /about — copy verbatim from content/v1-locked.md. Bold visual treatment
// (oversized type, full-bleed gradient mission panel, scroll reveals).
export const metadata: Metadata = {
  title: "About",
  description:
    "BezaCore Labs is a Michigan software company building careful tools for small mission-driven organizations.",
};

const personalLinks = [
  { href: "https://soper.dev", label: "soper.dev" },
  { href: "https://linkedin.com/in/joseph-soper-dev", label: "LinkedIn" },
  { href: "https://github.com/thejollydev", label: "GitHub" },
];

export default function About() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title="About" />

      {/* Opening — oversized statement, gradient on the closing clause */}
      <Section>
        <Reveal>
          <p className="max-w-4xl text-2xl font-medium leading-snug text-paper sm:text-3xl lg:text-4xl">
            BezaCore Labs is a Michigan software company built around a small set
            of ideas: that there are small, mission-driven organizations doing
            important work without the resources larger institutions take for
            granted; that good software, built carefully, can make their work
            meaningfully easier; and that{" "}
            <span className="text-gradient">this kind of work is worth doing well.</span>
          </p>
        </Reveal>
      </Section>

      {/* Founder — editorial two-column */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-fire">
              The founder
            </p>
            <p className="mt-3 text-sm text-paper/50">
              Petoskey, Michigan · est. 2025
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-paper/75">
              <p>
                The company is run by{" "}
                <strong className="font-semibold text-paper">Joseph Soper</strong>
                , a software engineer based in Petoskey, Michigan. Joseph started
                BezaCore Labs in 2025 to build the kinds of tools he wanted to see
                in the world — practical, careful, and built for the people who
                use them.
              </p>
              <p>
                Before BezaCore Labs, Joseph spent years in DevOps and
                infrastructure work. That background shapes the company: BezaCore
                Labs takes the operational side of software seriously, preferring
                durable systems to flashy launches.
              </p>
              <p>
                Joseph&apos;s faith is part of why BezaCore Labs exists — not as
                marketing language, but as posture. The conviction underneath the
                work is simple: the abilities a person is given are worth using to
                contribute something, not just to consume or extract. That
                conviction shapes the kinds of organizations BezaCore Labs builds
                for, and the care it tries to bring to the work.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {personalLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-cobalt hover:text-paper"
                >
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why this exists — FULL-BLEED gradient statement (anchor for /intelligrace) */}
      <section
        id="why-this-exists"
        className="bg-beza-gradient relative overflow-hidden"
      >
        <Container className="py-24 sm:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-paper/80">
              The commitment
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Why this exists
            </h2>
            <div className="mt-8 flex max-w-3xl flex-col gap-5 text-lg leading-relaxed text-paper/90">
              <p>
                BezaCore Labs is built around a structural commitment: that
                operational software meant for small mission-driven organizations
                should actually reach them, regardless of budget. As products like
                Intelligrace grow, a portion of their commercial revenue funds a
                structural mission tier — free and sliding-scale access for
                qualifying small churches, nonprofits, and mission organizations
                that couldn&apos;t otherwise afford operational software at this
                level.
              </p>
              <p>
                This is not framed as charity. Commercial customers get the same
                product as mission-tier customers — the relationship between them
                is the point. The mission tier is built into the model, not added
                on top of it.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Closing CTA */}
      <Section>
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <p className="text-2xl font-medium text-paper sm:text-3xl">
              Have something to discuss?
            </p>
            <CTALink href="/contact" variant="primary">
              Get in touch
            </CTALink>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
