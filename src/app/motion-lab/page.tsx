import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/Button";
import { DrawLine } from "@/components/DrawLine";
import { SpotlightCard } from "@/components/SpotlightCard";

// THROWAWAY motion gallery — shows the four signature-motion candidates on the
// true-black + neon base so a direction can be chosen. Delete once decided.
export const metadata: Metadata = {
  title: "Motion Lab",
  robots: { index: false, follow: false },
};

function Label({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
      {children}
    </p>
  );
}

const block =
  "relative flex min-h-[80vh] flex-col justify-center border-b border-paper/10";

export default function MotionLab() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="border-b border-paper/10 bg-base/80 px-5 py-3 text-sm text-paper/60">
        Motion candidates on true-black + neon. Scroll for self-drawing; hover
        the card for the spotlight. Back to{" "}
        <Link href="/" className="text-paper underline-offset-4 hover:underline">
          home
        </Link>
        .
      </div>

      {/* 1 — Traveling light */}
      <section className={block}>
        <Container className="flex flex-col gap-8">
          <Label>1 — Traveling light</Label>
          <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Software for the work that matters.
          </h2>
          <div className="beam-divider" />
          <p className="max-w-xl text-paper/60">
            A glowing pulse runs along dividers, underlines, and edges — the
            hero&apos;s circuit language, extended.
          </p>
          <div>
            <CTALink href="/motion-lab" variant="primary">
              Example button
            </CTALink>
          </div>
        </Container>
      </section>

      {/* 2 — Self-drawing lines */}
      <section className={block}>
        <Container className="flex flex-col gap-6">
          <Label>2 — Self-drawing lines</Label>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Why this exists
            </h2>
            {/* underline draws itself when this scrolls into view */}
            <div className="max-w-sm">
              <DrawLine />
            </div>
          </div>
          <p className="max-w-xl text-paper/60">
            Underlines and dividers stroke themselves in as you reach them —
            scroll up and back down to replay.
          </p>
        </Container>
      </section>

      {/* 3 — Gradient flow in text */}
      <section className={block}>
        <Container className="flex flex-col gap-8">
          <Label>3 — Gradient flow in text</Label>
          <h2 className="hero-headline-gradient text-4xl font-semibold tracking-tight sm:text-5xl">
            Software for the work that matters.
          </h2>
          <p className="max-w-xl text-paper/60">
            The warm→cobalt gradient flows continuously through key headings.
          </p>
        </Container>
      </section>

      {/* 4 — Cursor-reactive glow */}
      <section className={block}>
        <Container className="flex flex-col gap-8">
          <Label>4 — Cursor-reactive glow</Label>
          <SpotlightCard className="max-w-2xl rounded-2xl border border-paper/10 bg-ink p-8 sm:p-12">
            <div className="relative z-10 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                Intelligrace
              </h2>
              <p className="text-paper/70">
                Move your cursor across this card — a cobalt glow tracks your
                pointer.
              </p>
            </div>
          </SpotlightCard>
        </Container>
      </section>
    </main>
  );
}
