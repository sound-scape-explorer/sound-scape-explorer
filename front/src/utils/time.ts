export function printPrettySeconds(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
  }

  return parts.join(' ');
}

export function getDayOfYear(timestamp: number): number {
  const startOfYear = Date.UTC(new Date(timestamp).getFullYear(), 0, 0);
  const differenceInMilliseconds = timestamp - startOfYear;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(differenceInMilliseconds / millisecondsPerDay);
  return dayOfYear;
}

export function isHourDuringDay(hour: number): boolean {
  return Math.abs(12 - hour) < 6;
}
