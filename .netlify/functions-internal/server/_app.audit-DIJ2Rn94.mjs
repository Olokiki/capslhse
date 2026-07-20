import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { f as useHseReports } from "./_ssr/hse-store-B8fwR4lK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.audit-DIJ2Rn94.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const events = useHseReports().flatMap((r) => r.activity.map((a) => ({
		...a,
		ref: r.ref,
		title: r.title,
		id: r.id
	}))).sort((a, b) => +new Date(b.at) - +new Date(a.at));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: "Compliance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-bold tracking-tight",
				children: "Audit Log"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Immutable trail of every action on every report."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "divide-y divide-border",
			children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs text-muted-foreground",
					children: new Date(e.at).toLocaleString()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: e.actor
							}),
							" · ",
							e.message
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							e.ref,
							" – ",
							e.title
						]
					})]
				})]
			}, e.id + e.id))
		})]
	});
};
//#endregion
export { SplitComponent as component };
