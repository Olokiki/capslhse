import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  UserPlus,
  ArrowLeft,
  MapPin,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
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
import { LOCATIONS, normalizeAuthError, signUp, useSession } from "@/lib/auth-store";

export const Route = createFileRoute("/signup/")({
  head: () => ({
    meta: [
      { title: "Create account | CAPSL HSE" },
      {
        name: "description",
        content:
          "Register for the CAPSL HSE Platform with your @capslgas.com email.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const session = useSession();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strongPassword =
    passwordRequirements.length &&
    passwordRequirements.uppercase &&
    passwordRequirements.lowercase &&
    passwordRequirements.number &&
    passwordRequirements.special;

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Strong password validation
    if (!strongPassword) {
      setError(
        "Password must contain at least 8 characters, including an uppercase letter, lowercase letter, number, and special character.",
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Staff must select a location
    if (!location) {
      setError("Please select your work location.");
      return;
    }

    setBusy(true);

    const res = await signUp({
      email,
      password,
      fullName: fullName.trim(),
      title: title.trim(),
      location,
    });

    setBusy(false);

    if (!res.ok) {
      setError(
        normalizeAuthError(res.error, "Unable to create account. Please try again."),
      );
    } else if (res.needsConfirmation) {
      setSuccess("Account created successfully. Please check your email to confirm your account.");
    } else {
      setSuccess("Account created successfully. Signing you in…");
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1">
            <img
              src="/capsl-logo.jpeg"
              alt="CAPSL"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <div className="text-base font-semibold">
              CAPSL HSE Platform
            </div>

            <div className="text-xs text-sidebar-foreground/60">
              Create your account
            </div>
          </div>
        </div>

        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <UserPlus className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Register for CAPSL HSE
          </h2>

          <p className="mt-3 max-w-md text-sm text-sidebar-foreground/70">
            Only staff with a{" "}
            <span className="font-medium">@capslgas.com</span> email address
            can create an account. Once registered, you can sign in from any
            device at any time.
          </p>
        </div>

        <div className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Compression and Power Systems Limited
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-sm">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your work email must end in{" "}
            <span className="font-medium">@capslgas.com</span>.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {/* FULL NAME */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>

              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* JOB TITLE */}
            <div className="space-y-2">
              <Label htmlFor="title">Job title</Label>

              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Field Supervisor"
              />
            </div>

            {/* LOCATION */}
            {(
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="flex items-center gap-1"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Work location
                </Label>

                <Select
                  value={location}
                  onValueChange={setLocation}
                >
                  <SelectTrigger
                    id="location"
                    className="h-11"
                  >
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

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="h-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* PASSWORD REQUIREMENTS */}
              <div className="mt-2 space-y-1">
                <PasswordRequirement
                  met={passwordRequirements.length}
                  text="At least 8 characters"
                />

                <PasswordRequirement
                  met={passwordRequirements.uppercase}
                  text="At least one uppercase letter"
                />

                <PasswordRequirement
                  met={passwordRequirements.lowercase}
                  text="At least one lowercase letter"
                />

                <PasswordRequirement
                  met={passwordRequirements.number}
                  text="At least one number"
                />

                <PasswordRequirement
                  met={passwordRequirements.special}
                  text="At least one special character"
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  placeholder="Confirm your password"
                  className="h-11 pr-11"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {confirmPassword.length > 0 && (
                <div
                  className={`flex items-center gap-1.5 text-xs ${
                    passwordsMatch
                      ? "text-emerald-600"
                      : "text-destructive"
                  }`}
                >
                  {passwordsMatch ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}

                  <span>
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>

            {success && (
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={busy}
              className="h-11 w-full rounded-full font-semibold"
            >
              {busy
                ? "Creating account…"
                : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* PASSWORD REQUIREMENT COMPONENT */

function PasswordRequirement({
  met,
  text,
}: {
  met: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 text-xs ${
        met
          ? "text-emerald-600"
          : "text-muted-foreground"
      }`}
    >
      {met ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}

      <span>{text}</span>
    </div>
  );
}