import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as supabase } from "./client-6hwdMcVk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hse-store-B8fwR4lK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LOCATIONS = [
	"CAPSL - Egbaoma",
	"CAPSL - Lagos",
	"CAPSL - Waltersmith",
	"CAPSL - Warri",
	"CAPSL - Oben"
];
var PEOPLE = [" "];
var ASSETS_BY_LOCATION = {
	"CAPSL - Egbaoma": ["Unit A", "Unit B"],
	"CAPSL - Oben": [
		"C501",
		"C502",
		"C503",
		"C504"
	]
};
function assetsForLocation(location) {
	return ASSETS_BY_LOCATION[location] ?? [];
}
function rowToReport(r, activities) {
	return {
		id: r.id,
		ref: r.ref,
		title: r.title,
		description: r.description,
		type: r.type,
		severity: r.severity,
		location: r.location,
		asset: r.asset ?? void 0,
		reportedBy: r.reported_by,
		reportedAt: r.reported_at,
		assignedTo: r.assigned_to ?? void 0,
		assignedEmail: r.assigned_email ?? void 0,
		dueAt: r.due_at ?? void 0,
		status: r.status,
		rootCause: r.root_cause ?? void 0,
		correctiveAction: r.corrective_action ?? void 0,
		closedAt: r.closed_at ?? void 0,
		closedBy: r.closed_by ?? void 0,
		activity: activities.filter((a) => a.report_id === r.id).sort((a, b) => a.at.localeCompare(b.at)).map((a) => ({
			id: a.id,
			at: a.at,
			actor: a.actor,
			kind: a.kind,
			message: a.message
		}))
	};
}
var cache = [];
var loaded = false;
var loading = null;
var listeners = /* @__PURE__ */ new Set();
function notify() {
	listeners.forEach((l) => l());
}
async function fetchAll() {
	const [{ data: reports, error: e1 }, { data: activities, error: e2 }] = await Promise.all([supabase.from("hse_reports").select("*").order("reported_at", { ascending: false }), supabase.from("hse_activities").select("*")]);
	if (e1) throw e1;
	if (e2) throw e2;
	const acts = activities ?? [];
	cache = (reports ?? []).map((r) => rowToReport(r, acts));
	loaded = true;
	notify();
}
function ensureLoaded() {
	if (loaded || loading) return;
	loading = fetchAll().catch((err) => console.error("[hse-store] load failed", err)).finally(() => {
		loading = null;
	});
}
var realtimeSubscribed = false;
function ensureRealtime() {
	if (realtimeSubscribed || typeof window === "undefined") return;
	realtimeSubscribed = true;
	supabase.channel("hse-reports-realtime").on("postgres_changes", {
		event: "*",
		schema: "public",
		table: "hse_reports"
	}, () => {
		fetchAll().catch(() => {});
	}).on("postgres_changes", {
		event: "*",
		schema: "public",
		table: "hse_activities"
	}, () => {
		fetchAll().catch(() => {});
	}).subscribe();
}
function useHseReports() {
	const [snap, setSnap] = (0, import_react.useState)(cache);
	(0, import_react.useEffect)(() => {
		const l = () => setSnap([...cache]);
		listeners.add(l);
		ensureLoaded();
		ensureRealtime();
		setSnap([...cache]);
		return () => {
			listeners.delete(l);
		};
	}, []);
	return snap;
}
function newRef() {
	return `HSE-${Date.now().toString().slice(-6)}`;
}
async function createReport(input) {
	const ref = newRef();
	const { data, error } = await supabase.from("hse_reports").insert({
		ref,
		title: input.title,
		description: input.description,
		type: input.type,
		severity: input.severity,
		location: input.location,
		asset: input.asset ?? null,
		reported_by: input.reportedBy,
		status: "open"
	}).select("*").single();
	if (error) throw error;
	const row = data;
	await supabase.from("hse_activities").insert({
		report_id: row.id,
		actor: input.reportedBy,
		kind: "created",
		message: "Report submitted"
	});
	const report = rowToReport(row, []);
	cache = [report, ...cache];
	notify();
	fetchAll().catch(() => {});
	return report;
}
async function assignReport(id, assignee, dueAt, actor, assigneeEmail) {
	const existing = cache.find((r) => r.id === id);
	const patch = {
		assigned_to: assignee,
		assigned_email: assigneeEmail ?? null,
		due_at: dueAt || null,
		...existing?.status === "open" ? { status: "assigned" } : {}
	};
	const { error } = await supabase.from("hse_reports").update(patch).eq("id", id);
	if (error) throw error;
	const emailPart = assigneeEmail ? ` — notification sent to ${assigneeEmail}` : "";
	await supabase.from("hse_activities").insert({
		report_id: id,
		actor,
		kind: "assigned",
		message: `Assigned to ${assignee}${dueAt ? ` (due ${new Date(dueAt).toLocaleDateString()})` : ""}${emailPart}`
	});
	fetchAll().catch(() => {});
}
async function setStatus(id, status, actor) {
	const { error } = await supabase.from("hse_reports").update({ status }).eq("id", id);
	if (error) throw error;
	await supabase.from("hse_activities").insert({
		report_id: id,
		actor,
		kind: "status",
		message: `Status changed to ${status.replace("-", " ")}`
	});
	fetchAll().catch(() => {});
}
async function addComment(id, message, actor) {
	const { error } = await supabase.from("hse_activities").insert({
		report_id: id,
		actor,
		kind: "comment",
		message
	});
	if (error) throw error;
	fetchAll().catch(() => {});
}
async function closeReport(id, data2) {
	const { error } = await supabase.from("hse_reports").update({
		status: "closed",
		root_cause: data2.rootCause,
		corrective_action: data2.correctiveAction,
		closed_at: (/* @__PURE__ */ new Date()).toISOString(),
		closed_by: data2.actor
	}).eq("id", id);
	if (error) throw error;
	await supabase.from("hse_activities").insert({
		report_id: id,
		actor: data2.actor,
		kind: "closed",
		message: "Report closed out with root cause & corrective action"
	});
	fetchAll().catch(() => {});
}
var SEVERITY_META = {
	low: {
		label: "Low",
		color: "bg-emerald-100 text-emerald-800 border-emerald-200",
		ring: "bg-emerald-500"
	},
	medium: {
		label: "Medium",
		color: "bg-amber-100 text-amber-900 border-amber-200",
		ring: "bg-amber-500"
	},
	high: {
		label: "High",
		color: "bg-orange-100 text-orange-900 border-orange-200",
		ring: "bg-orange-500"
	},
	critical: {
		label: "Critical",
		color: "bg-red-100 text-red-800 border-red-200",
		ring: "bg-red-600"
	}
};
var STATUS_META = {
	open: {
		label: "Open",
		color: "bg-slate-100 text-slate-700 border-slate-200"
	},
	assigned: {
		label: "Assigned",
		color: "bg-blue-100 text-blue-800 border-blue-200"
	},
	"in-progress": {
		label: "In Progress",
		color: "bg-amber-100 text-amber-900 border-amber-200"
	},
	closed: {
		label: "Closed",
		color: "bg-emerald-100 text-emerald-800 border-emerald-200"
	}
};
var TYPE_LABEL = {
	"near-miss": "Near Miss",
	incident: "Incident",
	"unsafe-act": "Unsafe Act",
	"unsafe-condition": "Unsafe Condition",
	environmental: "Environmental",
	injury: "Injury / First Aid"
};
//#endregion
export { TYPE_LABEL as a, assignReport as c, setStatus as d, useHseReports as f, STATUS_META as i, closeReport as l, PEOPLE as n, addComment as o, SEVERITY_META as r, assetsForLocation as s, LOCATIONS as t, createReport as u };
