import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Severity = "low" | "medium" | "high" | "critical";
export type ReportType =
  | "near-miss"
  | "incident"
  | "unsafe-act"
  | "unsafe-condition"
  | "environmental"
  | "injury";
export type ReportStatus = "open" | "assigned" | "in-progress" | "closed";

export type Activity = {
  id: string;
  at: string;
  actor: string;
  kind: "created" | "assigned" | "comment" | "status" | "closed" | "evidence";
  message: string;
};

export type HseReport = {
  id: string;
  ref: string;
  title: string;
  description: string;
  type: ReportType;
  severity: Severity;
  location: string;
  asset?: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo?: string;
  assignedEmail?: string;
  dueAt?: string;
  status: ReportStatus;
  rootCause?: string;
  correctiveAction?: string;
  closedAt?: string;
  closedBy?: string;
  activity: Activity[];
};

const LOCATIONS = [
  "CAPSL - Egbaoma",
  "CAPSL - Lagos",
  "CAPSL - Waltersmith",
  "CAPSL - Warri",
  "CAPSL - Oben",
  "Other",
];

export const PEOPLE = [ " " ];

export const ASSETS_BY_LOCATION: Record<string, string[]> = {
  "CAPSL - Egbaoma": ["Unit A", "Unit B"],
  "CAPSL - Oben": ["C501", "C502", "C503", "C504"],
};

export function assetsForLocation(location: string): string[] {
  return ASSETS_BY_LOCATION[location] ?? [];
}

export { LOCATIONS };

export const CURRENT_USER = "";

// ------------------------- DB mapping -------------------------

type ReportRow = {
  id: string;
  ref: string;
  title: string;
  description: string;
  type: string;
  severity: string;
  location: string;
  asset: string | null;
  reported_by: string;
  reported_at: string;
  assigned_to: string | null;
  assigned_email: string | null;
  due_at: string | null;
  status: string;
  root_cause: string | null;
  corrective_action: string | null;
  closed_at: string | null;
  closed_by: string | null;
};

type ActivityRow = {
  id: string;
  report_id: string;
  at: string;
  actor: string;
  kind: string;
  message: string;
};

function rowToReport(r: ReportRow, activities: ActivityRow[]): HseReport {
  return {
    id: r.id,
    ref: r.ref,
    title: r.title,
    description: r.description,
    type: r.type as ReportType,
    severity: r.severity as Severity,
    location: r.location,
    asset: r.asset ?? undefined,
    reportedBy: r.reported_by,
    reportedAt: r.reported_at,
    assignedTo: r.assigned_to ?? undefined,
    assignedEmail: r.assigned_email ?? undefined,
    dueAt: r.due_at ?? undefined,
    status: r.status as ReportStatus,
    rootCause: r.root_cause ?? undefined,
    correctiveAction: r.corrective_action ?? undefined,
    closedAt: r.closed_at ?? undefined,
    closedBy: r.closed_by ?? undefined,
    activity: activities
      .filter((a) => a.report_id === r.id)
      .sort((a, b) => a.at.localeCompare(b.at))
      .map((a) => ({
        id: a.id,
        at: a.at,
        actor: a.actor,
        kind: a.kind as Activity["kind"],
        message: a.message,
      })),
  };
}

// ------------------------- Store -------------------------

let cache: HseReport[] = [];
let loaded = false;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

async function fetchAll(): Promise<void> {
  const [{ data: reports, error: e1 }, { data: activities, error: e2 }] = await Promise.all([
    supabase.from("hse_reports").select("*").order("reported_at", { ascending: false }),
    supabase.from("hse_activities").select("*"),
  ]);
  if (e1) throw e1;
  if (e2) throw e2;
  const acts = (activities ?? []) as ActivityRow[];
  cache = ((reports ?? []) as ReportRow[]).map((r) => rowToReport(r, acts));
  loaded = true;
  notify();
}

function ensureLoaded() {
  if (loaded || loading) return;
  loading = fetchAll()
    .catch((err) => console.error("[hse-store] load failed", err))
    .finally(() => {
      loading = null;
    });
}

let realtimeSubscribed = false;
function ensureRealtime() {
  if (realtimeSubscribed || typeof window === "undefined") return;
  realtimeSubscribed = true;
  supabase
    .channel("hse-reports-realtime")
    .on("postgres_changes", { event: "*", schema: "public", table: "hse_reports" }, () => {
      fetchAll().catch(() => {});
    })
    .on("postgres_changes", { event: "*", schema: "public", table: "hse_activities" }, () => {
      fetchAll().catch(() => {});
    })
    .subscribe();
}

