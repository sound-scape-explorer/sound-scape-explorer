export function convertArrayToCsvRow(row: string[]): string {
  return row.join(',') + '\r\n';
}
