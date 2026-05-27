"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-white">Something went wrong</h1>
      <p className="text-slate-300">
        The page could not load. Try again, or use the links below.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100"
        >
          Try again
        </button>
        <Link
          href="/about"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
        >
          About
        </Link>
        <Link
          href="/admin"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
        >
          Founder
        </Link>
        <Link
          href="/beliefs"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200"
        >
          Beliefs
        </Link>
      </div>
    </main>
  );
}
