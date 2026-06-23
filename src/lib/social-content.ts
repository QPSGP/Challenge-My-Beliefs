export const socialPlatforms = [
  {
    id: "quotes",
    name: "Belief quotes",
    description: "Shareable cards for lead beliefs, rulings, and founding rule reminders.",
    status: "planned" as const,
  },
  {
    id: "clips",
    name: "Challenge clips",
    description: "Short highlights from the strongest public challenges — always linking back to the full record.",
    status: "planned" as const,
  },
  {
    id: "updates",
    name: "Ruling updates",
    description: "When a belief is refined or changed, social posts show what shifted and why.",
    status: "planned" as const,
  },
] as const;

export function beliefShareUrl(beliefId: string, siteUrl?: string): string {
  const base = siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://challenge-my-beliefs.vercel.app";
  return `${base.replace(/\/$/, "")}/beliefs/${beliefId}`;
}

export function twitterShareUrl(text: string, url: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}
