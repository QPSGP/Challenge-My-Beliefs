import {
  definitionSections,
  definitionsIntro,
  type DefinitionSection,
} from "@/lib/definitions-content";
import type { DefinitionsDocument, GlossaryEntry } from "@/lib/types";
import { slugify } from "@/lib/slug";

function entryId(sectionTitle: string, term: string): string {
  return slugify(`${sectionTitle}-${term}`);
}

export function buildSeedDefinitionsDocument(): DefinitionsDocument {
  const entries: GlossaryEntry[] = [];
  let sortOrder = 0;

  for (const section of definitionSections) {
    for (const item of section.entries) {
      entries.push({
        id: entryId(section.title, item.term),
        sectionTitle: section.title,
        sectionDescription: section.description,
        term: item.term,
        definition: item.definition,
        example: item.example ?? "",
        sortOrder,
        updatedAt: new Date().toISOString(),
      });
      sortOrder += 1;
    }
  }

  return {
    intro: definitionsIntro,
    entries,
  };
}

/** Add default glossary terms that exist in code but not yet in storage. */
export function mergeMissingSeedEntries(document: DefinitionsDocument): {
  document: DefinitionsDocument;
  addedCount: number;
} {
  const seed = buildSeedDefinitionsDocument();
  const existingIds = new Set(document.entries.map((entry) => entry.id));
  const missing = seed.entries.filter((entry) => !existingIds.has(entry.id));

  if (missing.length === 0) {
    return { document, addedCount: 0 };
  }

  const nextEntries = [
    ...document.entries,
    ...missing.map((entry, index) => ({
      ...entry,
      sortOrder: document.entries.length + index,
      updatedAt: new Date().toISOString(),
    })),
  ];

  return {
    document: {
      intro: document.intro.trim() ? document.intro : seed.intro,
      entries: nextEntries,
    },
    addedCount: missing.length,
  };
}

export function getSeedDefinitionCount(): number {
  return buildSeedDefinitionsDocument().entries.length;
}

export function groupDefinitionsDocument(document: DefinitionsDocument): DefinitionSection[] {
  const sections = new Map<string, DefinitionSection>();
  const sorted = [...document.entries].sort((left, right) => left.sortOrder - right.sortOrder);

  for (const entry of sorted) {
    if (!sections.has(entry.sectionTitle)) {
      sections.set(entry.sectionTitle, {
        title: entry.sectionTitle,
        description: entry.sectionDescription,
        entries: [],
      });
    }

    sections.get(entry.sectionTitle)?.entries.push({
      term: entry.term,
      definition: entry.definition,
      example: entry.example || undefined,
    });
  }

  return Array.from(sections.values());
}
