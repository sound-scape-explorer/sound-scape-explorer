import html2canvas from 'html2canvas';
import {settingsStore} from '../store/settings.store';
import {UMAPScatterStore} from '../store/UMAP-scatter.store';

export function useUMAPScreenshot() {
  async function screenshot() {
    if (!UMAPScatterStore.ref) {
      return;
    }

    let targetElement: HTMLElement = UMAPScatterStore.ref;

    if (settingsStore.umap.screenshot.isFull) {
      targetElement = document.body;
    }

    const canvas = await html2canvas(targetElement);

    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    const image = canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const anchor = document.createElement('a');
    anchor.download = 'SSE_UMAP.png';
    anchor.href = image;

    anchor.click();
    canvas.remove();
  }

  return {
    screenshot,
  };
}
