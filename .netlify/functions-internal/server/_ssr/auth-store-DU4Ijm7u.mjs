import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as supabase } from "./client-6hwdMcVk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-store-DU4Ijm7u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var session = null;
var loading = true;
var listeners = /* @__PURE__ */ new Set();
var initialized = false;
function notify() {
	listeners.forEach((l) => l());
}
function initials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("");
}
async function hydrate(userId, email) {
	const [{ data: profile }, { data: roles }] = await Promise.all([supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId)]);
	const role = (roles ?? []).some((r) => r.role === "admin") ? "admin" : "staff";
	const name = profile?.full_name ?? email.split("@")[0];
	session = {
		userId,
		email,
		name,
		role,
		location: profile?.location ?? void 0,
		initials: initials(name),
		title: profile?.title ?? (role === "admin" ? "Administrator" : "Staff")
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
		if (u) hydrate(u.id, u.email ?? "");
		else clearSession();
	});
	supabase.auth.onAuthStateChange((_evt, s) => {
		const u = s?.user;
		if (u) hydrate(u.id, u.email ?? "");
		else clearSession();
	});
}
function useSession() {
	ensureInit();
	const [snap, setSnap] = (0, import_react.useState)(session);
	(0, import_react.useEffect)(() => {
		const l = () => setSnap(session);
		listeners.add(l);
		setSnap(session);
		return () => {
			listeners.delete(l);
		};
	}, []);
	return snap;
}
function useAuthLoading() {
	ensureInit();
	const [l, setL] = (0, import_react.useState)(loading);
	(0, import_react.useEffect)(() => {
		const fn = () => setL(loading);
		listeners.add(fn);
		setL(loading);
		return () => {
			listeners.delete(fn);
		};
	}, []);
	return l;
}
async function signIn(email, password) {
	const { error } = await supabase.auth.signInWithPassword({
		email: email.trim(),
		password
	});
	if (error) return {
		ok: false,
		error: error.message
	};
	return { ok: true };
}
async function signUp(input) {
	const email = input.email.trim().toLowerCase();
	if (!email.endsWith("@capslgas.com")) return {
		ok: false,
		error: "You must use a @capslgas.com email address"
	};
	if (input.role === "staff" && !input.location) return {
		ok: false,
		error: "Please select your work location"
	};
	const { error } = await supabase.auth.signUp({
		email,
		password: input.password,
		options: {
			emailRedirectTo: `${window.location.origin}/`,
			data: {
				full_name: input.fullName,
				title: input.title,
				role: input.role,
				location: input.location ?? null
			}
		}
	});
	if (error) return {
		ok: false,
		error: error.message
	};
	return await signIn(email, input.password);
}
async function signOut() {
	await supabase.auth.signOut();
	session = null;
	notify();
}
//#endregion
export { useSession as a, useAuthLoading as i, signOut as n, signUp as r, signIn as t };
