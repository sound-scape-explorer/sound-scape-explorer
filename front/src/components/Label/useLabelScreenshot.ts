import html2canvas from 'html2canvas';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';

import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';

export function useLabelScreenshot() {
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

      appDraggablesStore.labels = true;
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
