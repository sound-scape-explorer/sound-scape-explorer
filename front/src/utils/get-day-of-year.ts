export function getDayOfYear(timestamp: number): number {
  const startOfYear = Date.UTC(new Date(timestamp).getFullYear(), 0, 0);
  const differenceInMilliseconds = timestamp - startOfYear;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(differenceInMilliseconds / millisecondsPerDay);
  return dayOfYear;
}
