export function buildNestedArrayFromLengths<T>(
  flatArray: T[],
  lengths: number[],
) {
  const nestedArray: T[][] = [];

  lengths.forEach((length) => {
    for (let l = 0; l < flatArray.length; l += length) {
      nestedArray.push(flatArray.slice(l, l + length));
    }
  });

  return nestedArray;
}
