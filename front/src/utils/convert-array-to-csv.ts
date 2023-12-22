export function convertArrayToCsv(
  content: string[],
  firstRow?: string,
): string {
  let csv = 'data:text/csv;charset=utf-8,';
  const lineBreak = '%0D%0A';

  if (firstRow) {
    csv += firstRow;
    csv += lineBreak;
  }

  content.forEach((contentRow) => {
    csv += contentRow;
    csv += lineBreak;
  });

  return csv;
}
