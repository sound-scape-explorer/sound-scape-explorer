interface DownloadObjectAsJson {
  obj: unknown;
  fileName: string;
  callback: () => void;
}

export function downloadObjectAsJson({
  obj,
  fileName,
  callback,
}: DownloadObjectAsJson) {
  const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, undefined, 2));

  const anchor = document.createElement('a');
  anchor.href = data;
  anchor.download = `${fileName}.json`;
  anchor.click();
  anchor.remove();

  callback();
}
