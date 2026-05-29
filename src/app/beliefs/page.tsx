import { BeliefCard } from "@/components/belief-card";
import { BeliefCategoryNav } from "@/components/belief-category-nav";
import { SectionHeading } from "@/components/section-heading";
import {
  filterBeliefsByCategory,
  getSortedCategories,
  groupBeliefsByCategory,
} from "@/lib/categories";
import { foundingRule } from "@/lib/site-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

type BeliefsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BeliefsPage({ searchParams }: BeliefsPageProps) {
  const { category: activeCategory } = await searchParams;
  const beliefs = await getBeliefs();
  const categories = getSortedCategories(beliefs);
  const filtered = filterBeliefsByCategory(beliefs, activeCategory);
  const groups = groupBeliefsByCategory(filtered);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Beliefs"
        title={activeCategory ? `Beliefs: ${activeCategory}` : "Your public belief list"}
        description={
          activeCategory
            ? `Showing beliefs in the ${activeCategory} category. Order still reflects your public ranking within this list.`
            : "Browse by category or view the full list. Each belief is a living record open to evidence-based challenge."
        }
      />

      <BeliefCategoryNav categories={categories} activeCategory={activeCategory} />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-100">
        {foundingRule}
      </div>

      {groups.length === 0 ? (
        <p className="text-slate-400">No beliefs in this category yet.</p>
      ) : (
        <div className="space-y-14">
          {groups.map((group) => (
            <section key={group.category} id={encodeURIComponent(group.category)} className="space-y-6">
              {!activeCategory ? (
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 pb-4">
                  <h2 className="text-2xl font-semibold text-white">{group.category}</h2>
                  <p className="text-sm text-slate-400">
                    {group.beliefs.length} belief{group.beliefs.length === 1 ? "" : "s"}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-6 xl:grid-cols-3">
                {group.beliefs.map((belief, index) => (
                  <div key={belief.id} className="relative">
                    <span className="absolute -top-3 left-4 z-10 rounded-full border border-sky-400/30 bg-slate-950 px-3 py-1 text-xs font-semibold text-sky-300">
                      #{index + 1}
                    </span>
                    <BeliefCard belief={belief} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
