import format from "date-fns/format";

export function toLongDateString(date: Date): string {
  return format(date, "do MMMM yyyy");
}