export function triggerCSVDownload(data: string, filename: string) {
  const anchor = document.createElement('a');
  anchor.href = data;
  anchor.download = filename;
  anchor.click();
  anchor.remove();
}
