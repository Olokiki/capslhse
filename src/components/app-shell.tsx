import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShieldAlert,
  ClipboardList,
  PlusCircle,
  Map,
  Settings,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import { type ReactNode } from "react";
import capslLogo from "@/assets/capsl-logo.jpeg.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/reports", label: "HSE Reports", icon: ShieldAlert },
  { to: "/reports/new", label: "Submit Report", icon: PlusCircle },
  { to: "/locations", label: "Locations", icon: Map },
  { to: "/audit", label: "Audit Log", icon: ClipboardList },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
            <img src={capslLogo.url} alt="CAPSL" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">CAPSL HSE</div>
            <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">
              Safety Platform
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
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
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
          >
            <Settings className="h-[18px] w-[18px]" /> Settings
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports, assets, locations..."
                className="h-10 rounded-full border-border bg-secondary pl-9 pr-4 text-sm focus-visible:ring-primary"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/reports/new">
                <Button className="h-10 rounded-full px-5 font-semibold shadow-sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> New HSE Report
                </Button>
              </Link>
              <div className="ml-2 hidden items-center gap-3 sm:flex">
                <div className="text-right leading-tight">
                  <div className="text-xs font-semibold">Adaeze Okafor</div>
                  <div className="text-[11px] text-muted-foreground">HSE Lead</div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full brand-gradient text-xs font-bold text-white">
                  AO
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
