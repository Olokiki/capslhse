import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { a as useSession } from "./_ssr/auth-store-DZYje80S.mjs";
import { U as ChartColumn, b as MapPin, i as User, q as Award, s as Trophy, v as Medal } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { f as getLocationGroup, m as useHseReports, n as LOCATION_GROUPS } from "./_ssr/hse-store-CbA8XyIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.leaderboard-DW0g3ShC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rankIcon(i) {
	if (i === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-[oklch(0.78_0.17_60)]" });
	if (i === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "h-4 w-4 text-slate-400" });
	if (i === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 text-amber-700" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-xs font-semibold text-muted-foreground",
		children: ["#", i + 1]
	});
}
function tallyLocations(reports) {
	const map = /* @__PURE__ */ new Map();
	for (const report of reports) {
		const location = getLocationGroup(report.location);
		map.set(location, (map.get(location) ?? 0) + 1);
	}
	return Array.from(map.entries()).map(([location, count]) => ({
		location,
		count
	})).sort((a, b) => b.count - a.count);
}
function tallyReporters(reports) {
	const map = /* @__PURE__ */ new Map();
	for (const report of reports) {
		const id = report.reportedByUserId ?? `name:${report.reportedBy}`;
		const existing = map.get(id);
		if (existing) existing.count += 1;
		else map.set(id, {
			id,
			name: report.reportedBy,
			count: 1
		});
	}
	return Array.from(map.values()).sort((a, b) => b.count - a.count);
}
function LocationRankRow({ row, index, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background",
					children: rankIcon(index)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm font-medium",
						children: row.location
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 shrink-0 text-sm font-bold tabular-nums text-primary",
				children: row.count
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full brand-gradient",
				style: { width: `${max ? row.count / max * 100 : 0}%` }
			})
		})]
	});
}
function ReporterRankRow({ row, index, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background",
					children: rankIcon(index)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm font-medium",
						children: row.name
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-3 shrink-0 text-sm font-bold tabular-nums text-primary",
				children: row.count
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full brand-gradient",
				style: { width: `${max ? row.count / max * 100 : 0}%` }
			})
		})]
	});
}
function MyContributions({ reports, session }) {
	const myReports = (0, import_react.useMemo)(() => {
		if (!session?.userId) return [];
		const displayName = `${session.name} (${session.title})`;
		return reports.filter((report) => {
			if (report.reportedByUserId) return report.reportedByUserId === session.userId;
			return report.reportedBy === displayName;
		});
	}, [reports, session]);
	const byLocation = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const report of myReports) {
			const location = getLocationGroup(report.location);
			counts.set(location, (counts.get(location) ?? 0) + 1);
		}
		return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
	}, [myReports]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4 text-primary" }), "My Contributions"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl font-bold tracking-tight",
					children: myReports.length
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "Reports Submitted"
				})]
			}),
			byLocation.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-2",
				children: byLocation.map(([location, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-md bg-secondary/40 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: location.replace("CAPSL - ", "")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tabular-nums",
						children: count
					})]
				}, location))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 rounded-md border border-dashed border-border py-5 text-center text-xs text-muted-foreground",
				children: "You have not submitted any reports yet."
			})
		]
	});
}
function LeaderboardPage() {
	const reports = useHseReports();
	const session = useSession();
	const [category, setCategory] = (0, import_react.useState)("location");
	const isStaff = session?.role === "staff";
	const locationLeaderboard = (0, import_react.useMemo)(() => tallyLocations(reports), [reports]);
	const reporterLeaderboard = (0, import_react.useMemo)(() => tallyReporters(reports), [reports]);
	const siteReports = (0, import_react.useMemo)(() => {
		if (!session?.location) return [];
		const userLocation = getLocationGroup(session.location);
		return reports.filter((report) => getLocationGroup(report.location) === userLocation);
	}, [reports, session]);
	const siteContributorLeaderboard = (0, import_react.useMemo)(() => tallyReporters(siteReports), [siteReports]);
	const siteBoards = (0, import_react.useMemo)(() => {
		return LOCATION_GROUPS.map((location) => {
			const locationReports = reports.filter((report) => getLocationGroup(report.location) === location);
			return {
				location,
				rows: tallyReporters(locationReports),
				total: locationReports.length
			};
		}).filter((board) => board.total > 0);
	}, [reports]);
	const locationMax = locationLeaderboard[0]?.count ?? 0;
	const reporterMax = reporterLeaderboard[0]?.count ?? 0;
	const siteMax = siteContributorLeaderboard[0]?.count ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1100px] space-y-6",
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
					children: "Recognising the people and locations actively contributing to CAPSL's HSE performance."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory("location"),
						className: `rounded-lg px-4 py-2 text-sm font-medium transition ${category === "location" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
						children: "By Location"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory("reporter"),
						className: `rounded-lg px-4 py-2 text-sm font-medium transition ${category === "reporter" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
						children: "By Reporter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory("site"),
						className: `rounded-lg px-4 py-2 text-sm font-medium transition ${category === "site" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
						children: "Site Contributors"
					})
				]
			}),
			category === "location" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), "By Location"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Locations ranked by the number of HSE reports submitted."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [locationLeaderboard.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationRankRow, {
						row,
						index,
						max: locationMax
					}, row.location)), locationLeaderboard.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground",
						children: "No reports yet."
					})]
				})]
			}),
			category === "reporter" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 text-primary" }), "Top Reporters"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Users ranked by the number of HSE reports they have submitted."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [reporterLeaderboard.slice(0, 20).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReporterRankRow, {
						row,
						index,
						max: reporterMax
					}, row.id)), reporterLeaderboard.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground",
						children: "No reports yet."
					})]
				})]
			}),
			category === "site" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isStaff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), "Site Contributors"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Top contributors at",
							" ",
							getLocationGroup(session?.location ?? ""),
							"."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [siteContributorLeaderboard.slice(0, 20).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReporterRankRow, {
						row,
						index,
						max: siteMax
					}, row.id)), siteContributorLeaderboard.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-dashed border-border py-8 text-center text-sm text-muted-foreground",
						children: "No reports yet from this site."
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [siteBoards.map((board) => {
					const max = board.rows[0]?.count ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), board.location]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [board.total, " reports submitted"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: board.rows.slice(0, 8).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReporterRankRow, {
								row,
								index,
								max
							}, row.id))
						})]
					}, board.location);
				}), siteBoards.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-8 text-center text-sm text-muted-foreground md:col-span-2",
					children: "No reports yet."
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyContributions, {
				reports,
				session
			})
		]
	});
}
//#endregion
export { LeaderboardPage as component };
