/** Format a date for display, e.g. "October 8, 2026". */
export function formatDate(date: Date, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
}
