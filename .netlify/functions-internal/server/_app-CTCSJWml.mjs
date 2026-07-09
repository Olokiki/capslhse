import { i as __toESM } from "./_runtime.mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { i as useSession, r as signOut } from "./_ssr/auth-store-Ba8VgCnR.mjs";
import { d as Link, f as useNavigate, i as useRouterState, s as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { F as ClipboardList, G as Bell, H as ChartColumn, L as CirclePlus, S as LogOut, T as LayoutDashboard, W as BookOpen, b as Map, f as Sparkles, g as Search, m as ShieldAlert, o as Trophy, t as X, v as Menu, x as MapPin } from "./_libs/lucide-react.mjs";
import { a as Portal, c as Trigger, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { h as VisuallyHidden } from "./_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CTCSJWml.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Root;
var SheetTrigger = Trigger;
var SheetPortal = Portal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = Title.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = Description.displayName;
var ADMIN_NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/reports",
		label: "HSE Reports",
		icon: ShieldAlert
	},
	{
		to: "/documents",
		label: "Documents",
		icon: BookOpen
	},
	{
		to: "/locations",
		label: "Locations",
		icon: Map
	},
	{
		to: "/leaderboard",
		label: "Leaderboard",
		icon: Trophy
	},
	{
		to: "/audit",
		label: "Audit Log",
		icon: ClipboardList
	}
];
var STAFF_NAV = [
	{
		to: "/",
		label: "My Analytics",
		icon: ChartColumn,
		exact: true
	},
	{
		to: "/reports",
		label: "HSE Reports",
		icon: ShieldAlert
	},
	{
		to: "/documents",
		label: "Documents",
		icon: BookOpen
	},
	{
		to: "/leaderboard",
		label: "Leaderboard",
		icon: Trophy
	}
];
function SidebarContent({ session, pathname, onSignOut, onNavigate }) {
	const NAV = session.role === "admin" ? ADMIN_NAV : STAFF_NAV;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-sidebar text-sidebar-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-sidebar-border px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/capsl-logo.jpeg",
						alt: "CAPSL",
						className: "h-full w-full object-contain"
					}), "        "]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold tracking-tight",
						children: "CAPSL HSE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-wider text-sidebar-foreground/60",
						children: session.role === "admin" ? "Admin Console" : "Staff Portal"
					})]
				})]
			}),
			session.role === "staff" && session.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mt-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 font-semibold text-sidebar-foreground/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " On site"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-sidebar-foreground",
					children: session.location
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-1 overflow-y-auto px-3 py-4",
				children: NAV.map((item) => {
					const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: ["group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"].join(" "),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[18px] w-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs font-semibold text-sidebar-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-[oklch(0.85_0.18_60)]" }), "AI Assist (Preview)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] leading-relaxed text-sidebar-foreground/70",
					children: "Auto-classify reports, suggest root cause and route to the right responder."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-sidebar-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onSignOut,
					className: "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-[18px] w-[18px]" }), " Sign out"]
				})
			})
		]
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const session = useSession();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	if (!session) return null;
	function handleSignOut() {
		signOut();
		setMobileOpen(false);
		navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "fixed inset-y-0 left-0 z-40 hidden w-64 md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
				session,
				pathname,
				onSignOut: handleSignOut
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:pl-64",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: mobileOpen,
							onOpenChange: setMobileOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-72 p-0 border-0 bg-sidebar",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHidden, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Navigation menu" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {
									session,
									pathname,
									onSignOut: handleSignOut,
									onNavigate: () => setMobileOpen(false)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative hidden w-full max-w-md sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search reports, assets, locations...",
								className: "h-10 rounded-full border-border bg-secondary pl-9 pr-4 text-sm focus-visible:ring-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1.5 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "h-10 rounded-full px-3 font-semibold shadow-sm sm:px-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/reports/new",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4 sm:mr-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "New HSE Report"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-1 hidden items-center gap-3 lg:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold",
											children: session.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: session.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-full brand-gradient text-xs font-bold text-white",
										children: session.initials
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: handleSignOut,
									className: "h-10 rounded-full px-3 sm:px-4",
									"aria-label": "Sign out",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 sm:mr-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Sign out"
									})]
								})
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-4 py-6 sm:px-6 lg:px-8",
				children
			})]
		})]
	});
}
function AppLayout() {
	const session = useSession();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!session) navigate({ to: "/login" });
	}, [session, navigate]);
	if (!session) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
