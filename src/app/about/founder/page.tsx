import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import {
  affidavitCommitments,
  commercialMaxims,
  founderIntro,
  founderPurposePoints,
  founderPurposeSummary,
  founderSiteConnection,
  universalConstitution,
} from "@/lib/founder-content";
import { foundingRule } from "@/lib/site-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AboutFounderPage() {
  const beliefs = await getBeliefs();
  const founderBeliefs = beliefs.filter((belief) => belief.category === "Founder's Creed");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <Link href="/about" className="text-sm text-sky-300 hover:text-sky-200">
        ← About the project
      </Link>

      <SectionHeading
        eyebrow="About the founder"
        title="Purpose, commitments, and tested convictions"
        description={founderIntro}
      />

      <div className="rounded-[2rem] border border-violet-400/20 bg-violet-400/10 p-8 text-lg leading-8 text-slate-100">
        <p className="font-semibold text-violet-100">My purpose in life</p>
        <p className="mt-4">{founderPurposeSummary}</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Personal commitments</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {founderPurposePoints.map((point) => (
            <article
              key={point.title}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{point.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
        <h2 className="text-2xl font-semibold text-white">{universalConstitution.title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-300">{universalConstitution.preamble}</p>
        <ol className="mt-6 list-decimal space-y-4 pl-6 text-base leading-7 text-slate-200">
          {universalConstitution.articles.map((article) => (
            <li key={article}>{article}</li>
          ))}
        </ol>
        <h3 className="mt-10 text-lg font-semibold text-sky-200">Six axioms</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-slate-300">
          {universalConstitution.axioms.map((axiom) => (
            <li key={axiom}>{axiom}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8">
        <h2 className="text-2xl font-semibold text-amber-100">Affidavit of agreement</h2>
        <p className="mt-3 text-base leading-7 text-amber-50/80">
          The founder&apos;s oath to live by contextual honesty and to support value-enhancing
          actions in law, commerce, and public life. These commitments shape how this platform
          interprets evidence and rulings.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {affidavitCommitments.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-amber-400/15 bg-slate-950/60 p-5"
            >
              <p className="font-semibold text-amber-100">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
          <h3 className="text-lg font-semibold text-white">Maxims of fundamental commercial law</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-7 text-slate-300">
            {commercialMaxims.map((maxim) => (
              <li key={maxim}>{maxim}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="On this site"
          title="Founder's creed — beliefs under challenge"
          description={founderSiteConnection}
        />
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-200">
          {foundingRule}
        </div>
        {founderBeliefs.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {founderBeliefs.map((belief) => (
              <li key={belief.id}>
                <Link
                  href={`/beliefs/${belief.id}`}
                  className="block rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-sky-400/40"
                >
                  <p className="font-semibold text-white">{belief.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                    {belief.statement}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-sky-300">View belief & challenges →</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Founder beliefs load from the site database. Use the founder dashboard to sync the
            latest seed if they are not visible yet.
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Browse all beliefs
        </Link>
        <Link
          href="/definitions"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Definitions
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          How the site works
        </Link>
      </div>
    </main>
  );
}
