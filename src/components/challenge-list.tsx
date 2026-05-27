import type { Challenge } from "@/lib/types";

type ChallengeListProps = {
  challenges: Challenge[];
  emptyMessage?: string;
};

export function ChallengeList({
  challenges,
  emptyMessage = "No challenges yet. Be the first to test this belief against reality.",
}: ChallengeListProps) {
  if (challenges.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/50 p-6 text-sm leading-6 text-slate-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {challenges.map((challenge) => (
        <li
          key={challenge.id}
          className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium text-white">{challenge.challengerName}</p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-500">
              <span
                className={
                  challenge.status === "pending"
                    ? "rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-200"
                    : "rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200"
                }
              >
                {challenge.status}
              </span>
              <time dateTime={challenge.createdAt}>
                {new Date(challenge.createdAt).toLocaleString()}
              </time>
            </div>
          </div>

          <dl className="mt-5 space-y-4 text-sm text-slate-300">
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                Argument
              </dt>
              <dd className="mt-2 leading-7 text-slate-200">{challenge.argument}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                Evidence
              </dt>
              <dd className="mt-2 leading-7 text-slate-200">{challenge.evidence}</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                Context
              </dt>
              <dd className="mt-2 leading-7 text-slate-200">{challenge.context}</dd>
            </div>
            {challenge.sources ? (
              <div>
                <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Sources
                </dt>
                <dd className="mt-2 whitespace-pre-wrap leading-7 text-slate-200">
                  {challenge.sources}
                </dd>
              </div>
            ) : null}
          </dl>
        </li>
      ))}
    </ul>
  );
}
