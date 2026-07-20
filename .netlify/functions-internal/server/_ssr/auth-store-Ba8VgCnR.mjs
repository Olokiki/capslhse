import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-store-Ba8VgCnR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "capsl-auth-v1";
var DEMO_ADMINS = [{
	email: "admin@capsl.com",
	password: "admin123",
	name: "Eniola",
	title: "HSE Lead (Admin)"
}, {
	email: "hse.manager@capsl.com",
	password: "admin123",
	name: "Charles",
	title: "HSE Manager"
}];
var DEMO_STAFF = [ ... ];
var session = null;
var initialized = false;
var listeners = /* @__PURE__ */ new Set();
function load() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
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
	if (typeof window !== "undefined") if (session) window.localStorage.setItem(KEY, JSON.stringify(session));
	else window.localStorage.removeItem(KEY);
	listeners.forEach((l) => l());
}
function initials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("");
}
function useSession() {
	ensureInit();
	return (0, import_react.useSyncExternalStore)((l) => {
		listeners.add(l);
		return () => listeners.delete(l);
	}, () => {
		ensureInit();
		return session;
	}, () => null);
}
function signInAdmin(email, password) {
	const user = DEMO_ADMINS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
	if (!user) return {
		ok: false,
		error: "Invalid admin email or password"
	};
	session = {
		name: user.name,
		email: user.email,
		role: "admin",
		initials: initials(user.name),
		title: user.title
	};
	persist();
	return { ok: true };
}
function signInStaff(email, password, location) {
	if (!location) return {
		ok: false,
		error: "Please select your current work location"
	};
	const user = DEMO_STAFF.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
	if (!user) return {
		ok: false,
		error: "Invalid staff email or password"
	};
	session = {
		name: user.name,
		email: user.email,
		role: "staff",
		location,
		initials: initials(user.name),
		title: user.title
	};
	persist();
	return { ok: true };
}
function signOut() {
	session = null;
	persist();
}
//#endregion
export { useSession as i, signInStaff as n, signOut as r, signInAdmin as t };
