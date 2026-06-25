import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, HardHat, ArrowRight } from "lucide-react";
import capslLogo from "@/assets/capsl-logo.jpeg.asset.json";
import { useSession } from "@/lib/auth-store";
import { useEffect } from "react";

export const Route = createFileRoute("/login/")({
  component: LoginChooser,
});

function LoginChooser() {
  const session = useSession();
  const navigate = useNavigate();
  const [hover, setHover] = useState<"admin" | "staff" | null>(null);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1">
            <img src={capslLogo.url} alt="CAPSL" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-base font-semibold">CAPSL HSE Platform</div>
            <div className="text-xs text-sidebar-foreground/60">Compression and Power Systems Limited</div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome. How are you signing in today?
          </h1>
          <p className="mt-3 text-center text-sm text-sidebar-foreground/70">
            Choose the portal that matches your role.
          </p>

          <div className="mt-10 grid w-full gap-5 sm:grid-cols-2">
            <Link
              to="/login/admin"
              onMouseEnter={() => setHover("admin")}
              onMouseLeave={() => setHover(null)}
              className={[
                "group rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-7 transition-all",
                hover === "admin" ? "scale-[1.02] border-primary/60" : "",
              ].join(" ")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="mt-5 text-lg font-semibold">HSE Administrator</div>
              <p className="mt-1 text-sm text-sidebar-foreground/70">
                Full access to all reports, locations, analytics, audit log, and close-outs.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                Sign in as Admin <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>

            <Link
              to="/login/staff"
              onMouseEnter={() => setHover("staff")}
              onMouseLeave={() => setHover(null)}
              className={[
                "group rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-7 transition-all",
                hover === "staff" ? "scale-[1.02] border-[oklch(0.78_0.17_60)]" : "",
              ].join(" ")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.18_60)]">
                <HardHat className="h-6 w-6" />
              </div>
              <div className="mt-5 text-lg font-semibold">Field Staff</div>
              <p className="mt-1 text-sm text-sidebar-foreground/70">
                Submit reports, assign actions to teammates, and track your own report analytics.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-[oklch(0.85_0.18_60)]">
                Sign in as Staff <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        <footer className="text-center text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Compression and Power Systems Limited
        </footer>
      </div>
    </div>
  );
}
