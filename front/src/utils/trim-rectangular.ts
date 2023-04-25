export function trimRectangular<T>(
  array: T[][],
  filterWith: string | number | null = null,
): T[][] {
  const isNanStrategy =
    typeof filterWith === 'number' && Number.isNaN(filterWith);

  const trimmedArray = [];

  for (const sublist of array) {
    const trimmedSublist = sublist.filter((element) => {
      if (isNanStrategy) {
        return !Number.isNaN(element);
      }

      return element !== filterWith;
    });
    trimmedArray.push(trimmedSublist);
  }

  return trimmedArray;
}
