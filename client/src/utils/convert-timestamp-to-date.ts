/**
 * Convert timestamp to date in format dd/mm/yyyy hh:mm:ss
 * @param timestamp
 */
export function convertTimestampToDate(timestamp: number): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(timestamp);
}
