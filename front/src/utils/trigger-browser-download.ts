interface DownloadObjectAsJson {
  data: string;
  filename: string;
  callback?: () => void;
}

export function triggerBrowserDownload({
  data,
  filename,
  callback,
}: DownloadObjectAsJson) {
  const anchor = document.createElement('a');
  anchor.href = encodeURI(data);
  anchor.download = filename;
  anchor.click();
  anchor.remove();

  if (callback) {
    callback();
  }
}
