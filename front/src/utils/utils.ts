export function getInfiniteRange(from: number | null, to: number | null) {
  const bottom = from ?? -Infinity;
  const top = to ?? Infinity;

  return {
    bottom,
    top,
  };
}

export function getInfiniteRangeFromStrings(from: string, to: string) {
  const bottom = from === '' ? -Infinity : Number(from);
  const top = to === '' ? Infinity : Number(to);

  return {
    bottom,
    top,
  };
}
