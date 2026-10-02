import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Mail, ShieldCheck, HardHat, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS, updateMyPassword, updateMyProfile, useSession } from "@/lib/auth-store";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — CAPSL HSE" },
      { name: "description", content: "View and update your CAPSL HSE account details and password." },
      { property: "og:title", content: "My Profile — CAPSL HSE" },
      { property: "og:description", content: "Manage your CAPSL HSE account details and password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function Feedback({ kind, text }: { kind: "ok" | "err"; text: string }) {
  return (
    <div
      role={kind === "err" ? "alert" : "status"}
      className={
        kind === "err"
          ? "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          : "rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary"
      }
    >
      {text}
    </div>
  );
}

function ProfilePage() {
  const session = useSession();
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!session) return;
    setFullName(session.name);
    setTitle(session.title);
    setLocation(session.location ?? "");
    // only on user change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.userId]);

  if (!session) return null;
  const isAdmin = session.role === "admin";
  const locationOptions =
    location && !LOCATIONS.includes(location) ? [location, ...LOCATIONS] : LOCATIONS;

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    if (!isAdmin && !location) {
      setProfileMsg({ kind: "err", text: "Please select your work location" });
      return;
    }
    setSaving(true);
    const res = await updateMyProfile({ fullName, title, location });
    setSaving(false);
    setProfileMsg(res.ok ? { kind: "ok", text: "Profile updated." } : { kind: "err", text: res.error });
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    const strong =
      pw.length >= 8 && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw);
    if (!strong) {
      setPwMsg({
        kind: "err",
        text: "Password must be at least 8 characters and include uppercase, lowercase, a number and a special character.",
      });
      return;
    }
    if (pw !== pw2) {
      setPwMsg({ kind: "err", text: "Passwords do not match." });
      return;
    }
    setPwBusy(true);
    const res = await updateMyPassword(pw);
    setPwBusy(false);
    if (res.ok) {
      setPw("");
      setPw2("");
      setPwMsg({ kind: "ok", text: "Password changed successfully." });
    } else setPwMsg({ kind: "err", text: res.error });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full brand-gradient text-lg font-bold text-white">
          {session.initials}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">{session.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="gap-1">
              {isAdmin ? <ShieldCheck className="h-3.5 w-3.5" /> : <HardHat className="h-3.5 w-3.5" />}
              {isAdmin ? "Admin" : "Staff"}
            </Badge>
            <span>{session.title}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserRound className="h-4 w-4" /> Account information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveProfile} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" value={session.email} readOnly disabled className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input value={isAdmin ? "Admin" : "Staff"} readOnly disabled />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title">Job title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Work location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {profileMsg && (
              <div className="sm:col-span-2">
                <Feedback kind={profileMsg.kind} text={profileMsg.text} />
              </div>
            )}
            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" disabled={saving} className="rounded-full px-6">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4" /> Change password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={changePassword} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pw">New password (min. 8 characters)</Label>
              <div className="relative">
                <Input
                  id="pw"
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw2">Confirm new password</Label>
              <Input
                id="pw2"
                type={showPw ? "text" : "password"}
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            {pwMsg && (
              <div className="sm:col-span-2">
                <Feedback kind={pwMsg.kind} text={pwMsg.text} />
              </div>
            )}
            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" disabled={pwBusy} className="rounded-full px-6">
                {pwBusy ? "Updating…" : "Update password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
