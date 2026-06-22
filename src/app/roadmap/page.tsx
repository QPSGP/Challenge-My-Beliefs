import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { roadmapItems } from "@/lib/site-content";

const statusStyles = {
  done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  next: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  planned: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  future: "border-slate-700 bg-slate-900/80 text-slate-300",
} as const;

const statusLabels = {
  done: "Shipped",
  next: "Next up",
  planned: "Planned",
  future: "Future",
} as const;

export default function RoadmapPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 sm:px-10">
      <SectionHeading
        eyebrow="Roadmap"
        title="What is built, and what comes next"
        description="The MVP focuses on beliefs, challenges, and transparent rulings on the website. Other channels and infrastructure layers follow once the core earns trust."
      />

      <ol className="space-y-4">
        {roadmapItems.map((item) => (
          <li
            key={item.title}
            className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${statusStyles[item.status]}`}
              >
                {statusLabels[item.status]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/channels"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Explore channels
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Read the manifesto
        </Link>
      </div>
    </main>
  );
}
