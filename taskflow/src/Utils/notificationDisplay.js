/**
 * Row title for notifications list (backend often omits Title → "Notification").
 * @param {{ title?: string; message?: string }} item
 * @returns {string}
 */
export function notificationHeadline(item) {
  const rawTitle = String(item?.title ?? "").trim();
  const msg = String(item?.message ?? "").trim();
  if (rawTitle && rawTitle.toLowerCase() !== "notification") {
    return rawTitle;
  }
  const lower = msg.toLowerCase();
  if (lower.includes("has accepted task")) return "Task accepted";
  if (lower.includes("has rejected task")) return "Task rejected";
  if (lower.includes("task status updated")) return "Task progress";
  return rawTitle || msg.slice(0, 80) || "Notification";
}
