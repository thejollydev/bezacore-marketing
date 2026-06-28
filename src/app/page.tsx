import Link from "next/link";
import { Container } from "@/components/Container";
import { CTALink } from "@/components/Button";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { HeroContent } from "@/components/HeroContent";
import { HeroCircuitFusion } from "@/components/HeroCircuitFusion";

// Homepage — Hero + 4-pillar services snapshot + selected-work strip + a short
// tech/credibility line. Copy is verbatim from content/v2-studio.md (locked
// 2026-06-27). Hero = "circuit-powered headline" (the headline carries the
// gradient flow, so its own animation replaces the rise-in).
const pillars = [
  {
    title: "App & Software Development",
    body: "Cloud-native web and mobile apps, APIs, and the software itself — built to ship.",
  },
  {
    title: "DevOps & Cloud Infrastructure",
    body: "CI/CD, deployment, hosting, and observability — so what you ship keeps running.",
  },
  {
    title: "AI & Agent Development",
    body: "LLM features, RAG, custom agents and assistants, and MCP tooling, built into your product.",
  },
  {
    title: "Automation",
    body: "Manual workflows and internal glue, automated — less busywork, fewer errors.",
  },
];

const selectedWork = [
  {
    title: "BezaForge",
    body: "A self-hosted production homelab — Proxmox, Terraform, Ansible, full observability. Infrastructure built and run end-to-end.",
  },
  {
    title: "Brizza",
    body: "A personal AI assistant — agent runtime, scheduling, Discord and dashboard, observability. AI shipped end-to-end.",
  },
];

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

      {/* WHAT THE STUDIO DOES — 4-pillar snapshot */}
      <section className="py-20">
        <Container>
          <Kicker>What the studio does</Kicker>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {pillars.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 80} className="h-full">
                <Link
                  href="/services"
                  className="spotlight group flex h-full flex-col gap-3 rounded-2xl border border-paper/10 bg-paper/[0.02] p-7 transition-colors hover:border-paper/25 hover:bg-paper/[0.04]"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-paper">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-paper/70">{body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <CTALink href="/services" variant="secondary">
              See full services &amp; pricing
            </CTALink>
          </div>
        </Container>
      </section>

      <div className="beam-divider" />

      {/* SELECTED WORK strip */}
      <section className="py-20">
        <Container>
          <Kicker>Selected work</Kicker>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {selectedWork.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 80} className="h-full">
                <Link
                  href="/work"
                  className="spotlight group flex h-full flex-col gap-3 rounded-2xl border border-paper/10 bg-paper/[0.02] p-7 transition-colors hover:border-paper/25 hover:bg-paper/[0.04]"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-paper">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-paper/70">{body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <CTALink href="/work" variant="secondary">
              See the work
            </CTALink>
          </div>
        </Container>
      </section>

      {/* TECH / CREDIBILITY line */}
      <section className="pb-24">
        <Container>
          <p className="max-w-3xl text-sm leading-relaxed text-paper/50">
            Cloud-native software on Google Cloud — Next.js, Python, Terraform,
            Ansible. AI across the modern stack: LangChain, LangGraph, Vertex AI,
            Ollama, MCP.
          </p>
        </Container>
      </section>
    </main>
  );
}
