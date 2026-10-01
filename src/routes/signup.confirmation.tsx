import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup/confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({
    email:
      typeof search.email === "string" && search.email.trim().length <= 254
        ? search.email.trim()
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Check your email | CAPSL HSE" },
      {
        name: "description",
        content: "Confirm your email address to finish setting up your CAPSL HSE staff account.",
      },
      { property: "og:title", content: "Check your email | CAPSL HSE" },
      {
        property: "og:description",
        content: "Confirm your email address to finish setting up your CAPSL HSE staff account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignupConfirmationPage,
});

function SignupConfirmationPage() {
  const { email } = Route.useSearch();

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="absolute inset-x-0 top-0 h-1 brand-gradient" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card p-1 shadow-card">
            <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-lg font-semibold">CAPSL HSE Platform</div>
            <div className="text-xs text-sidebar-foreground/60">Staff Portal</div>
          </div>
        </div>

        <div className="relative max-w-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold">One final step</h2>
          <p className="mt-3 text-sm leading-6 text-sidebar-foreground/70">
            Verify your company email to securely activate your CAPSL HSE account.
          </p>
        </div>

        <div className="relative text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} Compression and Power Systems Limited
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card p-1 shadow-card">
              <img src="/capsl-logo.jpeg" alt="CAPSL" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-semibold">CAPSL HSE Platform</div>
              <div className="text-xs text-muted-foreground">Staff Portal</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
              <MailCheck className="h-7 w-7" />
            </div>

            <h1 className="mt-6 text-3xl font-semibold">Check your email</h1>
            <p className="mt-3 text-base font-medium text-card-foreground">
              Your CAPSL HSE account has been created.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We&apos;ve sent a confirmation link to your email address. Please check your inbox and
              click the link to verify your account.
            </p>

            {email && (
              <div className="mt-5 rounded-md border border-border bg-secondary px-4 py-3 text-center text-sm font-semibold break-all">
                {email}
              </div>
            )}

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Can&apos;t find the email? Check your Spam or Junk folder.
            </p>

            <Button asChild className="mt-7 h-11 w-full rounded-full font-semibold">
              <Link to="/login/staff">
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}