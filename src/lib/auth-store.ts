import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LOCATIONS, PEOPLE } from "./hse-store";

export type Role = "admin" | "staff";

export type Session = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  location?: string;
  initials: string;
  title: string;
};

export { LOCATIONS, PEOPLE };

let session: Session | null = null;
let loading = true;
const listeners = new Set<() => void>();
let initialized = false;

function notify() {
  listeners.forEach((l) => l());
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

async function hydrate(userId: string, email: string) {
  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(),

    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId),
  ]);

  const role: Role =
    (roles ?? []).some((r) => r.role === "admin") ? "admin" : "staff";

  const name = profile?.full_name ?? email.split("@")[0];

  session = {
    userId,
    email,
    name,
    role,
    location: profile?.location ?? undefined,
    initials: initials(name),
    title:
      profile?.title ??
      (role === "admin" ? "Administrator" : "Staff"),
  };

  loading = false;
  notify();
}

async function clearSession() {
  session = null;
  loading = false;
  notify();
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  supabase.auth.getSession().then(({ data }) => {
    const u = data.session?.user;

    if (u) {
      hydrate(u.id, u.email ?? "");
    } else {
      clearSession();
    }
  });

  supabase.auth.onAuthStateChange((_evt, s) => {
    const u = s?.user;

    if (u) {
      hydrate(u.id, u.email ?? "");
    } else {
      clearSession();
    }
  });
}

export function useSession(): Session | null {
  ensureInit();

  const [snap, setSnap] = useState<Session | null>(session);

  useEffect(() => {
    const l = () => setSnap(session);

    listeners.add(l);
    setSnap(session);

    return () => {
      listeners.delete(l);
    };
  }, []);

  return snap;
}

export function useAuthLoading() {
  ensureInit();

  const [l, setL] = useState(loading);

  useEffect(() => {
    const fn = () => setL(loading);

    listeners.add(fn);
    setL(loading);

    return () => {
      listeners.delete(fn);
    };
  }, []);

  return l;
}

const FALLBACK_SIGN_IN_ERROR =
  "Unable to sign in. Please check your email and password and try again.";
const FALLBACK_SIGN_UP_ERROR = "Unable to create account. Please try again.";

/**
 * Turns any thrown value or Supabase error-shaped object into a string that is
 * safe to render in the UI. Never returns "{}", "null" or "[object Object]".
 */
export function normalizeAuthError(error: unknown, fallback: string): string {
  if (typeof error === "string") {
    return error.trim() ? error : fallback;
  }

  if (
    error instanceof Error &&
    typeof error.message === "string" &&
    error.message.trim()
  ) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const candidate = error as Record<string, unknown>;
    const keys = [
      "message",
      "error_description",
      "errorDescription",
      "msg",
      "details",
    ];

    for (const key of keys) {
      const value = candidate[key];
      if (typeof value === "string" && value.trim()) return value;
    }

    try {
      const json = JSON.stringify(error);
      if (json && json !== "{}" && json !== "null") return json;
    } catch {
      // Circular or non-serializable payload — fall through to the string form.
    }
  }

  const text = String(error);
  if (
    text &&
    text !== "{}" &&
    text !== "[object Object]" &&
    text !== "null" &&
    text !== "undefined"
  ) {
    return text;
  }

  return fallback;
}

export async function signIn(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      console.error("[auth] sign-in error:", error);
      return {
        ok: false as const,
        error: normalizeAuthError(error, FALLBACK_SIGN_IN_ERROR),
      };
    }

    return {
      ok: true as const,
    };
  } catch (caught) {
    console.error("[auth] sign-in exception:", caught);
    return {
      ok: false as const,
      error: normalizeAuthError(caught, FALLBACK_SIGN_IN_ERROR),
    };
  }
}

export type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  title: string;
  location: string;
};

export type SignUpResult =
  | { ok: true; needsConfirmation: boolean }
  | { ok: false; error: string };

/** Canonical production base URL for the CAPSL HSE app. Used for email confirmation redirects. */
export const APP_URL = "https://hse.capslgas.com";

/** Public self-registration. Always creates a staff account. */
export async function signUp(input: SignUpInput): Promise<SignUpResult> {
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const title = input.title.trim();
  const location = input.location?.trim() ?? "";

  if (!email.endsWith("@capslgas.com")) {
    return { ok: false, error: "You must use a @capslgas.com email address" };
  }
  if (!fullName) return { ok: false, error: "Please enter your full name" };
  if (!title) return { ok: false, error: "Please enter your job title" };
  if (!location) return { ok: false, error: "Please select your work location" };

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: input.password,
      options: {
        emailRedirectTo: `${APP_URL}/login/staff`,
        data: { full_name: fullName, title, role: "staff", location },
      },
    });

    if (error) {
      console.error("[auth] signup error:", error);
      return {
        ok: false,
        error: normalizeAuthError(error, FALLBACK_SIGN_UP_ERROR),
      };
    }

    if (data.session) return { ok: true, needsConfirmation: false };
    if (data.user) return { ok: true, needsConfirmation: true };
    return { ok: false, error: FALLBACK_SIGN_UP_ERROR };
  } catch (caught) {
    console.error("[auth] signup exception:", caught);
    return {
      ok: false,
      error: normalizeAuthError(caught, FALLBACK_SIGN_UP_ERROR),
    };
  }
}

export async function signOut() {
  await supabase.auth.signOut();

  session = null;

  notify();
}