export function convertSlugsToColorTypes(columns: string[]): string[] {
  return columns.map((column) => 'by' + column);
}
