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
