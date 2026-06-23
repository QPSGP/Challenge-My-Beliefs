import type { ChannelInterest } from "@/lib/types";

type CommunityMembersPanelProps = {
  members: ChannelInterest[];
  embedded?: boolean;
};

export function CommunityMembersPanel({ members, embedded = false }: CommunityMembersPanelProps) {
  const content = (
    <>
      {members.length === 0 ? (
        <p className="text-sm text-slate-500">No community signups yet.</p>
      ) : (
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">
                    {member.displayName || "Anonymous"}
                  </p>
                  <p className="text-sm text-sky-300">{member.email}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
              {member.categoryInterest ? (
                <p className="mt-2 text-sm text-violet-200">
                  Interest: {member.categoryInterest}
                </p>
              ) : null}
              {member.introduction ? (
                <p className="mt-3 text-sm leading-6 text-slate-300">{member.introduction}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Community signups ({members.length})
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Early members who requested to join via /community.
        </p>
      </div>
      {content}
    </section>
  );
}
