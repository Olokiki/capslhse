import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { a as useSession } from "./_ssr/auth-store-DU4Ijm7u.mjs";
import { f as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as MapPin, T as Lock, h as ShieldAlert, o as Upload, p as Sparkles } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { a as TYPE_LABEL, n as PEOPLE, s as assetsForLocation, t as LOCATIONS, u as createReport } from "./_ssr/hse-store-B8fwR4lK.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports.new-DzYDebOI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewReport() {
	const nav = useNavigate();
	const session = useSession();
	const defaultLocation = session?.location ?? LOCATIONS[0];
	const defaultReporter = session ? `${session.name} (${session.title})` : PEOPLE[0];
	const isStaff = session?.role === "staff";
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		type: "",
		severity: "",
		location: defaultLocation,
		asset: "",
		assetOther: "",
		reportedBy: defaultReporter
	});
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const locationAssets = (0, import_react.useMemo)(() => assetsForLocation(form.location), [form.location]);
	const aiClassify = () => {
		if (!form.description.trim()) {
			toast.error("Add a description first so AI can analyse it.");
			return;
		}
		setAiBusy(true);
		setTimeout(() => {
			const d = form.description.toLowerCase();
			let type = "near-miss";
			let sev = "low";
			if (d.includes("spill") || d.includes("leak") || d.includes("smoke") || d.includes("flare")) type = "environmental";
			else if (d.includes("injur") || d.includes("cut") || d.includes("burn") || d.includes("first aid")) type = "injury";
			else if (d.includes("without") || d.includes("not wearing") || d.includes("ppe")) type = "unsafe-act";
			else if (d.includes("frayed") || d.includes("broken") || d.includes("damaged") || d.includes("worn")) type = "unsafe-condition";
			if (d.includes("fire") || d.includes("explosion") || d.includes("fatal") || d.includes("critical")) sev = "critical";
			else if (d.includes("injur") || d.includes("spill") || d.includes("smoke")) sev = "high";
			else if (d.includes("worn") || d.includes("frayed") || d.includes("slip")) sev = "medium";
			set("type", type);
			set("severity", sev);
			setAiBusy(false);
			toast.success(`AI classified as ${TYPE_LABEL[type]} · ${sev.toUpperCase()}`);
		}, 700);
	};
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!form.title.trim()) return toast.error("Title is required.");
		if (!form.description.trim()) return toast.error("Description is required.");
		if (!form.type) return toast.error("Please select a report type.");
		if (!form.severity) return toast.error("Please select a severity.");
		if (!form.location) return toast.error("Location is required.");
		if (!form.reportedBy) return toast.error("Reporter is required.");
		const finalAsset = form.asset === "__other__" ? form.assetOther.trim() : form.asset;
		if (!finalAsset) return toast.error("Asset is required. Pick one or enter a custom asset.");
		setSubmitting(true);
		try {
			const r = await createReport({
				title: form.title.trim(),
				description: form.description.trim(),
				type: form.type,
				severity: form.severity,
				location: form.location,
				asset: finalAsset,
				reportedBy: form.reportedBy
			});
			toast.success(`Report ${r.ref} submitted`);
			nav({
				to: "/reports/$id",
				params: { id: r.id }
			});
		} catch (err) {
			console.error(err);
			toast.error("Failed to submit report. Please try again.");
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: "HSE Reporting"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 flex items-center gap-3 text-3xl font-bold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl brand-gradient text-white shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" })
					}), "Submit an HSE Report"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "All fields are required. Reports are routed to the HSE Lead and actioned to the right responder."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "title",
						className: "text-sm font-semibold",
						children: ["Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "title",
						required: true,
						value: form.title,
						onChange: (e) => set("title", e.target.value),
						placeholder: "e.g. Oil spill near separator V-301",
						className: "mt-1.5 h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "desc",
							className: "text-sm font-semibold",
							children: ["What happened? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: aiClassify,
							disabled: aiBusy,
							className: "h-7 gap-1.5 text-xs font-semibold text-primary hover:bg-accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
								" ",
								aiBusy ? "Analysing…" : "AI classify"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "desc",
						required: true,
						value: form.description,
						onChange: (e) => set("description", e.target.value),
						placeholder: "Describe the hazard, near-miss, incident or environmental observation. Include who, what, where, when.",
						rows: 5,
						className: "mt-1.5"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-sm font-semibold",
								children: ["Type ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.type || void 0,
								onValueChange: (v) => set("type", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5 h-11",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select type" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(TYPE_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: k,
									children: v
								}, k)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-sm font-semibold",
								children: ["Severity ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.severity || void 0,
								onValueChange: (v) => set("severity", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5 h-11",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select severity" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "low",
										children: "Low"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "medium",
										children: "Medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "high",
										children: "High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "critical",
										children: "Critical"
									})
								] })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-sm font-semibold",
									children: ["Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}),
								isStaff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1.5 flex h-11 items-center gap-2 rounded-md border border-input bg-secondary/60 px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: form.location
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.location,
									onValueChange: (v) => {
										set("location", v);
										set("asset", "");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5 h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "CAPSL- your current location" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [LOCATIONS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: l,
										children: l
									}, l)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "__other__",
										children: " Other (Specify) "
									})] })]
								}), form.location === "__other__" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: form.locationOther,
									onChange: (e) => set("locationOther", e.target.value),
									placeholder: "CAPSL- your current location",
									className: "mt-2 h-11"
								})] }),
								isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: "Fixed to the site you signed in from."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-sm font-semibold",
									children: ["Asset ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.asset || void 0,
									onValueChange: (v) => set("asset", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1.5 h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select asset" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [locationAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: a,
										children: a
									}, a)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "__other__",
										children: "Other (specify)…"
									})] })]
								}),
								form.asset === "__other__" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									value: form.assetOther,
									onChange: (e) => set("assetOther", e.target.value),
									placeholder: "Enter asset name / tag",
									className: "mt-2 h-11"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-sm font-semibold",
									children: ["Reported by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.reportedBy,
									onChange: (e) => set("reportedBy", e.target.value),
									required: true,
									className: "mt-1.5 h-11"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-sm font-semibold",
						children: "Evidence (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-1.5 flex h-24 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/50 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
							" Drop photos or files (prototype)",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								className: "hidden"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-2 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => nav({ to: "/reports" }),
							disabled: submitting,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submitting,
							className: "rounded-full px-6 font-semibold shadow-sm",
							children: submitting ? "Submitting…" : "Submit Report"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { NewReport as component };
