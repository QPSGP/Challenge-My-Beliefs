import Link from "next/link";

import { CategoryBadge } from "@/components/category-badge";
import { OutcomeBadge } from "@/components/outcome-badge";
import type { Belief } from "@/lib/types";

type LeadBeliefSpotlightProps = {
  belief: Belief;
};

export function LeadBeliefSpotlight({ belief }: LeadBeliefSpotlightProps) {
  return (
    <section className="rounded-[2rem] border border-sky-400/25 bg-gradient-to-br from-sky-400/10 to-slate-950/80 p-8 shadow-[0_18px_70px_rgba(14,165,233,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          Lead belief · #1
        </p>
        <OutcomeBadge outcome={belief.outcome} />
      </div>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {belief.title}
      </h2>

      <div className="mt-3">
        <CategoryBadge category={belief.category} linkToFilter />
      </div>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">{belief.statement}</p>

      {belief.evidence.length > 0 ? (
        <ul className="mt-6 space-y-2 text-sm text-slate-300">
          {belief.evidence.map((item) => (
            <li key={item} className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/beliefs/${belief.id}`}
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-6 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Read and challenge this belief
        </Link>
        <Link
          href="/beliefs"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          All beliefs
        </Link>
      </div>
    </section>
  );
}
