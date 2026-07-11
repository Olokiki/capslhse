import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HardHat, ArrowRight, ShieldCheck } from "lucide-react";
import { useSession } from "@/lib/auth-store";

export const Route = createFileRoute("/login/")({
  head: () => ({
    meta: [
      { title: "Sign in | CAPSL HSE" },
      { name: "description", content: "Choose your CAPSL HSE portal to sign in." },
    ],
  }),
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
    <div className="relative min-h-screen overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[oklch(0.68_0.17_152)]/25 blur-3xl" />
        <div className="absolute right-[-120px] top-1/3 h-[460px] w-[460px] rounded-full bg-[oklch(0.76_0.17_60)]/25 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.62_0.23_27)]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-white/20 sm:h-20 sm:w-20">
            <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-2xl font-bold tracking-tight sm:text-3xl">
              CAPSL <span className="brand-text-gradient">HSE Platform</span>
            </div>
            <div className="mt-1 text-sm text-sidebar-foreground/70 sm:text-base">
              Compression and Power Systems Limited
            </div>
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
                "group relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-7 backdrop-blur transition-all",
                hover === "admin" ? "scale-[1.02] border-primary/60 shadow-elegant" : "",
              ].join(" ")}
            >
              <div className="absolute inset-x-0 top-0 h-1 brand-gradient" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="mt-5 text-lg font-semibold">CAPSL HSE Administrator</div>
              <p className="mt-1 text-sm text-sidebar-foreground/70">
                Full access to all reports, locations, analytics, audit log, and close-outs.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                Continue as Admin <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>

            <Link
              to="/login/staff"
              onMouseEnter={() => setHover("staff")}
              onMouseLeave={() => setHover(null)}
              className={[
                "group relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-7 backdrop-blur transition-all",
                hover === "staff" ? "scale-[1.02] border-[oklch(0.78_0.17_60)] shadow-elegant" : "",
              ].join(" ")}
            >
              <div className="absolute inset-x-0 top-0 h-1 brand-gradient" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.18_60)]">
                <HardHat className="h-6 w-6" />
              </div>
              <div className="mt-5 text-lg font-semibold">CAPSL Staff</div>
              <p className="mt-1 text-sm text-sidebar-foreground/70">
                Submit reports, assign actions to teammates, and track your own report analytics.
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-[oklch(0.85_0.18_60)]">
                Continue as Staff <ArrowRight className="ml-1 h-4 w-4" />
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
