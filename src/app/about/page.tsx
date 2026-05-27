import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { foundingRule, processSteps } from "@/lib/site-content";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="About"
        title="Challenge My Beliefs"
        description="A public process for testing beliefs against objective reality, with contextual honesty and transparent outcomes."
      />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-8 text-lg leading-8 text-slate-100">
        {foundingRule}
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">How it works</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
        <h2 className="text-2xl font-semibold text-white">Outcomes</h2>
        <ul className="mt-4 space-y-3 text-base leading-7 text-slate-300">
          <li>
            <strong className="text-emerald-200">Unchanged</strong> — evidence did not overturn the
            belief.
          </li>
          <li>
            <strong className="text-amber-200">Refined</strong> — the core holds, but wording or
            scope improved.
          </li>
          <li>
            <strong className="text-rose-200">Changed</strong> — reality showed the belief was
            incorrect.
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          View beliefs
        </Link>
        <Link
          href="/"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
