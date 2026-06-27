import type { BeliefResource } from "@/lib/types";

/** Curated supporting resources keyed by belief id (merged at read time). */
export const beliefResourcesById: Record<string, BeliefResource[]> = {
  "individual-life-and-property": [
    {
      kind: "reference",
      title: "Universal Declaration of Human Rights — life and property",
      url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      note: "Articles 3 (life) and 17 (property) articulate internationally recognized individual protections that underpin cooperative societies.",
    },
    {
      kind: "data",
      title: "Fraser Institute — Legal system and property rights",
      url: "https://efotw.org/economic-freedom/approach",
      note: "Area 2 of the Economic Freedom of the World index treats secure property rights and rule of law as foundational for exchange and investment.",
    },
    {
      kind: "book",
      title: "Stanford Encyclopedia — Locke on property",
      url: "https://plato.stanford.edu/entries/locke-political/",
      note: "Classic account of why life, liberty, and estate form the basis of legitimate political order.",
    },
  ],
  "consent-legitimate-interaction": [
    {
      kind: "reference",
      title: "Stanford Encyclopedia — Social contract theory",
      url: "https://plato.stanford.edu/entries/social-contract/",
      note: "Survey of why political legitimacy rests on agreement rather than raw coercion.",
    },
    {
      kind: "study",
      title: "Elinor Ostrom — Governing the Commons (Nobel lecture summary)",
      url: "https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/",
      note: "Demonstrates voluntary, rule-based cooperation without centralized force in many real-world settings.",
    },
    {
      kind: "article",
      title: "Library of Economics and Liberty — Coercion",
      url: "https://www.econlib.org/library/Enc/Coercion.html",
      note: "Defines how coerced exchange differs from voluntary trade and why that distinction matters economically.",
    },
  ],
  "truth-over-comfort": [
    {
      kind: "book",
      title: "Karl Popper — The Open Society and Its Enemies (overview)",
      url: "https://plato.stanford.edu/entries/popper/",
      note: "Argues that societies progress by subjecting ideas to criticism rather than shielding them from refutation.",
    },
    {
      kind: "data",
      title: "Edelman Trust Barometer",
      url: "https://www.edelman.com/trust-barometer",
      note: "Annual global survey linking institutional honesty, transparency, and public trust.",
    },
    {
      kind: "study",
      title: "Replication crisis in science (Nature overview)",
      url: "https://www.nature.com/articles/533452a",
      note: "Documents how comfortable consensus can persist until uncomfortable evidence forces revision.",
    },
  ],
  "law-applies-equally": [
    {
      kind: "data",
      title: "World Justice Project — Rule of Law Index",
      url: "https://worldjusticeproject.org/rule-of-law-index",
      note: "Cross-country measures of equal application of law; weaker scores correlate with lower public trust and investment.",
    },
    {
      kind: "book",
      title: "BLS Monthly Labor Review — Why Nations Fail review",
      url: "https://www.bls.gov/opub/mlr/2019/book-review/pdf/state-institutions-and-economic-prosperity.htm",
      note: "Summarizes Acemoglu & Robinson on inclusive institutions, equal rules, and sustained prosperity.",
    },
    {
      kind: "reference",
      title: "Fourteenth Amendment — Equal protection (U.S.)",
      url: "https://constitution.congress.gov/constitution/amendment-14/",
      note: "Constitutional example of formal commitment to equal treatment under law.",
    },
  ],
  "power-limited-accountable": [
    {
      kind: "reference",
      title: "The Federalist No. 51 — Checks and balances",
      url: "https://guides.loc.gov/federalist-papers/text-51-60",
      note: "Madison: ambition must counter ambition — institutional design to limit concentrated power.",
    },
    {
      kind: "book",
      title: "Montesquieu — Separation of powers (Stanford Encyclopedia)",
      url: "https://plato.stanford.edu/entries/montesquieu/",
      note: "Foundational theory that dividing power reduces tyranny and arbitrary rule.",
    },
    {
      kind: "study",
      title: "MIT — Why Nations Fail lecture notes",
      url: "https://economics.mit.edu/sites/default/files/inline-files/Why%20Nations%20Fail.pdf",
      note: "Extractive vs inclusive institutions: concentrated power tends toward stagnation and abuse.",
    },
  ],
  "peaceful-resolution": [
    {
      kind: "data",
      title: "Uppsala Conflict Data Program",
      url: "https://ucdp.uu.se/",
      note: "Tracks armed conflict globally — useful baseline for comparing peaceful vs violent dispute resolution.",
    },
    {
      kind: "study",
      title: "World Bank — Conflict and development",
      url: "https://www.worldbank.org/en/topic/fragilityconflictviolence",
      note: "Documents how violence destroys capital, trust, and long-run development prospects.",
    },
    {
      kind: "book",
      title: "Stanford Encyclopedia — Just war theory",
      url: "https://plato.stanford.edu/entries/war/",
      note: "Philosophical framework distinguishing defensive force from aggression — aligns with reason-first resolution.",
    },
  ],
  "voluntary-exchange": [
    {
      kind: "book",
      title: "Adam Smith — Wealth of Nations (EconLib)",
      url: "https://www.econlib.org/library/Smith/smWN.html",
      note: "Classic account of specialization and trade as mutual benefit when exchange is voluntary.",
    },
    {
      kind: "article",
      title: "Library of Economics and Liberty — Comparative advantage",
      url: "https://www.econlib.org/library/Topics/HighSchool/ComparativeAdvantage.html",
      note: "Explains why both parties gain from trade even when one is more productive in every activity.",
    },
    {
      kind: "data",
      title: "World Trade Organization — Trade and development",
      url: "https://www.wto.org/english/thewto_e/whatis_e/tif_e/dev1_e.htm",
      note: "Official overview of how open trade has contributed to growth in developing economies.",
    },
  ],
  "charity-not-coercion": [
    {
      kind: "reference",
      title: "Lord Acton — Power tends to corrupt (letter)",
      url: "https://history.hanover.edu/courses/excerpts/165acton.html",
      note: "Famous warning that coercive power corrupts even when exercised in the name of good causes.",
    },
    {
      kind: "study",
      title: "GiveWell — Effective giving research",
      url: "https://www.givewell.org/research",
      note: "Models voluntary, evidence-based charity that respects donor choice and measurable outcomes.",
    },
    {
      kind: "article",
      title: "Library of Economics and Liberty — Welfare economics",
      url: "https://www.econlib.org/library/Enc/WelfareEconomics.html",
      note: "Distinguishes voluntary transfers from coerced redistribution and their incentive effects.",
    },
  ],
  "free-speech-challenge": [
    {
      kind: "book",
      title: "John Stuart Mill — On Liberty (Project Gutenberg)",
      url: "https://www.gutenberg.org/ebooks/34901",
      note: "Argues that free debate is essential to discovering truth and preventing dead dogma.",
    },
    {
      kind: "reference",
      title: "First Amendment — U.S. Constitution",
      url: "https://constitution.congress.gov/constitution/amendment-1/",
      note: "Constitutional protection of speech and petition as structural safeguards for public challenge.",
    },
    {
      kind: "data",
      title: "Freedom House — Freedom in the World",
      url: "https://freedomhouse.org/report/freedom-world",
      note: "Annual index correlating political rights, including expression, with broader freedom scores.",
    },
  ],
  "inherent-human-worth": [
    {
      kind: "reference",
      title: "Universal Declaration of Human Rights — dignity",
      url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      note: "Preamble affirms inherent dignity and equal, inalienable rights of all members of the human family.",
    },
    {
      kind: "book",
      title: "Stanford Encyclopedia — Kant's moral philosophy",
      url: "https://plato.stanford.edu/entries/kant-moral/",
      note: "Humanity as end-in-itself — persons must not be treated merely as instruments.",
    },
    {
      kind: "reference",
      title: "U.S. Declaration of Independence",
      url: "https://www.archives.gov/founding-docs/declaration-transcript",
      note: "Self-evident truths and unalienable rights — historical anchor for dignity beyond utility.",
    },
  ],
  "not-means-to-end": [
    {
      kind: "book",
      title: "Stanford Encyclopedia — Kant's moral philosophy",
      url: "https://plato.stanford.edu/entries/kant-moral/",
      note: "Categorical imperative: act so that you treat humanity always as an end, never merely as a means.",
    },
    {
      kind: "article",
      title: "Internet Encyclopedia of Philosophy — Deontology",
      url: "https://iep.utm.edu/deontolo/",
      note: "Overview of duty-based ethics that forbid using persons as tools for others' goals.",
    },
  ],
  "equal-dignity-not-outcomes": [
    {
      kind: "book",
      title: "John Rawls — Fair equality of opportunity (Stanford Encyclopedia)",
      url: "https://plato.stanford.edu/entries/rawls/",
      note: "Distinguishes fair rules and opportunity from guaranteed equal outcomes.",
    },
    {
      kind: "article",
      title: "Library of Economics and Liberty — Equality",
      url: "https://www.econlib.org/library/Enc/Equality.html",
      note: "Economic analysis of equal treatment under rules vs enforced equal results.",
    },
    {
      kind: "reference",
      title: "Fourteenth Amendment — Equal protection",
      url: "https://constitution.congress.gov/constitution/amendment-14/",
      note: "Legal commitment to equal protection, not equal outcomes.",
    },
  ],
  "contextual-honesty": [
    {
      kind: "book",
      title: "Daniel Kahneman — Thinking, Fast and Slow (overview)",
      url: "https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/facts/",
      note: "Nobel work on framing and cognitive bias — same facts, different context, different conclusions.",
    },
    {
      kind: "article",
      title: "Stanford Encyclopedia — Fallacies",
      url: "https://plato.stanford.edu/entries/fallacies/",
      note: "Catalog of reasoning errors that often rely on stripping context from true premises.",
    },
  ],
  "changing-mind": [
    {
      kind: "book",
      title: "Karl Popper — Conjectures and Refutations (Stanford Encyclopedia)",
      url: "https://plato.stanford.edu/entries/popper/",
      note: "Scientific progress replaces weaker theories with stronger ones — revision is strength, not weakness.",
    },
    {
      kind: "study",
      title: "NIH — How science evolves",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK20369/",
      note: "Overview of how evidence accumulation leads to updated medical and scientific consensus.",
    },
  ],
  "principles-applied-consistently": [
    {
      kind: "data",
      title: "World Justice Project — Rule of Law Index",
      url: "https://worldjusticeproject.org/rule-of-law-index",
      note: "Measures absence of discrimination and equal application of laws — hypocrisy erodes these scores.",
    },
    {
      kind: "study",
      title: "Hypocrisy and trust (meta-analysis overview)",
      url: "https://www.apa.org/news/press/releases/2016/03/hypocrisy",
      note: "Psychological research on how perceived double standards destroy credibility and cooperation.",
    },
  ],
  "moral-claims-by-consequences": [
    {
      kind: "book",
      title: "Frédéric Bastiat — What Is Seen and What Is Not Seen",
      url: "https://www.econlib.org/library/Bastiat/basEss1.html",
      note: "Shows how moral-sounding policies can produce unseen harm — outcomes must be weighed.",
    },
    {
      kind: "book",
      title: "Amartya Sen — Development as Freedom",
      url: "https://www.hup.harvard.edu/catalog.php?isbn=9780195655263",
      note: "Evaluates development by real capabilities and outcomes people achieve, not intentions alone.",
    },
    {
      kind: "reference",
      title: "Stanford Encyclopedia — Consequentialism",
      url: "https://plato.stanford.edu/entries/consequentialism/",
      note: "Philosophical tradition of testing moral rules by their real-world results.",
    },
  ],
  "responsibility-with-rights": [
    {
      kind: "book",
      title: "Alexis de Tocqueville — Democracy in America (excerpt)",
      url: "https://www.gutenberg.org/ebooks/815",
      note: "Observes that free societies depend on civic virtue and self-governance, not rights alone.",
    },
    {
      kind: "article",
      title: "Library of Economics and Liberty — Rights",
      url: "https://www.econlib.org/library/Enc/Rights.html",
      note: "Discusses how rights and responsibilities interact in a free society.",
    },
  ],
  "families-and-local-community": [
    {
      kind: "book",
      title: "Robert Putnam — Bowling Alone (Harvard overview)",
      url: "https://www.hks.harvard.edu/publications/bowling-alone",
      note: "Documents decline in local association and social capital — with consequences for trust and resilience.",
    },
    {
      kind: "study",
      title: "Brookings — Strong families and communities",
      url: "https://www.brookings.edu/articles/family-structure-and-economic-well-being/",
      note: "Research linking family and community stability to economic and social outcomes.",
    },
  ],
  "institutions-earn-trust": [
    {
      kind: "data",
      title: "Edelman Trust Barometer",
      url: "https://www.edelman.com/trust-barometer",
      note: "Global data on which institutions the public trusts — transparency strongly predicts trust.",
    },
    {
      kind: "data",
      title: "Transparency International — Corruption Perceptions Index",
      url: "https://www.transparency.org/en/cpi",
      note: "Opaque, unaccountable institutions score poorly; corruption correlates with lower public welfare.",
    },
    {
      kind: "data",
      title: "Pew Research — Public trust in government",
      url: "https://www.pewresearch.org/politics/fact-sheet/public-trust-in-government/",
      note: "Long-run U.S. trend data on trust — useful when arguing institutions must earn confidence.",
    },
  ],
  "property-enables-planning": [
    {
      kind: "book",
      title: "Hernando de Soto — The Mystery of Capital",
      url: "https://www.imf.org/external/pubs/ft/fandd/2001/03/desoto.htm",
      note: "IMF summary: secure property titles unlock capital and long-term investment among the poor.",
    },
    {
      kind: "data",
      title: "World Bank — Doing Business (historical archive)",
      url: "https://archive.doingbusiness.org/",
      note: "Cross-country data on property registration and contract enforcement — key to planning horizons.",
    },
    {
      kind: "study",
      title: "Property rights and growth (RePEc)",
      url: "https://ideas.repec.org/a/ebl/ecbull/eb-21-00864.html",
      note: "Panel study finding significant positive effect of property rights on GDP per capita growth.",
    },
  ],
  "opportunity-reduces-poverty": [
    {
      kind: "data",
      title: "World Bank — Poverty overview",
      url: "https://www.worldbank.org/en/topic/poverty",
      note: "Extreme poverty fell from ~2.3 billion (1990) to ~831 million (2025) amid growth in Asia — opportunity-driven progress.",
    },
    {
      kind: "data",
      title: "Our World in Data — Global poverty",
      url: "https://ourworldindata.org/poverty",
      note: "Interactive charts: ~1.5 billion fewer people in extreme poverty since 1990.",
    },
    {
      kind: "data",
      title: "UN SDG Goal 1 — Poverty indicators",
      url: "https://unstats.un.org/sdgs/report/2025/goal-01/",
      note: "Official SDG poverty statistics and methodology with 1990–2022 trend data.",
    },
  ],
  "incentives-shape-behavior": [
    {
      kind: "book",
      title: "Milton Friedman — Free to Choose (EconLib excerpt)",
      url: "https://www.econlib.org/library/Essays/friedrich.html",
      note: "People respond to incentives; policy must align rewards with desired behavior.",
    },
    {
      kind: "article",
      title: "Goodhart's Law (explainer)",
      url: "https://www.britannica.com/topic/Goodharts-law",
      note: "When a measure becomes a target, it ceases to be a good measure — perverse incentives corrupt systems.",
    },
    {
      kind: "book",
      title: "Richard Thaler — Misbehaving (Nobel summary)",
      url: "https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/facts/",
      note: "Behavioral economics documents how incentive structures predictably shape choices.",
    },
  ],
  "honest-money-contracts": [
    {
      kind: "book",
      title: "Milton Friedman — Inflation is always a monetary phenomenon",
      url: "https://www.econlib.org/library/Enc/Inflation.html",
      note: "Debasement and dishonest money destroy trust and planning — stable money supports honest exchange.",
    },
    {
      kind: "book",
      title: "Reinhart & Rogoff — This Time Is Different",
      url: "https://www.hup.harvard.edu/catalog.php?isbn=9780691152646",
      note: "Historical data on sovereign defaults and financial crises when contracts and money are abused.",
    },
    {
      kind: "data",
      title: "World Justice Project — Order and security / regulatory enforcement",
      url: "https://worldjusticeproject.org/rule-of-law-index",
      note: "Contract enforcement and regulatory quality vary widely — correlates with economic trust.",
    },
  ],
  "forgiveness-and-restoration": [
    {
      kind: "study",
      title: "NIJ — Restorative justice research",
      url: "https://nij.ojp.gov/topics/articles/restorative-justice",
      note: "U.S. National Institute of Justice overview of truth-telling, accountability, and reintegration programs.",
    },
    {
      kind: "study",
      title: "Campbell Collaboration — Restorative justice effects",
      url: "https://www.campbellcollaboration.org/",
      note: "Systematic reviews on restorative approaches vs permanent exclusion — search restorative justice.",
    },
  ],
  "gratitude-and-humility": [
    {
      kind: "study",
      title: "Greater Good Science Center — Gratitude research",
      url: "https://greatergood.berkeley.edu/topic/gratitude",
      note: "UC Berkeley summary of studies linking gratitude practices to wellbeing and reduced aggression.",
    },
    {
      kind: "study",
      title: "Robert Emmons — Thanks! (research overview)",
      url: "https://gratitude.ucdavis.edu/",
      note: "Leading research program on gratitude, entitlement, and social harmony.",
    },
  ],
  "purpose-beyond-self-interest": [
    {
      kind: "book",
      title: "Viktor Frankl — Man's Search for Meaning",
      url: "https://www.viktorfrankl.org/",
      note: "Argues that meaning and purpose sustain people through suffering beyond narrow self-interest.",
    },
    {
      kind: "data",
      title: "World Happiness Report",
      url: "https://worldhappiness.report/",
      note: "Annual cross-country data on wellbeing — social support and sense of purpose correlate with happiness.",
    },
  ],
  "observable-evidence": [
    {
      kind: "reference",
      title: "Royal Society motto — Nullius in verba",
      url: "https://royalsociety.org/about-us/who-we-are/history/",
      note: "Take nobody's word for it — evidence and experiment over authority.",
    },
    {
      kind: "book",
      title: "Stanford Encyclopedia — Scientific method",
      url: "https://plato.stanford.edu/entries/scientific-method/",
      note: "How empirical testing distinguishes knowledge from speculation.",
    },
    {
      kind: "reference",
      title: "NIH — Evidence-based medicine",
      url: "https://www.nlm.nih.gov/health/topics/evidence-based-medicine.html",
      note: "Medical practice grounded in observable outcomes, not tradition alone.",
    },
  ],
  "expertise-not-infallible": [
    {
      kind: "study",
      title: "Ioannidis — Why most published research findings are false",
      url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124",
      note: "Landmark paper on replication failure — expert consensus can be wrong and must stay open to challenge.",
    },
    {
      kind: "study",
      title: "Open Science Collaboration — Replication project",
      url: "https://www.nature.com/articles/nature17433",
      note: "Large-scale attempt to replicate psychology studies — many did not reproduce.",
    },
  ],
  "education-teaches-thinking": [
    {
      kind: "study",
      title: "Stanford History Education Group — Civic online reasoning",
      url: "https://sheg.stanford.edu/",
      note: "Research-based curriculum teaching students to evaluate sources and think critically online.",
    },
    {
      kind: "data",
      title: "OECD — PISA critical thinking framework",
      url: "https://www.oecd.org/pisa/",
      note: "International assessment emphasizing problem-solving and reasoning over rote recall.",
    },
  ],
  "history-studied-honestly": [
    {
      kind: "reference",
      title: "United States Holocaust Memorial Museum",
      url: "https://www.ushmm.org/",
      note: "Model of confronting historical atrocity honestly so societies do not repeat them.",
    },
    {
      kind: "article",
      title: "American Historical Association — Historical thinking skills",
      url: "https://www.historians.org/teaching-and-learning/teaching-resources-for-historians/teaching-resources-for-historians-2/",
      note: "Professional standards for evidence-based, honest history education.",
    },
  ],
  "founder-purpose-prosperity": [
    {
      kind: "data",
      title: "World Happiness Report",
      url: "https://worldhappiness.report/",
      note: "Cross-national wellbeing data supporting prosperity and happiness as measurable human goals.",
    },
    {
      kind: "book",
      title: "Amartya Sen — Development as Freedom",
      url: "https://www.hup.harvard.edu/catalog.php?isbn=9780195655263",
      note: "Development measured by freedoms people enjoy — prosperity as capability, not GDP alone.",
    },
  ],
  "founder-supreme-own-life": [
    {
      kind: "reference",
      title: "Universal Declaration of Human Rights",
      url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
      note: "Individual rights framework — each person's life and dignity as the moral baseline.",
    },
    {
      kind: "book",
      title: "Stanford Encyclopedia — Locke's political philosophy",
      url: "https://plato.stanford.edu/entries/locke-political/",
      note: "Self-ownership and natural rights — individual life as inviolable starting point.",
    },
  ],
  "founder-no-initiatory-force": [
    {
      kind: "reference",
      title: "Stanford Encyclopedia — Libertarianism",
      url: "https://plato.stanford.edu/entries/libertarianism/",
      note: "Survey of non-aggression principle and its role in libertarian political theory.",
    },
    {
      kind: "book",
      title: "Robert Nozick — Anarchy, State, and Utopia (overview)",
      url: "https://plato.stanford.edu/entries/nozick-political/",
      note: "Minimal state justified only from rights — initiatory force requires strict limits.",
    },
  ],
  "founder-laissez-faire-producer": [
    {
      kind: "data",
      title: "Fraser Institute — Economic Freedom of the World",
      url: "https://www.fraserinstitute.org/studies/economic-freedom-of-the-world-2023-annual-report",
      note: "700+ studies correlate economic freedom with growth; value production through voluntary exchange.",
    },
    {
      kind: "book",
      title: "Adam Smith — Wealth of Nations",
      url: "https://www.econlib.org/library/Smith/smWN.html",
      note: "Productive labor and voluntary exchange as sources of national wealth.",
    },
  ],
  "founder-mind-identifies-reality": [
    {
      kind: "book",
      title: "Stanford Encyclopedia — Aristotle's epistemology",
      url: "https://plato.stanford.edu/entries/aristotle/",
      note: "Mind discovers and integrates reality through observation and reason — classical realism.",
    },
    {
      kind: "reference",
      title: "Stanford Encyclopedia — Realism",
      url: "https://plato.stanford.edu/entries/realism/",
      note: "Philosophical account that truth corresponds to mind-independent reality.",
    },
  ],
  "founder-teach-self-reliance": [
    {
      kind: "study",
      title: "World Bank — Skills development and employment",
      url: "https://www.worldbank.org/en/topic/skillsdevelopment",
      note: "Evidence that building skills and human capital reduces long-term dependency.",
    },
    {
      kind: "study",
      title: "FAO — Farmer field schools",
      url: "https://www.fao.org/farmer-field-schools/en/",
      note: "Teach-to-fish model: training farmers in sustainable practices vs one-time aid.",
    },
  ],
  "founder-honesty-oath": [
    {
      kind: "reference",
      title: "Federal Rules of Evidence — Overview",
      url: "https://www.uscourts.gov/rules-policies/current-rules-practice-procedure/federal-rules-evidence",
      note: "U.S. courtroom evidence rules — baseline for comparing truth-oath vs fuller contextual disclosure.",
    },
    {
      kind: "article",
      title: "ABA — Model Rules of Professional Conduct",
      url: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/",
      note: "Lawyer duties of candor and honesty toward tribunals — evolving standards of disclosure.",
    },
  ],
  "founder-biological-morality": [
    {
      kind: "book",
      title: "Stanford Encyclopedia — Ethical naturalism",
      url: "https://plato.stanford.edu/entries/naturalism-moral/",
      note: "Philosophical tradition grounding moral facts in human nature and flourishing.",
    },
    {
      kind: "study",
      title: "Jonathan Haidt — Moral Foundations Theory",
      url: "https://moralfoundations.org/",
      note: "Empirical research on harm/care as universal moral foundation across cultures.",
    },
  ],
  "founder-rational-choice-chain": [
    {
      kind: "book",
      title: "Stanford Encyclopedia — Rational choice theory",
      url: "https://plato.stanford.edu/entries/rational-choice/",
      note: "Framework linking preferences, beliefs, and voluntary action to outcomes.",
    },
    {
      kind: "data",
      title: "World Happiness Report — Social support and freedom",
      url: "https://worldhappiness.report/faq/",
      note: "Freedom to make life choices and social relationships are core predictors of happiness.",
    },
  ],
  "founder-self-responsibility": [
    {
      kind: "study",
      title: "Martin Seligman — Learned helplessness (APA)",
      url: "https://www.apa.org/news/press/releases/2010/12/golden-age",
      note: "Research on agency vs helplessness — taking action within one's sphere improves outcomes.",
    },
    {
      kind: "study",
      title: "Rotter — Locus of control (overview)",
      url: "https://www.britannica.com/science/locus-of-control",
      note: "Internal locus of control correlates with achievement, health, and persistence.",
    },
  ],
  "founder-law-stops-injustice": [
    {
      kind: "book",
      title: "Frédéric Bastiat — The Law",
      url: "https://www.econlib.org/library/Bastiat/basEss1.html",
      note: "Law as organized justice to protect persons and property — not a tool to redistribute by force.",
    },
    {
      kind: "book",
      title: "F.A. Hayek — The Constitution of Liberty (overview)",
      url: "https://plato.stanford.edu/entries/hayek/",
      note: "Rule of law limits government to general rules — preventing arbitrary 'social engineering.'",
    },
  ],
  "founder-produce-more-than-consume": [
    {
      kind: "reference",
      title: "Adam Smith — Productive vs unproductive labor",
      url: "https://www.econlib.org/library/Smith/smWN17.html#B.I,%20Ch.3,%20Of%20the%20Accumulation%20of%20Capital",
      note: "Wealth grows when production exceeds consumption — surplus enables investment and trade.",
    },
    {
      kind: "data",
      title: "World Bank — GDP and national accounts",
      url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG",
      note: "National accounts distinguish production, consumption, and investment — net production drives growth.",
    },
  ],
};

