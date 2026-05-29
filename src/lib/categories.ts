import type { Belief } from "@/lib/types";

export const DEFAULT_CATEGORY = "Uncategorized";

export const SUGGESTED_CATEGORIES = [
  "Individual Rights",
  "Philosophy & Reasoning",
  "Politics & Society",
  "Economics",
  "Faith & Meaning",
  "Science & Evidence",
  DEFAULT_CATEGORY,
] as const;

export function normalizeCategory(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : DEFAULT_CATEGORY;
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugToCategory(slug: string, categories: string[]): string | undefined {
  return categories.find((category) => categoryToSlug(category) === slug);
}

export function getSortedCategories(beliefs: Belief[]): string[] {
  const fromBeliefs = getCategoriesFromBeliefs(beliefs);
  const ordered: string[] = [];

  for (const preset of SUGGESTED_CATEGORIES) {
    if (fromBeliefs.includes(preset)) {
      ordered.push(preset);
    }
  }

  for (const category of fromBeliefs) {
    if (!ordered.includes(category)) {
      ordered.push(category);
    }
  }

  return ordered;
}

export function getCategoriesFromBeliefs(beliefs: Belief[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];

  for (const belief of beliefs) {
    const category = normalizeCategory(belief.category);

    if (!seen.has(category)) {
      seen.add(category);
      categories.push(category);
    }
  }

  return categories;
}

export type BeliefCategoryGroup = {
  category: string;
  beliefs: Belief[];
};

export function groupBeliefsByCategory(beliefs: Belief[]): BeliefCategoryGroup[] {
  const groups = new Map<string, Belief[]>();

  for (const belief of beliefs) {
    const category = normalizeCategory(belief.category);
    const list = groups.get(category) ?? [];
    list.push(belief);
    groups.set(category, list);
  }

  return getSortedCategories(beliefs).map((category) => ({
    category,
    beliefs: groups.get(category) ?? [],
  }));
}

export function filterBeliefsByCategory(beliefs: Belief[], category?: string): Belief[] {
  if (!category?.trim()) {
    return beliefs;
  }

  const target = normalizeCategory(category);
  return beliefs.filter((belief) => normalizeCategory(belief.category) === target);
}
