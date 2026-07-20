import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { a as useSession, r as signUp, t as signIn } from "./auth-store-DU4Ijm7u.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as HardHat, S as MapPin, Z as ArrowLeft, m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as LOCATIONS } from "./hse-store-B8fwR4lK.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-panel-D5ohsuBb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPanel({ role }) {
	const session = useSession();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (session) navigate({ to: "/" });
	}, [session, navigate]);
	const isAdmin = role === "admin";
	const heroIcon = isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-7 w-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "h-7 w-7" });
	const heroTint = isAdmin ? "bg-primary/20 text-primary" : "bg-[oklch(0.78_0.17_60)]/20 text-[oklch(0.85_0.18_60)]";
	const roleLabel = isAdmin ? "HSE Administrator" : "Field Staff";
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		if (mode === "signin") {
			const res = await signIn(email, password);
			setBusy(false);
			if (!res.ok) setError(res.error);
		} else {
			if (password.length < 8) {
				setBusy(false);
				setError("Password must be at least 8 characters.");
				return;
			}
			const res = await signUp({
				email,
				password,
				fullName: fullName.trim(),
				title: title.trim(),
				role,
				location: role === "staff" ? location : void 0
			});
			setBusy(false);
			if (!res.ok) setError(res.error);
		}
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-sidebar-foreground/60",
						children: [roleLabel, " Portal"]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-14 w-14 items-center justify-center rounded-2xl ${heroTint}`,
						children: heroIcon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-3xl font-semibold tracking-tight",
						children: isAdmin ? "HSE Administrator access" : "Field staff sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm text-sidebar-foreground/70",
						children: isAdmin ? "Full visibility across all CAPSL sites — reports, analytics, audit log and close-outs." : "Log in to the site you're working from today. Reports you raise will be geo-tagged to that location automatically."
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
						children: mode === "signin" ? `Sign in as ${roleLabel}` : `Create ${roleLabel} account`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Your work email must end in ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "@capslgas.com"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 inline-flex rounded-full border border-border bg-secondary p-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode("signin");
								setError(null);
							},
							className: `rounded-full px-4 py-1.5 font-medium transition ${mode === "signin" ? "bg-background shadow-sm" : "text-muted-foreground"}`,
							children: "Sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMode("signup");
								setError(null);
							},
							className: `rounded-full px-4 py-1.5 font-medium transition ${mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"}`,
							children: "Sign up"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-6 space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "fullName",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "fullName",
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "title",
										children: "Job title"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "title",
										value: title,
										onChange: (e) => setTitle(e.target.value),
										required: true,
										placeholder: isAdmin ? "e.g. HSE Manager" : "e.g. Field Supervisor"
									})]
								}),
								role === "staff" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "location",
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " Work location"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: location,
										onValueChange: setLocation,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "location",
											className: "h-11",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select your site…" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: loc,
											children: loc
										}, loc)) })]
									})]
								})
							] }),
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
									required: true,
									placeholder: "firstname.lastname@capslgas.com"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "password",
									children: ["Password", mode === "signup" ? " (min. 8 characters)" : ""]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									autoComplete: mode === "signin" ? "current-password" : "new-password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									minLength: mode === "signup" ? 8 : void 0
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
								children: busy ? mode === "signin" ? "Signing in…" : "Creating account…" : mode === "signin" ? "Sign in" : "Create account"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPanel as t };
