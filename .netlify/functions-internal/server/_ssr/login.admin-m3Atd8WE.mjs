import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { i as useSession, t as signInAdmin } from "./auth-store-Ba8VgCnR.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as ArrowLeft, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login.admin-m3Atd8WE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const session = useSession();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("admin@capsl.com");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (session) navigate({ to: "/" });
	}, [session, navigate]);
	function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		const res = signInAdmin(email.trim(), password);
		setBusy(false);
		if (!res.ok) setError(res.error);
		else navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-lg bg-white p-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/capsl-logo.jpeg",
							alt: "CAPSL",
							className: "h-full w-full object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base font-semibold",
						children: "CAPSL HSE Platform"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-sidebar-foreground/60",
						children: "Administrator Portal"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-7 w-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-3xl font-semibold tracking-tight",
						children: "Administrator access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-sidebar-foreground/70",
						children: "Manage every report across every site, run analytics, close out events, and maintain the compliance audit trail."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-2 text-sm text-sidebar-foreground/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Full dashboard, locations and audit log" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Assign, close out and override reports" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• AI-assisted root cause & corrective action" })
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-sidebar-foreground/50",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Compression and Power Systems Limited"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center bg-background px-6 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to portal selection"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-2xl font-semibold tracking-tight",
						children: "Sign in as Administrator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Use your CAPSL HSE administrator credentials."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Work email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									autoComplete: "current-password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy,
								className: "h-11 w-full rounded-full font-semibold",
								children: busy ? "Signing in…" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-foreground",
							children: "Demo credentials"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: "admin@capsl.com / admin123"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-xs text-muted-foreground",
						children: [
							"Not an administrator?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login/staff",
								className: "font-medium text-primary hover:underline",
								children: "Staff sign in"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { AdminLogin as component };
