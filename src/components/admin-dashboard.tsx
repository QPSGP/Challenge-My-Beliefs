"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AddBeliefForm } from "@/components/add-belief-form";
import { AdminAccordionSection } from "@/components/admin-accordion-section";
import { BeliefOrderEditor } from "@/components/belief-order-editor";
import { CategoryBadge } from "@/components/category-badge";
import { ChannelWaitlistPanel } from "@/components/channel-waitlist-panel";
import { OutcomeBadge } from "@/components/outcome-badge";
import { SupabaseSqlSetupPanel } from "@/components/supabase-sql-setup-panel";
import { SystemStatusPanel } from "@/components/system-status-panel";
import { WaitlistExportButton } from "@/components/waitlist-export-button";
import { founderRequestInit, getFounderKey, setFounderKey } from "@/lib/founder-client";
import type { SystemStatus } from "@/lib/system-status";
import type { Belief, Challenge, ChannelInterest } from "@/lib/types";

type AdminDashboardProps = {
  initialBeliefs: Belief[];
  initialChallenges: Challenge[];
  communityMembers: ChannelInterest[];
  podcastWaitlist: ChannelInterest[];
  socialWaitlist: ChannelInterest[];
  bundledBeliefCount: number;
  supabaseConfigured: boolean;
  usingSupabase: boolean;
  supabaseTablesReady: boolean;
  systemStatus: SystemStatus;
};

