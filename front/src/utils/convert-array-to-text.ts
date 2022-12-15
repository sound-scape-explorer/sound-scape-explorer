export function convertArrayToText(array: string[]): string {
  let content = 'data:text/plain;charset=utf-8,';
  content += array.join('\n');
  return content;
}
