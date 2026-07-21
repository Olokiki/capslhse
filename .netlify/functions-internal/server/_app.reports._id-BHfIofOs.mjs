import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { d as Link, f as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as CircleCheck, G as Calendar, S as MapPin, Z as ArrowLeft, a as UserPlus, g as Send, i as User, n as Wrench, p as Sparkles, t as X, v as MessageSquare } from "./_libs/lucide-react.mjs";
import { a as Portal, c as Trigger, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Card } from "./_ssr/card-BXjpJ96D.mjs";
import { a as TYPE_LABEL, c as assignReport, d as setStatus, f as useHseReports, l as closeReport, o as addComment } from "./_ssr/hse-store-B8fwR4lK.mjs";
import { n as StatusBadge, r as TypeBadge, t as SeverityBadge } from "./_ssr/badges-jFbVK6on.mjs";
import { t as Route } from "./_app.reports._id-CU_XUawb.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Root$1 } from "./_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.reports._id-BHfIofOs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Root;
var DialogTrigger = Trigger;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
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
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root$1.displayName;
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
	if (!report) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Report not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/reports",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4",
				children: "Back to reports"
			})
		})]
	});
	const overdue = report.dueAt && new Date(report.dueAt) < /* @__PURE__ */ new Date() && report.status !== "closed";
	const submitAssign = async () => {
		if (!assignee) return;
		const email = assigneeEmail.trim();
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error("Please enter a valid email address");
			return;
		}
		await assignReport(report.id, assignee, dueAt ? new Date(dueAt).toISOString() : "", "", email || void 0);
		const response = await fetch("/.netlify/functions/send-assignment-email", {
			method: "POST",
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify({
				assignee,
				email,
				reportRef: report.ref,
				reportTitle: report.title,
				dueDate: dueAt
			}),
		});

	const result = await response.json(); console.log(result);
if (!response.ok || !result.success) {
  throw new Error(result.error || "Email failed");
}
		setAssignOpen(false);
		toast.success(email ? `Assigned to ${assignee} · notification sent to ${email}` : `Assigned to ${assignee}`);
	};
	const submitClose = () => {
		if (!rootCause.trim() || !corrective.trim()) {
			toast.error("Root cause and corrective action are required to close out.");
			return;
		}
		closeReport(report.id, {
			rootCause,
			correctiveAction: corrective,
			actor: ""
		});
		setCloseOpen(false);
		toast.success(`${report.ref} closed`);
	};
	const aiSuggest = () => {
		const map = {
			"near-miss": {
				rc: "Procedural gap – task performed without updated JSA.",
				ca: "Re-issue JSA, tool-box brief crew, add weekly spot-check for 4 weeks."
			},
			"unsafe-condition": {
				rc: "Component degradation not caught by routine inspection.",
				ca: "Replace component, shorten inspection interval, add to PM checklist."
			},
			"unsafe-act": {
				rc: "Behavioural – PPE protocol not followed.",
				ca: "Counsel personnel, re-train crew on PPE matrix, increase supervisor walk-downs."
			},
			environmental: {
				rc: "Containment integrity loss / abnormal process condition.",
				ca: "Repair containment, clean up to spec, review SOP, report to regulator if required."
			},
			injury: {
				rc: "Inadequate guarding / task lighting / tool selection.",
				ca: "Provide correct tool, install guard, re-train and verify competency."
			},
			incident: {
				rc: "Multiple contributing factors – full RCA required.",
				ca: "Convene RCA team, implement immediate barriers, track to closure."
			}
		};
		const s = map[report.type] ?? map["near-miss"];
		setRootCause(s.rc);
		setCorrective(s.ca);
		toast.success("AI suggestion populated – edit before saving.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1200px] space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => nav({ to: "/reports" }),
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to reports"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
														placeholder: "name@capsl.com",
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
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															type: "button",
															variant: "ghost",
															size: "sm",
															onClick: aiSuggest,
															className: "h-7 gap-1.5 text-xs font-semibold text-primary hover:bg-accent",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " AI suggest"]
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-bold text-success",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
										" Closed out on ",
										report.closedAt ? new Date(report.closedAt).toLocaleDateString() : "—",
										" by ",
										report.closedBy
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Root cause"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-foreground/90",
										children: report.rootCause
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Corrective action"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-foreground/90",
										children: report.correctiveAction
									})] })]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Type",
								value: TYPE_LABEL[report.type]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Assigned to",
								value: report.assignedTo ?? "Unassigned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Due",
								value: report.dueAt ? new Date(report.dueAt).toLocaleDateString() : "—",
								highlight: !!overdue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Reported",
								value: new Date(report.reportedAt).toLocaleDateString()
							}),
							report.closedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: "Closed",
								value: new Date(report.closedAt).toLocaleDateString()
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-base font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " Activity & comments"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-4",
						children: report.activity.slice().reverse().map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full brand-gradient text-[11px] font-bold text-white",
								children: initials(a.actor)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 rounded-xl border border-border bg-card p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: a.actor
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: new Date(a.at).toLocaleString()
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-foreground/90",
									children: a.message
								})]
							})]
						}, a.id))
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
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1.5 h-3.5 w-3.5" }), " Post"]
								})
							})]
						})]
					})] })
				]
			})
		]
	});
}
function DetailRow({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-secondary/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-1 text-sm font-semibold ${highlight ? "text-destructive" : "text-foreground"}`,
			children: value
		})]
	});
}
function initials(name) {
	return name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
//#endregion
export { ReportDetail as component };
