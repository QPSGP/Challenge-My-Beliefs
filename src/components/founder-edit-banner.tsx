import Link from "next/link";

type FounderEditBannerProps = {
  beliefId: string;
  beliefTitle: string;
};

export function FounderEditBanner({ beliefId, beliefTitle }: FounderEditBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-400/25 bg-amber-400/10 px-5 py-4">
      <p className="text-sm text-amber-100">
        <span className="font-semibold uppercase tracking-[0.14em]">Founder</span> — edit{" "}
        <span className="text-white">{beliefTitle}</span>
      </p>
      <Link
        href={`/admin/beliefs/${beliefId}`}
        className="rounded-full border border-amber-400/40 bg-amber-400/15 px-5 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-400/25"
      >
        Edit this belief
      </Link>
    </div>
  );
}
