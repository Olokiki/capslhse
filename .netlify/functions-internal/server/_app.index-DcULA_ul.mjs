import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { a as useSession } from "./_ssr/auth-store-DU4Ijm7u.mjs";
import { d as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as Leaf, I as Clock, Q as Activity, S as MapPin, Y as ArrowUpRight, c as TriangleAlert, l as TrendingUp, m as ShieldCheck, u as TrendingDown } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { f as useHseReports, t as LOCATIONS } from "./_ssr/hse-store-B8fwR4lK.mjs";
import { n as StatusBadge, r as TypeBadge, t as SeverityBadge } from "./_ssr/badges-jFbVK6on.mjs";
import { a as Area, c as Cell, i as XAxis, l as ResponsiveContainer, n as PieChart, o as CartesianGrid, r as YAxis, s as Pie, t as AreaChart, u as Tooltip } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.index-DcULA_ul.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const all = useHseReports();
	const session = useSession();
	const isStaff = session?.role === "staff";
	const reports = isStaff ? all.filter((r) => r.location === session?.location) : all;
	const stats = (0, import_react.useMemo)(() => {
		return {
			open: reports.filter((r) => r.status !== "closed").length,
			closed: reports.filter((r) => r.status === "closed").length,
			critical: reports.filter((r) => r.severity === "critical" && r.status !== "closed").length,
			overdue: reports.filter((r) => r.dueAt && new Date(r.dueAt) < /* @__PURE__ */ new Date() && r.status !== "closed").length,
			daysSinceIncident: (() => {
				const inc = reports.filter((r) => r.type === "incident" || r.type === "injury").map((r) => new Date(r.reportedAt).getTime()).sort((a, b) => b - a)[0];
				if (!inc) return 365;
				return Math.max(0, Math.floor((Date.now() - inc) / 864e5));
			})(),
			total: reports.length
		};
	}, [reports]);
	const trend = (0, import_react.useMemo)(() => {
		const trendData = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		].map((month) => ({
			month,
			reports: 0,
			closed: 0
		}));
		reports.forEach((report) => {
			const month = new Date(report.reportedAt).toLocaleString("en-US", { month: "short" });
			const row = trendData.find((m) => m.month === month);
			if (!row) return;
			row.reports++;
			if (report.status === "closed") row.closed++;
		});
		return trendData.filter((m) => m.reports > 0 || m.closed > 0);
	}, [reports]);
	const typeMix = (0, import_react.useMemo)(() => {
		const counts = {};
		reports.forEach((r) => counts[r.type] = (counts[r.type] || 0) + 1);
		const labels = {
			"near-miss": "Near Miss",
			incident: "Incident",
			"unsafe-act": "Unsafe Act",
			"unsafe-condition": "Unsafe Condition",
			environmental: "Environmental",
			injury: "Injury"
		};
		const colors = [
			"var(--brand-green)",
			"var(--brand-orange)",
			"var(--brand-red)",
			"oklch(0.55 0.15 240)",
			"oklch(0.55 0.05 250)",
			"oklch(0.7 0.15 300)"
		];
		return Object.entries(counts).map(([k, v], i) => ({
			name: labels[k] ?? k,
			value: v,
			color: colors[i % colors.length]
		}));
	}, [reports]);
	const locationStats = (0, import_react.useMemo)(() => {
		return LOCATIONS.map((loc) => {
			const items = reports.filter((r) => r.location === loc);
			const open = items.filter((r) => r.status !== "closed").length;
			const critical = items.filter((r) => r.severity === "critical" && r.status !== "closed").length;
			const closed = items.filter((r) => r.status === "closed").length;
			return {
				loc,
				open,
				critical,
				closed,
				compliance: items.length === 0 ? 100 : Math.round(closed / items.length * 100),
				total: items.length
			};
		});
	}, [reports]);
	const recent = reports.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: isStaff ? `My Site · ${session?.location}` : "Global Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-bold tracking-tight text-foreground",
						children: isStaff ? "My HSE Analytics" : "HSE Command Center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: isStaff ? "Live overview of HSE performance at your current work location." : "Live overview of health, safety and environment performance across all CAPSL sites."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reports",
							children: "View All Reports"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reports/new",
							children: "Report an Incident"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden border-0 p-0 shadow-elegant",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand-gradient relative px-6 py-6 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-20",
						style: {
							backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
							backgroundSize: "40px 40px"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
								label: "Days Since Last Incident",
								value: String(stats.daysSinceIncident),
								sub: "Across all sites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
								label: "Open Reports",
								value: String(stats.open),
								sub: `${stats.critical} critical`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" }),
								label: "Overdue Actions",
								value: String(stats.overdue),
								sub: "Past due date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5" }),
								label: "Closed This Period",
								value: String(stats.closed),
								sub: "With root cause"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealKpis, { reports }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "Reports trend"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Submitted vs closed over the last 7 months"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								color: "var(--brand-orange)",
								label: "Submitted"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								color: "var(--brand-green)",
								label: "Closed"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: trend,
								margin: {
									top: 10,
									right: 12,
									left: -16,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "gOrange",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--brand-orange)",
											stopOpacity: .45
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--brand-orange)",
											stopOpacity: 0
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "gGreen",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--brand-green)",
											stopOpacity: .45
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--brand-green)",
											stopOpacity: 0
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										stroke: "var(--muted-foreground)",
										fontSize: 12,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 12,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 12,
										border: "1px solid var(--border)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "reports",
										stroke: "var(--brand-orange)",
										strokeWidth: 2.5,
										fill: "url(#gOrange)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "closed",
										stroke: "var(--brand-green)",
										strokeWidth: 2.5,
										fill: "url(#gGreen)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "Report mix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "By type, all sites"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-52 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: typeMix,
									dataKey: "value",
									innerRadius: 50,
									outerRadius: 80,
									paddingAngle: 2,
									children: typeMix.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid var(--border)"
								} })] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 space-y-1.5",
							children: typeMix.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2.5 w-2.5 rounded-sm",
										style: { background: d.color }
									}), d.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums",
									children: d.value
								})]
							}, d.name))
						})
					]
				})]
			}),
			!isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Locations – HSE status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Open reports & close-out compliance by site"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: locationStats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
								}), s.critical > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive",
									children: [s.critical, " critical"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success",
									children: "Healthy"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-sm font-bold uppercase tracking-tight text-foreground",
								children: s.loc.replace("CAPSL - ", "")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									s.open,
									" open · ",
									s.closed,
									" closed"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-success",
									style: { width: `${s.compliance}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center justify-between text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Close-out"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-success",
									children: [s.compliance, "%"]
								})]
							})
						]
					}, s.loc))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Recent HSE reports"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Latest activity across all sites"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/reports",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "View all →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border",
					children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports/$id",
						params: { id: r.id },
						className: "flex items-start gap-4 py-3 transition-colors hover:bg-secondary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-muted-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-mono text-muted-foreground",
												children: r.ref
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { s: r.severity }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: r.status }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBadge, { t: r.type })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 truncate text-sm font-semibold text-foreground",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 truncate text-xs text-muted-foreground",
										children: [
											r.location,
											" · reported by ",
											r.reportedBy,
											" · ",
											new Date(r.reportedAt).toLocaleDateString()
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 flex-none text-muted-foreground" })
						]
					}, r.id))
				})]
			})
		]
	});
}
function HeroStat({ icon, label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/85",
			children: [
				icon,
				" ",
				label
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-4xl font-bold tabular-nums",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xs text-white/75",
			children: sub
		})
	] });
}
function MiniStat({ label, value, delta, good, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-baseline gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xl font-bold tabular-nums",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${good ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`,
				children: [
					icon,
					" ",
					delta
				]
			})]
		})]
	});
}
function Legend({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-2.5 w-2.5 rounded-sm",
				style: { background: color }
			}),
			" ",
			label
		]
	});
}
function RealKpis({ reports }) {
	const now = Date.now();
	const in12mo = reports.filter((r) => now - new Date(r.reportedAt).getTime() < 365 * 864e5);
	const in3mo = reports.filter((r) => now - new Date(r.reportedAt).getTime() < 90 * 864e5);
	const prev3mo = reports.filter((r) => {
		const age = now - new Date(r.reportedAt).getTime();
		return age >= 90 * 864e5 && age < 180 * 864e5;
	});
	const recordable12 = in12mo.filter((r) => r.type === "incident" || r.type === "injury").length;
	const lostTime12 = in12mo.filter((r) => r.type === "injury").length;
	const closed = reports.filter((r) => r.status === "closed" && r.closedAt);
	const avgCloseDays = closed.length === 0 ? 0 : closed.reduce((sum, r) => sum + (new Date(r.closedAt).getTime() - new Date(r.reportedAt).getTime()) / 864e5, 0) / closed.length;
	const closeRate = reports.length === 0 ? 0 : reports.filter((r) => r.status === "closed").length / reports.length * 100;
	const delta3mo = in3mo.length - prev3mo.length;
	const deltaLabel = delta3mo === 0 ? "±0" : (delta3mo > 0 ? "+" : "") + delta3mo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
				label: "Recordable Incidents (12 mo)",
				value: String(recordable12),
				delta: `${deltaLabel} vs prev 3 mo`,
				good: delta3mo <= 0,
				icon: delta3mo <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
				label: "Lost-Time Injuries (12 mo)",
				value: String(lostTime12),
				delta: lostTime12 === 0 ? "no injuries" : `${lostTime12} logged`,
				good: lostTime12 === 0,
				icon: lostTime12 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
				label: "Avg. Close-out Time",
				value: closed.length === 0 ? "—" : `${avgCloseDays.toFixed(1)}d`,
				delta: `${closed.length} closed`,
				good: true,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
				label: "Close-out Rate",
				value: reports.length === 0 ? "—" : `${Math.round(closeRate)}%`,
				delta: `${reports.length} total`,
				good: closeRate >= 60,
				icon: closeRate >= 60 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" })
			})
		]
	});
}
//#endregion
export { Dashboard as component };
