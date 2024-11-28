import {removeEmptyStringsFromEnd} from 'src/utils/array.ts';

export function parseClipboard(clipboard: string) {
  let rows = clipboard.split('\n');
  rows = removeEmptyStringsFromEnd(rows);

  const payload: string[][] = [];

  for (const r in rows) {
    const row = rows[r];
    const cols = row.split('\t');

    for (const c in cols) {
      if (!payload[c]) {
        payload[c] = [];
      }

      const col = cols[c];
      payload[c][r] = col.trim();
    }
  }

  return payload;
}
