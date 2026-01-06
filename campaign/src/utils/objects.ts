export function filterOutKey<T extends Record<string, unknown>>(
  obj: T,
  keyToRemove: string,
): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key !== keyToRemove),
  ) as T;
}

export function invertRowsAndColumns<T>(
  obj: Record<string, T[]>,
): Record<string, T>[] {
  const keys = Object.keys(obj);
  const maxLength = Math.max(...keys.map((key) => obj[key].length));
  const inverted: Record<string, T>[] = [];

  for (let i = 0; i < maxLength; i++) {
    const row: Record<string, T> = {};

    for (const key of keys) {
      if (i < obj[key].length) {
        row[key] = obj[key][i];
      }
    }

    inverted.push(row);
  }

  return inverted;
}
