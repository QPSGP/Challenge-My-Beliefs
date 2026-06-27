import type { BeliefResource, BeliefResourceKind } from "@/lib/types";

const kindLabels: Record<BeliefResourceKind, string> = {
  study: "Study",
  data: "Data",
  book: "Book",
  article: "Article",
  reference: "Reference",
};

type BeliefResourcesListProps = {
  resources: BeliefResource[];
  compact?: boolean;
};

export function BeliefResourcesList({ resources, compact = false }: BeliefResourcesListProps) {
  if (resources.length === 0) {
    return null;
  }

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {resources.map((resource) => (
        <article
          key={`${resource.url}-${resource.title}`}
          className={
            compact
              ? "rounded-xl border border-slate-800 bg-slate-900/60 p-3"
              : "rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200">
              {kindLabels[resource.kind]}
            </span>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-200 hover:text-sky-100"
            >
              {resource.title} ↗
            </a>
          </div>
          <p className={`leading-6 text-slate-300 ${compact ? "mt-2 text-xs" : "mt-3 text-sm"}`}>
            {resource.note}
          </p>
        </article>
      ))}
    </div>
  );
}
