import type { ChannelInterest } from "@/lib/types";

type ChannelWaitlistPanelProps = {
  entries: ChannelInterest[];
  embedded?: boolean;
  emptyMessage?: string;
};

export function ChannelWaitlistPanel({
  entries,
  embedded = false,
  emptyMessage = "No signups yet.",
}: ChannelWaitlistPanelProps) {
  const content =
    entries.length === 0 ? (
      <p className="text-sm text-slate-500">{emptyMessage}</p>
    ) : (
      <ul className="space-y-3">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                {entry.displayName ? (
                  <p className="font-medium text-white">{entry.displayName}</p>
                ) : null}
                <p className={`text-sm text-sky-300 ${entry.displayName ? "mt-1" : "font-medium text-white"}`}>
                  {entry.email}
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
            {entry.categoryInterest ? (
              <p className="mt-2 text-sm text-violet-200">Interest: {entry.categoryInterest}</p>
            ) : null}
            {entry.introduction ? (
              <p className="mt-3 text-sm leading-6 text-slate-300">{entry.introduction}</p>
            ) : null}
          </li>
        ))}
      </ul>
    );

  if (embedded) {
    return content;
  }

  return <section className="space-y-4">{content}</section>;
}
