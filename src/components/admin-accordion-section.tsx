"use client";

type AdminAccordionTone = "default" | "emerald" | "amber" | "sky" | "violet";

type AdminAccordionSectionProps = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  tone?: AdminAccordionTone;
};

const toneStyles: Record<
  AdminAccordionTone,
  { closed: string; open: string; divider: string; titleOpen: string }
> = {
  default: {
    closed: "border-slate-800 bg-slate-950/70",
    open: "border-sky-400/40 bg-sky-400/10",
    divider: "border-sky-400/20",
    titleOpen: "text-sky-100",
  },
  emerald: {
    closed: "border-slate-800 bg-slate-950/70",
    open: "border-emerald-400/40 bg-emerald-400/10",
    divider: "border-emerald-400/20",
    titleOpen: "text-emerald-100",
  },
  amber: {
    closed: "border-slate-800 bg-slate-950/70",
    open: "border-amber-400/40 bg-amber-400/10",
    divider: "border-amber-400/20",
    titleOpen: "text-amber-100",
  },
  sky: {
    closed: "border-slate-800 bg-slate-950/70",
    open: "border-sky-400/40 bg-sky-400/15",
    divider: "border-sky-400/20",
    titleOpen: "text-sky-100",
  },
  violet: {
    closed: "border-slate-800 bg-slate-950/70",
    open: "border-violet-400/40 bg-violet-400/10",
    divider: "border-violet-400/20",
    titleOpen: "text-violet-100",
  },
};

export function AdminAccordionSection({
  id,
  title,
  description,
  badge,
  isOpen,
  onToggle,
  children,
  tone = "default",
}: AdminAccordionSectionProps) {
  const styles = toneStyles[tone];

  return (
    <div className={`rounded-3xl border transition-colors ${isOpen ? styles.open : styles.closed}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`admin-section-${id}`}
        onClick={() => onToggle(id)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2
              className={`text-xl font-semibold ${isOpen ? styles.titleOpen : "text-white"}`}
            >
              {title}
            </h2>
            {badge ? (
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  isOpen
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-slate-700 bg-slate-900/80 text-slate-300"
                }`}
              >
                {badge}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className={`mt-2 text-sm leading-6 ${isOpen ? "text-slate-200" : "text-slate-400"}`}>
              {description}
            </p>
          ) : null}
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-sm font-semibold ${
            isOpen
              ? "border-white/25 bg-white/10 text-white"
              : "border-slate-700 text-slate-400"
          }`}
          aria-hidden
        >
          {isOpen ? "▲ Close" : "▼ Click to open"}
        </span>
      </button>

      {isOpen ? (
        <div
          id={`admin-section-${id}`}
          className={`border-t px-6 pb-6 pt-2 ${styles.divider}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
