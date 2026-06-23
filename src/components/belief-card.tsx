import Link from "next/link";

import { CategoryBadge } from "@/components/category-badge";
import { OutcomeBadge } from "@/components/outcome-badge";
import type { Belief } from "@/lib/types";

type BeliefCardProps = {
  belief: Belief;
  linkToDetail?: boolean;
};

export function BeliefCard({ belief, linkToDetail = true }: BeliefCardProps) {
  const content = (
    <article className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(125,211,252,0.04),0_24px_80px_rgba(2,6,23,0.65)] transition hover:border-sky-400/30">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Belief Card</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{belief.title}</h3>
          <div className="mt-3">
            <CategoryBadge category={belief.category} />
          </div>
        </div>
        <OutcomeBadge outcome={belief.outcome} />
      </div>

      <p className="text-base leading-7 text-slate-200">{belief.statement}</p>

      <dl className="mt-6 space-y-5 text-sm text-slate-300">
        <div>
          <dt className="font-semibold uppercase tracking-[0.16em] text-slate-500">
            Confidence
          </dt>
          <dd className="mt-2 text-base text-slate-200">{belief.confidence}</dd>
        </div>

        <div>
          <dt className="font-semibold uppercase tracking-[0.16em] text-slate-500">
            Current support
          </dt>
          <dd className="mt-2">
            <ul className="space-y-2">
              {belief.evidence.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="font-semibold uppercase tracking-[0.16em] text-slate-500">
            What could disprove it
          </dt>
          <dd className="mt-2 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4 text-slate-100">
            {belief.disproof}
          </dd>
        </div>
      </dl>

      {linkToDetail ? (
        <p className="mt-6 text-sm font-medium text-sky-300">View belief and submit a challenge →</p>
      ) : null}
    </article>
  );

  if (!linkToDetail) {
    return content;
  }

  return (
    <Link href={`/beliefs/${belief.id}`} className="block h-full">
      {content}
    </Link>
  );
}
