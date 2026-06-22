import type { SystemStatus } from "@/lib/system-status";

type SystemStatusPanelProps = {
  status: SystemStatus;
};

function persistenceLabel(status: SystemStatus): string {
  switch (status.persistence) {
    case "supabase":
      return "Supabase (Postgres)";
    case "vercel-blob":
      return "Vercel Blob";
    default:
      return "Local JSON files";
  }
}

function persistenceOk(status: SystemStatus): boolean {
  if (status.runtime === "local") {
    return true;
  }

  return status.persistence === "supabase" || status.blobConfigured;
}

function persistenceHint(status: SystemStatus): string | undefined {
  if (status.runtime !== "vercel" || persistenceOk(status)) {
    if (status.supabaseConfigured && status.persistence !== "supabase") {
      return "Supabase env vars are set but not active. Redeploy after adding them.";
    }

    return undefined;
  }

  if (status.supabaseConfigured) {
    return "Run the SQL schema in Supabase, redeploy, then use Migrate to Supabase in this dashboard.";
  }

  return "Connect Supabase (recommended) or Vercel Blob. See SUPABASE.md or DEPLOY.md.";
}

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
          value={persistenceLabel(status)}
          ok={persistenceOk(status)}
          hint={persistenceHint(status)}
        />
        <StatusRow
          label="Supabase"
          value={status.supabaseConfigured ? "Configured" : "Not configured"}
          ok={status.supabaseConfigured}
          hint={
            status.supabaseConfigured
              ? "Using Postgres when env vars are active on this deployment."
              : "Optional but recommended. See SUPABASE.md."
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
