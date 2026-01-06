import {stringifyJsonPretty} from '@shared/json';

export function isDarkModeEnabled() {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export async function copyToClipboard(message: string) {
  await navigator.clipboard.writeText(message);
}

export function getMouseCoordinatesFromCanvas(e: MouseEvent) {
  const target = e.target as HTMLCanvasElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return {
    x,
    y,
  };
}

export function downloadJson<T>(
  data: T,
  filename = 'data', // without extension
): void {
  try {
    const string = stringifyJsonPretty(data);
    const blob = new Blob([string], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON:', error);
  }
}
