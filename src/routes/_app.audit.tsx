import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useHseReports } from "@/lib/hse-store";

export const Route = createFileRoute("/_app/audit")({
  head: () => ({ meta: [{ title: "Audit Log | CAPSL HSE" }] }),
  component: () => {
    const reports = useHseReports();
    const events = reports
      .flatMap((r) => r.activity.map((a) => ({ ...a, ref: r.ref, title: r.title, id: r.id })))
      .sort((a, b) => +new Date(b.at) - +new Date(a.at));
    return (
      <div className="mx-auto max-w-4xl space-y-5">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Compliance</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Audit Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">Immutable trail of every action on every report.</p>
        </div>
        <Card className="divide-y divide-border">
          {events.map((e) => (
            <div key={e.id + e.id} className="flex items-start gap-4 p-4">
              <div className="font-mono text-xs text-muted-foreground">{new Date(e.at).toLocaleString()}</div>
              <div className="flex-1">
                <div className="text-sm"><span className="font-semibold">{e.actor}</span> · {e.message}</div>
                <div className="text-xs text-muted-foreground">{e.ref} – {e.title}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  },
});
