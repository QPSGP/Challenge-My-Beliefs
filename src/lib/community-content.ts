import { foundingRule } from "@/lib/site-content";

export const communityParticipationSteps = [
  {
    title: "Pick a belief or category",
    description:
      "Start with one public belief you care about, or join a working group aligned with a category like Individual Rights or Economics.",
  },
  {
    title: "Bring evidence, not heat",
    description:
      "Challenges should cite observable facts, relevant context, and honest interpretation — the same standard as the website.",
  },
  {
    title: "Earn reputation through usefulness",
    description:
      "Members who consistently improve the conversation build standing. Noise and bad faith erode it.",
  },
  {
    title: "Feed the public record",
    description:
      "Strong community contributions should become structured challenges on the site so rulings stay transparent.",
  },
] as const;

export const communityGuidelines = [
  "Challenge ideas, not the dignity of persons.",
  "Cite evidence and context; do not rely on slogans or selective facts.",
  "Accept the founding rule: beliefs change only when stronger evidence shows they are incorrect.",
  "No harassment, brigading, or coordinated bad-faith disruption.",
  "Working groups stay focused on their category — cross-post links, not cross-post wars.",
] as const;

export const communityMission = `The community exists to gather evidence, question assumptions, and build reputation through constructive challenges — not noise. ${foundingRule}`;
