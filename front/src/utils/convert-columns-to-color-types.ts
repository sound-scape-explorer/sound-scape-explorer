export function convertColumnsToColorTypes(columns: string[]): string[] {
  return columns.map((column) => 'by' + column);
}
