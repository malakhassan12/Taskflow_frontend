const MS_PER_SEC = 1000;
/** Ignore .NET default / corrupt dates (e.g. 0001-01-01 → "739000+ days ago"). */
const MIN_SENSIBLE_MS = Date.UTC(2000, 0, 1);
const MAX_REASONABLE_AGE_SEC = 86400 * 365 * 10;

/**
 * @param {unknown} value
 * @returns {number | null} epoch ms, or null if unusable
 */
export function getNotificationTimestampMs(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    const ms = value < 1e12 ? value * MS_PER_SEC : value;
    if (!Number.isFinite(ms) || ms < MIN_SENSIBLE_MS) return null;
    return ms;
  }
  const ms = new Date(value).getTime();
  if (!Number.isFinite(ms) || ms < MIN_SENSIBLE_MS) return null;
  return ms;
}

/**
 * @param {unknown} createdAt raw from API or normalized ms
 * @returns {string}
 */
export function formatNotificationRelative(createdAt) {
  const ts = getNotificationTimestampMs(createdAt);
  if (ts == null) return "Recently";
  const diffSec = Math.floor((Date.now() - ts) / MS_PER_SEC);
  if (diffSec < 0 || diffSec > MAX_REASONABLE_AGE_SEC) return "Recently";
  const s = Math.max(1, diffSec);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  return `${Math.floor(s / 86400)} days ago`;
}
