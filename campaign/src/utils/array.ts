export function removeEmptyStringsFromEnd<T>(arr: T[]) {
  if (arr.length === 0 || arr[arr.length - 1] !== '') {
    return arr;
  }

  return removeEmptyStringsFromEnd(arr.slice(0, -1));
}
