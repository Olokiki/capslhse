import { SEVERITY_META, STATUS_META, TYPE_LABEL, type ReportStatus, type ReportType, type Severity } from "@/lib/hse-store";

export function SeverityBadge({ s }: { s: Severity }) {
  const m = SEVERITY_META[s];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.ring}`} />
      {m.label}
    </span>
  );
}

export function StatusBadge({ s }: { s: ReportStatus }) {
  const m = STATUS_META[s];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.color}`}>
      {m.label}
    </span>
  );
}

export function TypeBadge({ t }: { t: ReportType }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-foreground/80">
      {TYPE_LABEL[t]}
    </span>
  );
}
