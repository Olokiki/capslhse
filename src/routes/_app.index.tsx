import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import {
  TYPE_LABEL,
  LOCATIONS,
  LOCATION_GROUPS,
  getLocationGroup,
  useHseReports,
} from "@/lib/hse-store";
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

 const [trendRange, setTrendRange] = useState<
  "1day" | "7days" | "30days" | "custom">("30days");

const [customFrom, setCustomFrom] = useState("");
const [customTo, setCustomTo] = useState("");

  // Report Mix date range
  const [reportMixRange, setReportMixRange] = useState<
    "1day" | "7days" | "30days"
  >("30days");

  const [reportMixDate, setReportMixDate] = useState("");

  const reportMixDates = useMemo(() => {
    const dates: string[] = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const numberOfDays =
      reportMixRange === "1day"
        ? 1
        : reportMixRange === "7days"
          ? 7
          : 30;

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      dates.push(`${year}-${month}-${day}`);
    }

    return dates;
  }, [reportMixRange]);

  useEffect(() => {
    if (reportMixDates.length > 0) {
      setReportMixDate((current) =>
        current && reportMixDates.includes(current)
          ? current
          : reportMixDates[0],
      );
    }
  }, [reportMixDates]);

const trend = useMemo(() => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  let startDate: Date;
  let endDate: Date = new Date(today);

  if (trendRange === "1day") {
    startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
  } else if (trendRange === "7days") {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
  } else if (trendRange === "30days") {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);
  } else {
    if (!customFrom || !customTo) {
      return [];
    }

    startDate = new Date(`${customFrom}T00:00:00`);
    endDate = new Date(`${customTo}T23:59:59`);
  }

  const data: {
    date: string;
    displayDate: string;
    reports: number;
    closed: number;
  }[] = [];

  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    data.push({
      date: dateKey,
      displayDate: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      reports: 0,
      closed: 0,
    });

    current.setDate(current.getDate() + 1);
  }

  reports.forEach((report) => {
    const reportDate = new Date(report.reportedAt);

    if (isNaN(reportDate.getTime())) return;

    const year = reportDate.getFullYear();
    const month = String(reportDate.getMonth() + 1).padStart(2, "0");
    const day = String(reportDate.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    const row = data.find((item) => item.date === dateKey);

    if (!row) return;

    row.reports++;

    if (report.status === "closed") {
      row.closed++;
    }
  });

  return data;
}, [reports, trendRange, customFrom, customTo]);

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

    const selectedReportMix = useMemo(() => {
    if (!reportMixDate) {
      return typeMix;
    }

    return typeMix.map((item) => {
      const count = reports.filter((report) => {
        const reportDate = new Date(report.reportedAt);

        if (isNaN(reportDate.getTime())) {
          return false;
        }

        const year = reportDate.getFullYear();
        const month = String(reportDate.getMonth() + 1).padStart(2, "0");
        const day = String(reportDate.getDate()).padStart(2, "0");

        const dateKey = `${year}-${month}-${day}`;

        const reportType =
          TYPE_LABEL[report.type] ?? report.type;

        return (
          dateKey === reportMixDate &&
          reportType === item.name
        );
      }).length;

      return {
        ...item,
        value: count,
      };
    });
  }, [reports, typeMix, reportMixDate]);

  const locationStats = useMemo(() => {
  return LOCATION_GROUPS.map((loc) => {
    const items = reports.filter(
      (r) => getLocationGroup(r.location) === loc
    );

    const open = items.filter(
      (r) => r.status !== "closed"
    ).length;

    const critical = items.filter(
      (r) =>
        r.severity === "critical" &&
        r.status !== "closed"
    ).length;

    const closed = items.filter(
      (r) => r.status === "closed"
    ).length;

    const compliance =
      items.length === 0
        ? 100
        : Math.round((closed / items.length) * 100);

    return {
      loc,
      open,
      critical,
      closed,
      compliance,
      total: items.length,
    };
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
          <Button asChild variant="outline" className="rounded-full"><Link to="/reports" search = {{location : undefined}}>View All Reports</Link></Button>
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

      {/* KPI cards row — derived from real report data */}
      <RealKpis reports={reports} />

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">

        {/* Reports Trend */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">
                Reports trend
              </h2>

              <p className="text-xs text-muted-foreground">
                Submitted vs closed reports by day
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={trendRange}
                onChange={(e) =>
                  setTrendRange(
                    e.target.value as
                      | "1day"
                      | "7days"
                      | "30days"
                      | "custom"
                  )
                }
                className="h-9 rounded-md border border-border bg-background px-3 text-xs"
              >
                <option value="1day">1 day</option>
                <option value="7days">7 days</option>
                <option value="30days">30 days</option>
                <option value="custom">Custom</option>
              </select>

              <div className="flex items-center gap-3 text-xs">
                <Legend
                  color="var(--brand-orange)"
                  label="Submitted"
                />

                <Legend
                  color="var(--brand-green)"
                  label="Closed"
                />
              </div>
            </div>
          </div>

          {/* Custom Date Range */}
          {trendRange === "custom" && (
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  From
                </label>

                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-xs"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  To
                </label>

                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-3 text-xs"
                />
              </div>
            </div>
          )}

          {/* Trend Chart */}
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trend}
                margin={{
                  top: 10,
                  right: 12,
                  left: -16,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="gOrange"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--brand-orange)"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--brand-orange)"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="gGreen"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--brand-green)"
                      stopOpacity={0.45}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--brand-green)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="displayDate"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="reports"
                  name="Submitted"
                  stroke="var(--brand-orange)"
                  strokeWidth={2.5}
                  fill="url(#gOrange)"
                />

                <Area
                  type="monotone"
                  dataKey="closed"
                  name="Closed"
                  stroke="var(--brand-green)"
                  strokeWidth={2.5}
                  fill="url(#gGreen)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
               {/* Report Mix */}
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">
                Report mix
              </h2>

              <p className="text-xs text-muted-foreground">
                By type, all sites
              </p>
            </div>

            <select
              value={reportMixRange}
              onChange={(e) =>
                setReportMixRange(
                  e.target.value as "1day" | "7days" | "30days"
                )
              }
              className="h-9 rounded-md border border-border bg-background px-3 text-xs"
            >
              <option value="1day">1 day</option>
              <option value="7days">7 days</option>
              <option value="30days">30 days</option>
            </select>
          </div>

          {/* Date navigation */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              disabled={
                reportMixDates.length === 0 ||
                reportMixDates.indexOf(reportMixDate) >=
                  reportMixDates.length - 1
              }
              onClick={() => {
                const currentIndex =
                  reportMixDates.indexOf(reportMixDate);

                if (
                  currentIndex >= 0 &&
                  currentIndex < reportMixDates.length - 1
                ) {
                  setReportMixDate(
                    reportMixDates[currentIndex + 1]
                  );
                }
              }}
            >
              ‹
            </Button>

            <span className="min-w-[130px] text-center text-xs font-medium">
              {reportMixDate
                ? new Date(
                    `${reportMixDate}T00:00:00`
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No date"}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              disabled={
                reportMixDates.length === 0 ||
                reportMixDates.indexOf(reportMixDate) <= 0
              }
              onClick={() => {
                const currentIndex =
                  reportMixDates.indexOf(reportMixDate);

                if (currentIndex > 0) {
                  setReportMixDate(
                    reportMixDates[currentIndex - 1]
                  );
                }
              }}
            >
              ›
            </Button>
          </div>

          {/* Pie Chart */}
          <div className="mt-2 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedReportMix}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {selectedReportMix.map((d, i) => (
                    <Cell
                      key={`${d.name}-${i}`}
                      fill={d.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-2 space-y-1.5">
            {selectedReportMix.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{
                      background: d.color,
                    }}
                  />

                  {d.name}
                </span>

                <span className="font-semibold tabular-nums">
                  {d.value}
                </span>
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
              <h2 className="text-base font-semibold">
                Locations – HSE status
              </h2>

              <p className="text-xs text-muted-foreground">
                Open reports & close-out compliance by site
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locationStats.map((s) => (
              <div
                key={s.loc}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>

                  {s.critical > 0 ? (
                    <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">
                      {s.critical} critical
                    </span>
                  ) : (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success">
                      Healthy
                    </span>
                  )}
                </div>

                <div className="mt-3 text-sm font-bold uppercase tracking-tight text-foreground">
                  {s.loc.replace("CAPSL - ", "")}
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  {s.open} open · {s.closed} closed
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: `${s.compliance}%` }}
                  />
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">
                    Close-out
                  </span>

                  <span className="font-semibold text-success">
                    {s.compliance}%
                  </span>
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
            <h2 className="text-base font-semibold">
              Recent HSE reports
            </h2>

            <p className="text-xs text-muted-foreground">
              Latest activity across all sites
            </p>
          </div>

          <Link
            to="/reports"
            search={{ location: undefined }}
            className="text-xs font-semibold text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="mt-4 divide-y divide-border">
          {recent.map((r) => (
            <Link
              key={r.id}
              to="/reports/$id"
              params={{ id: r.id }}
              className="flex items-start gap-4 py-3 transition-colors hover:bg-secondary/50"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-secondary">
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {r.ref}
                  </span>

                  <SeverityBadge s={r.severity} />
                  <StatusBadge s={r.status} />
                  <TypeBadge t={r.type} />
                </div>

                <div className="mt-1 truncate text-sm font-semibold text-foreground">
                  {r.title}
                </div>

                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {r.location} · reported by {r.reportedBy} ·{" "}
                  {new Date(r.reportedAt).toLocaleDateString()}
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

function HeroStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/85">
        {icon} {label}
      </div>

      <div className="mt-2 text-4xl font-bold tabular-nums">
        {value}
      </div>

      <div className="mt-1 text-xs text-white/75">
        {sub}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  delta,
  good,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  good?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="text-xs font-medium text-muted-foreground">
        {label}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums">
          {value}
        </span>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            good
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {icon} {delta}
        </span>
      </div>
    </Card>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span
        className="h-2.5 w-2.5 rounded-sm"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

// Real KPIs derived from the actual reports the users have submitted.
function RealKpis({
  reports,
}: {
  reports: ReturnType<typeof useHseReports>;
}) {
  const now = Date.now();

  const in12mo = reports.filter(
    (r) =>
      now - new Date(r.reportedAt).getTime() <
      365 * 86400000
  );

  const in3mo = reports.filter(
    (r) =>
      now - new Date(r.reportedAt).getTime() <
      90 * 86400000
  );

  const prev3mo = reports.filter((r) => {
    const age =
      now - new Date(r.reportedAt).getTime();

    return (
      age >= 90 * 86400000 &&
      age < 180 * 86400000
    );
  });

  const recordable12 = in12mo.filter(
    (r) =>
      r.type === "incident" ||
      r.type === "injury"
  ).length;

  const lostTime12 = in12mo.filter(
    (r) => r.type === "injury"
  ).length;

  const closed = reports.filter(
    (r) =>
      r.status === "closed" &&
      r.closedAt
  );

  const avgCloseDays =
    closed.length === 0
      ? 0
      : closed.reduce(
          (sum, r) =>
            sum +
            (new Date(r.closedAt!).getTime() -
              new Date(r.reportedAt).getTime()) /
              86400000,
          0
        ) / closed.length;

  const closeRate =
    reports.length === 0
      ? 0
      : (reports.filter(
          (r) => r.status === "closed"
        ).length /
          reports.length) *
        100;

  const delta3mo =
    in3mo.length - prev3mo.length;

  const deltaLabel =
    delta3mo === 0
      ? "±0"
      : (delta3mo > 0 ? "+" : "") +
        delta3mo;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MiniStat
        label="Recordable Incidents (12 mo)"
        value={String(recordable12)}
        delta={`${deltaLabel} vs prev 3 mo`}
        good={delta3mo <= 0}
        icon={
          delta3mo <= 0 ? (
            <TrendingDown className="h-4 w-4" />
          ) : (
            <TrendingUp className="h-4 w-4" />
          )
        }
      />

      <MiniStat
        label="Lost-Time Injuries (12 mo)"
        value={String(lostTime12)}
        delta={
          lostTime12 === 0
            ? "no injuries"
            : `${lostTime12} logged`
        }
        good={lostTime12 === 0}
        icon={
          lostTime12 === 0 ? (
            <TrendingDown className="h-4 w-4" />
          ) : (
            <TrendingUp className="h-4 w-4" />
          )
        }
      />

      <MiniStat
        label="Avg. Close-out Time"
        value={
          closed.length === 0
            ? "—"
            : `${avgCloseDays.toFixed(1)}d`
        }
        delta={`${closed.length} closed`}
        good={true}
        icon={
          <TrendingDown className="h-4 w-4" />
        }
      />

      <MiniStat
        label="Close-out Rate"
        value={
          reports.length === 0
            ? "—"
            : `${Math.round(closeRate)}%`
        }
        delta={`${reports.length} total`}
        good={closeRate >= 60}
        icon={
          closeRate >= 60 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )
        }
      />
    </div>
  );
}