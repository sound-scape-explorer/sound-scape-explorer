export function isHourDuringDay(hour: number): boolean {
  return Math.abs(12 - hour) < 6;
}
