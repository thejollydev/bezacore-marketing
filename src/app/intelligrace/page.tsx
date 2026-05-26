import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { WaitlistForm } from "@/components/WaitlistForm";

// /intelligrace — copy verbatim from content/v1-locked.md. The de-facto public
// Intelligrace surface until intelligrace.com ships, so it stands on its own.
export const metadata: Metadata = {
  title: "Intelligrace",
  description:
    "Intelligrace is a modular operations platform for small churches and Christian nonprofits, built one module at a time.",
};

export default function Intelligrace() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero kicker="BezaCore Labs' first product" title="Intelligrace" />

      {/* Section 1 — What it is */}
      <Section>
        <p className="max-w-3xl text-xl leading-relaxed text-paper/85 sm:text-2xl">
          Intelligrace is a modular operations platform for small churches and Christian nonprofits.
          It&apos;s built for the kind of organization that does meaningful work with a small staff —
          often without anyone whose job is to evaluate, integrate, or maintain software. The goal is
          to give those organizations the kind of operational capability that larger institutions take
          for granted,{" "}
          <span className="text-gradient">without requiring them to become a tech organization to use it.</span>
        </p>
      </Section>

      <div className="beam-divider" />

      {/* Section 2 — How it's being built */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          How it&apos;s being built
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/70">
          Intelligrace is not being built as a single, monolithic suite. Instead, each capability ships
          as a standalone module that organizations can adopt one at a time — communications, content
          publishing, member care, online giving, volunteer coordination, and others as they&apos;re
          built. Modules work well on their own, and they work better together as more of them come
          online. Organizations are never required to adopt the whole platform to get useful work done.
        </p>
      </Section>

      <div className="beam-divider" />

      {/* Section 3 — Where we are now */}
      <Section>
        <span className="inline-flex items-center gap-2 rounded-full border border-fire/30 bg-fire/5 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-fire">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fire" aria-hidden="true" />
          Status: in development
        </span>
        <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-paper/70">
          <p>
            The first module under active design is{" "}
            <strong className="font-semibold text-paper">Content Studio</strong> — a publishing tool for
            sermons, newsletters, bulletins, and online content. It&apos;s the place Intelligrace starts
            because content publishing is where small organizations spend disproportionate time and
            energy without proportional results, and because it&apos;s a module that works well on its
            own before any other Intelligrace modules exist.
          </p>
          <p>
            No live customers yet. The waitlist below is the right place to be if you want to know when
            Content Studio is available, and to hear occasional updates as the platform grows.
          </p>
        </div>
      </Section>

      {/* Section 4 — Waitlist (highlighted panel) */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 shadow-[0_0_60px_-24px_rgba(29,78,216,0.5)] sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            Join the waitlist
          </h2>
          <p className="mt-5 mb-8 max-w-2xl text-lg leading-relaxed text-paper/70">
            Enter your email below to be notified when Content Studio ships and to hear occasional
            updates as the platform grows. We won&apos;t email you for any other reason, and we
            won&apos;t share your address.
          </p>
          <WaitlistForm />
        </div>
      </Section>

      {/* Section 5 — A note on access */}
      <Section>
        <div className="rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 sm:p-10">
          <p className="max-w-3xl text-lg leading-relaxed text-paper/70">
            Intelligrace includes a structural mission tier — free and sliding-scale access for
            qualifying small churches, nonprofits, and mission organizations that couldn&apos;t
            otherwise afford operational software at this level.{" "}
            <Link
              href="/about#why-this-exists"
              className="font-medium text-paper underline decoration-cobalt/50 underline-offset-4 transition-colors hover:decoration-cobalt"
            >
              Read more about the commitment →
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
}
