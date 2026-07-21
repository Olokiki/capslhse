import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  User,
  UserPlus,
  Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CURRENT_USER,
  TYPE_LABEL,
  addComment,
  assignReport,
  closeReport,
  setStatus,
  useHseReports,
} from "@/lib/hse-store";
import { SeverityBadge, StatusBadge, TypeBadge } from "@/components/hse/badges";

export const Route = createFileRoute("/_app/reports/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Report ${params.id} | CAPSL HSE` },
      { name: "description", content: "View, assign, action and close out an HSE report." },
    ],
  }),
  component: ReportDetail,
  notFoundComponent: () => <div className="p-8 text-center">Report not found.</div>,
});

function ReportDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const reports = useHseReports();
  const report = useMemo(() => reports.find((r) => r.id === id), [reports, id]);

  const [comment, setComment] = useState("");
  const [assignOpen, setAssignOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [assignee, setAssignee] = useState(report?.assignedTo ?? "");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [dueAt, setDueAt] = useState(report?.dueAt?.slice(0, 10) ?? "");
  const [rootCause, setRootCause] = useState("");
  const [corrective, setCorrective] = useState("");

  if (!report) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-muted-foreground">Report not found.</p>
        <Link to="/reports" search= {{location: undefined}}><Button variant="outline" className="mt-4">Back to reports</Button></Link>
      </div>
    );
  }

  const overdue = report.dueAt && new Date(report.dueAt) < new Date() && report.status !== "closed";

  const submitAssign = async () => {
    if (!assignee.trim()) {
      toast.error("Assignee is required.");
      return;
    }

    const email = assigneeEmail.trim();

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return; 
    }
    try {
      await assignReport(
        report.id,
        assignee,
        dueAt ? new Date(dueAt).toISOString(): "",
        CURRENT_USER,
        email || undefined
    );


    setAssignOpen(false);
    toast.success(
      email
        ? `Assigned to ${assignee}. Email notification sent.`
        : `Assigned to ${assignee}.`,
    );
  } catch (err) {
    console.error(err);
    toast.error(
      err instanceof Error
        ? err.message
        : "Assignment completed, but email could not be sent.",
    );
  }
  };
  const submitClose = () => {
    if (!rootCause.trim() || !corrective.trim()) {
      toast.error("Root cause and corrective action are required to close out.");
      return;
    }
    closeReport(report.id, { rootCause, correctiveAction: corrective, actor: CURRENT_USER });
    setCloseOpen(false);
    toast.success(`${report.ref} closed`);
  };

  const aiSuggest = () => {
    const map: Record<string, { rc: string; ca: string }> = {
      "near-miss": { rc: "Procedural gap – task performed without updated JSA.", ca: "Re-issue JSA, tool-box brief crew, add weekly spot-check for 4 weeks." },
      "unsafe-condition": { rc: "Component degradation not caught by routine inspection.", ca: "Replace component, shorten inspection interval, add to PM checklist." },
      "unsafe-act": { rc: "Behavioural – PPE protocol not followed.", ca: "Counsel personnel, re-train crew on PPE matrix, increase supervisor walk-downs." },
      environmental: { rc: "Containment integrity loss / abnormal process condition.", ca: "Repair containment, clean up to spec, review SOP, report to regulator if required." },
      injury: { rc: "Inadequate guarding / task lighting / tool selection.", ca: "Provide correct tool, install guard, re-train and verify competency." },
      incident: { rc: "Multiple contributing factors – full RCA required.", ca: "Convene RCA team, implement immediate barriers, track to closure." },
    };
    const s = map[report.type] ?? map["near-miss"];
    setRootCause(s.rc);
    setCorrective(s.ca);
    toast.success("AI suggestion populated – edit before saving.");
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-5">
      <button onClick={() => nav({ to: "/reports", search: { location: undefined}})} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to reports
      </button>

      {/* Header */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-muted-foreground">{report.ref}</span>
                <SeverityBadge s={report.severity} />
                <StatusBadge s={report.status} />
                <TypeBadge t={report.type} />
                {overdue && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold uppercase text-destructive">Overdue</span>}
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">{report.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {report.location}</span>
                {report.asset && <span className="inline-flex items-center gap-1.5"><Wrench className="h-4 w-4" /> {report.asset}</span>}
                <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> Reported by {report.reportedBy}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(report.reportedAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.status !== "closed" && (
                <>
                  <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-full"><UserPlus className="mr-2 h-4 w-4" /> {report.assignedTo ? "Reassign" : "Assign"}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Assign this report</DialogTitle></DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label className="text-sm font-semibold">Assignee</Label>
                          <Input
                            className="mt-1.5 h-11"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            placeholder="Enter assignee name"/>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">Assignee email</Label>
                          <Input
                            type="email"
                            value={assigneeEmail}
                            onChange={(e) => setAssigneeEmail(e.target.value)}
                            placeholder="name@capslgas.com"
                            className="mt-1.5 h-11"
                          />
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            A notification will be sent to this email when the report is assigned.
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">Due date</Label>
                          <Input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="mt-1.5 h-11" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setAssignOpen(false)}>Cancel</Button>
                        <Button onClick={submitAssign} className="rounded-full px-5 font-semibold">Assign</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {report.status === "assigned" && (
                    <Button variant="outline" className="rounded-full" onClick={() => { setStatus(report.id, "in-progress", CURRENT_USER); toast.success("Marked in progress"); }}>
                      Start work
                    </Button>
                  )}

                  <Dialog open={closeOpen} onOpenChange={setCloseOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-full px-5 font-semibold"><CheckCircle2 className="mr-2 h-4 w-4" /> Close out</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Close out report</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Document the root cause and what was done to prevent recurrence.</p>
                          <Button type="button" variant="ghost" size="sm" onClick={aiSuggest} className="h-7 gap-1.5 text-xs font-semibold text-primary hover:bg-accent">
                            <Sparkles className="h-3.5 w-3.5" /> AI suggest
                          </Button>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">Root cause</Label>
                          <Textarea value={rootCause} onChange={(e) => setRootCause(e.target.value)} rows={3} className="mt-1.5" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">Corrective action</Label>
                          <Textarea value={corrective} onChange={(e) => setCorrective(e.target.value)} rows={3} className="mt-1.5" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setCloseOpen(false)}>Cancel</Button>
                        <Button onClick={submitClose} className="rounded-full px-5 font-semibold">Close report</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Description</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{report.description}</p>

            {report.status === "closed" && (
              <div className="mt-6 rounded-xl border border-success/30 bg-success/5 p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-success">
                  <CheckCircle2 className="h-4 w-4" /> Closed out on {report.closedAt ? new Date(report.closedAt).toLocaleDateString() : "—"} by {report.closedBy}
                </div>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Root cause</div>
                    <div className="mt-1 text-foreground/90">{report.rootCause}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Corrective action</div>
                    <div className="mt-1 text-foreground/90">{report.correctiveAction}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <DetailRow label="Type" value={TYPE_LABEL[report.type]} />
            <DetailRow label="Assigned to" value={report.assignedTo ?? "Unassigned"} />
            <DetailRow label="Due" value={report.dueAt ? new Date(report.dueAt).toLocaleDateString() : "—"} highlight={!!overdue} />
            <DetailRow label="Reported" value={new Date(report.reportedAt).toLocaleDateString()} />
            {report.closedAt && <DetailRow label="Closed" value={new Date(report.closedAt).toLocaleDateString()} />}
          </div>
        </div>
      </Card>

      {/* Activity */}
      <Card className="p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <MessageSquare className="h-4 w-4" /> Activity & comments
        </h2>
        <div className="mt-4 space-y-4">
          {report.activity.slice().reverse().map((a) => (
            <div key={a.id} className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full brand-gradient text-[11px] font-bold text-white">
                {initials(a.actor)}
              </div>
              <div className="flex-1 rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-foreground">{a.actor}</span>
                  <span className="text-muted-foreground">{new Date(a.at).toLocaleString()}</span>
                </div>
                <div className="mt-1 text-sm text-foreground/90">{a.message}</div>
              </div>
            </div>
          ))}
        </div>

        {report.status !== "closed" && (
          <>
            <Separator className="my-5" />
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full brand-gradient text-[11px] font-bold text-white">AO</div>
              <div className="flex-1">
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add an update or progress note…" rows={2} />
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    className="rounded-full font-semibold"
                    onClick={() => {
                      if (!comment.trim()) return;
                      addComment(report.id, comment.trim(), CURRENT_USER);
                      setComment("");
                      toast.success("Comment added");
                    }}
                  >
                    <Send className="mr-1.5 h-3.5 w-3.5" /> Post
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-sm font-semibold ${highlight ? "text-destructive" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

