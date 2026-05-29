import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Founder" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
        <p className="text-sm text-slate-400">Challenge My Beliefs</p>
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 hover:border-sky-400/40 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
