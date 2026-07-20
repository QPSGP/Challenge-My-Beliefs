import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/section-heading";
import { getPersonaBySlug, marketingPersonas } from "@/lib/marketing-content";
import { foundingRule } from "@/lib/site-content";

type PersonaLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketingPersonas.map((persona) => ({ slug: persona.slug }));
}

export async function generateMetadata({
  params,
}: PersonaLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    return { title: "Start here" };
  }

  return {
    title: persona.name,
    description: persona.description,
    openGraph: {
      title: `${persona.headline} | Challenge My Beliefs`,
      description: persona.description,
    },
  };
}

export default async function PersonaLandingPage({ params }: PersonaLandingPageProps) {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <Link href="/start" className="text-sm text-sky-300 hover:text-sky-200">
        ← All paths
      </Link>

      <section className="overflow-hidden rounded-[2rem] border border-sky-400/15 bg-slate-950/65 px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
          {persona.shortLabel}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {persona.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{persona.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={persona.primaryCta.href}
            className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
          >
            {persona.primaryCta.label}
          </Link>
          <Link
            href={persona.secondaryCta.href}
            className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
          >
            {persona.secondaryCta.label}
          </Link>
        </div>
      </section>

      <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-6 text-base leading-7 text-slate-100">
        {foundingRule}
      </div>

      <section className="grid gap-8 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">Who this is for</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {persona.whoTheyAre.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">What they want</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {persona.whatTheyWant.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <h2 className="text-xl font-semibold text-white">Objections we answer</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {persona.objections.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Messaging"
          title="Pillars for this audience"
          description="Use these lines in ads, social posts, and outreach so the brand stays consistent."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {persona.messagingPillars.map((pillar) => (
            <div
              key={pillar}
              className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-sm leading-6 text-emerald-50"
            >
              {pillar}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Belief hooks</h2>
        <p className="text-sm text-slate-400">
          Example belief titles that resonate with this persona — send them to the full belief pages.
        </p>
        <ul className="flex flex-wrap gap-3">
          {persona.beliefHooks.map((hook) => (
            <li
              key={hook}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200"
            >
              {hook}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={persona.primaryCta.href}
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          {persona.primaryCta.label}
        </Link>
        <Link
          href="/start"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Other paths
        </Link>
      </div>
    </main>
  );
}
