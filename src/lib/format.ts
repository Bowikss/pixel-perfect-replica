export function formatDateEU(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function formatDayMonth(month: number, day: number): string {
  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}`;
}

export function formatEur(cents: number): string {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
}

/** Next occurrence (this year or next) of a day/month, ignoring the year. */
export function nextOccurrence(month: number, day: number, from = new Date()): Date {
  const base = new Date(from.getFullYear(), month - 1, day);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (base < today) base.setFullYear(base.getFullYear() + 1);
  return base;
}

export function daysUntil(date: Date, from = new Date()): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}
