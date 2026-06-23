import Link from "next/link";
import { notFound } from "next/navigation";

import { BeliefCard } from "@/components/belief-card";
import { CommunityJoinForm } from "@/components/community-join-form";
import { SectionHeading } from "@/components/section-heading";
import { categoryToSlug, filterBeliefsByCategory, getSortedCategories, slugToCategory } from "@/lib/categories";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

type CommunityGroupPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CommunityGroupPage({ params }: CommunityGroupPageProps) {
  const { slug } = await params;
  const beliefs = await getBeliefs();
  const categories = getSortedCategories(beliefs);
  const category = slugToCategory(slug, categories);

  if (!category) {
    notFound();
  }

  const groupBeliefs = filterBeliefsByCategory(beliefs, category);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <Link href="/community" className="text-sm text-sky-300 hover:text-sky-200">
        ← Community
      </Link>

      <SectionHeading
        eyebrow="Working group"
        title={category}
        description={`Members interested in ${category} gather evidence and challenges around these ${groupBeliefs.length} public beliefs.`}
      />

      <div className="rounded-[2rem] border border-emerald-400/15 bg-emerald-400/10 p-6 text-base leading-7 text-slate-200">
        Strong contributions here should become structured challenges on the matching belief pages.
        The founder records rulings on the website — the community does not vote beliefs up or down.
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {groupBeliefs.map((belief) => (
          <BeliefCard key={belief.id} belief={belief} />
        ))}
      </div>

      <CommunityJoinForm defaultCategory={category} />

      <Link
        href={`/categories/${categoryToSlug(category)}`}
        className="self-start rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
      >
        View {category} on the public site
      </Link>
    </main>
  );
}
