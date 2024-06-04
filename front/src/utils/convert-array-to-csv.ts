import {LINEBREAK} from 'src/constants';

export function convertArrayToCsv(
  content: string[],
  firstRow?: string,
): string {
  let csv = 'data:text/csv;charset=utf-8,';

  if (firstRow) {
    csv += firstRow;
    csv += LINEBREAK;
  }

  content.forEach((contentRow) => {
    csv += contentRow;
    csv += LINEBREAK;
  });

  return csv;
}
