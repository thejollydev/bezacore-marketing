import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTALink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

// /services — copy verbatim from content/v2-studio.md (locked 2026-06-27).
// The four pillars + the productized package menu (high-value first) + the
// grouped technologies list + certs. Brand voice (no "I"). Reuses the card
// pattern (rounded-2xl border border-paper/10 bg-paper/[0.02]) from the rest of
// the site.
export const metadata: Metadata = {
  title: "Services",
  description:
    "A DevOps and AI studio that builds and runs cloud-native software — apps, AI features and agents, and the infrastructure and automation behind them. Fixed-scope, fixed-price packages.",
};

const pillars = [
  {
    title: "App & Software Development",
    body: "Cloud-native web and mobile apps, APIs, and backends — designed, built, deployed, and handed over. A typical engagement is a fixed-scope build: agree on what it does, the studio builds and ships it, you get the running app plus handover. For founders and small businesses who need real software built, not just advised on.",
  },
  {
    title: "DevOps & Cloud Infrastructure",
    body: "The “run” half: CI/CD pipelines, containerization, cloud deployment (Cloud Run / GCP), hosting, and observability so problems surface before your users find them. Engagements range from a one-time deploy to a standing infrastructure setup. For teams who have an app but no one who owns getting it live and keeping it healthy.",
  },
  {
    title: "AI & Agent Development",
    body: "LLM features, retrieval (RAG), custom agents and assistants, and MCP tooling — built into your product, not bolted on as a demo. A focused sprint: one shipped AI capability, integrated and running. For teams adding AI who want it done right rather than prototyped and abandoned.",
  },
  {
    title: "Automation",
    body: "The manual workflow eating your week, automated — internal tooling, integrations, the glue between systems. Usually one specific, well-defined automation per engagement. For anyone losing hours to work a script should be doing.",
  },
];

const packages = [
  {
    name: "App Build",
    gets: "A web or mobile app — built, deployed, and hosted, with handover.",
    price: "from $5,000",
    note: "scoped per project",
  },
  {
    name: "AI Agent & Integration Sprint",
    gets: "A custom agent, assistant, LLM feature, or RAG built into your product.",
    price: "from $2,500",
  },
  {
    name: "Deploy-to-Cloud",
    gets: "Your app live on Cloud Run / GCP with monitoring and a runbook.",
    price: "from $2,000",
  },
  {
    name: "CI/CD Setup",
    gets: "Pipelines, containerization, automated deploys, and docs.",
    price: "from $1,500",
  },
  {
    name: "Automation Build",
    gets: "One manual workflow, automated and running.",
    price: "from $1,000",
  },
  {
    name: "Support Retainer",
    gets: "Ongoing build / infra / AI support — monthly hours and SLA.",
    price: "from $500/mo",
  },
  {
    name: "Infrastructure Audit",
    gets: "A review of your setup with a findings and fix-it report, plus a call.",
    price: "$500",
    note: "the easy first step",
  },
  {
    name: "Custom",
    gets: "Anything bigger.",
    price: "Let’s talk",
  },
];

const technologies = [
  {
    group: "Languages & frameworks",
    items: "Python · TypeScript · Next.js · React · Django · FastAPI · Node",
  },
  {
    group: "Cloud & infrastructure",
    items: "Google Cloud · Cloud Run · Docker · Terraform · Ansible · Proxmox · Linux",
  },
  {
    group: "AI & agents",
    items: "LangChain · LangGraph · LangFuse · Vertex AI · Ollama · MCP · RAG · agent runtimes",
  },
  {
    group: "DevOps & automation",
    items: "CI/CD · Prometheus · Grafana · observability · workflow automation",
  },
];

export default function Services() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero kicker="Services" title="What the studio builds — and runs.">
        BezaCore Labs handles the whole lifecycle: building cloud-native
        software, deploying it, keeping it running, and wiring in AI and
        automation where they earn their place. Most small teams otherwise hire a
        developer <em>and</em> a DevOps person <em>and</em> someone for AI. Here
        it&apos;s one studio, accountable end to end.
      </PageHero>

      {/* The four pillars */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 80} className="h-full">
              <div className="spotlight flex h-full flex-col gap-4 rounded-2xl border border-paper/10 bg-paper/[0.02] p-8">
                <h2 className="text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                  {title}
                </h2>
                <p className="text-base leading-relaxed text-paper/70">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="beam-divider" />

      {/* Productized package menu — high-value first */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          Packages
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/60">
          Fixed scope, fixed price, written down. Prices are starting points —
          tell us the problem and we&apos;ll quote the specific job.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {packages.map(({ name, gets, price, note }, i) => (
            <Reveal key={name} delay={(i % 2) * 80} className="h-full">
              <div className="spotlight flex h-full flex-col gap-3 rounded-2xl border border-paper/10 bg-paper/[0.02] p-7">
                <h3 className="text-lg font-semibold tracking-tight text-paper">
                  {name}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-paper/70">
                  {gets}
                </p>
                <p className="pt-1">
                  <span className="text-gradient text-lg font-semibold">
                    {price}
                  </span>
                  {note ? (
                    <span className="ml-2 text-xs text-paper/45">{note}</span>
                  ) : null}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <CTALink href="/contact" variant="primary">
            Start a project
          </CTALink>
        </div>
      </Section>

      <div className="beam-divider" />

      {/* Technologies (grouped) + certs */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
          Technologies
        </h2>
        <dl className="mt-8 max-w-3xl space-y-6">
          {technologies.map(({ group, items }) => (
            <div key={group} className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-paper/40">
                {group}
              </dt>
              <dd className="text-base leading-relaxed text-paper/75">{items}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-paper/50">
          Google Cloud Associate Cloud Engineer · IBM Backend Developer
          Professional
        </p>
      </Section>

      <div className="beam-divider" />

      {/* Who the studio works with + closing CTA */}
      <Section>
        <div className="rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            Who the studio works with
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/70">
            BezaCore Labs works with startups, small businesses, and teams adding
            AI — people who need working software built and kept running without
            standing up a whole engineering department. A clear problem and a
            budget is usually all it takes to find a package that fits.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/70">
            Not sure which package fits?{" "}
            <span className="text-paper">Tell us the problem</span> and we&apos;ll
            point you to the right one.
          </p>
          <div className="mt-8">
            <CTALink href="/contact" variant="primary">
              Start a project
            </CTALink>
          </div>
        </div>
      </Section>
    </main>
  );
}
