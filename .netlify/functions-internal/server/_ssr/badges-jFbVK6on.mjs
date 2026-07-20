import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as TYPE_LABEL, i as STATUS_META, r as SEVERITY_META } from "./hse-store-B8fwR4lK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badges-jFbVK6on.js
var import_jsx_runtime = require_jsx_runtime();
function SeverityBadge({ s }) {
	const m = SEVERITY_META[s];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.color}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${m.ring}` }), m.label]
	});
}
function StatusBadge({ s }) {
	const m = STATUS_META[s];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.color}`,
		children: m.label
	});
}
function TypeBadge({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-foreground/80",
		children: TYPE_LABEL[t]
	});
}
//#endregion
export { StatusBadge as n, TypeBadge as r, SeverityBadge as t };
