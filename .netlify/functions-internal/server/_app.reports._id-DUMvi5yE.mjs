import { c as lazyRouteComponent, l as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports._id-DUMvi5yE.js
var $$splitNotFoundComponentImporter = () => import("./_app.reports._id-Bi5ES-pl.mjs");
var $$splitComponentImporter = () => import("./_app.reports._id-BuFo99_m.mjs");
var Route = createFileRoute("/_app/reports/$id")({
	head: ({ params }) => ({ meta: [{ title: `Report ${params.id} | CAPSL HSE` }, {
		name: "description",
		content: "View, assign, action and close out an HSE report."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
