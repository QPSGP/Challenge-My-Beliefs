import { OutcomeBadge } from "@/components/outcome-badge";
import type { BeliefRevision } from "@/lib/types";

type BeliefHistoryProps = {
  revisions: BeliefRevision[];
};

const kindLabels: Record<BeliefRevision["kind"], string> = {
  created: "Created",
  content: "Content updated",
  ruling: "Ruling updated",
};

export function BeliefHistory({ revisions }: BeliefHistoryProps) {
  if (revisions.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <h2 className="text-xl font-semibold text-white">Version history</h2>
        <p className="mt-2 text-sm text-slate-400">
          No prior versions recorded yet. Edits and rulings will appear here.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <h2 className="text-xl font-semibold text-white">Version history</h2>
      <p className="mt-2 text-sm text-slate-400">
        Transparent record of how this belief has changed over time.
      </p>

      <ol className="mt-6 space-y-4">
        {revisions.map((revision) => (
          <li
            key={revision.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
                {kindLabels[revision.kind]}
              </p>
              <OutcomeBadge outcome={revision.snapshot.outcome} />
            </div>
            <p className="mt-3 font-medium text-white">{revision.snapshot.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{revision.snapshot.statement}</p>
            {revision.snapshot.rulingNote ? (
              <p className="mt-3 text-sm leading-7 text-amber-100/90">
                <span className="font-semibold text-amber-200/80">Ruling note: </span>
                {revision.snapshot.rulingNote}
              </p>
            ) : null}
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
              {new Date(revision.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