export function AdminDashboard({
  initialBeliefs,
  initialChallenges,
  communityMembers,
  podcastWaitlist,
  socialWaitlist,
  bundledBeliefCount,
  supabaseConfigured,
  usingSupabase,
  supabaseTablesReady,
  systemStatus,
}: AdminDashboardProps) {
  const router = useRouter();
  const [founderKey, setFounderKeyState] = useState("");
  const [message, setMessage] = useState("");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [sessionSignedIn, setSessionSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    void fetch("/api/admin/session", { credentials: "include" })
      .then((response) => response.json())
      .then((data: { signedIn?: boolean }) => {
        setSessionSignedIn(Boolean(data.signedIn));
      })
      .catch(() => {
        setSessionSignedIn(false);
      });
  }, []);

  const allWaitlistEntries = [...communityMembers, ...podcastWaitlist, ...socialWaitlist];

  function toggleSection(id: string) {
    setOpenSection((current) => (current === id ? null : id));
  }

  async function markReviewed(challengeId: string) {
    setMessage("");

    const response = await fetch("/api/challenges", {
      method: "PATCH",
      ...founderRequestInit(founderKey),
      body: JSON.stringify({ id: challengeId }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Could not mark challenge reviewed.");
      return;
    }

    setMessage("Challenge marked reviewed.");
    router.refresh();
  }

  const beliefOrderKey = initialBeliefs.map((belief) => belief.id).join("|");
  const pendingChallenges = initialChallenges.filter(
    (challenge) => challenge.status === "pending",
  );
  const needsSeed =
    bundledBeliefCount > initialBeliefs.length && bundledBeliefCount >= 20;

  async function loadSeedBeliefs() {
    setMessage("");

    const response = await fetch("/api/beliefs/seed", {
      method: "POST",
      ...founderRequestInit(founderKey),
    });

    const data = (await response.json()) as { error?: string; count?: number };

    if (!response.ok) {
      setMessage(data.error ?? "Could not load the benevolent society beliefs.");
      return;
    }

    setMessage(`Loaded ${data.count ?? bundledBeliefCount} beliefs from the site seed file.`);
    router.refresh();
  }

  async function migrateToSupabase() {
    setMessage("");

    const response = await fetch("/api/admin/migrate-supabase", {
      method: "POST",
      ...founderRequestInit(founderKey),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
      counts?: { beliefs: number; challenges: number; revisions: number; waitlist: number };
    };

    if (!response.ok) {
      setMessage(data.error ?? "Could not migrate to Supabase.");
      return;
    }

    const counts = data.counts;
    setMessage(
      counts
        ? `${data.message ?? "Migration complete."} Beliefs: ${counts.beliefs}, challenges: ${counts.challenges}, revisions: ${counts.revisions}, waitlist: ${counts.waitlist}.`
        : (data.message ?? "Migration complete."),
    );
    router.refresh();
  }

  async function signInWithSession() {
    setMessage("");

    const response = await fetch("/api/admin/session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: founderKey }),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
      signedIn?: boolean;
    };

    if (!response.ok) {
      setMessage(data.error ?? "Could not sign in.");
      setSessionSignedIn(false);
      return;
    }

    setSessionSignedIn(Boolean(data.signedIn));
    setMessage(data.message ?? "Signed in for 7 days.");
  }

  async function signOutSession() {
    setMessage("");

    const response = await fetch("/api/admin/session", {
      method: "DELETE",
      credentials: "include",
    });

    const data = (await response.json()) as { message?: string; signedIn?: boolean };

    if (!response.ok) {
      setMessage("Could not sign out.");
      return;
    }

    setSessionSignedIn(Boolean(data.signedIn));
    setMessage(data.message ?? "Signed out.");
  }

  async function setupDatabase() {
    setMessage("Setting up database…");

    const response = await fetch("/api/admin/setup-database", {
      method: "POST",
      ...founderRequestInit(founderKey),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
      beliefCount?: number;
    };

    if (!response.ok) {
      setMessage(data.error ?? "Database setup failed.");
      return;
    }

    setMessage(
      data.message ??
        `Database ready. Loaded ${data.beliefCount ?? bundledBeliefCount} beliefs.`,
    );
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {message ? (
        <p className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-5 py-4 text-sm text-sky-100">
          {message}
        </p>
      ) : null}

      <AdminAccordionSection
        id="system-status"
        title="System status"
        description="Confirm production is ready for founder edits and public data."
        isOpen={openSection === "system-status"}
        onToggle={toggleSection}
      >
        <SystemStatusPanel status={systemStatus} embedded />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="founder-access"
        title="Founder access"
        description="Sign in with your founder key for a 7-day session, or save the key in this browser."
        isOpen={openSection === "founder-access"}
        onToggle={toggleSection}
      >
        <div className="space-y-4">
          {sessionSignedIn === null ? (
            <p className="text-sm text-slate-400">Checking sign-in status…</p>
          ) : (
            <p
              className={`text-sm font-medium ${sessionSignedIn ? "text-emerald-300" : "text-amber-300"}`}
            >
              {sessionSignedIn
                ? "Signed in — founder actions use your secure session."
                : systemStatus.founderKeyRequired
                  ? "Not signed in — enter your founder key below."
                  : "Founder key not required in this environment."}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40"
              value={founderKey}
              onChange={(event) => setFounderKeyState(event.target.value)}
              placeholder="Founder key"
            />
            <button
              type="button"
              onClick={() => setFounderKeyState(getFounderKey())}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
            >
              Load saved
            </button>
            <button
              type="button"
              onClick={() => {
                setFounderKey(founderKey);
                setMessage("Founder key saved in this browser.");
              }}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
            >
              Save key
            </button>
          </div>

          {systemStatus.founderKeyRequired ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void signInWithSession()}
                className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-5 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/25"
              >
                Sign in (7 days)
              </button>
              <button
                type="button"
                onClick={() => void signOutSession()}
                className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 hover:border-sky-400/40"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </AdminAccordionSection>

      {supabaseConfigured && !supabaseTablesReady ? (
        <>
          <AdminAccordionSection
            id="supabase-sql"
            title="Create tables in Supabase"
            description="Copy SQL into Supabase if the one-click setup button is not available."
            isOpen={openSection === "supabase-sql"}
            onToggle={toggleSection}
            tone="amber"
          >
            <SupabaseSqlSetupPanel embedded />
          </AdminAccordionSection>

          <AdminAccordionSection
            id="setup-database"
            title="Setup database and load beliefs"
            description="Load all 30 benevolent society beliefs into Supabase after the schema exists."
            isOpen={openSection === "setup-database"}
            onToggle={toggleSection}
            tone="emerald"
          >
            <button
              type="button"
              onClick={() => void setupDatabase()}
              className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-5 py-3 text-sm font-semibold text-emerald-50 hover:bg-emerald-300/25"
            >
              Setup database and load beliefs
            </button>
          </AdminAccordionSection>
        </>
      ) : null}

      {needsSeed && supabaseTablesReady ? (
        <AdminAccordionSection
          id="load-seed"
          title="Load benevolent society beliefs"
          description={`The live site shows ${initialBeliefs.length} beliefs, but the seed file has ${bundledBeliefCount}.`}
          badge={`${initialBeliefs.length}/${bundledBeliefCount}`}
          isOpen={openSection === "load-seed"}
          onToggle={toggleSection}
          tone="amber"
        >
          <p className="text-sm leading-6 text-amber-50/80">
            Load them now to replace the current live list with the full unified benevolent society
            set (core ten plus extended list).
          </p>
          <button
            type="button"
            onClick={() => void loadSeedBeliefs()}
            className="mt-4 rounded-full border border-amber-300/40 bg-amber-300/15 px-5 py-3 text-sm font-semibold text-amber-50 hover:bg-amber-300/25"
          >
            Load {bundledBeliefCount} benevolent society beliefs
          </button>
        </AdminAccordionSection>
      ) : null}

      {supabaseConfigured && supabaseTablesReady ? (
        <AdminAccordionSection
          id="migrate-supabase"
          title="Import into Supabase"
          description="Copy beliefs, challenges, revisions, and waitlist from JSON/Blob into Postgres."
          isOpen={openSection === "migrate-supabase"}
          onToggle={toggleSection}
          tone="sky"
        >
          <button
            type="button"
            onClick={() => void migrateToSupabase()}
            className="rounded-full border border-sky-300/40 bg-sky-300/15 px-5 py-3 text-sm font-semibold text-sky-50 hover:bg-sky-300/25"
          >
            {usingSupabase ? "Re-import from JSON/Blob" : "Migrate to Supabase"}
          </button>
        </AdminAccordionSection>
      ) : null}

      <AdminAccordionSection
        id="operational-tools"
        title="Operational tools"
        description="Export waitlists for outreach and check email alert configuration in System status."
        badge={String(allWaitlistEntries.length)}
        isOpen={openSection === "operational-tools"}
        onToggle={toggleSection}
        tone="sky"
      >
        <div className="flex flex-wrap gap-3">
          <WaitlistExportButton
            entries={allWaitlistEntries}
            filename="challenge-my-beliefs-all-waitlists.csv"
            label="Export all waitlists"
          />
          <WaitlistExportButton
            entries={communityMembers}
            filename="community-signups.csv"
            label="Export community"
          />
          <WaitlistExportButton
            entries={podcastWaitlist}
            filename="podcast-waitlist.csv"
            label="Export podcast"
          />
          <WaitlistExportButton
            entries={socialWaitlist}
            filename="social-waitlist.csv"
            label="Export social"
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Email alerts send when someone submits a challenge or joins a waitlist. Add{" "}
          <code className="text-sky-200">RESEND_API_KEY</code> and{" "}
          <code className="text-sky-200">FOUNDER_NOTIFY_EMAIL</code> in Vercel, then redeploy.
        </p>
      </AdminAccordionSection>

      <AdminAccordionSection
        id="community-signups"
        title="Community signups"
        description="Early members who requested to join via /community."
        badge={String(communityMembers.length)}
        isOpen={openSection === "community-signups"}
        onToggle={toggleSection}
        tone="violet"
      >
        <div className="mb-4 flex justify-end">
          <WaitlistExportButton
            entries={communityMembers}
            filename="community-signups.csv"
          />
        </div>
        <ChannelWaitlistPanel
          entries={communityMembers}
          embedded
          emptyMessage="No community signups yet."
        />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="podcast-waitlist"
        title="Podcast waitlist"
        description="People who asked to be notified when the podcast channel launches."
        badge={String(podcastWaitlist.length)}
        isOpen={openSection === "podcast-waitlist"}
        onToggle={toggleSection}
        tone="violet"
      >
        <div className="mb-4 flex justify-end">
          <WaitlistExportButton entries={podcastWaitlist} filename="podcast-waitlist.csv" />
        </div>
        <ChannelWaitlistPanel
          entries={podcastWaitlist}
          embedded
          emptyMessage="No podcast waitlist signups yet."
        />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="social-waitlist"
        title="Social waitlist"
        description="People who asked to be notified when social accounts launch."
        badge={String(socialWaitlist.length)}
        isOpen={openSection === "social-waitlist"}
        onToggle={toggleSection}
        tone="violet"
      >
        <div className="mb-4 flex justify-end">
          <WaitlistExportButton entries={socialWaitlist} filename="social-waitlist.csv" />
        </div>
        <ChannelWaitlistPanel
          entries={socialWaitlist}
          embedded
          emptyMessage="No social waitlist signups yet."
        />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="belief-order"
        title="Belief order"
        description="Position #1 is your lead belief. Reorder, then save."
        isOpen={openSection === "belief-order"}
        onToggle={toggleSection}
      >
        <BeliefOrderEditor
          key={beliefOrderKey}
          beliefs={initialBeliefs}
          founderKey={founderKey}
          onMessage={setMessage}
          embedded
        />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="add-belief"
        title="Add a new belief"
        description="New beliefs are appended to the end. Use belief order to move them."
        isOpen={openSection === "add-belief"}
        onToggle={toggleSection}
      >
        <AddBeliefForm founderKey={founderKey} onMessage={setMessage} embedded />
      </AdminAccordionSection>

      <AdminAccordionSection
        id="edit-beliefs"
        title="Edit a specific belief"
        description="Open any belief to change its statement, evidence, disproof standard, and ruling."
        badge={String(initialBeliefs.length)}
        isOpen={openSection === "edit-beliefs"}
        onToggle={toggleSection}
      >
        {initialBeliefs.length === 0 ? (
          <p className="text-sm text-slate-500">No beliefs yet.</p>
        ) : (
          <ul className="space-y-3">
            {initialBeliefs.map((belief, index) => (
              <li
                key={belief.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    #{index + 1}
                  </p>
                  <p className="mt-1 font-medium text-white">{belief.title}</p>
                  <div className="mt-2">
                    <CategoryBadge category={belief.category} />
                  </div>
                  <p className="mt-2 truncate text-sm text-slate-400">{belief.statement}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <OutcomeBadge outcome={belief.outcome} />
                  <Link
                    href={`/admin/beliefs/${belief.id}`}
                    className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
                  >
                    Edit belief
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminAccordionSection>

      <AdminAccordionSection
        id="pending-challenges"
        title="Pending challenges"
        description="Review submitted challenges and mark them reviewed when handled."
        badge={String(pendingChallenges.length)}
        isOpen={openSection === "pending-challenges"}
        onToggle={toggleSection}
        tone="emerald"
      >
        {pendingChallenges.length === 0 ? (
          <p className="text-sm text-slate-400">No pending challenges right now.</p>
        ) : (
          <div className="space-y-4">
            {pendingChallenges.map((challenge) => {
              const belief = initialBeliefs.find((item) => item.id === challenge.beliefId);

              return (
                <article
                  key={challenge.id}
                  className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-sky-300">
                    {belief?.title ?? challenge.beliefId}
                  </p>
                  <p className="mt-2 font-medium text-white">{challenge.challengerName}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{challenge.argument}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    <span className="font-semibold text-slate-500">Evidence: </span>
                    {challenge.evidence}
                  </p>
                  <button
                    type="button"
                    onClick={() => void markReviewed(challenge.id)}
                    className="mt-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20"
                  >
                    Mark reviewed
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </AdminAccordionSection>
    </div>
  );
}
