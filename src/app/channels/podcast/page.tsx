import Link from "next/link";

import { ChannelWaitlistForm } from "@/components/channel-waitlist-form";
import { SectionHeading } from "@/components/section-heading";
import { plannedEpisodes, podcastFormat } from "@/lib/podcast-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PodcastChannelPage() {
  const beliefs = await getBeliefs();
  const beliefMap = new Map(beliefs.map((belief) => [belief.id, belief]));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 sm:px-10">
      <Link href="/channels" className="text-sm text-sky-300 hover:text-sky-200">
        ← All channels
      </Link>

      <SectionHeading
        eyebrow="Podcast · Preview"
        title={podcastFormat.title}
        description={podcastFormat.tagline}
      />

      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8">
        <p className="text-lg leading-8 text-slate-200">{podcastFormat.description}</p>
        <p className="mt-4 text-sm text-slate-400">{podcastFormat.cadence}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Planned episodes</h2>
        <ul className="space-y-4">
          {plannedEpisodes.map((episode) => (
            <li
              key={episode.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-300">
                {episode.status}
              </p>
              <h3 className="mt-2 font-medium text-white">{episode.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{episode.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {episode.beliefIds.map((beliefId) => {
                  const belief = beliefMap.get(beliefId);
                  if (!belief) {
                    return null;
                  }

                  return (
                    <Link
                      key={beliefId}
                      href={`/beliefs/${beliefId}`}
                      className="rounded-full border border-sky-400/30 px-3 py-1 text-xs text-sky-200 hover:bg-sky-400/10"
                    >
                      {belief.title}
                    </Link>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ChannelWaitlistForm channel="podcast" channelName="Podcast" />

      <Link
        href="/community"
        className="self-start rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-200 hover:bg-emerald-400/20"
      >
        Join the community first →
      </Link>
    </main>
  );
}
