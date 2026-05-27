import Link from "next/link";

import { BeliefCard } from "@/components/belief-card";
import { LeadBeliefSpotlight } from "@/components/lead-belief-spotlight";
import { SectionHeading } from "@/components/section-heading";
import { foundingRule, platformChannels, processSteps } from "@/lib/site-content";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const beliefs = await getBeliefs();
  const leadBelief = beliefs[0];
  const otherBeliefs = beliefs.slice(1);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-6 py-8 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-sky-400/15 bg-slate-950/65 px-6 py-8 shadow-[0_0_0_1px_rgba(125,211,252,0.06),0_24px_100px_rgba(2,6,23,0.72)] sm:px-10 sm:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Challenge My Beliefs
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              A public process for testing beliefs against reality.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              This project starts with your list of beliefs, invites structured challenges,
              and records whether each belief remains unchanged, becomes refined, or must
              change under the weight of stronger evidence.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-md lg:grid-cols-1">
            {[
              "Objective reality over popularity",
              "Contextual honesty over selective facts",
              "Belief updates as strength, not weakness",
            ].map((principle) => (
              <div
                key={principle}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-sm leading-6 text-slate-200"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </section>

      {leadBelief ? <LeadBeliefSpotlight belief={leadBelief} /> : null}

      <section id="rule" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <SectionHeading
          eyebrow="Founding Rule"
          title="Truth, context, and honesty set the standard."
          description="The platform should not reward noise. It should show what the belief was, what the evidence says, what context matters, and why the ruling stayed or changed."
        />

        <div className="rounded-[2rem] border border-sky-400/20 bg-sky-400/10 p-8 text-lg leading-8 text-slate-100 shadow-[0_18px_70px_rgba(14,165,233,0.12)]">
          {foundingRule}
        </div>
      </section>

      <section id="beliefs" className="space-y-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="More beliefs"
            title="The rest of the public belief list."
            description="Each card links to a full belief page where challenges are submitted and rulings are recorded."
          />
          <Link
            href="/beliefs"
            className="shrink-0 rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
          >
            View all beliefs
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {otherBeliefs.map((belief) => (
            <BeliefCard key={belief.id} belief={belief} />
          ))}
        </div>
      </section>

      <section id="process" className="space-y-10">
        <SectionHeading
          eyebrow="Challenge Flow"
          title="A repeatable structure keeps disagreement useful."
          description="The product should guide people toward evidence-based challenges instead of drifting into generic comment threads."
        />

        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Step {index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="channels" className="space-y-10">
        <SectionHeading
          eyebrow="Platform Shape"
          title="One core platform with four connected channels."
          description="The website is the home base. Social, podcast, and community are amplification layers that feed insight and participation back into the main product."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {platformChannels.map((channel) => (
            <article
              key={channel.name}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
            >
              <h3 className="text-xl font-semibold text-white">{channel.name}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{channel.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-950/70 px-6 py-8 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              MVP Direction
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with your beliefs, your rulings, and your audience.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              The first version does not need tokens or complex web3 mechanics. It needs a
              trustworthy place to publish beliefs, invite serious challenges, and document
              how evidence affects your conclusions over time.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-sm leading-7 text-slate-200">
            Phase 1 should focus on belief publishing, challenge submission, moderation,
            and transparent outcomes. Wallet identity, timestamps, and reputation layers can
            be added once the core experience earns trust.
          </div>
        </div>
      </section>
    </main>
  );
}
