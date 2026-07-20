/**
 * Format a date string or Date object to a human-readable relative time.
 */
export function timeAgo(date) {
  if (!date) return "";
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return then.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: then.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Format bytes to human-readable string.
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Return a short display name from a MIME type or file name extension.
 */
export function getFileTypeLabel(fileType, fileName) {
  if (!fileType && !fileName) return "File";
  const name = fileName?.toLowerCase() || "";
  if (fileType?.includes("pdf") || name.endsWith(".pdf")) return "PDF";
  if (fileType?.includes("word") || name.endsWith(".docx")) return "DOCX";
  if (fileType?.includes("text") || name.endsWith(".txt")) return "TXT";
  if (fileType?.includes("image") || /\.(png|jpg|jpeg)$/.test(name)) return "Image";
  return "File";
}

/**
 * Truncate a string to a max length, appending ellipsis.
 */
export function truncate(str, max = 60) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "…" : str;
}
