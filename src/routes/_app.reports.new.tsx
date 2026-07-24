import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  LOCATIONS,
  PEOPLE,
  TYPE_LABEL,
  assetsForLocation,
  createReport,
  type ReportType,
  type Severity,
} from "@/lib/hse-store";
import { useSession } from "@/lib/auth-store";
import { ShieldAlert, Sparkles, Upload, MapPin, Lock } from "lucide-react";

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
  const session = useSession();
  const defaultLocation = session?.location ?? LOCATIONS[0];
  const defaultReporter = session ? `${session.name} (${session.title})` : PEOPLE[0];
  const isStaff = session?.role === "staff";

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "" as ReportType | "",
    severity: "" as Severity | "",
    location: defaultLocation,
    locationOther: "",
    asset: "",
    assetOther: "",
    reportedBy: defaultReporter,
  });
  const [aiBusy, setAiBusy] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const locationAssets = useMemo(() => assetsForLocation(form.location), [form.location]);

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

  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required.");
    if (!form.description.trim()) return toast.error("Description is required.");
    if (!form.type) return toast.error("Please select a report type.");
    if (!form.severity) return toast.error("Please select a severity.");
    if (!form.location) return toast.error("Location is required.");
    if (!form.reportedBy) return toast.error("Reporter is required.");

    const finalAsset =
      form.asset === "__other__"
        ? form.assetOther.trim()
        : form.asset;
    if (!finalAsset) return toast.error("Asset is required. Pick one or enter a custom asset.");

    setSubmitting(true);
    try {
      const finalLocation =
  form.location === "__other__"
    ? form.locationOther.trim()
    : form.location;
      const r = await createReport({
  title: form.title.trim(),
  description: form.description.trim(),
  type: form.type as ReportType,
  severity: form.severity as Severity,
  location: finalLocation,
  asset: finalAsset,
  reportedBy: form.reportedBy,
});
      toast.success(`Report ${r.ref} submitted`);
      nav({ to: "/reports/$id", params: { id: r.id } });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit report. Please try again.");
      setSubmitting(false);
    }
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
          All fields are required. Reports are routed to the HSE Lead and actioned to the right responder.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold">Title <span className="text-destructive">*</span></Label>
            <Input id="title" required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Oil spill near separator V-301" className="mt-1.5 h-11" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="desc" className="text-sm font-semibold">What happened? <span className="text-destructive">*</span></Label>
              <Button type="button" variant="ghost" size="sm" onClick={aiClassify} disabled={aiBusy} className="h-7 gap-1.5 text-xs font-semibold text-primary hover:bg-accent">
                <Sparkles className="h-3.5 w-3.5" /> {aiBusy ? "Analysing…" : "AI classify"}
              </Button>
            </div>
            <Textarea id="desc" required value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the hazard, near-miss, incident or environmental observation. Include who, what, where, when." rows={5} className="mt-1.5" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm font-semibold">Type <span className="text-destructive">*</span></Label>
              <Select value={form.type || undefined} onValueChange={(v) => set("type", v as ReportType)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>{Object.entries(TYPE_LABEL).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Severity <span className="text-destructive">*</span></Label>
              <Select value={form.severity || undefined} onValueChange={(v) => set("severity", v as Severity)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select severity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold">Location <span className="text-destructive">*</span></Label>
              {isStaff ? (
                <div className="mt-1.5 flex h-11 items-center gap-2 rounded-md border border-input bg-secondary/60 px-3 text-sm">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{form.location}</span>
                </div>
              ) : (
                <>
                <Select value={form.location} onValueChange={(v) => { set("location", v); set("asset", ""); }}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="CAPSL- your current location" /></SelectTrigger>
                 <SelectContent> {LOCATIONS.map((l) => (
                <SelectItem
                 key={l}
                  value={l === "Other" ? "__other__" : l} > {l} </SelectItem>))}
                </SelectContent>
                </Select>
                {form.location === "__other__" && (
                     <Input
                      required
                      value={form.locationOther}
                      onChange={(e)=> set("locationOther", e.target.value)}
                      placeholder="CAPSL- your current location"
                      className="mt-2 h-11"
                    />
                  )}
                  </>
              )}
              {isStaff && (
                <p className="mt-1 text-[11px] text-muted-foreground">Fixed to the site you signed in from.</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-semibold">Asset <span className="text-destructive">*</span></Label>
              <Select value={form.asset || undefined} onValueChange={(v) => set("asset", v)}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select asset" /></SelectTrigger>
                <SelectContent>
                  {locationAssets.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  <SelectItem value="other"> Other </SelectItem>
                </SelectContent>
              </Select>
              {form.asset === "other" && (
                <Input
                  required
                  value={form.assetOther}
                  onChange={(e) => set("assetOther", e.target.value)}
                  placeholder="Enter asset name / tag"
                  className="mt-2 h-11"
                />
              )}
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm font-semibold">Reported by <span className="text-destructive">*</span></Label>
              <Input value={form.reportedBy} onChange={(e) => set("reportedBy", e.target.value)} required className="mt-1.5 h-11" />
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
            <Button type="button" variant="ghost" onClick={() => nav({ to: "/reports", search: {location: undefined}, })} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting} className="rounded-full px-6 font-semibold shadow-sm">{submitting ? "Submitting…" : "Submit Report"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
