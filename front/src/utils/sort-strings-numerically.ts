export function sortStringsNumerically(array: string[]) {
  return array.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
}
