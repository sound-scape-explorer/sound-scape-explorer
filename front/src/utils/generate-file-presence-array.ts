type Presence = 'true' | 'false';
export function generateFilePresenceArray(
  length: number,
  selectedIndex: number[],
): Presence[] {
  let table: Presence[] = [];

  for (let i = 0; i < length; i += 1) {
    if (selectedIndex.indexOf(i) === -1) {
      table = [...table, 'false'];
      continue;
    }

    table = [...table, 'true'];
  }

  return table;
}
