import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as Input, t as Button } from "./_ssr/button-Ceck5jXq.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { W as Calendar, X as ArrowLeft, a as UserPlus, b as MapPin, h as Send, i as User, n as Wrench, t as X, z as CircleCheck } from "./_libs/lucide-react.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { l as assignReport, m as useHseReports, p as setStatus, s as addComment, u as closeReport } from "./_ssr/hse-store-CbA8XyIs.mjs";
import { n as StatusBadge, r as TypeBadge, t as SeverityBadge } from "./_ssr/badges-BvtZ81Fd.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Route } from "./_app.reports._id-Ci6GEQIP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Root } from "./_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports._id-BQeQxUMu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
function ReportDetail() {
	const { id } = Route.useParams();
	const nav = useNavigate();
	const reports = useHseReports();
	const report = (0, import_react.useMemo)(() => reports.find((r) => r.id === id), [reports, id]);
	const [comment, setComment] = (0, import_react.useState)("");
	const [assignOpen, setAssignOpen] = (0, import_react.useState)(false);
	const [closeOpen, setCloseOpen] = (0, import_react.useState)(false);
	const [assignee, setAssignee] = (0, import_react.useState)(report?.assignedTo ?? "");
	const [assigneeEmail, setAssigneeEmail] = (0, import_react.useState)("");
	const [dueAt, setDueAt] = (0, import_react.useState)(report?.dueAt?.slice(0, 10) ?? "");
	const [rootCause, setRootCause] = (0, import_react.useState)("");
	const [corrective, setCorrective] = (0, import_react.useState)("");
	const [closureEvidenceFile, setClosureEvidenceFile] = (0, import_react.useState)(null);
	if (!report) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Report not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/reports",
			search: { location: void 0 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4",
				children: "Back to reports"
			})
		})]
	});
	const overdue = report.dueAt && new Date(report.dueAt) < /* @__PURE__ */ new Date() && report.status !== "closed";
	const submitAssign = async () => {
		if (!assignee.trim()) {
			toast.error("Assignee is required.");
			return;
		}
		const email = assigneeEmail.trim();
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		try {
			await assignReport(report.id, assignee, dueAt ? new Date(dueAt).toISOString() : "", "", email || void 0);
			setAssignOpen(false);
			toast.success(email ? `Assigned to ${assignee}. Email notification sent.` : `Assigned to ${assignee}.`);
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Assignment completed, but email could not be sent.");
		}
	};
	const submitClose = async () => {
		if (!rootCause.trim() || !corrective.trim()) {
			toast.error("Root cause and corrective action are required to close out.");
			return;
		}
		if ((report.severity === "high" || report.severity === "critical") && !closureEvidenceFile) {
			toast.error("Closure evidence is required for High and Critical reports.");
			return;
		}
		try {
			await closeReport(report.id, {
				rootCause: rootCause.trim(),
				correctiveAction: corrective.trim(),
				actor: "",
				closureEvidenceFile
			});
			setClosureEvidenceFile(null);
			setCloseOpen(false);
			toast.success(`${report.ref} closed`);
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Unable to close the report.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1200px] space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => nav({
				to: "/reports",
				search: { location: void 0 }
			}),
			className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to reports"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-card p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-semibold text-muted-foreground",
										children: report.ref
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { s: report.severity }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { s: report.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBadge, { t: report.type }),
									overdue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold uppercase text-destructive",
										children: "Overdue"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-2xl font-bold tracking-tight",
								children: report.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
											" ",
											report.location
										]
									}),
									report.asset && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4" }),
											" ",
											report.asset
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
											" Reported by ",
											report.reportedBy
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
											" ",
											new Date(report.reportedAt).toLocaleString()
										]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: report.status !== "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
								open: assignOpen,
								onOpenChange: setAssignOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "rounded-full",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 h-4 w-4" }),
											" ",
											report.assignedTo ? "Reassign" : "Assign"
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Assign this report" }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-sm font-semibold",
												children: "Assignee"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "mt-1.5 h-11",
												value: assignee,
												onChange: (e) => setAssignee(e.target.value),
												placeholder: "Enter assignee name"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-sm font-semibold",
													children: "Assignee email"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "email",
													value: assigneeEmail,
													onChange: (e) => setAssigneeEmail(e.target.value),
													placeholder: "name@capslgas.com",
													className: "mt-1.5 h-11"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-[11px] text-muted-foreground",
													children: "A notification will be sent to this email when the report is assigned."
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-sm font-semibold",
												children: "Due date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												value: dueAt,
												onChange: (e) => setDueAt(e.target.value),
												className: "mt-1.5 h-11"
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => setAssignOpen(false),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: submitAssign,
										className: "rounded-full px-5 font-semibold",
										children: "Assign"
									})] })
								] })]
							}),
							report.status === "assigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-full",
								onClick: () => {
									setStatus(report.id, "in-progress", "");
									toast.success("Marked in progress");
								},
								children: "Start work"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
								open: closeOpen,
								onOpenChange: setCloseOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "rounded-full px-5 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-4 w-4" }), " Close out"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
									className: "max-w-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Close out report" }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 pt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-muted-foreground",
														children: "Document the root cause and what was done to prevent recurrence."
													}), report.evidenceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 rounded-lg border border-border bg-secondary/30 p-3",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm font-semibold",
																children: "Original Evidence"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "overflow-hidden rounded-lg border border-border bg-background",
																children: /\.(jpg|jpeg|png|gif|webp)(\?|$)/i.test(report.evidenceUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: report.evidenceUrl,
																	alt: "Original HSE report evidence",
																	className: "max-h-[300px] w-full object-contain"
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "p-4 text-sm text-muted-foreground",
																	children: "Original evidence is a document."
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: report.evidenceUrl,
																target: "_blank",
																rel: "noreferrer",
																className: "text-xs font-medium text-primary hover:underline",
																children: "View original evidence"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-sm font-semibold",
													children: "Root cause"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													value: rootCause,
													onChange: (e) => setRootCause(e.target.value),
													rows: 3,
													className: "mt-1.5"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-sm font-semibold",
													children: "Corrective action"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													value: corrective,
													onChange: (e) => setCorrective(e.target.value),
													rows: 3,
													className: "mt-1.5"
												})] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											onClick: () => setCloseOpen(false),
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: submitClose,
											className: "rounded-full px-5 font-semibold",
											children: "Close report"
										})] })
									]
								})]
							})
						] })
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 p-6 lg:grid-cols-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90",
							children: report.description
						}),
						report.status === "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl border border-success/30 bg-success/5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-bold text-success",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
										" Closed out on ",
										report.closedAt ? new Date(report.closedAt).toLocaleDateString() : "—",
										" by ",
										report.closedBy
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Root cause"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-foreground/90",
											children: report.rootCause
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Corrective action"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-foreground/90",
											children: report.correctiveAction
										})] }),
										(report.evidenceUrl || report.closureEvidenceUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Evidence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 grid gap-4 md:grid-cols-2",
											children: [report.evidenceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-semibold",
													children: "Before — Original Evidence"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "overflow-hidden rounded-lg border border-border bg-secondary/30",
													children: /\.(jpg|jpeg|png|gif|webp)(\?|$)/i.test(report.evidenceUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: report.evidenceUrl,
														alt: "Original HSE report evidence",
														className: "max-h-[300px] w-full object-contain"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: report.evidenceUrl,
															target: "_blank",
															rel: "noreferrer",
															className: "text-sm font-medium text-primary hover:underline",
															children: "View original evidence"
														})
													})
												})]
											}), report.closureEvidenceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-semibold",
													children: "After — Closure Evidence"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "overflow-hidden rounded-lg border border-border bg-secondary/30",
													children: /\.(jpg|jpeg|png|gif|webp)(\?|$)/i.test(report.closureEvidenceUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: report.closureEvidenceUrl,
														alt: "Closure evidence",
														className: "max-h-[300px] w-full object-contain"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: report.closureEvidenceUrl,
															target: "_blank",
															rel: "noreferrer",
															className: "text-sm font-medium text-primary hover:underline",
															children: "View closure evidence"
														})
													})
												})]
											})]
										})] })
									]
								}),
								report.status !== "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-8 flex-none items-center justify-center rounded-full brand-gradient text-[11px] font-bold text-white",
										children: "AO"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: comment,
											onChange: (e) => setComment(e.target.value),
											placeholder: "Add an update or progress note…",
											rows: 2
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 flex justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "rounded-full font-semibold",
												onClick: () => {
													if (!comment.trim()) return;
													addComment(report.id, comment.trim(), "");
													setComment("");
													toast.success("Comment added");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1.5 h-3.5 w-3.5" }), "Post"]
											})
										})]
									})]
								})] })
							]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { ReportDetail as component };
