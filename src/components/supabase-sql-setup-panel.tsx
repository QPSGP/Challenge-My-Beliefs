"use client";

import { useState } from "react";

import { GLOSSARY_SQL, SETUP_SQL } from "@/lib/supabase/setup-sql";

type SupabaseSqlSetupPanelProps = {
  embedded?: boolean;
  variant?: "full" | "glossary";
};

export function SupabaseSqlSetupPanel({
  embedded = false,
  variant = "full",
}: SupabaseSqlSetupPanelProps) {
  const [copied, setCopied] = useState(false);
  const sql = variant === "glossary" ? GLOSSARY_SQL : SETUP_SQL;

  async function copySql() {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const body = (
    <>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-amber-50/90">
        <li>
          Open your Supabase project → <strong>SQL Editor</strong> → <strong>New query</strong>
        </li>
        <li>
          Click <strong>Copy SQL</strong> below, paste into the editor, click <strong>Run</strong>
        </li>
        {variant === "full" ? (
          <li>
            Return here and click <strong>Setup database and load beliefs</strong> (or Load beliefs)
          </li>
        ) : (
          <li>
            Return here and use <strong>Restore default glossary</strong> or edit definitions below
          </li>
        )}
      </ol>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void copySql()}
          className="rounded-full border border-amber-300/40 bg-amber-300/15 px-5 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-300/25"
        >
          {copied ? "Copied!" : "Copy SQL"}
        </button>
        <a
          href="https://supabase.com/dashboard/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Open Supabase dashboard
        </a>
      </div>

      <textarea
        readOnly
        value={sql}
        className="mt-4 h-48 w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs text-slate-300"
        aria-label="SQL to create database tables"
      />
    </>
  );

  if (embedded) {
    return body;
  }

  return (
    <section className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
      <h2 className="text-xl font-semibold text-amber-100">
        {variant === "glossary" ? "Glossary tables in Supabase" : "Create tables in Supabase (2 minutes)"}
      </h2>
      <div className="mt-3">{body}</div>
    </section>
  );
}
