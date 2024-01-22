export function countIterations(
  min: number,
  max: number,
  iterator: number,
): number {
  const range = max - min + 1;
  const iterations = Math.floor(range / iterator);
  const remaining = range % iterator;
  return iterations + (remaining > 0 ? 1 : 0);
}
