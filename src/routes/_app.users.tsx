import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth-store";
import { useHseReports } from "@/lib/hse-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Briefcase,
  ShieldCheck,
  HardHat,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/_app/users")({
  component: UsersPage,
});

type ProfileRow = {
  user_id: string;
  email: string;
  full_name: string;
  title: string | null;
  location: string | null;
  created_at: string;
};

type RoleRow = { user_id: string; role: "admin" | "staff" };

type UserRecord = ProfileRow & { role: "admin" | "staff" };

function UsersPage() {
  const session = useSession();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reports = useHseReports();

  useEffect(() => {
    if (session && session.role !== "admin") navigate({ to: "/" });
  }, [session, navigate]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("profiles").select("*").order("full_name"),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      if (!alive) return;
      setProfiles((p ?? []) as ProfileRow[]);
      setRoles((r ?? []) as RoleRow[]);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const users: UserRecord[] = useMemo(() => {
    return profiles.map((p) => ({
      ...p,
      role: roles.some((r) => r.user_id === p.user_id && r.role === "admin")
        ? "admin"
        : "staff",
    }));
  }, [profiles, roles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.title ?? "").toLowerCase().includes(q) ||
        (u.location ?? "").toLowerCase().includes(q),
    );
  }, [users, query]);

  const selected = users.find((u) => u.user_id === selectedId) ?? null;

  if (session?.role !== "admin") return null;

  if (selected) {
    return (
      <UserDetail
        user={selected}
        reports={reports}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Everyone who has created an account with a @capslgas.com email. Click a user
          to view their role, station and reporting activity.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, title, location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 rounded-full pl-9"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {loading ? "Loading users…" : `${filtered.length} user${filtered.length === 1 ? "" : "s"}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((u) => {
              const initials = u.full_name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((s) => s[0]?.toUpperCase())
                .join("");
              const openCount = reports.filter(
                (r) => r.reportedBy === u.full_name && r.status !== "closed",
              ).length;
              return (
                <button
                  key={u.user_id}
                  onClick={() => setSelectedId(u.user_id)}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-xs font-bold text-white">
                    {initials || "—"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{u.full_name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {u.email}
                    </div>
                  </div>
                  <div className="hidden text-xs text-muted-foreground sm:block">
                    {u.title ?? "—"}
                  </div>
                  <div className="hidden text-xs text-muted-foreground md:block min-w-[140px]">
                    {u.location ?? "—"}
                  </div>
                  {openCount > 0 && (
                    <Badge variant="secondary" className="hidden lg:inline-flex">
                      {openCount} open
                    </Badge>
                  )}
                  <Badge
                    className={
                      u.role === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {u.role === "admin" ? (
                      <ShieldCheck className="mr-1 h-3 w-3" />
                    ) : (
                      <HardHat className="mr-1 h-3 w-3" />
                    )}
                    {u.role === "admin" ? "Admin" : "Staff"}
                  </Badge>
                </button>
              );
            })}
            {!loading && filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                No users match your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserDetail({
  user,
  reports,
  onBack,
}: {
  user: UserRecord;
  reports: ReturnType<typeof useHseReports>;
  onBack: () => void;
}) {
  const mine = reports.filter(
    (r) => r.reportedBy === user.full_name || r.assignedTo === user.full_name,
  );
  const submitted = reports.filter((r) => r.reportedBy === user.full_name);
  const open = mine.filter((r) => r.status !== "closed");
  const closed = mine.filter((r) => r.status === "closed");

  const avgCloseDays = (() => {
    const durations = reports
      .filter(
        (r) =>
          r.status === "closed" &&
          r.closedAt &&
          (r.reportedBy === user.full_name || r.assignedTo === user.full_name),
      )
      .map((r) => {
        const start = new Date(r.reportedAt).getTime();
        const end = new Date(r.closedAt!).getTime();
        return (end - start) / (1000 * 60 * 60 * 24);
      });
    if (!durations.length) return null;
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    return avg.toFixed(1);
  })();

  const initials = user.full_name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to users
      </Button>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl brand-gradient text-2xl font-bold text-white">
            {initials || "—"}
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <div className="text-xl font-bold">{user.full_name}</div>
              <div className="text-sm text-muted-foreground">{user.title ?? "—"}</div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                {user.role === "admin" ? "Administrator" : "Staff"}
              </span>
              {user.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {user.location}
                </span>
              )}
            </div>
          </div>
          <Badge
            className={
              user.role === "admin"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }
          >
            {user.role === "admin" ? "Admin" : "Staff"}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Reports Submitted" value={submitted.length} />
        <Stat label="Open Reports" value={open.length} />
        <Stat label="Closed Reports" value={closed.length} />
        <Stat
          label="Avg Close Time"
          value={avgCloseDays === null ? "—" : `${avgCloseDays} days`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mine.slice(0, 15).map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.ref} · {r.location} · {new Date(r.reportedAt).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {r.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
            {mine.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No reports yet from this user.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
