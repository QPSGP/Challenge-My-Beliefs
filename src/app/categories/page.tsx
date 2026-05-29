import Link from "next/link";

import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import { getSortedCategories, groupBeliefsByCategory } from "@/lib/categories";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const beliefs = await getBeliefs();
  const groups = groupBeliefsByCategory(beliefs);
  const categories = getSortedCategories(beliefs);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Categories"
        title="Browse beliefs by category"
        description="Each category groups related beliefs that support a unified, benevolent society. Open a category to read and challenge every belief in that group."
      />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          View all beliefs
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <CategoryCard
            key={group.category}
            category={group.category}
            count={group.beliefs.length}
            preview={group.beliefs[0]?.statement ?? "No beliefs yet."}
          />
        ))}
      </div>

      {categories.length === 0 ? (
        <p className="text-slate-400">No categories yet. Add beliefs from the founder dashboard.</p>
      ) : null}
    </main>
  );
}
