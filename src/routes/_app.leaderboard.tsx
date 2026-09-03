import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LOCATION_GROUPS,
  getLocationGroup,
  useHseReports,
} from "@/lib/hse-store";
import { useSession } from "@/lib/auth-store";
import {
  Trophy,
  MapPin,
  Medal,
  Award,
  User,
  BarChart3,
} from "lucide-react";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({
    meta: [
      { title: "Reporter Leaderboard | CAPSL HSE" },
      {
        name: "description",
        content:
          "Recognising the people and locations actively contributing to CAPSL's HSE performance.",
      },
    ],
  }),
  component: LeaderboardPage,
});

type LeaderboardCategory =
  | "location"
  | "reporter"
  | "site";

type LocationRow = {
  location: string;
  count: number;
};

type ReporterRow = {
  id: string;
  name: string;
  count: number;
};

function rankIcon(i: number) {
  if (i === 0) {
    return (
      <Trophy className="h-4 w-4 text-[oklch(0.78_0.17_60)]" />
    );
  }

  if (i === 1) {
    return <Medal className="h-4 w-4 text-slate-400" />;
  }

  if (i === 2) {
    return <Award className="h-4 w-4 text-amber-700" />;
  }

  return (
    <span className="text-xs font-semibold text-muted-foreground">
      #{i + 1}
    </span>
  );
}

/* ---------------------------------------------------------
   BY LOCATION
--------------------------------------------------------- */

