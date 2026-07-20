import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as supabase } from "./_ssr/client-6hwdMcVk.mjs";
import { a as useSession } from "./_ssr/auth-store-DU4Ijm7u.mjs";
import { f as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as Mail, K as Briefcase, O as HardHat, S as MapPin, Z as ArrowLeft, _ as Search, m as ShieldCheck } from "./_libs/lucide-react.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { f as useHseReports } from "./_ssr/hse-store-B8fwR4lK.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.users-BZ1Ym6RG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const session = useSession();
	const navigate = useNavigate();
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const reports = useHseReports();
	(0, import_react.useEffect)(() => {
		if (session && session.role !== "admin") navigate({ to: "/" });
	}, [session, navigate]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		(async () => {
			const [{ data: p }, { data: r }] = await Promise.all([supabase.from("profiles").select("*").order("full_name"), supabase.from("user_roles").select("user_id, role")]);
			if (!alive) return;
			setProfiles(p ?? []);
			setRoles(r ?? []);
			setLoading(false);
		})();
		return () => {
			alive = false;
		};
	}, []);
	const users = (0, import_react.useMemo)(() => {
		return profiles.map((p) => ({
			...p,
			role: roles.some((r) => r.user_id === p.user_id && r.role === "admin") ? "admin" : "staff"
		}));
	}, [profiles, roles]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return users;
		return users.filter((u) => u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.title ?? "").toLowerCase().includes(q) || (u.location ?? "").toLowerCase().includes(q));
	}, [users, query]);
	const selected = users.find((u) => u.user_id === selectedId) ?? null;
	if (session?.role !== "admin") return null;
	if (selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserDetail, {
		user: selected,
		reports,
		onBack: () => setSelectedId(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Users"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Everyone who has created an account with a @capslgas.com email. Click a user to view their role, station and reporting activity."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search by name, email, title, location…",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					className: "h-10 rounded-full pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: loading ? "Loading users…" : `${filtered.length} user${filtered.length === 1 ? "" : "s"}`
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [filtered.map((u) => {
						const initials = u.full_name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
						const openCount = reports.filter((r) => r.reportedBy === u.full_name && r.status !== "closed").length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedId(u.user_id),
							className: "flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-xs font-bold text-white",
									children: initials || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: u.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: u.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden text-xs text-muted-foreground sm:block",
									children: u.title ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden text-xs text-muted-foreground md:block min-w-[140px]",
									children: u.location ?? "—"
								}),
								openCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "hidden lg:inline-flex",
									children: [openCount, " open"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: u.role === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
									children: [u.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1 h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "mr-1 h-3 w-3" }), u.role === "admin" ? "Admin" : "Staff"]
								})
							]
						}, u.user_id);
					}), !loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-10 text-center text-sm text-muted-foreground",
						children: "No users match your search."
					})]
				})
			})] })
		]
	});
}
function UserDetail({ user, reports, onBack }) {
	const mine = reports.filter((r) => r.reportedBy === user.full_name || r.assignedTo === user.full_name);
	const submitted = reports.filter((r) => r.reportedBy === user.full_name);
	const open = mine.filter((r) => r.status !== "closed");
	const closed = mine.filter((r) => r.status === "closed");
	const avgCloseDays = (() => {
		const durations = reports.filter((r) => r.status === "closed" && r.closedAt && (r.reportedBy === user.full_name || r.assignedTo === user.full_name)).map((r) => {
			const start = new Date(r.reportedAt).getTime();
			return (new Date(r.closedAt).getTime() - start) / (1e3 * 60 * 60 * 24);
		});
		if (!durations.length) return null;
		return (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(1);
	})();
	const initials = user.full_name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: onBack,
				className: "-ml-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Back to users"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-6 p-6 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-20 w-20 items-center justify-center rounded-2xl brand-gradient text-2xl font-bold text-white",
						children: initials || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-bold",
							children: user.full_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: user.title ?? "—"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }),
										" ",
										user.email
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5" }), user.role === "admin" ? "Administrator" : "Staff"]
								}),
								user.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
										" ",
										user.location
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: user.role === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
						children: user.role === "admin" ? "Admin" : "Staff"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Reports Submitted",
						value: submitted.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open Reports",
						value: open.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Closed Reports",
						value: closed.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Avg Close Time",
						value: avgCloseDays === null ? "—" : `${avgCloseDays} days`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Recent activity"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [mine.slice(0, 15).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate font-medium",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									r.ref,
									" · ",
									r.location,
									" · ",
									new Date(r.reportedAt).toLocaleDateString()
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "capitalize",
							children: r.status.replace("-", " ")
						})]
					}, r.id)), mine.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-8 text-center text-sm text-muted-foreground",
						children: "No reports yet from this user."
					})]
				})
			})] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-2xl font-bold",
			children: value
		})]
	}) });
}
//#endregion
export { UsersPage as component };
