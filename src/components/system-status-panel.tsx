import type { SystemStatus } from "@/lib/system-status";

type SystemStatusPanelProps = {
  status: SystemStatus;
};

function StatusRow({
  label,
  value,
  ok,
  hint,
}: {
  label: string;
  value: string;
  ok?: boolean;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p
        className={`mt-2 font-medium ${ok === undefined ? "text-white" : ok ? "text-emerald-300" : "text-amber-300"}`}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-sm leading-6 text-slate-400">{hint}</p> : null}
    </div>
  );
}

export function SystemStatusPanel({ status }: SystemStatusPanelProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <h2 className="text-xl font-semibold text-white">System status</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Use this checklist to confirm production is ready for founder edits and public data.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatusRow
          label="Runtime"
          value={status.runtime === "vercel" ? "Vercel production" : "Local development"}
        />
        <StatusRow
          label="Persistence"
          value={status.persistence === "vercel-blob" ? "Vercel Blob" : "Local JSON files"}
          ok={status.runtime === "local" || status.blobConfigured}
          hint={
            status.runtime === "vercel" && !status.blobConfigured
              ? "Connect Blob in Vercel → Storage → Create Blob → connect project → redeploy."
              : undefined
          }
        />
        <StatusRow
          label="Founder key"
          value={status.founderKeyRequired ? "Required in production" : "Not set (open founder APIs)"}
          ok={status.founderKeyRequired}
          hint={
            status.founderKeyRequired
              ? "Set FOUNDER_KEY in Vercel env vars and enter the same key in this dashboard."
              : "Optional: set FOUNDER_KEY in Vercel to lock founder routes."
          }
        />
        <StatusRow
          label="Beliefs loaded"
          value={`${status.beliefCount} / ${status.bundledBeliefCount}`}
          ok={status.beliefsSynced}
          hint={
            !status.beliefsSynced
              ? "Use the seed button below to load all benevolent society beliefs."
              : "Full benevolent society list is live."
          }
        />
        <StatusRow label="Challenges" value={String(status.challengeCount)} />
        <StatusRow label="Belief revisions" value={String(status.revisionCount)} />
        <StatusRow label="Channel waitlist" value={String(status.waitlistCount)} />
      </div>
    </section>
  );
}
