export function buildNestedArray<T>(
  flatArray: T[],
  length: number,
) {
  const nestedArray: T[][] = [];

  for (let i = 0; i < flatArray.length; i += length) {
    nestedArray.push(flatArray.slice(i, i + length));
  }

  return nestedArray;
}
