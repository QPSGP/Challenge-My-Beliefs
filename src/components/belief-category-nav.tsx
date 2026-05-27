import Link from "next/link";

type BeliefCategoryNavProps = {
  categories: string[];
  activeCategory?: string;
};

export function BeliefCategoryNav({ categories, activeCategory }: BeliefCategoryNavProps) {
  const linkClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      active
        ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
        : "border-slate-800 text-slate-300 hover:border-sky-400/30 hover:text-white"
    }`;

  return (
    <nav aria-label="Belief categories" className="flex flex-wrap gap-2">
      <Link href="/beliefs" className={linkClass(!activeCategory)}>
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/beliefs?category=${encodeURIComponent(category)}`}
          className={linkClass(activeCategory === category)}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
