export function triggerBrowserDownload(
  data: string | Blob,
  filename: string,
  callback?: () => void,
) {
  const anchor = document.createElement('a');

  if (typeof data === 'string') {
    anchor.href = data;
  } else if (data instanceof Blob) {
    anchor.href = URL.createObjectURL(data);
  } else {
    throw new Error('Data not recognized.');
  }

  anchor.download = filename;
  anchor.click();
  anchor.remove();

  if (callback) {
    callback();
  }
}
