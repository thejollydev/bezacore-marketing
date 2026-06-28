import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

// /work — copy verbatim from content/v2-studio.md (locked 2026-06-27). Selected
// work framed honestly as capability demonstrations (NOT client case studies —
// the studio is new). BezaForge (the "run" half) + Brizza (the AI half), each in
// the same four-beat shape: problem → what was built → stack → what it
// demonstrates. PCOC intentionally omitted (not representative of studio work).
export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work — systems designed, built, and run end-to-end. BezaForge (self-hosted production infrastructure) and Brizza (a shipped AI assistant).",
};

const work = [
  {
    title: "BezaForge",
    tagline: "self-hosted production infrastructure",
    problem:
      "Running real services — AI models, automation, dashboards, backups — without renting someone else’s cloud for every one of them.",
    built:
      "A homelab run like production: virtualized on Proxmox, provisioned with Terraform, configured with Ansible, monitored with Prometheus and Grafana, with verified backups and a documented recovery path. Infrastructure as code, end to end.",
    stack: "Proxmox · Terraform · Ansible · Docker · Prometheus / Grafana · Linux",
    demonstrates:
      "The “run” half of the studio: standing up, automating, observing, and recovering production infrastructure — not just deploying and hoping.",
  },
  {
    title: "Brizza",
    tagline: "a personal AI assistant, shipped",
    problem:
      "A genuinely useful AI assistant — one that runs on a schedule, reaches real tools, and is observable when it misbehaves — not a chat window.",
    built:
      "An agent running on a live bridge with scheduled jobs, a Discord interface and a dashboard, fallback between model providers, and full tracing so every run is inspectable.",
    stack: "Python · agent runtime · Discord · APScheduler · LangFuse · self-hosted",
    demonstrates:
      "The AI half: building, integrating, and operating a real AI system end to end — the same work a client’s “add AI to our product” actually requires.",
  },
];

function Beat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-fire">
        {label}
      </p>
      <p className="text-base leading-relaxed text-paper/75">{children}</p>
    </div>
  );
}

export default function Work() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero kicker="Work" title="Selected work">
        Here&apos;s the honest version: these are systems the studio designed,
        built, and runs end-to-end. They aren&apos;t client case studies yet —
        they&apos;re proof of what the studio can do across the stack, from bare
        infrastructure to shipped AI. Client work lands here as it ships.
      </PageHero>

      {work.map(({ title, tagline, problem, built, stack, demonstrates }) => (
        <Section key={title}>
          <Reveal>
            <div className="spotlight rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 sm:p-12">
              <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                {title}{" "}
                <span className="text-paper/45">— {tagline}</span>
              </h2>
              <div className="mt-8 space-y-6">
                <Beat label="The problem">{problem}</Beat>
                <Beat label="What was built">{built}</Beat>
                <Beat label="Stack">{stack}</Beat>
                <Beat label="Demonstrates">{demonstrates}</Beat>
              </div>
            </div>
          </Reveal>
        </Section>
      ))}

      <Section>
        <p className="max-w-3xl text-lg leading-relaxed text-paper/60">
          More work — including client engagements — lands here as it ships.
        </p>
      </Section>
    </main>
  );
}
