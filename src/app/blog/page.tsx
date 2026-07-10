import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { sortedPosts } from "@/content/blog/posts";

// /blog (v3 redesign, 2026-07) — build-in-public index. Posts are MDX in
// src/content/blog; this lists them newest-first. Nav discovery is via the
// footer for now (promoted to top nav once there are a handful of posts).
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from the studio — how BezaCore Labs builds, ships, and runs cloud-native software and AI, in the open.",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        kicker="Blog"
        title={
          <>
            Notes from <span className="text-gradient">the studio.</span>
          </>
        }
      >
        How the studio builds, ships, and runs software and AI — in the open. Fewer hot takes, more of
        how the work actually gets done.
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {sortedPosts.map(({ meta }, i) => {
              const glow = [
                "var(--color-azure)",
                "var(--color-amber)",
                "var(--color-cobalt)",
                "var(--color-fire)",
              ][i % 4];
              return (
                <Reveal key={meta.slug} delay={i * 70}>
                  <Link
                    href={`/blog/${meta.slug}`}
                    className="bz-card group block p-6 sm:p-8"
                    style={{ "--bz-glow": glow } as CSSProperties}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber">
                      {formatDate(meta.date)} · {meta.readingTime}
                    </p>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-paper transition-colors group-hover:text-white sm:text-2xl">
                      {meta.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-paper/60">{meta.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-mono text-sm text-azure">
                      Read{" "}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
