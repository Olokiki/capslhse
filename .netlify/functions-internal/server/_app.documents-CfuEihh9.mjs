import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { E as Leaf, F as Download, M as Flame, N as FileText, O as HardHat, P as ExternalLink, R as ClipboardCheck, _ as Search, c as TriangleAlert, d as Stethoscope, f as Star, j as Folder, k as GraduationCap, m as ShieldCheck, n as Wrench, q as BookOpen } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.documents-CfuEihh9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORY_META = {
	Policy: {
		icon: ShieldCheck,
		tone: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
	},
	Procedure: {
		icon: ClipboardCheck,
		tone: "text-sky-600 bg-sky-50 dark:bg-sky-950/40"
	},
	"JSA / Risk Assessment": {
		icon: HardHat,
		tone: "text-amber-600 bg-amber-50 dark:bg-amber-950/40"
	},
	"MSDS / Chemical": {
		icon: Flame,
		tone: "text-rose-600 bg-rose-50 dark:bg-rose-950/40"
	},
	"Permit to Work": {
		icon: FileText,
		tone: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
	},
	Training: {
		icon: GraduationCap,
		tone: "text-violet-600 bg-violet-50 dark:bg-violet-950/40"
	},
	"Toolbox Talk": {
		icon: Wrench,
		tone: "text-orange-600 bg-orange-50 dark:bg-orange-950/40"
	},
	"Emergency Response": {
		icon: TriangleAlert,
		tone: "text-red-600 bg-red-50 dark:bg-red-950/40"
	},
	"Inspection / Audit": {
		icon: Stethoscope,
		tone: "text-teal-600 bg-teal-50 dark:bg-teal-950/40"
	},
	Regulation: {
		icon: Leaf,
		tone: "text-green-700 bg-green-50 dark:bg-green-950/40"
	}
};
var DOCS = [
	{
		id: "pol-001",
		title: "CAPSL HSE Policy Statement",
		category: "Policy",
		code: "HSE-POL-001",
		version: "v4.2",
		updated: "2026-04-10",
		owner: "HSE Director",
		format: "PDF",
		size: "412 KB",
		pinned: true,
		description: "Corporate commitment to zero harm, environmental stewardship and regulatory compliance across all CAPSL operations."
	},
	{
		id: "pol-002",
		title: "Drug & Alcohol Policy",
		category: "Policy",
		code: "HSE-POL-007",
		version: "v2.1",
		updated: "2025-11-02",
		owner: "HR / HSE",
		format: "PDF",
		size: "286 KB",
		description: "Zero-tolerance framework, testing protocol and rehabilitation pathway for all personnel and contractors."
	},
	{
		id: "proc-010",
		title: "Permit to Work System Procedure",
		category: "Procedure",
		code: "HSE-PRC-010",
		version: "v3.0",
		updated: "2026-02-18",
		owner: "HSE Manager",
		format: "PDF",
		size: "1.2 MB",
		pinned: true,
		description: "End-to-end PTW workflow covering hot work, confined space, working at height and energy isolation."
	},
	{
		id: "proc-014",
		title: "Lockout / Tagout (LOTO) Procedure",
		category: "Procedure",
		code: "HSE-PRC-014",
		version: "v2.4",
		updated: "2026-01-22",
		owner: "Operations HSE",
		format: "PDF",
		size: "864 KB",
		description: "Energy isolation requirements for compressors, generators and pressurised process systems."
	},
	{
		id: "jsa-021",
		title: "JSA — Compressor Filter Replacement",
		category: "JSA / Risk Assessment",
		code: "JSA-COMP-021",
		version: "v1.6",
		updated: "2026-05-09",
		owner: "Field Ops",
		format: "DOCX",
		size: "188 KB",
		description: "Step-by-step hazard analysis with controls for filter changeouts on skid-mounted compressors."
	},
	{
		id: "jsa-033",
		title: "JSA — Working at Height on Gas Plant Stairs",
		category: "JSA / Risk Assessment",
		code: "JSA-WAH-033",
		version: "v1.2",
		updated: "2026-03-14",
		owner: "Field Ops",
		format: "DOCX",
		size: "162 KB",
		description: "Fall protection, anchor points and rescue planning for elevated maintenance tasks."
	},
	{
		id: "msds-101",
		title: "MSDS — Compressor Lubricating Oil ISO 46",
		category: "MSDS / Chemical",
		code: "MSDS-OIL-046",
		version: "v5.0",
		updated: "2025-10-30",
		owner: "Procurement",
		format: "PDF",
		size: "522 KB",
		description: "Safety data sheet: handling, PPE, spill response, first aid and disposal information."
	},
	{
		id: "msds-105",
		title: "MSDS — Methanol (Hydrate Inhibitor)",
		category: "MSDS / Chemical",
		code: "MSDS-MEOH-105",
		version: "v3.3",
		updated: "2025-09-12",
		owner: "Process Chem",
		format: "PDF",
		size: "604 KB",
		description: "Flammability, toxicity and emergency response for methanol injection systems."
	},
	{
		id: "ptw-201",
		title: "Hot Work Permit Template",
		category: "Permit to Work",
		code: "PTW-HOT-201",
		version: "v2.0",
		updated: "2026-02-18",
		owner: "HSE Manager",
		format: "PDF",
		size: "210 KB",
		description: "Authorised template for welding, cutting and grinding tasks in classified areas."
	},
	{
		id: "ptw-202",
		title: "Confined Space Entry Permit",
		category: "Permit to Work",
		code: "PTW-CSE-202",
		version: "v2.0",
		updated: "2026-02-18",
		owner: "HSE Manager",
		format: "PDF",
		size: "248 KB",
		description: "Gas testing, attendant and rescue plan requirements for confined space entries."
	},
	{
		id: "trn-301",
		title: "HSE Induction — New Employee & Visitor",
		category: "Training",
		code: "TRN-IND-301",
		version: "v6.1",
		updated: "2026-04-01",
		owner: "Training",
		format: "Video",
		size: "84 MB",
		pinned: true,
		description: "Mandatory induction covering site rules, PPE, alarms, muster points and reporting."
	},
	{
		id: "trn-310",
		title: "H2S Awareness & Escape",
		category: "Training",
		code: "TRN-H2S-310",
		version: "v3.0",
		updated: "2025-12-04",
		owner: "Training",
		format: "Video",
		size: "120 MB",
		description: "Recognising H2S exposure, escape sets and emergency response drills."
	},
	{
		id: "tbt-401",
		title: "Toolbox Talk — Slips, Trips & Falls",
		category: "Toolbox Talk",
		code: "TBT-STF-401",
		version: "v1.4",
		updated: "2026-05-15",
		owner: "Supervisors",
		format: "PDF",
		size: "96 KB",
		description: "10-minute pre-shift briefing pack with sign-off sheet."
	},
	{
		id: "tbt-402",
		title: "Toolbox Talk — Heat Stress Management",
		category: "Toolbox Talk",
		code: "TBT-HEAT-402",
		version: "v1.1",
		updated: "2026-03-28",
		owner: "Supervisors",
		format: "PDF",
		size: "112 KB",
		description: "Hydration, work-rest cycles and early symptom recognition for hot weather operations."
	},
	{
		id: "emr-501",
		title: "Emergency Response Plan — Egbaoma Gas Plant",
		category: "Emergency Response",
		code: "ERP-EGB-501",
		version: "v3.2",
		updated: "2026-01-10",
		owner: "Plant Manager",
		format: "PDF",
		size: "2.4 MB",
		pinned: true,
		description: "Site-specific response for fire, gas release, medical and security events including muster maps."
	},
	{
		id: "emr-505",
		title: "Spill Response & Containment Procedure",
		category: "Emergency Response",
		code: "ERP-SPL-505",
		version: "v2.0",
		updated: "2025-08-19",
		owner: "Environment",
		format: "PDF",
		size: "780 KB",
		description: "First-line containment, reporting timelines and environmental restoration steps."
	},
	{
		id: "ins-601",
		title: "Monthly HSE Inspection Checklist",
		category: "Inspection / Audit",
		code: "INS-MON-601",
		version: "v4.0",
		updated: "2026-05-01",
		owner: "HSE Team",
		format: "XLSX",
		size: "64 KB",
		description: "Standardised walk-down checklist used by site HSE officers and supervisors."
	},
	{
		id: "ins-610",
		title: "Internal HSE Audit Protocol (ISO 45001 aligned)",
		category: "Inspection / Audit",
		code: "AUD-INT-610",
		version: "v2.2",
		updated: "2025-12-20",
		owner: "QHSE",
		format: "PDF",
		size: "1.1 MB",
		description: "Audit programme, scoring rubric and non-conformance close-out tracking."
	},
	{
		id: "reg-701",
		title: "DPR EGASPIN — Environmental Guidelines",
		category: "Regulation",
		code: "REG-EGASPIN",
		version: "2018 Rev",
		updated: "2024-06-01",
		owner: "Compliance",
		format: "PDF",
		size: "3.6 MB",
		description: "Department of Petroleum Resources environmental guidelines for petroleum operations in Nigeria."
	},
	{
		id: "reg-702",
		title: "ISO 45001:2018 — OH&S Management Systems",
		category: "Regulation",
		code: "REG-ISO-45001",
		version: "2018",
		updated: "2024-06-01",
		owner: "Compliance",
		format: "PDF",
		size: "1.8 MB",
		description: "International standard for occupational health & safety management systems."
	}
];
var CATEGORIES = [
	"All",
	"Policy",
	"Procedure",
	"JSA / Risk Assessment",
	"MSDS / Chemical",
	"Permit to Work",
	"Training",
	"Toolbox Talk",
	"Emergency Response",
	"Inspection / Audit",
	"Regulation"
];
function DocumentsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => {
		return DOCS.filter((d) => {
			if (cat !== "All" && d.category !== cat) return false;
			if (q) {
				const needle = q.toLowerCase();
				if (!d.title.toLowerCase().includes(needle) && !d.code.toLowerCase().includes(needle) && !d.description.toLowerCase().includes(needle)) return false;
			}
			return true;
		});
	}, [q, cat]);
	const pinned = filtered.filter((d) => d.pinned);
	const rest = filtered.filter((d) => !d.pinned);
	const counts = (0, import_react.useMemo)(() => {
		const c = { All: DOCS.length };
		for (const d of DOCS) c[d.category] = (c[d.category] ?? 0) + 1;
		return c;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: "Knowledge library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 flex items-center gap-2 text-3xl font-bold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-7 w-7 text-primary" }), " HSE Documents & Materials"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-2xl text-sm text-muted-foreground",
						children: "Controlled library of CAPSL policies, procedures, JSAs, MSDS sheets, permits, training and toolbox talks. All documents are version-controlled and aligned to ISO 45001, ISO 14001 and DPR EGASPIN."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export index"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search by title, code or keyword (e.g. H2S, permit, methanol)…",
							className: "h-11 pl-9"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground",
						children: [
							filtered.length,
							" of ",
							DOCS.length,
							" documents"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => {
						const active = cat === c;
						const count = counts[c] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCat(c),
							className: ["inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/80 hover:bg-secondary"].join(" "),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-3.5 w-3.5" }),
								c,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: ["rounded-full px-1.5 py-0.5 text-[10px] font-bold", active ? "bg-white/20" : "bg-secondary text-foreground/70"].join(" "),
									children: count
								})
							]
						}, c);
					})
				})]
			}),
			pinned.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 text-sm font-semibold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-amber-500" }), " Pinned essentials"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: pinned.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocCard, { doc: d }, d.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-sm font-semibold text-foreground",
				children: pinned.length > 0 ? "All other documents" : "All documents"
			}), rest.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-10 text-center text-sm text-muted-foreground",
				children: "No documents match your filters."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: rest.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocCard, { doc: d }, d.id))
			})] })
		]
	});
}
function DocCard({ doc }) {
	const meta = CATEGORY_META[doc.category];
	const Icon = meta.icon;
	function handleAction(action) {
		const msg = action === "view" ? `Opening ${doc.code} — ${doc.title} (${doc.format}, ${doc.size}).` : `Downloading ${doc.code} — ${doc.title} (${doc.format}, ${doc.size}).`;
		alert(msg);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group flex flex-col gap-3 p-5 transition-shadow hover:shadow-elegant",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-10 w-10 items-center justify-center rounded-lg ${meta.tone}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "text-[10px] font-semibold",
					children: [
						doc.format,
						" · ",
						doc.size
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: doc.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-base font-semibold leading-snug text-foreground",
					children: doc.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
					children: doc.description
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-[11px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "Code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono font-semibold text-foreground",
						children: doc.code
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "Version"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-foreground",
						children: doc.version
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "Owner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-foreground",
						children: doc.owner
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "Updated"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-foreground",
						children: doc.updated
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					className: "flex-1 rounded-full",
					onClick: () => handleAction("view"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1.5 h-3.5 w-3.5" }), " View"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "flex-1 rounded-full",
					onClick: () => handleAction("download"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 h-3.5 w-3.5" }), " Download"]
				})]
			})
		]
	});
}
//#endregion
export { DocumentsPage as component };
