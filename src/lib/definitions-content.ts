export type DefinitionEntry = {
  term: string;
  definition: string;
  example?: string;
};

export type DefinitionSection = {
  title: string;
  description: string;
  entries: DefinitionEntry[];
};

export const definitionsIntro =
  "Plain-language meanings for words used on this site. The goal is clarity — anyone should be able to follow the process without a philosophy degree.";

export const definitionSections: DefinitionSection[] = [
  {
    title: "Core ideas",
    description: "What we mean when we talk about beliefs and truth on this platform.",
    entries: [
      {
        term: "Belief",
        definition:
          "A clear claim you are willing to defend in public — not a mood, a guess, or a slogan. Each belief on this site has a title, a full statement, supporting reasons, and a standard for what would prove it wrong.",
        example: "“Free speech protects good ideas by allowing them to be tested in public.”",
      },
      {
        term: "Evidence",
        definition:
          "Facts, observations, or well-supported reasons that back up a belief. Evidence should be checkable — someone else can look into it and see if it holds up.",
        example: "Historical records, measured data, documented outcomes, or widely accepted expert findings.",
      },
      {
        term: "Founding rule",
        definition:
          "The standard for changing any belief here: a belief changes only when stronger evidence — grounded in objective reality and interpreted with contextual honesty — shows the original belief is incorrect.",
      },
      {
        term: "Objective reality",
        definition:
          "What is actually true in the world, independent of what we wish were true or what a crowd believes. We use evidence and honest reasoning to get as close to it as we can.",
      },
      {
        term: "Contextual honesty",
        definition:
          "Interpreting facts fairly — including the full picture, not cherry-picking only what supports your side. Same evidence can look different when important context is left out.",
      },
    ],
  },
  {
    title: "The challenge process",
    description: "How disagreement is structured so it stays useful.",
    entries: [
      {
        term: "Challenge",
        definition:
          "A structured response that tries to show a belief is wrong or incomplete. A good challenge brings evidence, explains context, and meets the public standard for disproof listed on the belief page.",
      },
      {
        term: "What could disprove it",
        definition:
          "The public test for a fair challenge. Before debate starts, each belief states what kind of evidence would count against it. If a challenge does not meet that standard, it may be noted but will not change the belief.",
        example: "“Repeated, large-scale studies showing the opposite effect across different countries.”",
      },
      {
        term: "Argument",
        definition:
          "Your main reasoning — why you think the belief fails or needs adjustment. This should be more than insults or slogans.",
      },
      {
        term: "Context",
        definition:
          "Background that helps others understand your challenge — what you are assuming, what you are not claiming, and why your evidence applies to this belief.",
      },
      {
        term: "Sources",
        definition:
          "Where your evidence comes from — links, citations, or enough detail that someone can verify your claim.",
      },
      {
        term: "Ruling",
        definition:
          "The founder’s recorded decision after reviewing challenges: whether the belief stays as-is, is refined, or is changed — and why.",
      },
    ],
  },
  {
    title: "Outcomes",
    description: "Every belief ends in one of three public states.",
    entries: [
      {
        term: "Unchanged",
        definition:
          "The challenges did not meet the disproof standard, or the evidence did not overturn the belief. The statement stands as published.",
      },
      {
        term: "Refined",
        definition:
          "The core idea still holds, but the wording, scope, or nuance was improved so it matches reality more precisely.",
        example: "Narrowing “always” to “in most modern democracies” after pushback.",
      },
      {
        term: "Changed",
        definition:
          "Stronger evidence showed the original belief was wrong. The public record is updated and the history of that change is kept visible.",
      },
    ],
  },
  {
    title: "On each belief page",
    description: "Labels you will see when reading or editing a belief.",
    entries: [
      {
        term: "Confidence",
        definition:
          "How strongly the founder currently holds the belief — high, medium, or low. It is honest uncertainty, not a vote or a popularity score.",
      },
      {
        term: "Category",
        definition:
          "The topic group a belief belongs to — such as individual rights, economics, or meaning — so related beliefs are easier to find and discuss together.",
      },
      {
        term: "Core ten",
        definition:
          "The first ten beliefs in public order — the foundation of the unified benevolent society framework. Belief #1 is the lead belief featured on the home page.",
      },
      {
        term: "Version history",
        definition:
          "A public log of how a belief’s text or ruling changed over time. Transparency matters: you can see what it used to say and when it was updated.",
      },
      {
        term: "Lead belief",
        definition:
          "The belief ranked #1 in public order — the first one visitors see. It represents the starting point for the project’s public conversation.",
      },
    ],
  },
  {
    title: "Society and channels",
    description: "Bigger-picture words used across the site.",
    entries: [
      {
        term: "Unified benevolent society",
        definition:
          "The framework this project explores: a society oriented toward the common good, where beliefs are tested openly and updated when reality demands it — not ruled by noise or tribal loyalty.",
      },
      {
        term: "Community",
        definition:
          "People who want to participate constructively — gathering evidence, joining working groups by category, and sending serious challenges back to the public belief pages.",
      },
      {
        term: "Channels",
        definition:
          "Ways to discover the site and bring people back to the full record — the website (source of truth), plus social, podcast, and community layers planned around it.",
      },
      {
        term: "Waitlist",
        definition:
          "An email signup to be notified when a channel (podcast, social, etc.) launches. It is not membership yet — just early interest.",
      },
    ],
  },
];
