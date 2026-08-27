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

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    return {
      ok: false as const,
      error: error.message,
    };
  }

  return {
    ok: true as const,
  };
}

export type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  title: string;
  role: Role;
  location?: string;
};

export async function signUp(input: SignUpInput) {
  const email = input.email.trim().toLowerCase();

  // Check company email
  if (!email.endsWith("@capslgas.com")) {
    return {
      ok: false as const,
      error: "You must use a @capslgas.com email address",
    };
  }

  // Staff must select a location
  if (input.role === "staff" && !input.location) {
    return {
      ok: false as const,
      error: "Please select your work location",
    };
  }

  const APP_URL = "https://capsl-hse.netlify.app";

  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,

    options: {
      // After the user clicks the confirmation email,
      // send them directly to the Staff Login page.
      emailRedirectTo: `${APP_URL}/login/staff`,

      data: {
        full_name: input.fullName,
        title: input.title,
        role: input.role,
        location: input.location ?? null,
      },
    },
  });

  // Supabase signup error
  if (error) {
    return {
      ok: false as const,
      error: error.message,
    };
  }

  // If email confirmation is required,
  // Supabase creates the user but does not create a session.
  if (data.user && !data.session) {
    return {
      ok: false as const,
      error:
        "Email not confirmed, check your inbox for confirmation mail",
    };
  }

  // If email confirmation is disabled,
  // Supabase will return an active session.
  if (data.session) {
    return {
      ok: true as const,
    };
  }

  // Fallback
  return {
    ok: false as const,
    error:
      "Email not confirmed, check your inbox for confirmation mail",
  };
}

export async function signOut() {
  await supabase.auth.signOut();

  session = null;

  notify();
}