import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, ShieldCheck, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS, signIn, signUp, useSession, type Role } from "@/lib/auth-store";

type Props = { role: Role };

export function AuthPanel({ role }: Props) {
  const session = useSession();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  const isAdmin = role === "admin";
  const heroIcon = isAdmin ? (
    <ShieldCheck className="h-7 w-7" />
  ) : (
    <HardHat className="h-7 w-7" />
  );
  const heroTint = isAdmin
    ? "bg-primary/20 text-primary"
    : "bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.18_60)]";
  const roleLabel = isAdmin ? "HSE Administrator" : "Field Staff";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    if (mode === "signin") {
      const res = await signIn(email, password);
      setBusy(false);
      if (!res.ok) setError(res.error);
    } else {
      if (password.length < 8) {
        setBusy(false);
        setError("Password must be at least 8 characters.");
        return;
      }
      const res = await signUp({
        email,
        password,
        fullName: fullName.trim(),
        title: title.trim(),
        role,
        location: role === "staff" ? location : undefined,
      });
      setBusy(false);
      if (!res.ok) setError(res.error);
    }
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
            <div className="text-xs text-sidebar-foreground/60">{roleLabel} Portal</div>
          </div>
        </div>

        <div>
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${heroTint}`}>
            {heroIcon}
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            {isAdmin ? "HSE Administrator access" : "Field staff sign in"}
          </h2>
          <p className="mt-3 max-w-md text-sm text-sidebar-foreground/70">
            {isAdmin
              ? "Full visibility across all CAPSL sites — reports, analytics, audit log and close-outs."
              : "Log in to the site you're working from today. Reports you raise will be geo-tagged to that location automatically."}
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Compression and Power Systems Limited
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-sm">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to portal selection
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {mode === "signin" ? `Sign in as ${roleLabel}` : `Create ${roleLabel} account`}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your work email must end in <span className="font-medium">@capslgas.com</span>.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-border bg-secondary p-1 text-sm">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError(null);
              }}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                mode === "signin" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder={isAdmin ? "e.g. HSE Manager" : "e.g. Field Supervisor"}
                  />
                </div>
                {role === "staff" && (
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Work location
                    </Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger id="location" className="h-11">
                        <SelectValue placeholder="Select your site…" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

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
              <Label htmlFor="password">
                Password{mode === "signup" ? " (min. 8 characters)" : ""}
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "signup" ? 8 : undefined}
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" disabled={busy} className="h-11 w-full rounded-full font-semibold">
              {busy
                ? mode === "signin"
                  ? "Signing in…"
                  : "Creating account…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
