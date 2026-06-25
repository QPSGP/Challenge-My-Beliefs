import { AdminDashboard } from "@/components/admin-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { getBundledBeliefCount } from "@/lib/persistence";
import { getSystemStatus } from "@/lib/system-status";
import { getBeliefs, getChallenges, getChannelInterests, getDefinitionsDocument } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [
    beliefs,
    challenges,
    communityMembers,
    podcastWaitlist,
    socialWaitlist,
    definitionsDocument,
    bundledBeliefCount,
    status,
  ] = await Promise.all([
    getBeliefs(),
    getChallenges(),
    getChannelInterests("community"),
    getChannelInterests("podcast"),
    getChannelInterests("social"),
    getDefinitionsDocument(),
    getBundledBeliefCount(),
    getSystemStatus(),
  ]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Founder"
        title="Manage beliefs, order, and rulings"
        description="Add beliefs, set their public order, record outcomes, and review challenges. Position #1 is your lead belief."
      />

      <AdminDashboard
        initialBeliefs={beliefs}
        initialChallenges={challenges}
        communityMembers={communityMembers}
        podcastWaitlist={podcastWaitlist}
        socialWaitlist={socialWaitlist}
        definitionsDocument={definitionsDocument}
        bundledBeliefCount={bundledBeliefCount}
        supabaseConfigured={status.supabase.configured}
        usingSupabase={status.persistence === "supabase" && status.supabase.tablesReady}
        supabaseTablesReady={status.supabase.tablesReady}
        systemStatus={status}
      />
    </main>
  );
}
