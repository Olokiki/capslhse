import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports.index-C-pxy7ow.js
var $$splitComponentImporter = () => import("./_app.reports.index-CcJ0m8mu.mjs");
var Route = createFileRoute("/_app/reports/")({
	validateSearch: (search) => ({ location: typeof search.location === "string" ? search.location : void 0 }),
	head: () => ({ meta: [{ title: "HSE Reports | CAPSL" }, {
		name: "description",
		content: "Browse, filter and act on all HSE reports across CAPSL field operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
