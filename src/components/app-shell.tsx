import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldAlert,
  ClipboardList,
  PlusCircle,
  Map,
  Search,
  Sparkles,
  LogOut,
  MapPin,
  BarChart3,
  BookOpen,
  Menu,
  Trophy,
  Users as UsersIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSession, signOut, type Session } from "@/lib/auth-store";

const ADMIN_NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/reports", label: "HSE Reports", icon: ShieldAlert },
  { to: "/users", label: "Users", icon: UsersIcon },
  { to: "/documents", label: "Documents", icon: BookOpen },
  { to: "/locations", label: "Locations", icon: Map },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/audit", label: "Audit Log", icon: ClipboardList },
];

const STAFF_NAV = [
  { to: "/", label: "My Analytics", icon: BarChart3, exact: true },
  { to: "/reports", label: "HSE Reports", icon: ShieldAlert },
  { to: "/documents", label: "Documents", icon: BookOpen },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

function SidebarContent({
  session,
  pathname,
  onSignOut,
  onNavigate,
}: {
  session: Session;
  pathname: string;
  onSignOut: () => void;
  onNavigate?: () => void;
}) {
  const NAV = session.role === "admin" ? ADMIN_NAV : STAFF_NAV;
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
        <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">CAPSL HSE</div>
          <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">
            {session.role === "admin" ? "Admin Console" : "Staff Portal"}
          </div>
        </div>
      </div>

      {session.role === "staff" && session.location && (
        <div className="mx-3 mt-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold text-sidebar-foreground/80">
            <MapPin className="h-3.5 w-3.5" /> On site
          </div>
          <div className="mt-0.5 text-sidebar-foreground">{session.location}</div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={[
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              ].join(" ")}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-sidebar-foreground">
          <Sparkles className="h-4 w-4 text-[oklch(0.85_0.18_60)]" />
          AI Assist (Preview)
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/70">
          Auto-classify reports, suggest root cause and route to the right responder.
        </p>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
        >
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const session = useSession();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!session) return null;

  function handleSignOut() {
    signOut();
    setMobileOpen(false);
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 md:block">
        <SidebarContent session={session} pathname={pathname} onSignOut={handleSignOut} />
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 border-0 bg-sidebar">
                <VisuallyHidden>
                  <SheetTitle>Navigation menu</SheetTitle>
                </VisuallyHidden>
                <SidebarContent
                  session={session}
                  pathname={pathname}
                  onSignOut={handleSignOut}
                  onNavigate={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center gap-2 md:hidden" aria-label="CAPSL HSE home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 ring-1 ring-border">
                <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />
              </div>
              <span className="text-sm font-semibold tracking-tight">CAPSL HSE</span>
            </Link>

            <div className="relative hidden w-full max-w-md sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports, assets, locations..."
                className="h-10 rounded-full border-border bg-secondary pl-9 pr-4 text-sm focus-visible:ring-primary"
              />
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <Button asChild className="h-10 rounded-full px-3 font-semibold shadow-sm sm:px-5">
                <Link to="/reports/new">
                  <PlusCircle className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">New HSE Report</span>
                </Link>
              </Button>
              <div className="ml-1 hidden items-center gap-3 lg:flex">
                <div className="text-right leading-tight">
                  <div className="text-xs font-semibold">{session.name}</div>
                  <div className="text-[11px] text-muted-foreground">{session.title}</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full brand-gradient text-xs font-bold text-white">
                  {session.initials}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="h-10 rounded-full px-3 sm:px-4"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
