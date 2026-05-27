import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/admin", label: "Founder" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
          Challenge My Beliefs
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
