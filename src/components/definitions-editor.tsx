"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { founderRequestInit } from "@/lib/founder-client";
import type { DefinitionsDocument, GlossaryEntry } from "@/lib/types";

type DefinitionsEditorProps = {
  initialDocument: DefinitionsDocument;
  founderKey: string;
  onMessage: (message: string) => void;
};

type FormState = {
  sectionTitle: string;
  sectionDescription: string;
  term: string;
  definition: string;
  example: string;
};

const emptyForm: FormState = {
  sectionTitle: "",
  sectionDescription: "",
  term: "",
  definition: "",
  example: "",
};

export function DefinitionsEditor({
  initialDocument,
  founderKey,
  onMessage,
}: DefinitionsEditorProps) {
  const router = useRouter();
  const [intro, setIntro] = useState(initialDocument.intro);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [pending, setPending] = useState(false);

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, GlossaryEntry[]>();

    for (const entry of [...initialDocument.entries].sort(
      (left, right) => left.sortOrder - right.sortOrder,
    )) {
      const current = groups.get(entry.sectionTitle) ?? [];
      current.push(entry);
      groups.set(entry.sectionTitle, current);
    }

    return Array.from(groups.entries());
  }, [initialDocument.entries]);

  async function saveIntro() {
    setPending(true);
    onMessage("");

    const response = await fetch("/api/definitions/meta", {
      method: "PATCH",
      ...founderRequestInit(founderKey),
      body: JSON.stringify({ intro }),
    });

    const data = (await response.json()) as { error?: string };

    setPending(false);

    if (!response.ok) {
      onMessage(data.error ?? "Could not save the page introduction.");
      return;
    }

    onMessage("Definitions introduction saved.");
    router.refresh();
  }

  async function addEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    onMessage("");

    const response = await fetch("/api/definitions", {
      method: "POST",
      ...founderRequestInit(founderKey),
      body: JSON.stringify(form),
    });

    const data = (await response.json()) as { error?: string };

    setPending(false);

    if (!response.ok) {
      onMessage(data.error ?? "Could not add definition.");
      return;
    }

    setForm(emptyForm);
    onMessage(`Added “${form.term}”.`);
    router.refresh();
  }

  async function deleteEntry(id: string, term: string) {
    setPending(true);
    onMessage("");

    const response = await fetch(`/api/definitions/${id}`, {
      method: "DELETE",
      ...founderRequestInit(founderKey),
    });

    const data = (await response.json()) as { error?: string };

    setPending(false);

    if (!response.ok) {
      onMessage(data.error ?? "Could not delete definition.");
      return;
    }

    onMessage(`Deleted “${term}”.`);
    router.refresh();
  }

  async function restoreDefaults() {
    setPending(true);
    onMessage("");

    const response = await fetch("/api/definitions/meta", {
      method: "PATCH",
      ...founderRequestInit(founderKey),
      body: JSON.stringify({ resetToSeed: true }),
    });

    const data = (await response.json()) as { error?: string; message?: string };

    setPending(false);

    if (!response.ok) {
      onMessage(data.error ?? "Could not restore default definitions.");
      return;
    }

    onMessage(data.message ?? "Default definitions restored.");
    router.refresh();
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-violet-400/40";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="block text-sm text-slate-300">
          Page introduction
          <textarea
            value={intro}
            onChange={(event) => setIntro(event.target.value)}
            rows={3}
            className={`${fieldClass} min-h-24`}
          />
        </label>
        <button
          type="button"
          disabled={pending}
          onClick={() => void saveIntro()}
          className="rounded-full border border-violet-400/40 bg-violet-400/15 px-5 py-2 text-sm font-semibold text-violet-100 hover:bg-violet-400/25 disabled:opacity-60"
        >
          Save introduction
        </button>
      </div>

      <form onSubmit={(event) => void addEntry(event)} className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <h3 className="text-lg font-semibold text-white">Add a word or phrase</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300 sm:col-span-1">
            Section title *
            <input
              required
              value={form.sectionTitle}
              onChange={(event) => setForm((current) => ({ ...current, sectionTitle: event.target.value }))}
              placeholder="Core ideas"
              className={fieldClass}
            />
          </label>
          <label className="block text-sm text-slate-300 sm:col-span-1">
            Term *
            <input
              required
              value={form.term}
              onChange={(event) => setForm((current) => ({ ...current, term: event.target.value }))}
              placeholder="Belief"
              className={fieldClass}
            />
          </label>
          <label className="block text-sm text-slate-300 sm:col-span-2">
            Section description
            <input
              value={form.sectionDescription}
              onChange={(event) =>
                setForm((current) => ({ ...current, sectionDescription: event.target.value }))
              }
              placeholder="What we mean when we talk about beliefs..."
              className={fieldClass}
            />
          </label>
          <label className="block text-sm text-slate-300 sm:col-span-2">
            Definition *
            <textarea
              required
              value={form.definition}
              onChange={(event) => setForm((current) => ({ ...current, definition: event.target.value }))}
              rows={4}
              placeholder="Plain-language explanation for the common reader."
              className={fieldClass}
            />
          </label>
          <label className="block text-sm text-slate-300 sm:col-span-2">
            Example (optional)
            <textarea
              value={form.example}
              onChange={(event) => setForm((current) => ({ ...current, example: event.target.value }))}
              rows={2}
              className={fieldClass}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-5 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/25 disabled:opacity-60"
        >
          Add definition
        </button>
      </form>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            {initialDocument.entries.length} definition
            {initialDocument.entries.length === 1 ? "" : "s"} on the public page
          </p>
          <button
            type="button"
            disabled={pending}
            onClick={() => void restoreDefaults()}
            className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-100 hover:bg-amber-400/20 disabled:opacity-60"
          >
            Restore default glossary
          </button>
        </div>

        {groupedEntries.map(([sectionTitle, entries]) => (
          <div key={sectionTitle} className="space-y-3">
            <h3 className="text-lg font-semibold text-violet-200">{sectionTitle}</h3>
            <ul className="space-y-3">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{entry.term}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{entry.definition}</p>
                      {entry.example ? (
                        <p className="mt-2 text-sm text-slate-500">Example: {entry.example}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => void deleteEntry(entry.id, entry.term)}
                      className="rounded-full border border-rose-400/30 px-4 py-2 text-sm text-rose-200 hover:bg-rose-400/10 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
