import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

// /contact — copy verbatim from content/v1-locked.md. Form-only (no visible
// email anywhere, including error states) per the locked policy.
export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BezaCore Labs.",
};

export default function Contact() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero kicker="Contact" title="Get in touch">
        For partnership inquiries, press, donor questions, or general questions about BezaCore Labs. If
        you&apos;re interested in Intelligrace specifically, the{" "}
        <Link
          href="/intelligrace"
          className="font-medium text-paper underline decoration-cobalt/50 underline-offset-4 transition-colors hover:decoration-cobalt"
        >
          waitlist
        </Link>{" "}
        is the better starting point.
      </PageHero>

      <Section>
        <div className="max-w-xl rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 shadow-[0_0_60px_-24px_rgba(29,78,216,0.5)] sm:p-10">
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
