export function getInfiniteRange(from: number | null, to: number | null) {
  const bottom = from === null ? -Infinity : from;
  const top = to === null ? Infinity : to;

  return {
    bottom: bottom,
    top: top,
  };
}
