import Link from "next/link";
import { notFound } from "next/navigation";

import { BeliefCard } from "@/components/belief-card";
import { BeliefCategoryNav } from "@/components/belief-category-nav";
import { SectionHeading } from "@/components/section-heading";
import {
  filterBeliefsByCategory,
  getSortedCategories,
  slugToCategory,
} from "@/lib/categories";
import { foundingRule } from "@/lib/site-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const beliefs = await getBeliefs();
  const categories = getSortedCategories(beliefs);
  const category = slugToCategory(slug, categories);

  if (!category) {
    notFound();
  }

  const filtered = filterBeliefsByCategory(beliefs, category);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <Link href="/categories" className="text-sm text-sky-300 hover:text-sky-200">
        ← All categories
      </Link>

      <SectionHeading
        eyebrow="Category"
        title={category}
        description={`${filtered.length} belief${filtered.length === 1 ? "" : "s"} in this category. Each can be read, challenged, and tracked through your public ruling process.`}
      />

      <BeliefCategoryNav categories={categories} activeCategory={category} />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-100">
        {foundingRule}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400">No beliefs in this category yet.</p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          {filtered.map((belief, index) => (
            <div key={belief.id} className="relative">
              <span className="absolute -top-3 left-4 z-10 rounded-full border border-sky-400/30 bg-slate-950 px-3 py-1 text-xs font-semibold text-sky-300">
                #{index + 1}
              </span>
              <BeliefCard belief={belief} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
