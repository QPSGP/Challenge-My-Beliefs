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

  if (status.persistence === "supabase") {
    return status.supabase.tablesReady;
  }

  return status.persistence === "vercel-blob" || status.blobConfigured;
}

function persistenceHint(status: SystemStatus): string | undefined {
  if (status.supabase.error && !status.supabase.tablesReady) {
    return status.supabase.error;
  }

  if (status.runtime !== "vercel" || persistenceOk(status)) {
    return undefined;
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
  const supabase = status.supabase;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <h2 className="text-xl font-semibold text-white">System status</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Use this checklist to confirm production is ready for founder edits and public data.
      </p>

      {!supabase.tablesReady && supabase.configured ? (
        <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
          <p className="font-semibold text-emerald-100">Supabase connected — one click to finish</p>
          <p className="mt-2">
            Open the green <strong>Setup database and load beliefs</strong> button below. You do not
            need to paste SQL manually unless that button fails.
          </p>
        </div>
      ) : null}

      {!supabase.configured && supabase.config.hasUrl && !supabase.config.hasServiceKey ? (
        <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-50">
          <p className="font-semibold text-amber-100">Supabase URL found — server key missing</p>
          <p className="mt-2">
            In Vercel → Settings → Environment Variables, confirm{" "}
            <code className="text-amber-100">SUPABASE_SECRET_KEY</code> or{" "}
            <code className="text-amber-100">SUPABASE_SERVICE_ROLE_KEY</code> is set, then redeploy.
          </p>
        </div>
      ) : null}

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
          label="Supabase tables"
          value={
            !supabase.configured
              ? "Not configured"
              : supabase.tablesReady
                ? `Ready (${supabase.beliefCount ?? 0} beliefs in DB)`
                : "Schema not run"
          }
          ok={supabase.configured ? supabase.tablesReady : undefined}
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
