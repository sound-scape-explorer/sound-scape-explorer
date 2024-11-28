export function sortAlphabetically<T extends string>(strings: T[]) {
  return strings.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}
