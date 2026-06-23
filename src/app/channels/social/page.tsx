import Link from "next/link";

import { ChannelWaitlistForm } from "@/components/channel-waitlist-form";
import { SectionHeading } from "@/components/section-heading";
import { socialPlatforms } from "@/lib/social-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function SocialChannelPage() {
  const beliefs = await getBeliefs();
  const leadBelief = beliefs[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 sm:px-10">
      <Link href="/channels" className="text-sm text-sky-300 hover:text-sky-200">
        ← All channels
      </Link>

      <SectionHeading
        eyebrow="Social · Preview"
        title="Short-form discovery"
        description="Clips, quotes, and debate highlights that drive people back to the full belief record on the site."
      />

      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8">
        <p className="text-lg leading-8 text-slate-200">
          Every social post links to a belief page on this website — never a thread without context.
          Share buttons are already on each belief detail page.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Planned formats</h2>
        <ul className="space-y-3">
          {socialPlatforms.map((platform) => (
            <li
              key={platform.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4"
            >
              <p className="font-medium text-white">{platform.name}</p>
              <p className="mt-1 text-sm text-slate-400">{platform.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {leadBelief ? (
        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-sky-300">Try it now</p>
          <p className="mt-2 font-medium text-white">{leadBelief.title}</p>
          <Link
            href={`/beliefs/${leadBelief.id}`}
            className="mt-4 inline-block text-sm font-semibold text-sky-200 hover:text-sky-100"
          >
            Open belief → use Share this belief
          </Link>
        </div>
      ) : null}

      <ChannelWaitlistForm channel="social" channelName="Social" />

      <Link
        href="/community"
        className="self-start rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-200 hover:bg-emerald-400/20"
      >
        Join the community →
      </Link>
    </main>
  );
}
