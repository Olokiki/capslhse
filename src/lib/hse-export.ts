import * as XLSX from "xlsx";
import type { HseReport } from "./hse-store";
import { TYPE_LABEL } from "./hse-store";

function fmt(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? "" : dt.toISOString().replace("T", " ").slice(0, 19);
}

export function exportReportsToExcel(reports: HseReport[], filename = "hse-reports.xlsx") {
  const rows = reports.map((r) => ({
    Ref: r.ref,
    Title: r.title,
    Description: r.description,
    Type: TYPE_LABEL[r.type] ?? r.type,
    Severity: r.severity,
    Status: r.status,
    Location: r.location,
    Asset: r.asset ?? "",
    "Reported by": r.reportedBy,
    "Reported at (UTC)": fmt(r.reportedAt),
    "Assigned to": r.assignedTo ?? "",
    "Assignee email": r.assignedEmail ?? "",
    "Due date": r.dueAt ? new Date(r.dueAt).toISOString().slice(0, 10) : "",
    "Root cause": r.rootCause ?? "",
    "Corrective action": r.correctiveAction ?? "",
    "Closed at (UTC)": fmt(r.closedAt),
    "Closed by": r.closedBy ?? "",
    "Activity count": r.activity.length,
  }));

  const activityRows = reports.flatMap((r) =>
    r.activity.map((a) => ({
      "Report Ref": r.ref,
      "Report Title": r.title,
      "At (UTC)": fmt(a.at),
      Actor: a.actor,
      Kind: a.kind,
      Message: a.message,
    })),
  );

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 14 }, { wch: 40 }, { wch: 60 }, { wch: 18 }, { wch: 10 },
    { wch: 12 }, { wch: 34 }, { wch: 22 }, { wch: 28 }, { wch: 20 },
    { wch: 28 }, { wch: 26 }, { wch: 12 }, { wch: 40 }, { wch: 40 },
    { wch: 20 }, { wch: 20 }, { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, "Reports");

  const wsA = XLSX.utils.json_to_sheet(activityRows);
  wsA["!cols"] = [{ wch: 14 }, { wch: 40 }, { wch: 20 }, { wch: 28 }, { wch: 12 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsA, "Activity Log");

  XLSX.writeFile(wb, filename);
}
