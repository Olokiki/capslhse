import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$13 } from "../_app.reports._id-Ci6GEQIP.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$14 } from "../_app.reports.index-C-pxy7ow.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ChYWHV3p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C1otKgxr.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CAPSL HSE Platform" },
			{
				name: "description",
				content: "Compression and Power Systems Limited – Health, Safety & Environment reporting and compliance platform."
			},
			{
				name: "author",
				content: "CAPSL"
			},
			{
				property: "og:title",
				content: "CAPSL HSE Platform"
			},
			{
				property: "og:description",
				content: "Compression and Power Systems Limited – Health, Safety & Environment reporting and compliance platform."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "CAPSL HSE Platform"
			},
			{
				name: "twitter:description",
				content: "Compression and Power Systems Limited – Health, Safety & Environment reporting and compliance platform."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5b3bc08c-5e77-4999-95a7-aac1e3ecaece"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5b3bc08c-5e77-4999-95a7-aac1e3ecaece"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/png",
			href: "/logo.png"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$11 = () => import("../_app-Cua1-4di.mjs");
var Route$11 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("../_app.index-BYyQXlTQ.mjs");
var Route$10 = createFileRoute("/_app/")({
	head: () => ({ meta: [{ title: "CAPSL HSE | Global Dashboard" }, {
		name: "description",
		content: "Compression and Power Systems Limited – Health, Safety & Environment reporting and compliance dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_app.audit-DTycqutZ.mjs");
var Route$9 = createFileRoute("/_app/audit")({
	head: () => ({ meta: [{ title: "Audit Log | CAPSL HSE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_app.documents-CsJ1u7lr.mjs");
var Route$8 = createFileRoute("/_app/documents")({
	head: () => ({ meta: [{ title: "HSE Documents & Materials | CAPSL" }, {
		name: "description",
		content: "Central library of CAPSL HSE policies, procedures, training, JSAs, MSDS sheets, permits and toolbox talks."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app.leaderboard-DW0g3ShC.mjs");
var Route$7 = createFileRoute("/_app/leaderboard")({
	head: () => ({ meta: [{ title: "Reporter Leaderboard | CAPSL HSE" }, {
		name: "description",
		content: "Recognising the people and locations actively contributing to CAPSL's HSE performance."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app.locations-BMw-Thj2.mjs");
var Route$6 = createFileRoute("/_app/locations")({
	head: () => ({ meta: [{ title: "Locations | CAPSL HSE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.users-CM29W1p8.mjs");
var Route$5 = createFileRoute("/_app/users")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./login.index-CwGPnn-n.mjs");
var Route$4 = createFileRoute("/login/")({
	head: () => ({ meta: [{ title: "Sign in | CAPSL HSE" }, {
		name: "description",
		content: "Choose your CAPSL HSE portal to sign in."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login.admin-BvRp3eqx.mjs");
var Route$3 = createFileRoute("/login/admin")({
	head: () => ({ meta: [{ title: "Administrator sign in | CAPSL HSE" }, {
		name: "description",
		content: "Sign in or register as a CAPSL HSE Administrator."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./login.staff-ugV2tOi1.mjs");
var Route$2 = createFileRoute("/login/staff")({
	head: () => ({ meta: [{ title: "Staff sign in | CAPSL HSE" }, {
		name: "description",
		content: "Sign in or register as CAPSL field staff."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./signup.index-C8hgx4Fz.mjs");
var Route$1 = createFileRoute("/signup/")({
	head: () => ({ meta: [{ title: "Create account | CAPSL HSE" }, {
		name: "description",
		content: "Register for the CAPSL HSE Platform with your @capslgas.com email."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.reports.new-CVJhJrZ9.mjs");
var Route = createFileRoute("/_app/reports/new")({
	head: () => ({ meta: [{ title: "Submit HSE Report | CAPSL" }, {
		name: "description",
		content: "Report a hazard, near-miss, incident or environmental observation in seconds."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AppRoute = Route$11.update({
	id: "/_app",
	getParentRoute: () => Route$12
});
var AppIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppAuditRoute = Route$9.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AppRoute
});
var AppDocumentsRoute = Route$8.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => AppRoute
});
var AppLeaderboardRoute = Route$7.update({
	id: "/leaderboard",
	path: "/leaderboard",
	getParentRoute: () => AppRoute
});
var AppLocationsRoute = Route$6.update({
	id: "/locations",
	path: "/locations",
	getParentRoute: () => AppRoute
});
var AppUsersRoute = Route$5.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AppRoute
});
var LoginIndexRoute = Route$4.update({
	id: "/login/",
	path: "/login/",
	getParentRoute: () => Route$12
});
var LoginAdminRoute = Route$3.update({
	id: "/login/admin",
	path: "/login/admin",
	getParentRoute: () => Route$12
});
var LoginStaffRoute = Route$2.update({
	id: "/login/staff",
	path: "/login/staff",
	getParentRoute: () => Route$12
});
var SignupIndexRoute = Route$1.update({
	id: "/signup/",
	path: "/signup/",
	getParentRoute: () => Route$12
});
var AppReportsIndexRoute = Route$14.update({
	id: "/reports/",
	path: "/reports/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAuditRoute,
	AppDocumentsRoute,
	AppLeaderboardRoute,
	AppLocationsRoute,
	AppUsersRoute,
	AppIndexRoute,
	AppReportsIdRoute: Route$13.update({
		id: "/reports/$id",
		path: "/reports/$id",
		getParentRoute: () => AppRoute
	}),
	AppReportsNewRoute: Route.update({
		id: "/reports/new",
		path: "/reports/new",
		getParentRoute: () => AppRoute
	}),
	AppReportsIndexRoute
};
var rootRouteChildren = {
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginAdminRoute,
	LoginStaffRoute,
	LoginIndexRoute,
	SignupIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
