import Link from "next/link";

import { categoryToSlug } from "@/lib/categories";
type CategoryBadgeProps = {
  category: string;
  linkToFilter?: boolean;
};

export function CategoryBadge({ category, linkToFilter = false }: CategoryBadgeProps) {
  const className =
    "inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-200";

  if (!linkToFilter) {
    return <span className={className}>{category}</span>;
  }

  return (
    <Link
      href={`/categories/${categoryToSlug(category)}`}
      className={`${className} transition hover:border-violet-400/50 hover:bg-violet-400/20`}
    >
      {category}
    </Link>
  );
}
