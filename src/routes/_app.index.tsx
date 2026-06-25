import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Clock,
  Activity,
  Leaf,
  ArrowUpRight,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LOCATIONS, useHseReports } from "@/lib/hse-store";
import { useSession } from "@/lib/auth-store";
import { SeverityBadge, StatusBadge, TypeBadge } from "@/components/hse/badges";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "CAPSL HSE | Global Dashboard" },
      { name: "description", content: "Compression and Power Systems Limited – Health, Safety & Environment reporting and compliance dashboard." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const all = useHseReports();
  const session = useSession();
  const isStaff = session?.role === "staff";
  const reports = isStaff
    ? all.filter((r) => r.location === session?.location)
    : all;

  const stats = useMemo(() => {
    const open = reports.filter((r) => r.status !== "closed").length;
    const closed = reports.filter((r) => r.status === "closed").length;
    const critical = reports.filter((r) => r.severity === "critical" && r.status !== "closed").length;
    const overdue = reports.filter((r) => r.dueAt && new Date(r.dueAt) < new Date() && r.status !== "closed").length;
    const daysSinceIncident = (() => {
      const inc = reports
        .filter((r) => r.type === "incident" || r.type === "injury")
        .map((r) => new Date(r.reportedAt).getTime())
        .sort((a, b) => b - a)[0];
      if (!inc) return 365;
      return Math.max(0, Math.floor((Date.now() - inc) / 86400000));
    })();
    return { open, closed, critical, overdue, daysSinceIncident, total: reports.length };
  }, [reports]);

  const trend = useMemo(() => {
    const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((m, i) => ({
      month: m,
      reports: Math.round(8 + Math.sin(i / 1.3) * 4 + i * 1.2 + (i === 6 ? reports.length / 3 : 0)),
      closed: Math.round(5 + Math.sin(i / 1.1) * 3 + i * 0.9),
    }));
  }, [reports.length]);

  const typeMix = useMemo(() => {
    const counts: Record<string, number> = {};
    reports.forEach((r) => (counts[r.type] = (counts[r.type] || 0) + 1));
    const labels: Record<string, string> = {
      "near-miss": "Near Miss",
      incident: "Incident",
      "unsafe-act": "Unsafe Act",
      "unsafe-condition": "Unsafe Condition",
      environmental: "Environmental",
      injury: "Injury",
    };
    const colors = ["var(--brand-green)", "var(--brand-orange)", "var(--brand-red)", "oklch(0.55 0.15 240)", "oklch(0.55 0.05 250)", "oklch(0.7 0.15 300)"];
    return Object.entries(counts).map(([k, v], i) => ({
      name: labels[k] ?? k,
      value: v,
      color: colors[i % colors.length],
    }));
  }, [reports]);

  const locationStats = useMemo(() => {
    return LOCATIONS.map((loc) => {
      const items = reports.filter((r) => r.location === loc);
      const open = items.filter((r) => r.status !== "closed").length;
      const critical = items.filter((r) => r.severity === "critical" && r.status !== "closed").length;
      const closed = items.filter((r) => r.status === "closed").length;
      const compliance = items.length === 0 ? 100 : Math.round((closed / items.length) * 100);
      return { loc, open, critical, closed, compliance, total: items.length };
    });
  }, [reports]);

  const recent = reports.slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {isStaff ? `My Site · ${session?.location}` : "Global Dashboard"}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            {isStaff ? "My HSE Analytics" : "HSE Command Center"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isStaff
              ? "Live overview of HSE performance at your current work location."
              : "Live overview of health, safety and environment performance across all CAPSL sites."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full"><Link to="/reports">View All Reports</Link></Button>
          <Button asChild className="rounded-full font-semibold"><Link to="/reports/new">Report an Incident</Link></Button>
        </div>
      </div>

      {/* KPI band — hero card */}
      <Card className="overflow-hidden border-0 p-0 shadow-elegant">
        <div className="brand-gradient relative px-6 py-6 text-white">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <HeroStat icon={<ShieldCheck className="h-5 w-5" />} label="Days Since Last Incident" value={String(stats.daysSinceIncident)} sub="Across all sites" />
            <HeroStat icon={<AlertTriangle className="h-5 w-5" />} label="Open Reports" value={String(stats.open)} sub={`${stats.critical} critical`} />
            <HeroStat icon={<Clock className="h-5 w-5" />} label="Overdue Actions" value={String(stats.overdue)} sub="Past due date" />
            <HeroStat icon={<Leaf className="h-5 w-5" />} label="Closed This Period" value={String(stats.closed)} sub="With root cause" />
          </div>
        </div>
      </Card>

      {/* KPI cards row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="TRIR (12 mo)" value="0.42" delta="-18%" good icon={<TrendingDown className="h-4 w-4" />} />
        <MiniStat label="LTIR" value="0.11" delta="-25%" good icon={<TrendingDown className="h-4 w-4" />} />
        <MiniStat label="Avg. Close-out Time" value="3.4d" delta="-0.6d" good icon={<TrendingDown className="h-4 w-4" />} />
        <MiniStat label="Reporting Rate" value="92%" delta="+7%" good icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold">Reports trend</h2>
              <p className="text-xs text-muted-foreground">Submitted vs closed over the last 7 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Legend color="var(--brand-orange)" label="Submitted" />
              <Legend color="var(--brand-green)" label="Closed" />
            </div>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="gOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-green)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--brand-green)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="reports" stroke="var(--brand-orange)" strokeWidth={2.5} fill="url(#gOrange)" />
                <Area type="monotone" dataKey="closed" stroke="var(--brand-green)" strokeWidth={2.5} fill="url(#gGreen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-base font-semibold">Report mix</h2>
          <p className="text-xs text-muted-foreground">By type, all sites</p>
          <div className="mt-2 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeMix} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {typeMix.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {typeMix.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="font-semibold tabular-nums">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Locations grid (Limble-style) — admins only */}
      {!isStaff && (
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Locations – HSE status</h2>
            <p className="text-xs text-muted-foreground">Open reports & close-out compliance by site</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {locationStats.map((s) => (
            <div key={s.loc} className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                {s.critical > 0 ? (
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">{s.critical} critical</span>
                ) : (
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success">Healthy</span>
                )}
              </div>
              <div className="mt-3 text-sm font-bold uppercase tracking-tight text-foreground">{s.loc.replace("CAPSL - ", "")}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.open} open · {s.closed} closed</div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-success" style={{ width: `${s.compliance}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Close-out</span>
                <span className="font-semibold text-success">{s.compliance}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      )}

      {/* Recent reports */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent HSE reports</h2>
            <p className="text-xs text-muted-foreground">Latest activity across all sites</p>
          </div>
          <Link to="/reports" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="mt-4 divide-y divide-border">
          {recent.map((r) => (
            <Link key={r.id} to="/reports/$id" params={{ id: r.id }} className="flex items-start gap-4 py-3 transition-colors hover:bg-secondary/50">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-secondary">
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{r.ref}</span>
                  <SeverityBadge s={r.severity} />
                  <StatusBadge s={r.status} />
                  <TypeBadge t={r.type} />
                </div>
                <div className="mt-1 truncate text-sm font-semibold text-foreground">{r.title}</div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {r.location} · reported by {r.reportedBy} · {new Date(r.reportedAt).toLocaleDateString()}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HeroStat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/85">
        {icon} {label}
      </div>
      <div className="mt-2 text-4xl font-bold tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-white/75">{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, delta, good, icon }: { label: string; value: string; delta: string; good?: boolean; icon: React.ReactNode }) {
  return (
    <Card className="p-4">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${good ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {icon} {delta}
        </span>
      </div>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} /> {label}
    </span>
  );
}
