import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ChannelWaitlistForm } from "@/components/channel-waitlist-form";
import { SectionHeading } from "@/components/section-heading";
import { channelPages } from "@/lib/site-content";
import type { ChannelSlug } from "@/lib/types";

type ChannelDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ChannelDetailPage({ params }: ChannelDetailPageProps) {
  const { slug } = await params;

  if (slug === "community") {
    redirect("/community");
  }

  if (slug === "podcast") {
    redirect("/channels/podcast");
  }

  if (slug === "social") {
    redirect("/channels/social");
  }

  const channel = channelPages[slug as ChannelSlug];

  if (!channel) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 sm:px-10">
      <Link href="/channels" className="text-sm text-sky-300 hover:text-sky-200">
        ← All channels
      </Link>

      <SectionHeading
        eyebrow="Planned channel"
        title={channel.name}
        description={channel.headline}
      />

      <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8">
        <p className="text-lg leading-8 text-slate-200">{channel.detail}</p>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Planned features
          </h2>
          <ul className="mt-3 space-y-2">
            {channel.features.map((feature) => (
              <li
                key={feature}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ChannelWaitlistForm channel={channel.slug} channelName={channel.name} />
    </main>
  );
}
