import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { d as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { x as MapPin } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-CzXpCsbD.mjs";
import { n as LOCATIONS, p as useHseReports } from "./_ssr/hse-store-C0HW7ztA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.locations-WYSJ07e0.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const reports = useHseReports();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
			children: "Sites"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl font-bold tracking-tight",
			children: "CAPSL Locations"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: LOCATIONS.map((loc) => {
				const items = reports.filter((r) => r.location === loc);
				const open = items.filter((r) => r.status !== "closed").length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-sm font-bold uppercase",
							children: loc.replace("CAPSL - ", "")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								items.length,
								" total · ",
								open,
								" open"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reports",
							search: { location: loc },
							className: "mt-3 inline-block text-xs font-semibold text-primary hover:underline",
							children: "View reports →"
						})
					]
				}, loc);
			})
		})]
	});
};
//#endregion
export { SplitComponent as component };
