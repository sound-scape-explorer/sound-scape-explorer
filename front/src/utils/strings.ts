export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function combineStringsWithBreaks(strings: string[]): string {
  return strings.join('\n');
}

export function sortStringsNumerically(array: string[]) {
  return array.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
}
