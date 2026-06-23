import Link from "next/link";

import { CategoryCard } from "@/components/category-card";
import { CommunityJoinForm } from "@/components/community-join-form";
import { SectionHeading } from "@/components/section-heading";
import {
  communityGuidelines,
  communityMission,
  communityParticipationSteps,
} from "@/lib/community-content";
import { categoryToSlug, groupBeliefsByCategory } from "@/lib/categories";
import { getChannelInterests, getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const [beliefs, communityMembers] = await Promise.all([
    getBeliefs(),
    getChannelInterests("community"),
  ]);
  const categoryGroups = groupBeliefsByCategory(beliefs);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-14 px-6 py-10 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-slate-950/80 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Community · Beta
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Constructive challenges, organized by category
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{communityMission}</p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white">{communityMembers.length}</span> early
            members
          </p>
          <p>
            <span className="font-semibold text-white">{beliefs.length}</span> beliefs open to
            challenge
          </p>
          <p>
            <span className="font-semibold text-white">{categoryGroups.length}</span> working group
            categories
          </p>
        </div>
        <Link
          href="#join"
          className="mt-8 inline-block rounded-full border border-emerald-400/40 bg-emerald-400/15 px-6 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/25"
        >
          Request to join
        </Link>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="How it works"
          title="Participate with evidence"
          description="The community amplifies the website — it does not replace the public record."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {communityParticipationSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Working groups"
          title="Browse by category"
          description="Each group focuses on one kind of claim. Open a group to see beliefs and join with that interest."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categoryGroups.map((group) => (
            <CategoryCard
              key={group.category}
              category={group.category}
              count={group.beliefs.length}
              preview={group.beliefs[0]?.statement ?? ""}
              href={`/community/groups/${categoryToSlug(group.category)}`}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          eyebrow="Guidelines"
          title="Community standards"
          description="Aligned with the founding rule and the challenge flow on the website."
        />
        <ul className="space-y-3">
          {communityGuidelines.map((rule) => (
            <li
              key={rule}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-sm leading-6 text-slate-300"
            >
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <CommunityJoinForm />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/beliefs"
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Browse all beliefs
        </Link>
        <Link
          href="/channels/podcast"
          className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Podcast (coming next)
        </Link>
      </div>
    </main>
  );
}
