import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTALink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

// /about — copy verbatim from content/v2-studio.md (locked 2026-06-27). The one
// page in the brand-weighted hybrid voice that speaks first-person ("I"/Joseph)
// — the founder page, where personal credibility is the asset. Dark/circuit
// vibe shared with the homepage (PageHero); restrained type.
export const metadata: Metadata = {
  title: "About",
  description:
    "BezaCore Labs is a DevOps and AI studio in Petoskey, Michigan — cloud-native software built, deployed, and kept running, with AI and automation where they help.",
};

// Founder credential link. soper.dev (stale; pending a BezaCore-aware refresh)
// and personal GitHub (@thejollydev — undercuts the studio framing) were
// dropped 2026-06-27; LinkedIn stays as the one link that supports a founder's
// credibility. See content/v2-studio.md.
const personalLinks = [
  { href: "https://linkedin.com/in/joseph-soper-dev", label: "LinkedIn" },
];

export default function About() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero title="About" />

      {/* Opening — brand voice, gradient on the closing clause */}
      <Section>
        <Reveal>
          <p className="max-w-3xl text-xl font-medium leading-snug text-paper sm:text-2xl">
            BezaCore Labs is a DevOps and AI studio in Petoskey, Michigan. It
            builds cloud-native software, deploys and runs it, and brings AI and
            automation in where they actually help — for startups, small
            businesses, and teams that need{" "}
            <span className="text-gradient">
              real software shipped and kept running.
            </span>
          </p>
        </Reveal>
      </Section>

      <div className="beam-divider" />

      {/* Founder — first-person, editorial two-column */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-fire">
              The founder
            </p>
            <p className="mt-3 text-sm text-paper/50">Petoskey, Michigan</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-paper/75">
              <p>
                I&apos;m{" "}
                <strong className="font-semibold text-paper">Joseph Soper</strong>
                , a software and DevOps engineer in Petoskey, Michigan. I&apos;ve
                been building software since I was a teenager and never stopped —
                engineering, infrastructure, and lately AI have been the constant
                thread through everything else I&apos;ve done. I spent more than a
                decade in sales along the way, which turned out to be its own kind
                of asset: it taught me to understand what a business actually
                needs and to say it plainly. But building is the thing I always
                came back to.
              </p>
              <p>
                BezaCore Labs is where all of that comes together. I build
                cloud-native applications, deploy and run them on solid
                infrastructure, and bring AI in where it earns its place — and
                because I&apos;ve lived on the operational side, I care as much
                about what happens after launch as before it. Durable systems
                over flashy launches, and one accountable owner from the first
                commit to production.
              </p>
              <p className="text-paper/90">
                I try to build the way I&apos;d want someone to build for me:
                carefully, honestly, and with the long run in mind — using what
                I&apos;ve been given to make something that lasts, not just to
                ship and move on.
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

      {/* How I work — circuit/glow panel (replaces the v1 mission-tier section) */}
      <Section>
        <Reveal>
          <div className="grain relative overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.02] p-8 sm:p-12 lg:p-16">
            <div className="hero-circuit-glow" aria-hidden="true" />
            <div className="relative z-10">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-fire">
                The approach
              </p>
              <h2 className="hero-headline-gradient mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                How I work
              </h2>
              <div className="mt-7 max-w-3xl text-lg leading-relaxed text-paper/80">
                <p>
                  Fixed scope, fixed price, written down. Before any work starts
                  we agree on exactly what&apos;s included — and what isn&apos;t —
                  so there are no surprises on either side. I&apos;d rather quote
                  honestly and deliver than over-promise and scramble. And when
                  something ships, it ships with the boring parts done:
                  deployment, monitoring, a runbook, a handover. Durable over
                  flashy, every time.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Closing CTA */}
      <Section>
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <p className="text-2xl font-medium text-paper">Have a project in mind?</p>
            <CTALink href="/contact" variant="primary">
              Start a project
            </CTALink>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
