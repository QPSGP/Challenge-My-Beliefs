import { AdminDashboard } from "@/components/admin-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { SystemStatusPanel } from "@/components/system-status-panel";
import { getBundledBeliefCount } from "@/lib/persistence";
import { getSystemStatus } from "@/lib/system-status";
import { getBeliefs, getChallenges, getChannelInterests } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [beliefs, challenges, communityMembers, bundledBeliefCount, status] = await Promise.all([
    getBeliefs(),
    getChallenges(),
    getChannelInterests("community"),
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

      <SystemStatusPanel status={status} />

      <AdminDashboard
        initialBeliefs={beliefs}
        initialChallenges={challenges}
        communityMembers={communityMembers}
        bundledBeliefCount={bundledBeliefCount}
        supabaseConfigured={status.supabase.configured}
        usingSupabase={status.persistence === "supabase" && status.supabase.tablesReady}
        supabaseTablesReady={status.supabase.tablesReady}
      />
    </main>
  );
}
