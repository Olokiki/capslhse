import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as Input, t as Button } from "./_ssr/button-Ceck5jXq.mjs";
import { a as useSession } from "./_ssr/auth-store-DZYje80S.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as ShieldAlert, o as Upload } from "./_libs/lucide-react.mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { c as assetsForLocation, d as createReport, n as LOCATION_GROUPS, o as TYPE_LABEL, r as PEOPLE, t as LOCATIONS } from "./_ssr/hse-store-CbA8XyIs.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports.new-CVJhJrZ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewReport() {
	const nav = useNavigate();
	const session = useSession();
	const defaultLocation = session?.location ?? LOCATIONS[0];
	const defaultReporter = session ? `${session.name} (${session.title})` : PEOPLE[0];
	session?.role;
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		type: "",
		severity: "",
		location: defaultLocation,
		locationOther: "",
		asset: "",
		assetOther: "",
		reportedBy: defaultReporter
	});
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const set = (key, value) => {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	};
	const locationAssets = assetsForLocation(form.location);
	const [evidenceFile, setEvidenceFile] = (0, import_react.useState)(null);
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
		if (!(form.location === "__other__" ? form.locationOther.trim() : form.location)) return toast.error("Please enter a location.");
		setSubmitting(true);
		try {
			const finalLocation = form.location === "__other__" ? form.locationOther.trim() : form.location;
			if (!finalLocation) return toast.error("Location is required.");
			await createReport({
				title: form.title.trim(),
				description: form.description.trim(),
				type: form.type,
				severity: form.severity,
				location: finalLocation,
				asset: finalAsset,
				reportedBy: form.reportedBy,
				reportedByUserId: session.userId,
				evidenceFile
			});
			nav({
				to: "/reports",
				search: { location: void 0 }
			});
		} catch (error) {
			console.error("HSE report submission failed:", error);
			toast.error(error instanceof Error ? error.message : "Unable to submit HSE report.");
		} finally {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "desc",
							className: "text-sm font-semibold",
							children: ["What happened? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						})
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-sm font-semibold",
							children: ["Type ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.type || void 0,
							onValueChange: (v) => set("type", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5 h-11 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select type" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(TYPE_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: k,
								children: v
							}, k)) })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-sm font-semibold",
							children: ["Severity ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.severity || void 0,
							onValueChange: (v) => set("severity", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5 h-11 w-full",
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
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-sm font-semibold",
								children: ["Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.location,
								onValueChange: (v) => {
									set("location", v);
									set("asset", "");
									if (v !== "__other__") set("locationOther", "");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5 h-11 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select location" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LOCATION_GROUPS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: l === "Other" ? "__other__" : l,
									children: l
								}, l)) })]
							}),
							form.location === "__other__" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: form.locationOther,
								onChange: (e) => set("locationOther", e.target.value),
								placeholder: "CAPSL - location",
								className: "mt-2 h-11 w-full"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-sm font-semibold",
								children: ["Asset ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.asset || "",
								onValueChange: (value) => {
									console.log("Selected asset:", value);
									set("asset", value);
									if (value !== "__other__") set("assetOther", "");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5 h-11 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select asset" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [locationAssets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: asset,
									children: asset
								}, asset)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "__other__",
									children: "Other"
								})] })]
							}),
							form.asset === "__other__" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								value: form.assetOther || "",
								onChange: (e) => set("assetOther", e.target.value),
								placeholder: "Enter asset name / tag",
								className: "mt-2 h-11 w-full",
								required: true
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						className: "text-sm font-semibold",
						children: [
							"Reported by",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.reportedBy,
						onChange: (e) => set("reportedBy", e.target.value),
						required: true,
						readOnly: true,
						className: "bg-muted cursor-not-allowed"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-semibold",
							children: "Evidence (optional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "evidence-file",
							className: "mt-1.5 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/50 px-4 py-5 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" }),
								evidenceFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: evidenceFile.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [(evidenceFile.size / 1024 / 1024).toFixed(2), " MB"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-primary",
											children: "Click to change file"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click to attach a photo or file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "JPG, PNG, PDF, DOC, DOCX"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "evidence-file",
									type: "file",
									accept: "image/*,.pdf,.doc,.docx,.xls,.xlsx",
									className: "hidden",
									onChange: (e) => {
										const file = e.target.files?.[0] ?? null;
										setEvidenceFile(file);
									}
								})
							]
						}),
						evidenceFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEvidenceFile(null),
							className: "mt-2 text-xs font-medium text-destructive hover:underline",
							children: "Remove attached file"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-2 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => nav({
								to: "/reports",
								search: { location: void 0 }
							}),
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
