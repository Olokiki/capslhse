import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { LOCATIONS, useHseReports } from "@/lib/hse-store";
import { useSession } from "@/lib/auth-store";
import { Trophy, MapPin, Medal, Award } from "lucide-react";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({
    meta: [
      { title: "Reporter Leaderboard | CAPSL HSE" },
      { name: "description", content: "Top HSE reporters by CAPSL site." },
    ],
  }),
  component: LeaderboardPage,
});

type Row = { name: string; count: number };

function tally(reports: { reportedBy: string }[]): Row[] {
  const map = new Map<string, number>();
  for (const r of reports) map.set(r.reportedBy, (map.get(r.reportedBy) ?? 0) + 1);
  return Array.from(map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

function rankIcon(i: number) {
  if (i === 0) return <Trophy className="h-4 w-4 text-[oklch(0.78_0.17_60)]" />;
  if (i === 1) return <Medal className="h-4 w-4 text-slate-400" />;
  if (i === 2) return <Award className="h-4 w-4 text-amber-700" />;
  return <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>;
}

function LocationBoard({ location, rows }: { location: string; rows: Row[] }) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  const max = rows[0]?.count ?? 0;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {location.replace("CAPSL - ", "")}
          </div>
          <div className="mt-1 text-2xl font-bold tracking-tight">{total}</div>
          <div className="text-xs text-muted-foreground">reports submitted</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
          <Trophy className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {rows.length === 0 && (
          <div className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
            No reports yet from this site.
          </div>
        )}
        {rows.slice(0, 8).map((r, i) => (
          <div key={r.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                  {rankIcon(i)}
                </span>
                <span className="truncate font-medium">{r.name}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                {r.count}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full brand-gradient"
                style={{ width: `${max ? (r.count / max) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LeaderboardPage() {
  const reports = useHseReports();
  const session = useSession();
  const isStaff = session?.role === "staff";
  const visibleLocations = isStaff && session?.location ? [session.location] : LOCATIONS;

  const boards = useMemo(
    () =>
      visibleLocations.map((loc) => ({
        location: loc,
        rows: tally(reports.filter((r) => r.location === loc)),
      })),
    [reports, visibleLocations],
  );

  const overall = useMemo(() => tally(reports), [reports]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recognition</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Reporter Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isStaff
            ? "Top HSE contributors at your site — every report makes CAPSL safer."
            : "Top HSE contributors across every CAPSL site."}
        </p>
      </div>

      {!isStaff && (
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Trophy className="h-4 w-4 text-[oklch(0.78_0.17_60)]" /> Overall top reporters (all locations)
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {overall.slice(0, 6).map((r, i) => (
              <div key={r.name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background">
                    {rankIcon(i)}
                  </span>
                  <span className="truncate text-sm font-medium">{r.name}</span>
                </div>
                <span className="text-xs font-bold tabular-nums text-primary">{r.count}</span>
              </div>
            ))}
            {overall.length === 0 && (
              <div className="text-sm text-muted-foreground">No reports yet.</div>
            )}
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {boards.map((b) => (
          <LocationBoard key={b.location} location={b.location} rows={b.rows} />
        ))}
      </div>
    </div>
  );
}
