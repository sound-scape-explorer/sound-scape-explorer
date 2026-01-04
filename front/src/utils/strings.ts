export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function joinStringsWithBreaks(strings: string[]): string {
  return strings.join('\n');
}

export function sortStringsNumerically(array: string[]) {
  return array.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
}

export function areStringsDigitizable(strings: string[]): boolean {
  for (const s of strings) {
    if (isNaN(Number(s))) {
      return false;
    }
  }

  return true;
}
