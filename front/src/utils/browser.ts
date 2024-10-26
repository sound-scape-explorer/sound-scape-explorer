export async function copyToClipboard(message: string) {
  await navigator.clipboard.writeText(message);
}

export async function createFileFromPath(
  path: string,
  filename: string,
  mimeType: string,
) {
  const response = await fetch(path);
  const data = await response.blob();
  return new File([data], filename, {type: mimeType});
}
