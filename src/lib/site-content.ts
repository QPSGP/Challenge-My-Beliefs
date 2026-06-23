import type { ChannelSlug } from "@/lib/types";

export type { Belief, BeliefOutcome } from "@/lib/types";

export const foundingRule =
  "A belief changes only when stronger evidence, grounded in objective reality and interpreted with contextual honesty, shows the original belief is incorrect.";

export const processSteps = [
  {
    title: "State the belief clearly",
    description:
      "Every belief starts as a precise claim, not a vague feeling. The claim, current reasoning, and confidence level are visible from the start.",
  },
  {
    title: "Define what could disprove it",
    description:
      "A challenge is only fair if the standard for disproof is public. The platform asks what evidence would count before the debate starts.",
  },
  {
    title: "Invite structured challenges",
    description:
      "Responses should bring evidence, context, and honest interpretation. Heat without substance does not move the belief.",
  },
  {
    title: "Record the ruling",
    description:
      "Each belief ends in one of three states: unchanged, refined, or changed. The point is transparent reasoning, not performative certainty.",
  },
] as const;

export const platformChannels = [
  {
    name: "Website",
    detail:
      "The source of truth where beliefs, evidence, challenge threads, and rulings are stored.",
  },
  {
    name: "Social",
    detail:
      "Short clips, quotes, and debate highlights drive discovery and invite the best challenges back to the site.",
  },
  {
    name: "Podcast",
    detail:
      "Long-form conversations unpack the strongest disagreements and show how beliefs stand up under pressure.",
  },
  {
    name: "Community",
    detail:
      "Members help gather evidence, question assumptions, and build reputation through constructive challenges.",
  },
] as const;

export const channelPages: Record<
  ChannelSlug,
  {
    slug: ChannelSlug;
    name: string;
    headline: string;
    description: string;
    detail: string;
    status: "planned" | "preview" | "beta";
    features: string[];
  }
> = {
  social: {
    slug: "social",
    name: "Social",
    headline: "Short-form discovery",
    description:
      "Clips, quotes, and debate highlights that drive people back to the full belief record on the site.",
    detail: platformChannels[1].detail,
    status: "preview",
    features: [
      "Shareable belief cards and ruling updates",
      "Highlight the strongest public challenges",
      "Link every post back to evidence on the website",
    ],
  },
  podcast: {
    slug: "podcast",
    name: "Podcast",
    headline: "Long-form pressure testing",
    description:
      "Conversations that unpack the hardest disagreements and show how beliefs hold up under sustained scrutiny.",
    detail: platformChannels[2].detail,
    status: "preview",
    features: [
      "Episode archive tied to specific beliefs",
      "Guest challengers with structured prep",
      "Post-episode ruling updates when evidence shifts",
    ],
  },
  community: {
    slug: "community",
    name: "Community",
    headline: "Constructive participation",
    description:
      "Members gather evidence, question assumptions, and build reputation through useful challenges—not noise.",
    detail: platformChannels[3].detail,
    status: "beta",
    features: [
      "Reputation for evidence-backed challenges",
      "Moderation aligned with the founding rule",
      "Working groups around belief categories",
    ],
  },
};

export const roadmapItems = [
  {
    title: "Database (Postgres / Supabase)",
    detail: "Beliefs, challenges, revisions, and waitlist in Postgres when env vars are set.",
    status: "done" as const,
  },
  {
    title: "Belief version history",
    detail: "Public record of how each belief changed over time after rulings and edits.",
    status: "done" as const,
  },
  {
    title: "Community channel",
    detail: "Working groups by category, guidelines, and member signup at /community.",
    status: "done" as const,
  },
  {
    title: "Podcast and social previews",
    detail: "Preview pages, waitlists, and share buttons on belief pages.",
    status: "done" as const,
  },
  {
    title: "Live podcast episodes and social accounts",
    detail: "Publish episodes and connect external platforms after community beta.",
    status: "planned" as const,
  },
  {
    title: "Stronger founder auth",
    detail: "Move from shared key to signed-in founder sessions.",
    status: "planned" as const,
  },
  {
    title: "Web3 / on-chain timestamps",
    detail: "Optional integrity layer after the core experience earns trust. No token in MVP.",
    status: "future" as const,
  },
] as const;
