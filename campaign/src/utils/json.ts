export function readJson(
  file: File,
  callback: (e: ProgressEvent<FileReader>) => void,
) {
  const reader = new FileReader();
  reader.onload = (e) => callback(e);
  reader.readAsText(file);
}
