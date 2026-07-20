import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hse-store-C0HW7ztA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LOCATIONS = [
	"CAPSL - Egbaoma",
	"CAPSL - Lagos",
	"CAPSL - Waltersmith",
	"CAPSL - Warri",
	"CAPSL - Oben"
];
var PEOPLE = [...];
var ASSETS_BY_LOCATION = {
	"CAPSL - Egbaoma": ["Unit A", "Unit B"],
	"CAPSL - Oben": [
		"C501",
		"C502",
		"C503",
		"C504"
	],
};
function assetsForLocation(location) {
	return ASSETS_BY_LOCATION[location] ?? [];
}
var KEY = "capsl-hse-v1";
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function seed() {
	const now = Date.now();
	const day = 864e5;
	const mk = (i, p) => ({
		id: uid(),
		ref: `HSE-${String(2400 + i).padStart(4, "0")}`,
		title: "",
		description: "",
		type: "near-miss",
		severity: "low",
		location: LOCATIONS[i % LOCATIONS.length],
		reportedBy: PEOPLE[i % PEOPLE.length],
		reportedAt: (/* @__PURE__ */ new Date(now - i * day * .7)).toISOString(),
		status: "open",
		activity: [{
			id: uid(),
			at: (/* @__PURE__ */ new Date(now - i * day * .7)).toISOString(),
			actor: PEOPLE[i % PEOPLE.length],
			kind: "created",
			message: "Report submitted"
		}],
		...p
	});
	return [
		mk(1, {
			title: "Oil spill near separator V-301",
			description: "Approx. 5L hydraulic oil leak observed beneath the separator. Area cordoned off, no personnel exposure.",
			type: "environmental",
			severity: "high",
			asset: "Separator V-301",
			status: "assigned",
			assignedTo: PEOPLE[2],
			dueAt: new Date(now + 2 * day).toISOString()
		}),
		mk(2, {
			title: "Worker observed without safety harness at elevation",
			description: "Technician working at ~3m height without harness on platform 2.",
			type: "unsafe-act",
			severity: "critical",
			status: "in-progress",
			assignedTo: PEOPLE[0],
			dueAt: new Date(now + 1 * day).toISOString()
		}),
		mk(3, {
			title: "Frayed power cable on compressor B-204",
			description: "Insulation worn through on supply cable, exposed copper visible.",
			type: "unsafe-condition",
			severity: "medium",
			asset: "Air Compressor B-204",
			status: "open"
		}),
		mk(4, {
			title: "Slip on wet floor – control room entrance",
			description: "Operator slipped, no injury. AC condensate drain blocked.",
			type: "near-miss",
			severity: "low",
			status: "closed",
			assignedTo: PEOPLE[3],
			closedAt: (/* @__PURE__ */ new Date(now - 2 * day)).toISOString(),
			closedBy: PEOPLE[0],
			rootCause: "Blocked condensate drain line",
			correctiveAction: "Cleared drain, added weekly inspection to PM schedule"
		}),
		mk(5, {
			title: "Minor hand laceration during valve service",
			description: "Technician sustained 2cm cut on left index finger. First aid administered.",
			type: "injury",
			severity: "medium",
			asset: "Gas Turbine UNIT C-501",
			status: "in-progress",
			assignedTo: PEOPLE[0],
			dueAt: new Date(now + 3 * day).toISOString()
		}),
		mk(6, {
			title: "Flare stack abnormal smoke observed",
			description: "Black smoke for ~4 minutes during startup sequence.",
			type: "environmental",
			severity: "high",
			asset: "Flare Stack F-12",
			status: "open"
		}),
		mk(7, {
			title: "Missing fire extinguisher inspection tag",
			description: "Extinguisher FE-08 inspection tag missing/illegible.",
			type: "unsafe-condition",
			severity: "low",
			status: "assigned",
			assignedTo: PEOPLE[1],
			dueAt: new Date(now + 5 * day).toISOString()
		})
	];
}
function load() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) {
			const s = seed();
			window.localStorage.setItem(KEY, JSON.stringify(s));
			return s;
		}
		return JSON.parse(raw);
	} catch {
		return seed();
	}
}
var data = [];
var initialized = false;
var listeners = /* @__PURE__ */ new Set();
function ensureInit() {
	if (!initialized && typeof window !== "undefined") {
		data = load();
		initialized = true;
	}
}
function persist() {
	if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(data));
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	return () => listeners.delete(l);
}
function useHseReports() {
	ensureInit();
	return (0, import_react.useSyncExternalStore)(subscribe, () => {
		ensureInit();
		return data;
	}, () => []);
}
var CURRENT_USER = "...";
function createReport(input) {
	ensureInit();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const ref = `HSE-${String(2500 + data.length).padStart(4, "0")}`;
	const r = {
		id: uid(),
		ref,
		...input,
		reportedAt: now,
		status: "open",
		activity: [{
			id: uid(),
			at: now,
			actor: input.reportedBy,
			kind: "created",
			message: "Report submitted"
		}]
	};
	data = [r, ...data];
	persist();
	return r;
}
function update(id, mut) {
	ensureInit();
	data = data.map((r) => {
		if (r.id !== id) return r;
		const copy = {
			...r,
			activity: [...r.activity]
		};
		mut(copy);
		return copy;
	});
	persist();
}
function assignReport(id, assignee, dueAt, actor, assigneeEmail) {
	update(id, (r) => {
		r.assignedTo = assignee;
		r.dueAt = dueAt;
		if (r.status === "open") r.status = "assigned";
		const emailPart = assigneeEmail ? ` — notification sent to ${assigneeEmail}` : "";
		r.activity.push({
			id: uid(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			actor,
			kind: "assigned",
			message: `Assigned to ${assignee}${dueAt ? ` (due ${new Date(dueAt).toLocaleDateString()})` : ""}${emailPart}`
		});
	});
}
function setStatus(id, status, actor) {
	update(id, (r) => {
		r.status = status;
		r.activity.push({
			id: uid(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			actor,
			kind: "status",
			message: `Status changed to ${status.replace("-", " ")}`
		});
	});
}
function addComment(id, message, actor) {
	update(id, (r) => {
		r.activity.push({
			id: uid(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			actor,
			kind: "comment",
			message
		});
	});
}
function closeReport(id, data2) {
	update(id, (r) => {
		r.status = "closed";
		r.rootCause = data2.rootCause;
		r.correctiveAction = data2.correctiveAction;
		r.closedAt = (/* @__PURE__ */ new Date()).toISOString();
		r.closedBy = data2.actor;
		r.activity.push({
			id: uid(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			actor: data2.actor,
			kind: "closed",
			message: "Report closed out with root cause & corrective action"
		});
	});
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
export { STATUS_META as a, assetsForLocation as c, createReport as d, setStatus as f, SEVERITY_META as i, assignReport as l, LOCATIONS as n, TYPE_LABEL as o, useHseReports as p, PEOPLE as r, addComment as s, CURRENT_USER as t, closeReport as u };
