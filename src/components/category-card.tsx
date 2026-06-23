import Link from "next/link";

import { categoryToSlug } from "@/lib/categories";

type CategoryCardProps = {
  category: string;
  count: number;
  preview: string;
  href?: string;
};

export function CategoryCard({ category, count, preview, href }: CategoryCardProps) {
  const destination = href ?? `/categories/${categoryToSlug(category)}`;

  return (
    <Link
      href={destination}
      className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-sky-400/30 hover:bg-slate-950"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
        Category
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white">{category}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400 line-clamp-3">{preview}</p>
      <p className="mt-4 text-sm font-medium text-sky-300">
        {count} belief{count === 1 ? "" : "s"} →
      </p>
    </Link>
  );
}
