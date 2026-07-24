import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { LOCATIONS, useHseReports } from "@/lib/hse-store";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/_app/locations")({
  head: () => ({ meta: [{ title: "Locations | CAPSL HSE" }] }),
  component: () => {
    const reports = useHseReports();
    const locations = [
  ...new Set([
    ...LOCATIONS,
    ...reports
      .map((r) => r.location)
      .filter(Boolean),
  ]),
]
.sort((a, b) => a.localeCompare(b))

    return (
      <div className="mx-auto max-w-[1400px] space-y-5">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sites</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">CAPSL Locations</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => {
            const items = reports.filter((r) => {
  const group =
    LOCATIONS.includes(r.location)
      ? r.location
      : "Other";

  return group === loc;
});
            const open = items.filter((r) => r.status !== "closed").length;
            return (
              <Card key={loc} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary"><MapPin className="h-5 w-5" /></div>
                <div className="mt-3 text-sm font-bold uppercase">{loc.replace("CAPSL - ", "")}</div>
                <div className="mt-1 text-xs text-muted-foreground">{items.length} total · {open} open</div>
                <Link to="/reports" search={{ location: loc }} className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">View reports →</Link>
              </Card>
            );
          })}
        </div>
      </div>
    );
  },
});
