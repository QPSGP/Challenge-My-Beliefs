import type { ChannelInterest } from "@/lib/types";

function escapeCsvValue(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function buildWaitlistCsv(entries: ChannelInterest[]): string {
  const headers = [
    "channel",
    "email",
    "display_name",
    "category_interest",
    "introduction",
    "created_at",
  ];

  const rows = entries.map((entry) =>
    [
      entry.channel,
      entry.email,
      entry.displayName,
      entry.categoryInterest,
      entry.introduction,
      entry.createdAt,
    ]
      .map((value) => escapeCsvValue(value ?? ""))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

export function downloadWaitlistCsv(entries: ChannelInterest[], filename: string): void {
  const csv = buildWaitlistCsv(entries);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
