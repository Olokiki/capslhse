import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
require_jsx_runtime();
var $$splitNotFoundComponentImporter = () => import("./_app.reports._id-Bi5ES-pl.mjs");
var $$splitComponentImporter = () => import("./_app.reports._id-BQeQxUMu.mjs");
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
