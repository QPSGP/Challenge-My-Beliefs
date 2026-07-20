export type MarketingPersona = {
  slug: string;
  name: string;
  shortLabel: string;
  headline: string;
  description: string;
  whoTheyAre: string[];
  whatTheyWant: string[];
  objections: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  beliefHooks: string[];
  messagingPillars: string[];
};

export const marketingIntro =
  "Challenge My Beliefs attracts people who care about truth under pressure — not applause. These personas guide SEO, landing pages, and channel messaging.";

export const marketingPersonas: MarketingPersona[] = [
  {
    slug: "truth-seekers",
    name: "The Truth Seeker",
    shortLabel: "Truth seekers",
    headline: "Test what you believe — in public, with evidence.",
    description:
      "Curious adults who want clearer thinking and are willing to update when reality demands it. They discover the site through search, shares, and definitions.",
    whoTheyAre: [
      "Read philosophy, science, or policy seriously",
      "Frustrated by tribal debate and slogan wars",
      "Want a fair standard for changing their mind",
    ],
    whatTheyWant: [
      "A clear process for challenging claims",
      "Definitions they can trust",
      "Beliefs backed by sources, not vibes",
    ],
    objections: [
      "Is this just ideology dressed as open-mindedness?",
      "Will my challenge be ignored?",
      "Why should I trust the founder’s rulings?",
    ],
    primaryCta: { label: "Browse beliefs", href: "/beliefs" },
    secondaryCta: { label: "Read definitions", href: "/definitions" },
    beliefHooks: [
      "Truth matters more than comfort",
      "Changing your mind is strength",
      "Test claims against evidence",
    ],
    messagingPillars: [
      "Objective reality over popularity",
      "Contextual honesty over selective facts",
      "Transparent rulings: unchanged, refined, or changed",
    ],
  },
  {
    slug: "challengers",
    name: "The Challenger",
    shortLabel: "Challengers",
    headline: "Bring stronger evidence. Force a public ruling.",
    description:
      "People who enjoy structured disagreement — lawyers, analysts, activists, and sharp online debaters who want a real venue, not a pile-on.",
    whoTheyAre: [
      "Already argue online or in communities",
      "Care about sources, context, and standards",
      "Want their challenge on a permanent record",
    ],
    whatTheyWant: [
      "A clear disproof standard before they write",
      "Visibility for serious challenges",
      "Respect for evidence over volume",
    ],
    objections: [
      "Will the founder just dismiss me?",
      "Is this a trap for critics?",
      "Why fill out a form instead of commenting?",
    ],
    primaryCta: { label: "Pick a belief to challenge", href: "/beliefs" },
    secondaryCta: { label: "How the process works", href: "/about" },
    beliefHooks: [
      "Free speech and honest challenge",
      "Context matters as much as facts",
      "Expertise is not infallible",
    ],
    messagingPillars: [
      "Every belief lists what would disprove it",
      "Challenges need argument, evidence, and context",
      "Rulings are public — including when the belief holds",
    ],
  },
  {
    slug: "builders",
    name: "The Value Builder",
    shortLabel: "Builders & producers",
    headline: "A public creed for people who produce values.",
    description:
      "Entrepreneurs, professionals, and independent thinkers drawn to prosperity, self-responsibility, and laissez-faire ethics — not political theater.",
    whoTheyAre: [
      "Build businesses or careers through production",
      "Resonate with individualism and property rights",
      "Want ideas that survive challenge, not dogma",
    ],
    whatTheyWant: [
      "A founder story they can evaluate",
      "Beliefs about rights, markets, and morality under fire",
      "Community of serious participants — not noise",
    ],
    objections: [
      "Is this Neo-Tech / Objectivist niche only?",
      "Will critics be welcome?",
      "Is there a community or only a monologue?",
    ],
    primaryCta: { label: "About the founder", href: "/about/founder" },
    secondaryCta: { label: "Founder’s Creed beliefs", href: "/categories/founder-s-creed" },
    beliefHooks: [
      "Produce values as a laissez-faire capitalist",
      "No initiatory force, fraud, or coercion",
      "I am responsible for my prosperity and happiness",
    ],
    messagingPillars: [
      "Hold supreme the life and property of the individual",
      "Support value producers; oppose value destroyers",
      "Beliefs are published to be pressure-tested",
    ],
  },
  {
    slug: "community-members",
    name: "The Community Member",
    shortLabel: "Community",
    headline: "Gather evidence. Join a working group. Stay constructive.",
    description:
      "Early members who want to help gather sources, join category groups, and build reputation through useful challenges — not performative conflict.",
    whoTheyAre: [
      "Want belonging around serious ideas",
      "Prefer structured participation to drive-by comments",
      "May join podcast or social waitlists later",
    ],
    whatTheyWant: [
      "Clear guidelines and category groups",
      "A path from signup to contribution",
      "Updates when channels launch",
    ],
    objections: [
      "Is the community real yet or just a waitlist?",
      "What am I committing to?",
      "Will this stay civil?",
    ],
    primaryCta: { label: "Join the community beta", href: "/community" },
    secondaryCta: { label: "Channel waitlists", href: "/channels" },
    beliefHooks: [
      "Responsibility alongside rights",
      "Family and community first",
      "Teach people to help themselves",
    ],
    messagingPillars: [
      "Constructive challenges earn reputation",
      "Working groups by belief category",
      "Website remains the source of truth",
    ],
  },
];

export function getPersonaBySlug(slug: string): MarketingPersona | undefined {
  return marketingPersonas.find((persona) => persona.slug === slug);
}

export const seoDefaults = {
  titleTemplate: "%s | Challenge My Beliefs",
  defaultTitle: "Challenge My Beliefs — Test beliefs against reality",
  defaultDescription:
    "A public platform for stating beliefs, inviting structured challenges, and recording whether each belief stays unchanged, is refined, or must change — with contextual honesty.",
  keywords: [
    "challenge beliefs",
    "contextual honesty",
    "objective reality",
    "public debate",
    "evidence-based beliefs",
    "founder creed",
    "laissez faire",
    "individual rights",
  ],
} as const;

export const landingPageCopy = {
  eyebrow: "Start here",
  title: "Find your way into Challenge My Beliefs",
  description:
    "Whether you came to learn, challenge, build, or join — pick the path that matches you. Every path ends in the same founding rule: beliefs change only under stronger evidence.",
} as const;
