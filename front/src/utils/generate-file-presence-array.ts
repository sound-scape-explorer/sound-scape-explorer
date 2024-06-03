export function generateFilePresenceArray(
  length: number,
  selectedIndex: number[],
) {
  let table: string[] = [];

  for (let i = 0; i < length; i += 1) {
    if (selectedIndex.indexOf(i) === -1) {
      table = [...table, 'false'];
      continue;
    }

    table = [...table, 'true'];
  }

  return table;
}
