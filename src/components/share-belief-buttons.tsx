"use client";

type ShareBeliefButtonsProps = {
  beliefId: string;
  title: string;
};

export function ShareBeliefButtons({ beliefId, title }: ShareBeliefButtonsProps) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/beliefs/${beliefId}`
      : `https://challenge-my-beliefs.vercel.app/beliefs/${beliefId}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
  }

  const tweetText = `A belief worth testing: ${title}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
      <h2 className="text-lg font-semibold text-white">Share this belief</h2>
      <p className="mt-2 text-sm text-slate-400">
        Social channel preview — invite others to read the full record and submit evidence.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void copyLink()}
          className="rounded-full border border-sky-400/40 bg-sky-400/15 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-400/25"
        >
          Copy link
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 hover:border-sky-400/40"
        >
          Share on X
        </a>
      </div>
    </div>
  );
}
