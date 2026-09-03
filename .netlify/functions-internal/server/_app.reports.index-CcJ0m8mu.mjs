import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as Input, t as Button } from "./_ssr/button-Ceck5jXq.mjs";
import { a as useSession } from "./_ssr/auth-store-DZYje80S.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as Funnel, P as Download, R as CirclePlus, b as MapPin, g as Search } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { m as useHseReports, n as LOCATION_GROUPS, o as TYPE_LABEL } from "./_ssr/hse-store-CbA8XyIs.mjs";
import { n as StatusBadge, r as TypeBadge, t as SeverityBadge } from "./_ssr/badges-BvtZ81Fd.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_app.reports.index-C-pxy7ow.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Dg1urBTx.mjs";
import { t as require_excel } from "./_libs/exceljs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports.index-CcJ0m8mu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_excel = /* @__PURE__ */ __toESM(require_excel());
function fmt(d) {
	if (!d) return "";
	const dt = new Date(d);
	return isNaN(dt.getTime()) ? "" : dt.toISOString().replace("T", " ").slice(0, 19);
}
var CAPSL_LOGO_URL = "https://widqqskijkutckwgxskd.supabase.co/storage/v1/object/public/capsl-logo/CAPSL%20LOGO.jpeg";
async function exportReportsToExcel(reports, filename = "hse-reports.xlsx") {
	try {
		const response = await fetch("/templates/CAPSL-HSE-Report-Template.xlsx");
		if (!response.ok) throw new Error(`Could not load Excel template. HTTP ${response.status}: ${response.statusText}`);
		const templateBuffer = await response.arrayBuffer();
		const workbook = new import_excel.default.Workbook();
		await workbook.xlsx.load(templateBuffer);
		const reportsSheet = workbook.getWorksheet("Reports");
		if (!reportsSheet) throw new Error("The Excel template does not contain a sheet named \"Reports\".");
		const logoResponse = await fetch(CAPSL_LOGO_URL);
		if (!logoResponse.ok) throw new Error(`Could not load CAPSL logo. HTTP ${logoResponse.status}: ${logoResponse.statusText}`);
		const logoBuffer = await logoResponse.arrayBuffer();
		const logoId = workbook.addImage({
			buffer: logoBuffer,
			extension: "jpeg"
		});
		reportsSheet.addImage(logoId, {
			tl: {
				col: 0,
				row: 0
			},
			ext: {
				width: 90,
				height: 65
			}
		});
		const headerRowNumber = 5;
		const dataStartRow = 6;
		const headerRow = reportsSheet.getRow(headerRowNumber);
		const headerMap = /* @__PURE__ */ new Map();
		headerRow.eachCell((cell, columnNumber) => {
			const value = String(cell.value ?? "").trim();
			if (value) headerMap.set(value, columnNumber);
		});
		const rows = reports.map((r) => ({
			Ref: r.ref,
			Title: r.title,
			Description: r.description,
			Type: TYPE_LABEL[r.type] ?? r.type,
			Severity: r.severity,
			Status: r.status,
			Location: r.location,
			Asset: r.asset ?? "",
			"Reported by": r.reportedBy,
			"Reported at (UTC)": fmt(r.reportedAt),
			"Assigned to": r.assignedTo ?? "",
			"Assignee email": r.assignedEmail ?? "",
			"Due date": r.dueAt ? new Date(r.dueAt).toISOString().slice(0, 10) : "",
			"Root cause": r.rootCause ?? "",
			"Corrective action": r.correctiveAction ?? "",
			"Closed at (UTC)": fmt(r.closedAt),
			"Closed by": r.closedBy ?? "",
			"Activity count": r.activity.length
		}));
		if (reportsSheet.rowCount >= dataStartRow) reportsSheet.spliceRows(dataStartRow, reportsSheet.rowCount - dataStartRow + 1);
		rows.forEach((report, index) => {
			const rowNumber = dataStartRow + index;
			const row = reportsSheet.getRow(rowNumber);
			Object.entries(report).forEach(([key, value]) => {
				const columnNumber = headerMap.get(key);
				if (!columnNumber) return;
				row.getCell(columnNumber).value = value;
			});
			row.commit();
		});
		const activitySheet = workbook.getWorksheet("Activity Log");
		if (!activitySheet) throw new Error("The Excel template does not contain a sheet named \"Activity Log\".");
		const activityHeaderRowNumber = 5;
		const activityDataStartRow = 6;
		const activityHeaderRow = activitySheet.getRow(activityHeaderRowNumber);
		const activityHeaderMap = /* @__PURE__ */ new Map();
		activityHeaderRow.eachCell((cell, columnNumber) => {
			const value = String(cell.value ?? "").trim();
			if (value) activityHeaderMap.set(value, columnNumber);
		});
		const activityRows = reports.flatMap((r) => r.activity.map((a) => ({
			"Report Ref": r.ref,
			"Report Title": r.title,
			"At (UTC)": fmt(a.at),
			Actor: a.actor,
			Kind: a.kind,
			Message: a.message
		})));
		if (activitySheet.rowCount >= activityDataStartRow) activitySheet.spliceRows(activityDataStartRow, activitySheet.rowCount - activityDataStartRow + 1);
		activityRows.forEach((activity, index) => {
			const rowNumber = activityDataStartRow + index;
			const row = activitySheet.getRow(rowNumber);
			Object.entries(activity).forEach(([key, value]) => {
				const columnNumber = activityHeaderMap.get(key);
				if (!columnNumber) return;
				row.getCell(columnNumber).value = value;
			});
			row.commit();
		});
		const outputBuffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([outputBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
		return true;
	} catch (error) {
		console.error("=================================");
		console.error("CAPSL EXCEL EXPORT FAILED");
		console.error("=================================");
		console.error(error);
		throw error;
	}
}
function ReportsList() {
	const reports = useHseReports();
	const session = useSession();
	const { location: locationParam } = Route.useSearch();
	const navigate = Route.useNavigate();
	const isStaff = session?.role === "staff";
	const activeLocation = isStaff ? session?.location : locationParam;
	const scopedReports = (0, import_react.useMemo)(() => {
		if (!session) return [];
		if (session.role !== "staff") {
			if (!locationParam) return reports;
			const officialLocations = LOCATION_GROUPS.filter((l) => l !== "Other");
			if (locationParam === "Other") return reports.filter((r) => !officialLocations.includes(r.location));
			return reports.filter((r) => r.location === locationParam);
		}
		return reports.filter((r) => r.reportedByUserId === session.userId || r.location === session.location);
	}, [
		reports,
		session,
		locationParam
	]);
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [severity, setSeverity] = (0, import_react.useState)("all");
	const [type, setType] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		return scopedReports.filter((r) => {
			if (q && !(r.title.toLowerCase().includes(q.toLowerCase()) || r.ref.toLowerCase().includes(q.toLowerCase()) || r.location.toLowerCase().includes(q.toLowerCase()))) return false;
			if (status !== "all" && r.status !== status) return false;
			if (severity !== "all" && r.severity !== severity) return false;
			if (type !== "all" && r.type !== type) return false;
			return true;
		});
	}, [
		scopedReports,
		q,
		status,
		severity,
		type
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: "Safety operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-bold tracking-tight",
						children: "HSE Reports"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground",
						children: [
							filtered.length,
							" of ",
							scopedReports.length,
							" reports",
							activeLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									activeLocation
								]
							}),
							!isStaff && locationParam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ search: { location: void 0 } }),
								className: "text-[11px] font-semibold text-primary hover:underline",
								children: "Clear location filter"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "rounded-full",
						onClick: async () => {
							if (filtered.length === 0) {
								toast.error("No reports to export.");
								return;
							}
							try {
								const suffix = activeLocation ? `-${activeLocation.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}` : "";
								await exportReportsToExcel(filtered, `hse-reports${suffix}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
								toast.success(`Exported ${filtered.length} report${filtered.length === 1 ? "" : "s"} to Excel`);
							} catch (error) {
								console.error("Excel export failed:", error);
								toast.error("Unable to export the HSE reports to Excel.");
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), "Export Excel"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/reports/new",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "mr-2 h-4 w-4" }), " New report"]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search title, ref, location…",
								className: "h-10 pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => setStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
								className: "h-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "open",
									children: "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "assigned",
									children: "Assigned"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "in-progress",
									children: "In Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "closed",
									children: "Closed"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: severity,
							onValueChange: (v) => setSeverity(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Severity" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All severities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "low",
									children: "Low"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "medium",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "high",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "critical",
									children: "Critical"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: type,
							onValueChange: (v) => setType(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Type" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All types"
							}), Object.entries(TYPE_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: k,
								children: v
							}, k))] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[110px_minmax(0,2fr)_120px_120px_minmax(0,1fr)_minmax(0,1fr)_120px] gap-4 border-b border-border bg-secondary/60 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Ref" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Severity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Location" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Assignee" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Reported" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports/$id",
						params: { id: r.id },
						className: "grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-secondary/40 lg:grid-cols-[110px_minmax(0,2fr)_120px_120px_minmax(0,1fr)_minmax(0,1fr)_120px] lg:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: r.ref
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold",
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBadge, { t: r.type })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { s: r.severity }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm text-foreground/80",
								children: r.location
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm text-foreground/80",
								children: r.assignedTo ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground italic",
									children: "Unassigned"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: new Date(r.reportedAt).toLocaleDateString()
							})
						]
					}, r.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-16 text-center text-sm text-muted-foreground",
						children: "No reports match your filters."
					})]
				})]
			})
		]
	});
}
//#endregion
export { ReportsList as component };
