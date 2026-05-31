import { type ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

// Shared shell for the lightweight legal pages (/terms, /privacy). Both pages
// are structurally identical — interior hero + a single prose column — so the
// layout and prose styling live here once. Prose elements are styled via
// Tailwind arbitrary-variant selectors ([&_h2], [&_p], …) instead of the
// typography plugin (not installed). Copy is templated + NOT counsel-reviewed
// (Master-Plan Chunk D: lightweight v1; counsel review happens if a paying
// customer or partner ever asks for it).
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero title={title} />
      <Section>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
            Last updated · {lastUpdated}
          </p>
          <div
            className="mt-8 max-w-3xl text-base leading-relaxed text-paper/75
              [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-paper
              [&_p]:mt-4
              [&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5
              [&_li]:list-disc
              [&_strong]:font-semibold [&_strong]:text-paper
              [&_a]:font-medium [&_a]:text-paper [&_a]:underline [&_a]:decoration-paper/30 [&_a]:underline-offset-2
              [&_a:hover]:decoration-paper"
          >
            {children}
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