/** Data points and samples appended to each belief's evidence at read time. */
export const supplementalEvidenceById: Record<string, string[]> = {
  "individual-life-and-property": [
    "Sample: Fraser Institute Area 2 scores show countries with stronger legal systems and property rights consistently rank higher on economic freedom and income.",
  ],
  "consent-legitimate-interaction": [
    "Sample: Nobel laureate Elinor Ostrom documented hundreds of cases where communities self-govern resources through agreed rules rather than top-down force.",
  ],
  "truth-over-comfort": [
    "Sample: Edelman Trust Barometer repeatedly finds that dishonesty and lack of transparency are top drivers of institutional distrust worldwide.",
  ],
  "law-applies-equally": [
    "Sample: World Justice Project Rule of Law Index ranks 142+ countries — unequal application of law correlates with lower order and security scores.",
  ],
  "power-limited-accountable": [
    "Sample: North vs South Korea — same culture and geography, divergent institutions after 1953; GDP per capita gap exceeds 20:1 (World Bank data).",
  ],
  "peaceful-resolution": [
    "Sample: Uppsala Conflict Data Program records thousands of battle deaths annually — societies that institutionalize negotiation reduce recurring violence.",
  ],
  "voluntary-exchange": [
    "Sample: WTO reports that trade-open economies grew faster on average over recent decades than highly closed economies.",
  ],
  "charity-not-coercion": [
    "Sample: U.S. charitable giving exceeded $500 billion annually in recent years (Giving USA) — chosen aid distinct from tax-funded transfer.",
  ],
  "free-speech-challenge": [
    "Sample: Freedom House Freedom in the World index ties expression rights to broader political rights scores across 210 countries.",
  ],
  "inherent-human-worth": [
    "Sample: UDHR Article 1 — dignity and equal rights are declared inherent, not granted by utility to the state.",
  ],
  "not-means-to-end": [
    "Sample: Kant's Formula of Humanity (1785) remains a standard reference in medical ethics and human-subjects research rules.",
  ],
  "equal-dignity-not-outcomes": [
    "Sample: OECD income inequality data shows equal formal rights coexist with wide outcome gaps — enforcing equal outcomes requires unequal treatment.",
  ],
  "contextual-honesty": [
    "Sample: Kahneman & Tversky framing experiments show identical expected-value choices flip when the same facts are presented as gains vs losses.",
  ],
  "changing-mind": [
    "Sample: Open Science Collaboration (2015) replicated 100 psychology studies — only 36% showed statistically significant results matching originals.",
  ],
  "principles-applied-consistently": [
    "Sample: Transparency International CPI — countries with selective enforcement score worse on corruption and public trust.",
  ],
  "moral-claims-by-consequences": [
    "Sample: Bastiat's broken-window fallacy (1850) — visible 'benefits' of destruction hide unseen losses, a template for testing moral policies by outcomes.",
  ],
  "responsibility-with-rights": [
    "Sample: Tocqueville (1835) observed American voluntary associations as the school of self-governance alongside formal rights.",
  ],
  "families-and-local-community": [
    "Sample: Putnam's Bowling Alone documents declining U.S. civic association membership from peak mid-20th century — correlates with trust erosion.",
  ],
  "institutions-earn-trust": [
    "Sample: Pew Research — U.S. public trust in government fell from ~75% (1958) to ~20% (recent years), tracking perceived honesty and performance.",
  ],
  "property-enables-planning": [
    "Sample: de Soto estimated trillions in 'dead capital' locked in extralegal property among the poor without formal titles (IMF Finance & Development, 2001).",
  ],
  "opportunity-reduces-poverty": [
    "Sample: World Bank — extreme poverty (~$3/day, 2021 PPP) fell from ~44% of world population (1990) to ~10.5% (2022); ~1.5 billion people lifted out.",
  ],
  "incentives-shape-behavior": [
    "Sample: Soviet nail factory anecdote (targets by weight vs count) — classic illustration of Goodhart's Law and perverse incentives.",
  ],
  "honest-money-contracts": [
    "Sample: Reinhart & Rogoff catalog 800+ years of sovereign defaults — debasement and broken promises recur when contracts are not honored.",
  ],
  "forgiveness-and-restoration": [
    "Sample: NIJ reports restorative justice programs can reduce recidivism and increase victim satisfaction vs punishment-only models in several studies.",
  ],
  "gratitude-and-humility": [
    "Sample: Emmons (UC Davis) gratitude interventions show measurable increases in wellbeing and prosocial behavior in randomized trials.",
  ],
  "purpose-beyond-self-interest": [
    "Sample: World Happiness Report 2024 — sense of purpose and social support rank among top predictors of national wellbeing scores.",
  ],
  "observable-evidence": [
    "Sample: NIH reports over 300,000 registered clinical trials — modern medicine built on observable, replicable evidence standards.",
  ],
  "expertise-not-infallible": [
    "Sample: Ioannidis (2005) estimated most published medical research findings may be false positives given bias and sample sizes.",
  ],
  "education-teaches-thinking": [
    "Sample: SHEG Stanford studies found most students could not distinguish ads from news online without explicit critical-thinking training.",
  ],
  "history-studied-honestly": [
    "Sample: Post-war Germany's honest confrontation with Nazism contrasts with societies that suppressed history — different trust and stability trajectories.",
  ],
  "founder-purpose-prosperity": [
    "Sample: UN SDG 1 tracking — global extreme poverty rate cut by roughly three-quarters since 1990 despite population growth.",
  ],
  "founder-supreme-own-life": [
    "Sample: UDHR Articles 3 and 6 — right to life and recognition before the law as individual baselines, not collective averages.",
  ],
  "founder-no-initiatory-force": [
    "Sample: Fraser EFW index — countries ranking highest on security of persons and property (Area 2) tend to rank highest overall on economic freedom.",
  ],
  "founder-laissez-faire-producer": [
    "Sample: Hall & Lawson survey of 721 papers using EFW index — majority find economic freedom correlates with growth, income, and wellbeing.",
  ],
  "founder-mind-identifies-reality": [
    "Sample: Scientific realism — predictive success of physics and engineering depends on models tracking mind-independent regularities, not wish alone.",
  ],
  "founder-teach-self-reliance": [
    "Sample: FAO farmer field schools reached millions of farmers — skill transfer model vs repeated emergency food aid.",
  ],
  "founder-honesty-oath": [
    "Sample: U.S. perjury law (18 U.S.C. § 1621) punishes false material statements — debate is whether omission of context should carry equal weight.",
  ],
  "founder-biological-morality": [
    "Sample: Haidt's Moral Foundations Theory — harm/care dimension recognized across cultures as core moral concern tied to organismic welfare.",
  ],
  "founder-rational-choice-chain": [
    "Sample: World Happiness Report — 'freedom to make life choices' is a top weighted factor in national happiness rankings.",
  ],
  "founder-self-responsibility": [
    "Sample: Seligman's learned helplessness experiments — perceived lack of control predicts depression-like behavior; agency training reverses it in animal models.",
  ],
  "founder-law-stops-injustice": [
    "Sample: Bastiat's The Law (1850) — when law exceeds defense of rights and becomes plunder, it creates the injustice it claims to cure.",
  ],
  "founder-produce-more-than-consume": [
    "Sample: World Bank national accounts — sustained GDP growth requires gross capital formation (investment) exceeding depreciation and pure consumption.",
  ],
};

export function getResourcesForBelief(beliefId: string): BeliefResource[] {
  return beliefResourcesById[beliefId] ?? [];
}

export function getSupplementalEvidence(beliefId: string): string[] {
  return supplementalEvidenceById[beliefId] ?? [];
}
