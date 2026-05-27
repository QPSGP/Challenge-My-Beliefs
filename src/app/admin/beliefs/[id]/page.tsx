import Link from "next/link";
import { notFound } from "next/navigation";

import { BeliefEditor } from "@/components/belief-editor";
import { getBeliefById } from "@/lib/store";

export const dynamic = "force-dynamic";

type EditBeliefPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBeliefPage({ params }: EditBeliefPageProps) {
  const { id } = await params;
  const belief = await getBeliefById(id);

  if (!belief) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 sm:px-10">
      <div>
        <Link href="/admin" className="text-sm text-sky-300 hover:text-sky-200">
          ← Back to founder dashboard
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">{belief.title}</h1>
        <p className="mt-2 text-slate-400">Change this belief&apos;s content, evidence, and ruling.</p>
      </div>

      <BeliefEditor key={`${belief.id}-${belief.updatedAt}`} belief={belief} />
    </main>
  );
}
