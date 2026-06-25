import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ASSETS,
  CURRENT_USER,
  LOCATIONS,
  PEOPLE,
  TYPE_LABEL,
  createReport,
  type ReportType,
  type Severity,
} from "@/lib/hse-store";
import { ShieldAlert, Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/reports/new")({
  head: () => ({
    meta: [
      { title: "Submit HSE Report | CAPSL" },
      { name: "description", content: "Report a hazard, near-miss, incident or environmental observation in seconds." },
    ],
  }),
  component: NewReport,
});

function NewReport() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "near-miss" as ReportType,
    severity: "low" as Severity,
    location: LOCATIONS[0],
    asset: "",
    reportedBy: CURRENT_USER,
  });
  const [aiBusy, setAiBusy] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const aiClassify = () => {
    if (!form.description.trim()) {
      toast.error("Add a description first so AI can analyse it.");
      return;
    }
    setAiBusy(true);
    setTimeout(() => {
      const d = form.description.toLowerCase();
      let type: ReportType = "near-miss";
      let sev: Severity = "low";
      if (d.includes("spill") || d.includes("leak") || d.includes("smoke") || d.includes("flare")) type = "environmental";
      else if (d.includes("injur") || d.includes("cut") || d.includes("burn") || d.includes("first aid")) type = "injury";
      else if (d.includes("without") || d.includes("not wearing") || d.includes("ppe")) type = "unsafe-act";
      else if (d.includes("frayed") || d.includes("broken") || d.includes("damaged") || d.includes("worn")) type = "unsafe-condition";
      if (d.includes("fire") || d.includes("explosion") || d.includes("fatal") || d.includes("critical")) sev = "critical";
      else if (d.includes("injur") || d.includes("spill") || d.includes("smoke")) sev = "high";
      else if (d.includes("worn") || d.includes("frayed") || d.includes("slip")) sev = "medium";
      set("type", type);
      set("severity", sev);
      setAiBusy(false);
      toast.success(`AI classified as ${TYPE_LABEL[type]} · ${sev.toUpperCase()}`);
    }, 700);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please add a title and description.");
      return;
    }
    const r = createReport({ ...form, asset: form.asset || undefined });
    toast.success(`Report ${r.ref} submitted`);
    nav({ to: "/reports/$id", params: { id: r.id } });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">HSE Reporting</div>
        <h1 className="mt-1 flex items-center gap-3 text-3xl font-bold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white shadow-elegant"><ShieldAlert className="h-5 w-5" /></span>
          Submit an HSE Report
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Anyone on site can submit. Reports are routed to the HSE Lead and can be actioned to the right responder.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold">Title <span className="text-destructive">*</span></Label>
            <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Oil spill near separator V-301" className="mt-1.5 h-11" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="desc" className="text-sm font-semibold">What happened? <span className="text-destructive">*</span></Label>
              <Button type="button" variant="ghost" size="sm" onClick={aiClassify} disabled={aiBusy} className="h-7 gap-1.5 text-xs font-semibold text-primary hover:bg-accent">
                <Sparkles className="h-3.5 w-3.5" /> {aiBusy ? "Analysing…" : "AI classify"}
              </Button>
            </div>
            <Textarea id="desc" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the hazard, near-miss, incident or environmental observation. Include who, what, where, when." rows={5} className="mt-1.5" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm font-semibold">Type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v as ReportType)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(TYPE_LABEL).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Severity</Label>
              <Select value={form.severity} onValueChange={(v) => set("severity", v as Severity)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Location</Label>
              <Select value={form.location} onValueChange={(v) => set("location", v)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>{LOCATIONS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Asset (optional)</Label>
              <Select value={form.asset || "none"} onValueChange={(v) => set("asset", v === "none" ? "" : v)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="No specific asset" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific asset</SelectItem>
                  {ASSETS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold">Reported by</Label>
              <Select value={form.reportedBy} onValueChange={(v) => set("reportedBy", v)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>{PEOPLE.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold">Evidence (optional)</Label>
            <label className="mt-1.5 flex h-24 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/50 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary">
              <Upload className="h-4 w-4" /> Drop photos or files (prototype)
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="ghost" onClick={() => nav({ to: "/reports" })}>Cancel</Button>
            <Button type="submit" className="rounded-full px-6 font-semibold shadow-sm">Submit Report</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
