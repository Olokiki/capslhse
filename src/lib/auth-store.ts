import { useSyncExternalStore } from "react";
import { LOCATIONS, PEOPLE } from "./hse-store";

export type Role = "admin" | "staff";

export type Session = {
  name: string;
  email: string;
  role: Role;
  location?: string; // required for staff
  initials: string;
  title: string;
};

const KEY = "capsl-auth-v1";

// Demo credentials (prototype only — replace with real auth later)
export const DEMO_ADMINS: Array<{ email: string; password: string; name: string; title: string }> = [
  { email: "admin@capsl.com", password: "admin123", name: "Adaeze Okafor", title: "HSE Lead (Admin)" },
  { email: "hse.manager@capsl.com", password: "admin123", name: "Ifeoma Nwosu", title: "HSE Manager" },
];

export const DEMO_STAFF: Array<{ email: string; password: string; name: string; title: string }> = [
  { email: "chinedu.eze@capsl.com", password: "staff123", name: "Chinedu Eze", title: "Field Supervisor" },
  { email: "tobi.adewale@capsl.com", password: "staff123", name: "Tobi Adewale", title: "Maintenance Manager" },
  { email: "bayo.akinola@capsl.com", password: "staff123", name: "Bayo Akinola", title: "Site Engineer" },
  { email: "staff@capsl.com", password: "staff123", name: "Field Staff", title: "Technician" },
];

export { LOCATIONS, PEOPLE };

let session: Session | null = null;
let initialized = false;
const listeners = new Set<() => void>();

function load(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function ensureInit() {
  if (!initialized && typeof window !== "undefined") {
    session = load();
    initialized = true;
  }
}

function persist() {
  if (typeof window !== "undefined") {
    if (session) window.localStorage.setItem(KEY, JSON.stringify(session));
    else window.localStorage.removeItem(KEY);
  }
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

export function useSession(): Session | null {
  ensureInit();
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => {
      ensureInit();
      return session;
    },
    () => null,
  );
}

export function getSession(): Session | null {
  ensureInit();
  return session;
}

export function signInAdmin(email: string, password: string): { ok: true } | { ok: false; error: string } {
  const user = DEMO_ADMINS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, error: "Invalid admin email or password" };
  session = {
    name: user.name,
    email: user.email,
    role: "admin",
    initials: initials(user.name),
    title: user.title,
  };
  persist();
  return { ok: true };
}

export function signInStaff(
  email: string,
  password: string,
  location: string,
): { ok: true } | { ok: false; error: string } {
  if (!location) return { ok: false, error: "Please select your current work location" };
  const user = DEMO_STAFF.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, error: "Invalid staff email or password" };
  session = {
    name: user.name,
    email: user.email,
    role: "staff",
    location,
    initials: initials(user.name),
    title: user.title,
  };
  persist();
  return { ok: true };
}

export function signOut() {
  session = null;
  persist();
}
