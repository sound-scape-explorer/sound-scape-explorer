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

export function getMouseCoordinatesFromCanvas(e: MouseEvent) {
  const target = e.target as HTMLCanvasElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return {
    x: x,
    y: y,
  };
}
