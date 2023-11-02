export function triggerCanvasDownload(
  canvas: HTMLCanvasElement,
  name: string,
): void {
  canvas.style.display = 'none';
  document.body.appendChild(canvas);

  const image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  const anchor = document.createElement('a');
  anchor.download = `${name}.png`;
  anchor.href = image;
  anchor.click();
  canvas.remove();
}