function tallyLocations(
  reports: {
    location: string;
  }[]
): LocationRow[] {
  const map = new Map<string, number>();

  for (const report of reports) {
    const location = getLocationGroup(report.location);

    map.set(
      location,
      (map.get(location) ?? 0) + 1
    );
  }

  return Array.from(map.entries())
    .map(([location, count]) => ({
      location,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ---------------------------------------------------------
   BY REPORTER
--------------------------------------------------------- */

function tallyReporters(
  reports: {
    reportedBy: string;
    reportedByUserId?: string;
  }[]
): ReporterRow[] {
  const map = new Map<string, ReporterRow>();

  for (const report of reports) {
    /*
     * Use the authenticated user's UUID when available.
     * For older reports where reportedByUserId is missing,
     * fall back to the reporter's display name.
     */
    const id =
      report.reportedByUserId ??
      `name:${report.reportedBy}`;

    const existing = map.get(id);

    if (existing) {
      existing.count += 1;
    } else {
      map.set(id, {
        id,
        name: report.reportedBy,
        count: 1,
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count
  );
}

/* ---------------------------------------------------------
   RANKED LOCATION ROW
--------------------------------------------------------- */

function LocationRankRow({
  row,
  index,
  max,
}: {
  row: LocationRow;
  index: number;
  max: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background">
            {rankIcon(index)}
          </span>

          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm font-medium">
              {row.location}
            </span>
          </div>
        </div>

        <span className="ml-3 shrink-0 text-sm font-bold tabular-nums text-primary">
          {row.count}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full brand-gradient"
          style={{
            width: `${max ? (row.count / max) * 100 : 0}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   RANKED REPORTER ROW
--------------------------------------------------------- */

function ReporterRankRow({
  row,
  index,
  max,
}: {
  row: ReporterRow;
  index: number;
  max: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background">
            {rankIcon(index)}
          </span>

          <div className="flex min-w-0 items-center gap-2">
            <User className="h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="truncate text-sm font-medium">
              {row.name}
            </span>
          </div>
        </div>

        <span className="ml-3 shrink-0 text-sm font-bold tabular-nums text-primary">
          {row.count}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full brand-gradient"
          style={{
            width: `${max ? (row.count / max) * 100 : 0}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MY CONTRIBUTIONS
--------------------------------------------------------- */

function MyContributions({
  reports,
  session,
}: {
  reports: ReturnType<typeof useHseReports>;
  session: ReturnType<typeof useSession>;
}) {
  const myReports = useMemo(() => {
    if (!session?.userId) return [];

    const displayName = `${session.name} (${session.title})`;

    return reports.filter((report) => {
      /*
       * New reports use the authenticated UUID.
       */
      if (report.reportedByUserId) {
        return report.reportedByUserId === session.userId;
      }

      /*
       * Older reports may not have a user UUID.
       * Use the exact historical display name as a fallback.
       */
      return report.reportedBy === displayName;
    });
  }, [reports, session]);

  const byLocation = useMemo(() => {
    const counts = new Map<string, number>();

    for (const report of myReports) {
      const location = getLocationGroup(report.location);

      counts.set(
        location,
        (counts.get(location) ?? 0) + 1
      );
    }

    return Array.from(counts.entries()).sort(
      (a, b) => b[1] - a[1]
    );
  }, [myReports]);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <BarChart3 className="h-4 w-4 text-primary" />
        My Contributions
      </div>

      <div className="mt-4">
        <div className="text-3xl font-bold tracking-tight">
          {myReports.length}
        </div>

        <div className="text-xs text-muted-foreground">
          Reports Submitted
        </div>
      </div>

      {byLocation.length > 0 ? (
        <div className="mt-5 space-y-2">
          {byLocation.map(([location, count]) => (
            <div
              key={location}
              className="flex items-center justify-between rounded-md bg-secondary/40 px-3 py-2"
            >
              <span className="text-sm">
                {location.replace("CAPSL - ", "")}
              </span>

              <span className="text-sm font-semibold tabular-nums">
                {count}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-border py-5 text-center text-xs text-muted-foreground">
          You have not submitted any reports yet.
        </div>
      )}
    </Card>
  );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */

function LeaderboardPage() {
  const reports = useHseReports();
  const session = useSession();

  const [category, setCategory] =
    useState<LeaderboardCategory>("location");

  const isStaff = session?.role === "staff";

  /* -------------------------------------------------------
     LOCATION LEADERBOARD
  ------------------------------------------------------- */

  const locationLeaderboard = useMemo(
    () => tallyLocations(reports),
    [reports]
  );

  /* -------------------------------------------------------
     OVERALL REPORTER LEADERBOARD
  ------------------------------------------------------- */

  const reporterLeaderboard = useMemo(
    () => tallyReporters(reports),
    [reports]
  );

  /* -------------------------------------------------------
     SITE REPORTS
  ------------------------------------------------------- */

  const siteReports = useMemo(() => {
    if (!session?.location) return [];

    const userLocation =
      getLocationGroup(session.location);

    return reports.filter(
      (report) =>
        getLocationGroup(report.location) ===
        userLocation
    );
  }, [reports, session]);

  /* -------------------------------------------------------
     SITE CONTRIBUTORS
  ------------------------------------------------------- */

  const siteContributorLeaderboard = useMemo(
    () => tallyReporters(siteReports),
    [siteReports]
  );

  /* -------------------------------------------------------
     SITE CONTRIBUTOR BOARDS FOR ADMIN
  ------------------------------------------------------- */

  const siteBoards = useMemo(() => {
    return LOCATION_GROUPS.map((location) => {
      const locationReports = reports.filter(
        (report) =>
          getLocationGroup(report.location) ===
          location
      );

      return {
        location,
        rows: tallyReporters(locationReports),
        total: locationReports.length,
      };
    }).filter((board) => board.total > 0);
  }, [reports]);

  const locationMax =
    locationLeaderboard[0]?.count ?? 0;

  const reporterMax =
    reporterLeaderboard[0]?.count ?? 0;

  const siteMax =
    siteContributorLeaderboard[0]?.count ?? 0;

  return (
    <div className="mx-auto max-w-[1100px] space-y-6">

      {/* ---------------------------------------------------
          HEADER
      --------------------------------------------------- */}

      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recognition
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Reporter Leaderboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Recognising the people and locations actively
          contributing to CAPSL's HSE performance.
        </p>
      </div>

      {/* ---------------------------------------------------
          TABS
      --------------------------------------------------- */}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("location")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            category === "location"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          By Location
        </button>

        <button
          type="button"
          onClick={() => setCategory("reporter")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            category === "reporter"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          By Reporter
        </button>

        <button
          type="button"
          onClick={() => setCategory("site")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            category === "site"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          Site Contributors
        </button>
      </div>

      {/* ---------------------------------------------------
          BY LOCATION
      --------------------------------------------------- */}

      {category === "location" && (
        <Card className="p-5">
          <div className="mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-primary" />
              By Location
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Locations ranked by the number of HSE reports
              submitted.
            </p>
          </div>

          <div className="space-y-3">
            {locationLeaderboard.map((row, index) => (
              <LocationRankRow
                key={row.location}
                row={row}
                index={index}
                max={locationMax}
              />
            ))}

            {locationLeaderboard.length === 0 && (
              <div className="rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                No reports yet.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* ---------------------------------------------------
          BY REPORTER
      --------------------------------------------------- */}

      {category === "reporter" && (
        <Card className="p-5">
          <div className="mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Trophy className="h-4 w-4 text-primary" />
              Top Reporters
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Users ranked by the number of HSE reports they
              have submitted.
            </p>
          </div>

          <div className="space-y-3">
            {reporterLeaderboard
              .slice(0, 20)
              .map((row, index) => (
                <ReporterRankRow
                  key={row.id}
                  row={row}
                  index={index}
                  max={reporterMax}
                />
              ))}

            {reporterLeaderboard.length === 0 && (
              <div className="rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                No reports yet.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* ---------------------------------------------------
          SITE CONTRIBUTORS
      --------------------------------------------------- */}

      {category === "site" && (
        <>
          {isStaff ? (
            <Card className="p-5">
              <div className="mb-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary" />
                  Site Contributors
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Top contributors at{" "}
                  {getLocationGroup(
                    session?.location ?? ""
                  )}
                  .
                </p>
              </div>

              <div className="space-y-3">
                {siteContributorLeaderboard
                  .slice(0, 20)
                  .map((row, index) => (
                    <ReporterRankRow
                      key={row.id}
                      row={row}
                      index={index}
                      max={siteMax}
                    />
                  ))}

                {siteContributorLeaderboard.length ===
                  0 && (
                  <div className="rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                    No reports yet from this site.
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {siteBoards.map((board) => {
                const max =
                  board.rows[0]?.count ?? 0;

                return (
                  <Card
                    key={board.location}
                    className="p-5"
                  >
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <MapPin className="h-4 w-4 text-primary" />
                        {board.location}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {board.total} reports submitted
                      </p>
                    </div>

                    <div className="space-y-3">
                      {board.rows
                        .slice(0, 8)
                        .map((row, index) => (
                          <ReporterRankRow
                            key={row.id}
                            row={row}
                            index={index}
                            max={max}
                          />
                        ))}
                    </div>
                  </Card>
                );
              })}

              {siteBoards.length === 0 && (
                <Card className="p-8 text-center text-sm text-muted-foreground md:col-span-2">
                  No reports yet.
                </Card>
              )}
            </div>
          )}
        </>
      )}

      {/* ---------------------------------------------------
          MY CONTRIBUTIONS
      --------------------------------------------------- */}

      <MyContributions
        reports={reports}
        session={session}
      />
    </div>
  );
}