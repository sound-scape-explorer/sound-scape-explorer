export function getInfiniteRange(from: number | null, to: number | null) {
  const bottom = from ?? -Infinity;
  const top = to ?? Infinity;

  return {
    bottom: bottom,
    top: top,
  };
}
