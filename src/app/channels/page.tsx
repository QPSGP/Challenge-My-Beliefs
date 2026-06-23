import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { channelPages, platformChannels } from "@/lib/site-content";
import type { ChannelSlug } from "@/lib/types";

const channelHref: Record<ChannelSlug, string> = {
  community: "/community",
  podcast: "/channels/podcast",
  social: "/channels/social",
};

const statusLabel: Record<(typeof channelPages)[ChannelSlug]["status"], string> = {
  beta: "Beta",
  preview: "Preview",
  planned: "Planned",
};

const statusClass: Record<(typeof channelPages)[ChannelSlug]["status"], string> = {
  beta: "text-emerald-300",
  preview: "text-violet-300",
  planned: "text-slate-500",
};

export default function ChannelsPage() {
  const channels = Object.values(channelPages);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Platform channels"
        title="Website first — amplification next"
        description="The website is the source of truth. Social, podcast, and community channels bring people in and send serious challenges back here."
      />

      <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-6 text-base leading-7 text-slate-100">
        {platformChannels[0].detail}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {channels.map((channel) => (
          <Link
            key={channel.slug}
            href={channelHref[channel.slug]}
            className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-sky-400/30"
          >
            <p
              className={`text-sm font-semibold uppercase tracking-[0.18em] ${statusClass[channel.status]}`}
            >
              {statusLabel[channel.status]} channel
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{channel.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{channel.description}</p>
            <p className="mt-4 text-sm font-medium text-sky-300">Learn more →</p>
          </Link>
        ))}
      </div>

      <Link
        href="/roadmap"
        className="self-start rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
      >
        View full roadmap
      </Link>
    </main>
  );
}
