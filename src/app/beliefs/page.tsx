import { BeliefCard } from "@/components/belief-card";
import { SectionHeading } from "@/components/section-heading";
import { foundingRule } from "@/lib/site-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function BeliefsPage() {
  const beliefs = await getBeliefs();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Beliefs"
        title="Your public belief list"
        description="Each belief is a living record. Open any card to read the full claim, see challenges, and submit evidence that tests it against reality."
      />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-100">
        {foundingRule}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {beliefs.map((belief, index) => (
          <div key={belief.id} className="relative">
            <span className="absolute -top-3 left-4 z-10 rounded-full border border-sky-400/30 bg-slate-950 px-3 py-1 text-xs font-semibold text-sky-300">
              #{index + 1}
            </span>
            <BeliefCard belief={belief} />
          </div>
        ))}
      </div>
    </main>
  );
}
