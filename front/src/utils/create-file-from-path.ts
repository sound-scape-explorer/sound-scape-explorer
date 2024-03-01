export async function createFileFromPath(
  path: string,
  filename: string,
  mimeType: string,
) {
  const response = await fetch(path);
  const data = await response.blob();
  return new File([data], filename, {type: mimeType});
}
