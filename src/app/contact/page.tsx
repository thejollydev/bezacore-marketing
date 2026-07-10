import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { MiniPipeline } from "@/components/visuals";

// /contact (v3 redesign, 2026-07) — the project-inquiry path. Form-only (no
// visible email anywhere, including error states) per the locked policy. Copy
// anchored to content/v2-studio.md. Two-column: the form + a "what happens next"
// reassurance rail.
export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with BezaCore Labs.",
};

const nextSteps = [
  { n: 1, h: "You send the details", p: "What you’re building or fixing, plus any timeline or budget in mind." },
  { n: 2, h: "I reply — usually within a day", p: "With the package that fits and roughly what it costs. For anything bigger or fuzzier, a short call sorts it out." },
  { n: 3, h: "We scope it, then build", p: "Fixed scope, fixed price, written down before any work starts." },
];

export default function Contact() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        kicker="Contact"
        title={
          <>
            Start a <span className="text-gradient">project.</span>
          </>
        }
      >
        Tell us what you&apos;re trying to build or fix. We&apos;ll point you to the package that fits
        and roughly what it costs — usually within a day. For anything bigger or fuzzier, a short call
        sorts it out.
      </PageHero>

      <section className="bz-sec-dual py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Form */}
            <Reveal>
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 shadow-[0_0_80px_-28px_rgba(59,130,246,0.5)] sm:p-10">
                <ContactForm />
              </div>
            </Reveal>

            {/* What happens next */}
            <Reveal delay={120}>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-amber">
                What happens next
              </span>
              <ol className="mt-6 flex flex-col gap-6">
                {nextSteps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-linear-to-br from-gold to-fire font-mono text-xs font-bold text-ink">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-semibold text-paper">{s.h}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-paper/60">{s.p}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 h-40">
                <MiniPipeline />
              </div>
              <p className="mt-8 border-t border-paper/10 pt-6 text-sm leading-relaxed text-paper/50">
                No mailing list, no sales sequence — just a reply from the person who&apos;d do the work.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
