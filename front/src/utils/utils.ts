// todo: useful?
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

export function getSortedIndices(numbers: number[]) {
  const indices = Array.from({length: numbers.length}, (_, i) => i);
  indices.sort((a, b) => numbers[a] - numbers[b]);
  return indices;
}