export function useHseReports(): HseReport[] {
  const [snap, setSnap] = useState<HseReport[]>(cache);
  useEffect(() => {
    const l = () => setSnap([...cache]);
    listeners.add(l);
    ensureLoaded();
    ensureRealtime();
    // Sync on mount in case cache was populated before subscription
    setSnap([...cache]);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return snap;
}

export function getReport(id: string): HseReport | undefined {
  return cache.find((r) => r.id === id);
}

// ------------------------- Mutations -------------------------

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function newRef() {
  const t = Date.now().toString().slice(-6);
  return `HSE-${t}`;
}

export async function createReport(input: {
  title: string;
  description: string;
  type: ReportType;
  severity: Severity;
  location: string;
  asset?: string;
  reportedBy: string;
}): Promise<HseReport> {
  const ref = newRef();
  const { data, error } = await supabase
    .from("hse_reports")
    .insert({
      ref,
      title: input.title,
      description: input.description,
      type: input.type,
      severity: input.severity,
      location: input.location,
      asset: input.asset ?? null,
      reported_by: input.reportedBy,
      status: "open",
    })
    .select("*")
    .single();
  if (error) throw error;
  const row = data as ReportRow;

  await supabase.from("hse_activities").insert({
    report_id: row.id,
    actor: input.reportedBy,
    kind: "created",
    message: "Report submitted",
  });

  const report = rowToReport(row, []);
  // Optimistic prepend so navigation to /$id works immediately.
  cache = [report, ...cache];
  notify();
  fetchAll().catch(() => {});
  return report;
}

export async function assignReport(
  id: string,
  assignee: string,
  dueAt: string,
  actor: string,
  assigneeEmail?: string,
) {
  const existing = cache.find((r) => r.id === id);
  const patch = {
    assigned_to: assignee,
    assigned_email: assigneeEmail ?? null,
    due_at: dueAt || null,
    ...(existing?.status === "open" ? { status: "assigned" } : {}),
  };
  const { error } = await supabase.from("hse_reports").update(patch).eq("id", id);
  if (error) throw error;

  const emailPart = assigneeEmail ? ` — notification sent to ${assigneeEmail}` : "";
  await supabase.from("hse_activities").insert({
    report_id: id,
    actor,
    kind: "assigned",
    message: `Assigned to ${assignee}${
      dueAt ? ` (due ${new Date(dueAt).toLocaleDateString()})` : ""
    }${emailPart}`,
  });

  if (assigneeEmail) {
  const {data, error } = await supabase.functions.invoke(
    "send-assignment-email",
    {
      body: {
        assignee,
        email: assigneeEmail,
        reportRef: existing?.ref,
        reportTitle: existing?.title,
        dueDate: dueAt,
      },
    }
  );

  console.log("Edge Function data:", data);
  console.log("Edge Function error:", error);
  
  if (error) {
    console.error("Email sending failed:", error);

    // Do NOT stop the assignment because of an email failure.
    // The report has already been assigned successfully.
  }
}

  fetchAll().catch(() => {});
}

export async function setStatus(id: string, status: ReportStatus, actor: string) {
  const { error } = await supabase.from("hse_reports").update({ status }).eq("id", id);
  if (error) throw error;
  await supabase.from("hse_activities").insert({
    report_id: id,
    actor,
    kind: "status",
    message: `Status changed to ${status.replace("-", " ")}`,
  });
  fetchAll().catch(() => {});
}

export async function addComment(id: string, message: string, actor: string) {
  const { error } = await supabase
    .from("hse_activities")
    .insert({ report_id: id, actor, kind: "comment", message });
  if (error) throw error;
  fetchAll().catch(() => {});
}

export async function closeReport(
  id: string,
  data2: { rootCause: string; correctiveAction: string; actor: string },
) {
  const { error } = await supabase
    .from("hse_reports")
    .update({
      status: "closed",
      root_cause: data2.rootCause,
      corrective_action: data2.correctiveAction,
      closed_at: new Date().toISOString(),
      closed_by: data2.actor,
    })
    .eq("id", id);
  if (error) throw error;
  await supabase.from("hse_activities").insert({
    report_id: id,
    actor: data2.actor,
    kind: "closed",
    message: "Report closed out with root cause & corrective action",
  });
  fetchAll().catch(() => {});
}

// Kept for compatibility with any legacy imports
export const _uid = uid;

export const SEVERITY_META: Record<Severity, { label: string; color: string; ring: string }> = {
  low: { label: "Low", color: "bg-emerald-100 text-emerald-800 border-emerald-200", ring: "bg-emerald-500" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-900 border-amber-200", ring: "bg-amber-500" },
  high: { label: "High", color: "bg-orange-100 text-orange-900 border-orange-200", ring: "bg-orange-500" },
  critical: { label: "Critical", color: "bg-red-100 text-red-800 border-red-200", ring: "bg-red-600" },
};

export const STATUS_META: Record<ReportStatus, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-slate-100 text-slate-700 border-slate-200" },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800 border-blue-200" },
  "in-progress": { label: "In Progress", color: "bg-amber-100 text-amber-900 border-amber-200" },
  closed: { label: "Closed", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
};

export const TYPE_LABEL: Record<ReportType, string> = {
  "near-miss": "Near Miss",
  incident: "Incident",
  "unsafe-act": "Unsafe Act",
  "unsafe-condition": "Unsafe Condition",
  environmental: "Environmental",
  injury: "Injury / First Aid",
};
