export function triggerWavDownload(data: Blob, filename: string) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(data);
  anchor.download = filename;
  anchor.click();
  anchor.remove();
}
