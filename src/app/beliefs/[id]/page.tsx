import Link from "next/link";
import { notFound } from "next/navigation";

import { BeliefHistory } from "@/components/belief-history";
import { BeliefResourcesList } from "@/components/belief-resources-list";
import { CategoryBadge } from "@/components/category-badge";
import { ChallengeForm } from "@/components/challenge-form";
import { ChallengeList } from "@/components/challenge-list";
import { FounderEditBanner } from "@/components/founder-edit-banner";
import { OutcomeBadge } from "@/components/outcome-badge";
import { ShareBeliefButtons } from "@/components/share-belief-buttons";
import { getBeliefRevisions } from "@/lib/revisions";
import { getBeliefById, getChallenges } from "@/lib/store";

export const dynamic = "force-dynamic";

type BeliefDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BeliefDetailPage({ params }: BeliefDetailPageProps) {
  const { id } = await params;
  const belief = await getBeliefById(id);

  if (!belief) {
    notFound();
  }

  const challenges = await getChallenges(id);
  const revisions = await getBeliefRevisions(id);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <Link href="/beliefs" className="text-sm text-sky-300 hover:text-sky-200">
        ← Back to all beliefs
      </Link>

      <FounderEditBanner beliefId={belief.id} beliefTitle={belief.title} />

      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Belief</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {belief.title}
            </h1>
            <div className="mt-3">
              <CategoryBadge category={belief.category} linkToFilter />
            </div>
          </div>
          <OutcomeBadge outcome={belief.outcome} />
        </div>

        <p className="mt-6 text-lg leading-8 text-slate-200">{belief.statement}</p>

        <dl className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Confidence
            </dt>
            <dd className="mt-2 text-slate-200">{belief.confidence}</dd>
          </div>

          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-5 lg:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              What could disprove it
            </dt>
            <dd className="mt-2 text-slate-100">{belief.disproof}</dd>
          </div>

          <div className="lg:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Current support
            </dt>
            <dd className="mt-3 space-y-2">
              {belief.evidence.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-slate-200"
                >
                  {item}
                </p>
              ))}
            </dd>
          </div>

          {belief.resources && belief.resources.length > 0 ? (
            <div className="lg:col-span-2">
              <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200/80">
                Supporting resources
              </dt>
              <dd className="mt-3 text-sm text-slate-400">
                Studies, data, books, and references that help express and test this belief.
              </dd>
              <dd className="mt-4">
                <BeliefResourcesList resources={belief.resources} />
              </dd>
            </div>
          ) : null}

          {belief.rulingNote ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 lg:col-span-2">
              <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200/80">
                Founder ruling
              </dt>
              <dd className="mt-2 text-slate-100">{belief.rulingNote}</dd>
              <dd className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
                Updated {new Date(belief.updatedAt).toLocaleString()}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <BeliefHistory revisions={revisions} />

      <ShareBeliefButtons beliefId={belief.id} title={belief.title} />

      <div className="grid gap-10 xl:grid-cols-[1fr_1.1fr]">
        <ChallengeForm beliefId={belief.id} beliefTitle={belief.title} />
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Submitted challenges</h2>
          <ChallengeList challenges={challenges} />
        </section>
      </div>
    </main>
  );
}
