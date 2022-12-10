import {convertArrayToCsvRow} from './convert-array-to-csv-row';

export function convertArrayToCsv(array: string[][], firstRow?: string[]): string {
  let content = 'data:text/csv;charset=utf-8,';

  if (firstRow) {
    content += convertArrayToCsvRow(firstRow);
  }

  array.forEach((row) => {
    content += convertArrayToCsvRow(row);
  });

  return content;
}
