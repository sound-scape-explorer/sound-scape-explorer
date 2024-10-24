export function createIndicesArray(length: number) {
  const array = new Array(length);

  for (let i = 0; i < length; i += 1) {
    array[i] = i;
  }

  return array;
}
