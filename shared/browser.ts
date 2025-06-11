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

export function downloadJson<T>(data: T, filename = 'campaign.json'): void {
  try {
    const string = JSON.stringify(data, null, 2);
    const blob = new Blob([string], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON:', error);
  }
}
