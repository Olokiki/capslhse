import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { a as useSession } from "./_ssr/auth-store-DU4Ijm7u.mjs";
import { J as Award, S as MapPin, b as Medal, s as Trophy } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { f as useHseReports, t as LOCATIONS } from "./_ssr/hse-store-B8fwR4lK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.leaderboard-CIs74K5W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tally(reports) {
	const map = /* @__PURE__ */ new Map();
	for (const r of reports) map.set(r.reportedBy, (map.get(r.reportedBy) ?? 0) + 1);
	return Array.from(map, ([name, count]) => ({
		name,
		count
	})).sort((a, b) => b.count - a.count);
}
function rankIcon(i) {
	if (i === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-[oklch(0.78_0.17_60)]" });
	if (i === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-4 w-4 text-slate-400" });
	if (i === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 text-amber-700" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-xs font-semibold text-muted-foreground",
		children: ["#", i + 1]
	});
}
function LocationBoard({ location, rows }) {
	const total = rows.reduce((s, r) => s + r.count, 0);
	const max = rows[0]?.count ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
						" ",
						location.replace("CAPSL - ", "")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-2xl font-bold tracking-tight",
					children: total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "reports submitted"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-2",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground",
				children: "No reports yet from this site."
			}), rows.slice(0, 8).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary",
							children: rankIcon(i)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-medium",
							children: r.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground",
						children: r.count
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full brand-gradient",
						style: { width: `${max ? r.count / max * 100 : 0}%` }
					})
				})]
			}, r.name))]
		})]
	});
}
function LeaderboardPage() {
	const reports = useHseReports();
	const session = useSession();
	const isStaff = session?.role === "staff";
	const visibleLocations = isStaff && session?.location ? [session.location] : LOCATIONS;
	const boards = (0, import_react.useMemo)(() => visibleLocations.map((loc) => ({
		location: loc,
		rows: tally(reports.filter((r) => r.location === loc))
	})), [reports, visibleLocations]);
	const overall = (0, import_react.useMemo)(() => tally(reports), [reports]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: "Recognition"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-bold tracking-tight",
					children: "Reporter Leaderboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: isStaff ? "Top HSE contributors at your site — every report makes CAPSL safer." : "Top HSE contributors across every CAPSL site."
				})
			] }),
			!isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-[oklch(0.78_0.17_60)]" }), " Overall top reporters (all locations)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
					children: [overall.slice(0, 6).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background",
								children: rankIcon(i)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-medium",
								children: r.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold tabular-nums text-primary",
							children: r.count
						})]
					}, r.name)), overall.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: "No reports yet."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: boards.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationBoard, {
					location: b.location,
					rows: b.rows
				}, b.location))
			})
		]
	});
}
//#endregion
export { LeaderboardPage as component };
