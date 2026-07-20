import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { landingPageCopy, marketingIntro, marketingPersonas } from "@/lib/marketing-content";
import { foundingRule } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "Choose your path into Challenge My Beliefs — truth seekers, challengers, builders, and community members.",
  openGraph: {
    title: "Start here | Challenge My Beliefs",
    description:
      "Find the landing path that matches you: learn, challenge, build, or join the community.",
  },
};

export default function StartPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow={landingPageCopy.eyebrow}
        title={landingPageCopy.title}
        description={landingPageCopy.description}
      />

      <p className="max-w-3xl text-base leading-7 text-slate-300">{marketingIntro}</p>

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-100">
        {foundingRule}
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        {marketingPersonas.map((persona) => (
          <Link
            key={persona.slug}
            href={`/start/${persona.slug}`}
            className="group rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8 transition hover:border-sky-400/40 hover:bg-sky-400/5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              {persona.shortLabel}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white group-hover:text-sky-100">
              {persona.name}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">{persona.description}</p>
            <p className="mt-6 text-sm font-semibold text-sky-300">Open this path →</p>
          </Link>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Browse all beliefs
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          How it works
        </Link>
      </div>
    </main>
  );
}
