import { AdminDashboard } from "@/components/admin-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { getBeliefs, getChallenges } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [beliefs, challenges] = await Promise.all([getBeliefs(), getChallenges()]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Founder"
        title="Manage beliefs, order, and rulings"
        description="Add beliefs, set their public order, record outcomes, and review challenges. Position #1 is your lead belief."
      />

      <AdminDashboard initialBeliefs={beliefs} initialChallenges={challenges} />
    </main>
  );
}
