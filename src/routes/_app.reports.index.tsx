import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHseReports, TYPE_LABEL, type ReportStatus, type Severity, type ReportType } from "@/lib/hse-store";
import { useSession } from "@/lib/auth-store";
import { SeverityBadge, StatusBadge, TypeBadge } from "@/components/hse/badges";
import { Search, Filter, Download, PlusCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/_app/reports/")({
  validateSearch: (search: Record<string, unknown>) => ({
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  head: () => ({
    meta: [
      { title: "HSE Reports | CAPSL" },
      { name: "description", content: "Browse, filter and act on all HSE reports across CAPSL field operations." },
    ],
  }),
  component: ReportsList,
});

function ReportsList() {
  const reports = useHseReports();
  const session = useSession();
  const isStaff = session?.role === "staff";
  const scopedReports = useMemo(
    () => (isStaff && session?.location ? reports.filter((r) => r.location === session.location) : reports),
    [reports, isStaff, session?.location],
  );
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | ReportStatus>("all");
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [type, setType] = useState<"all" | ReportType>("all");

  const filtered = useMemo(() => {
    return scopedReports.filter((r) => {
      if (q && !(r.title.toLowerCase().includes(q.toLowerCase()) || r.ref.toLowerCase().includes(q.toLowerCase()) || r.location.toLowerCase().includes(q.toLowerCase()))) return false;
      if (status !== "all" && r.status !== status) return false;
      if (severity !== "all" && r.severity !== severity) return false;
      if (type !== "all" && r.type !== type) return false;
      return true;
    });
  }, [scopedReports, q, status, severity, type]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Safety operations</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">HSE Reports</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {filtered.length} of {scopedReports.length} reports
            {isStaff && session?.location && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-foreground/80">
                <MapPin className="h-3 w-3" /> {session.location}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button asChild className="rounded-full font-semibold"><Link to="/reports/new"><PlusCircle className="mr-2 h-4 w-4" /> New report</Link></Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, ref, location…" className="h-10 pl-9" />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as ReportStatus | "all")}>
            <SelectTrigger className="h-10"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={severity} onValueChange={(v) => setSeverity(v as Severity | "all")}>
            <SelectTrigger className="h-10"><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={(v) => setType(v as ReportType | "all")}>
            <SelectTrigger className="h-10"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {Object.entries(TYPE_LABEL).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[110px_minmax(0,2fr)_120px_120px_minmax(0,1fr)_minmax(0,1fr)_120px] gap-4 border-b border-border bg-secondary/60 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:grid">
          <div>Ref</div>
          <div>Title</div>
          <div>Severity</div>
          <div>Status</div>
          <div>Location</div>
          <div>Assignee</div>
          <div>Reported</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((r) => (
            <Link
              key={r.id}
              to="/reports/$id"
              params={{ id: r.id }}
              className="grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-secondary/40 lg:grid-cols-[110px_minmax(0,2fr)_120px_120px_minmax(0,1fr)_minmax(0,1fr)_120px] lg:items-center"
            >
              <div className="font-mono text-xs text-muted-foreground">{r.ref}</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{r.title}</div>
                <div className="mt-1 flex items-center gap-2"><TypeBadge t={r.type} /></div>
              </div>
              <div><SeverityBadge s={r.severity} /></div>
              <div><StatusBadge s={r.status} /></div>
              <div className="truncate text-sm text-foreground/80">{r.location}</div>
              <div className="truncate text-sm text-foreground/80">{r.assignedTo ?? <span className="text-muted-foreground italic">Unassigned</span>}</div>
              <div className="text-xs text-muted-foreground">{new Date(r.reportedAt).toLocaleDateString()}</div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center text-sm text-muted-foreground">No reports match your filters.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
