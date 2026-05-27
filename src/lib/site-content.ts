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
