import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { groupDefinitionsDocument } from "@/lib/glossary-seed";
import { getDefinitionsDocument } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DefinitionsPage() {
  const document = await getDefinitionsDocument();
  const definitionSections = groupDefinitionsDocument(document);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Definitions"
        title="Key words, in plain language"
        description={document.intro}
      />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-200">
        Unfamiliar with a label on a belief page? Start with{" "}
        <strong className="text-white">Belief</strong>,{" "}
        <strong className="text-white">Challenge</strong>, and{" "}
        <strong className="text-white">Ruling</strong> below. The{" "}
        <Link href="/about" className="font-semibold text-sky-200 hover:text-sky-100">
          About
        </Link>{" "}
        page explains how the full process works step by step.
      </div>

      {definitionSections.map((section) => (
        <section key={section.title} className="space-y-6">
          <SectionHeading
            eyebrow="Section"
            title={section.title}
            description={section.description}
          />

          <dl className="grid gap-4 sm:grid-cols-2">
            {section.entries.map((entry) => (
              <div
                key={`${section.title}-${entry.term}`}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <dt className="text-lg font-semibold text-white">{entry.term}</dt>
                <dd className="mt-3 text-sm leading-7 text-slate-300">{entry.definition}</dd>
                {entry.example ? (
                  <dd className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-400">
                    <span className="font-semibold text-slate-500">Example: </span>
                    {entry.example}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Browse beliefs
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
