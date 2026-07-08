import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useSession } from "./auth-store-Ba8VgCnR.mjs";
import { t as capsl_logo_jpeg_asset_default } from "./capsl-logo.jpeg.asset-6Y8Y-gcq.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as HardHat, J as ArrowRight, p as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login.index-BRwcv5SS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginChooser() {
	const session = useSession();
	const navigate = useNavigate();
	const [hover, setHover] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (session) navigate({ to: "/" });
	}, [session, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-sidebar text-sidebar-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[oklch(0.68_0.17_152)]/25 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[-120px] top-1/3 h-[460px] w-[460px] rounded-full bg-[oklch(0.76_0.17_60)]/25 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-140px] left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.62_0.23_27)]/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.05]",
					style: {
						backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
						backgroundSize: "56px 56px"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-white/20 sm:h-20 sm:w-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: capsl_logo_jpeg_asset_default.url,
							alt: "CAPSL",
							className: "h-full w-full object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xl font-bold tracking-tight sm:text-3xl",
							children: ["CAPSL ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-text-gradient",
								children: "HSE Platform"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-sidebar-foreground/70 sm:text-base",
							children: "Compression and Power Systems Limited"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center py-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-center text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "Welcome. How are you signing in today?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-sm text-sidebar-foreground/70",
							children: "Choose the portal that matches your role."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid w-full gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login/admin",
								onMouseEnter: () => setHover("admin"),
								onMouseLeave: () => setHover(null),
								className: ["group relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-7 backdrop-blur transition-all", hover === "admin" ? "scale-[1.02] border-primary/60 shadow-elegant" : ""].join(" "),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 brand-gradient" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 text-lg font-semibold",
										children: "CAPSL HSE Administrator"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-sidebar-foreground/70",
										children: "Full access to all reports, locations, analytics, audit log, and close-outs."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 inline-flex items-center text-sm font-medium text-primary",
										children: ["Sign in as Admin ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login/staff",
								onMouseEnter: () => setHover("staff"),
								onMouseLeave: () => setHover(null),
								className: ["group relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-7 backdrop-blur transition-all", hover === "staff" ? "scale-[1.02] border-[oklch(0.78_0.17_60)] shadow-elegant" : ""].join(" "),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 brand-gradient" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.18_60)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 text-lg font-semibold",
										children: "CAPSL Staff"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-sidebar-foreground/70",
										children: "Submit reports, assign actions to teammates, and track your own report analytics."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 inline-flex items-center text-sm font-medium text-[oklch(0.85_0.18_60)]",
										children: ["Sign in as Staff ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "text-center text-xs text-sidebar-foreground/50",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Compression and Power Systems Limited"
					]
				})
			]
		})]
	});
}
//#endregion
export { LoginChooser as component };
