export const podcastFormat = {
  title: "Challenge My Beliefs — Podcast",
  tagline: "Long-form pressure testing of public beliefs.",
  description:
    "Each episode picks a belief (or a live challenge) and walks through evidence, context, and disproof standards — the same structure as the website, in conversation.",
  cadence: "Episodes launch after the community channel opens. Early episodes will revisit the core ten.",
} as const;

export const plannedEpisodes = [
  {
    id: "ep-core-ten-preview",
    title: "Why the core ten matter for a benevolent society",
    status: "planned" as const,
    beliefIds: ["individual-life-and-property", "consent-legitimate-interaction"],
    description: "A preview conversation on the foundation beliefs and what would count as disproof.",
  },
  {
    id: "ep-truth-comfort",
    title: "Truth vs comfort — when painful honesty is required",
    status: "planned" as const,
    beliefIds: ["truth-over-comfort"],
    description: "Guest challengers bring evidence for and against prioritizing truth over social ease.",
  },
  {
    id: "ep-changed-mind",
    title: "Changing your mind in public",
    status: "planned" as const,
    beliefIds: ["changing-mind"],
    description: "How transparent belief updates build trust — with real ruling examples from the site.",
  },
] as const;
