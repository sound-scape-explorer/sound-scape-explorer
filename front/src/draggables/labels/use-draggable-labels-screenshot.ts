import html2canvas from 'html2canvas';
import {useDraggables} from 'src/composables/use-draggables';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';

export function useDraggableLabelsScreenshot() {
  const {open} = useDraggables();

  const screenshotLabel = async (): Promise<HTMLCanvasElement | null> => {
    return new Promise((resolve) => {
      const target = document.getElementById(CURRENT_SCATTER_LEGEND_ID);
      if (target === null) {
        return resolve(null);
      }

      const parent = target.parentElement;
      if (parent === null) {
        return resolve(null);
      }

      open('labels');

      setTimeout(async () => {
        const canvas = await html2canvas(parent);
        return resolve(canvas);
      }, 200);
    });
  };

  return {
    screenshotLabel: screenshotLabel,
  };
}
