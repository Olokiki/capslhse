import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "@/lib/auth-store";

export const Route = createFileRoute("/login/")({
  head: () => ({
    meta: [
      { title: "Sign in | CAPSL HSE" },
      { name: "description", content: "Sign in to the CAPSL HSE Platform." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const session = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await signIn(email, password);
    setBusy(false);
    if (!res.ok) setError(res.error);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1">
            <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-base font-semibold">CAPSL HSE Platform</div>
            <div className="text-xs text-sidebar-foreground/60">
              Compression and Power Systems Limited
            </div>
          </div>
        </div>

        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">Sign in to CAPSL HSE</h2>
          <p className="mt-3 max-w-md text-sm text-sidebar-foreground/70">
            Report hazards, near-misses and incidents, assign corrective actions, and track
            close-outs across every CAPSL site.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Compression and Power Systems Limited
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your CAPSL work email (<span className="font-medium">@capslgas.com</span>).
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="firstname.lastname@capslgas.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" disabled={busy} className="h-11 w-full rounded-full font-semibold">
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              Create one <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
