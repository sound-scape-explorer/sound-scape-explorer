export function constrainValue(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}
