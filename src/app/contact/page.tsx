import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

// /contact — copy verbatim from content/v2-studio.md (locked 2026-06-27). The
// project-inquiry path (the waitlist is retired from the public surface).
// Form-only (no visible email anywhere, including error states) per the locked
// policy. Brand voice ("us/we").
export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with BezaCore Labs.",
};

export default function Contact() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero kicker="Contact" title="Start a project">
        Tell us what you&apos;re trying to build or fix. We&apos;ll point you to
        the package that fits and roughly what it costs — usually within a day.
        For anything bigger or fuzzier, a short call sorts it out.
      </PageHero>

      <Section>
        <div className="max-w-xl rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 shadow-[0_0_60px_-24px_rgba(29,78,216,0.5)] sm:p-10">
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
