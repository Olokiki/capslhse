import type { HseReport } from "./hse-store";
import { TYPE_LABEL } from "./hse-store";
import ExcelJS from "exceljs";

function fmt(d?: string) {
  if (!d) return "";

  const dt = new Date(d);

  return isNaN(dt.getTime())
    ? ""
    : dt.toISOString().replace("T", " ").slice(0, 19);
}

const CAPSL_LOGO_URL =
  "https://widqqskijkutckwgxskd.supabase.co/storage/v1/object/public/capsl-logo/CAPSL%20LOGO.jpeg";

export async function exportReportsToExcel(
  reports: HseReport[],
  filename = "hse-reports.xlsx",
) {
  try {
    // =========================================================
    // LOAD CAPSL EXCEL TEMPLATE
    // =========================================================

    const templateUrl =
      "/templates/CAPSL-HSE-Report-Template.xlsx";

    const response = await fetch(templateUrl);

    if (!response.ok) {
      throw new Error(
        `Could not load Excel template. HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const templateBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(templateBuffer);

    // =========================================================
    // REPORTS SHEET
    // =========================================================

    const reportsSheet = workbook.getWorksheet("Reports");

    if (!reportsSheet) {
      throw new Error(
        'The Excel template does not contain a sheet named "Reports".',
      );
    }

    // =========================================================
    // ADD CAPSL LOGO
    // =========================================================

    const logoResponse = await fetch(CAPSL_LOGO_URL);

    if (!logoResponse.ok) {
      throw new Error(
        `Could not load CAPSL logo. HTTP ${logoResponse.status}: ${logoResponse.statusText}`,
      );
    }

    const logoBuffer = await logoResponse.arrayBuffer();

    const logoId = workbook.addImage({
      buffer: logoBuffer,
      extension: "jpeg",
    });

    // Position the logo in the top-left corner.
    // Adjust width/height if necessary.
    reportsSheet.addImage(logoId, {
      tl: { col: 0, row: 0 },
      ext: { width: 90, height: 65 },
    });

    // =========================================================
    // REPORT HEADER
    // =========================================================

    const headerRowNumber = 5;
    const dataStartRow = 6;

    const headerRow = reportsSheet.getRow(headerRowNumber);

    const headerMap = new Map<string, number>();

    headerRow.eachCell((cell, columnNumber) => {
      const value = String(cell.value ?? "").trim();

      if (value) {
        headerMap.set(value, columnNumber);
      }
    });

    // =========================================================
    // DATA TO EXPORT
    // =========================================================

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
      "Due date": r.dueAt
        ? new Date(r.dueAt).toISOString().slice(0, 10)
        : "",
      "Root cause": r.rootCause ?? "",
      "Corrective action": r.correctiveAction ?? "",
      "Closed at (UTC)": fmt(r.closedAt),
      "Closed by": r.closedBy ?? "",
      "Activity count": r.activity.length,
    }));

    // =========================================================
    // CLEAR OLD REPORT DATA
    // =========================================================

    if (reportsSheet.rowCount >= dataStartRow) {
      reportsSheet.spliceRows(
        dataStartRow,
        reportsSheet.rowCount - dataStartRow + 1,
      );
    }

    // =========================================================
    // WRITE REPORT DATA
    // =========================================================

    rows.forEach((report, index) => {
      const rowNumber = dataStartRow + index;

      const row = reportsSheet.getRow(rowNumber);

      Object.entries(report).forEach(([key, value]) => {
        const columnNumber = headerMap.get(key);

        if (!columnNumber) return;

        row.getCell(columnNumber).value = value;
      });

      row.commit();
    });

    // =========================================================
    // ACTIVITY LOG SHEET
    // =========================================================

    const activitySheet = workbook.getWorksheet("Activity Log");

    if (!activitySheet) {
      throw new Error(
        'The Excel template does not contain a sheet named "Activity Log".',
      );
    }

    const activityHeaderRowNumber = 5;
    const activityDataStartRow = 6;

    const activityHeaderRow = activitySheet.getRow(
      activityHeaderRowNumber,
    );

    const activityHeaderMap = new Map<string, number>();

    activityHeaderRow.eachCell((cell, columnNumber) => {
      const value = String(cell.value ?? "").trim();

      if (value) {
        activityHeaderMap.set(value, columnNumber);
      }
    });

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

    // =========================================================
    // CLEAR OLD ACTIVITY DATA
    // =========================================================

    if (activitySheet.rowCount >= activityDataStartRow) {
      activitySheet.spliceRows(
        activityDataStartRow,
        activitySheet.rowCount - activityDataStartRow + 1,
      );
    }

    // =========================================================
    // WRITE ACTIVITY DATA
    // =========================================================

    activityRows.forEach((activity, index) => {
      const rowNumber = activityDataStartRow + index;

      const row = activitySheet.getRow(rowNumber);

      Object.entries(activity).forEach(([key, value]) => {
        const columnNumber = activityHeaderMap.get(key);

        if (!columnNumber) return;

        row.getCell(columnNumber).value = value;
      });

      row.commit();
    });

    // =========================================================
    // GENERATE EXCEL FILE
    // =========================================================

    const outputBuffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([outputBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("=================================");
    console.error("CAPSL EXCEL EXPORT FAILED");
    console.error("=================================");
    console.error(error);

    throw error;
  }
}