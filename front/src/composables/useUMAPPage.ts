import {API_ROUTES} from '../constants';
import {selectionStore} from '../store/selection.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {
  convertToScatterGlDataset,
} from '../utils/convert-to-scatter-gl-dataset';
import {selectionImageStore} from '../store/selection-image.store';

export function useUMAPPage() {
  function resetImage() {
    selectionImageStore.image = null;
  }

  function setImage(band: string, intervalLabel: string) {
    selectionImageStore.image = API_ROUTES.umap({
      interval: intervalLabel,
      band,
      isImage: true,
    });
  }

  function resetSelection() {
    selectionStore.activeBand = null;
    selectionStore.activeIntervalLabel = null;
  }

  function setSelection(band: string, intervalLabel: string) {
    selectionStore.activeBand = band;
    selectionStore.activeIntervalLabel = intervalLabel;
  }

  async function fetchData(band: string, intervalLabel: string) {
    try {
      const endpoint = API_ROUTES.umap({
        interval: intervalLabel,
        band,
      });

      const request = await fetch(endpoint);
      const data = await request.json();

      if (data === null) {
        return;
      }

      UMAPDatasetStore.dataset = convertToScatterGlDataset(data);
    } catch {
      // options.value.series = [];
      UMAPDatasetStore.dataset = null;
    }
  }

  interface HandleUpdateProps {
    band: string;
    interval: string;
    callback: () => void;
  }

  async function handleUpdate({band, interval, callback}: HandleUpdateProps) {
    if (!band || !interval) {
      resetSelection();
      resetImage();
      return;
    }

    setSelection(band, interval);
    setImage(band, interval);
    await fetchData(band, interval);

    callback();
  }

  return {
    handleUpdate,
  };
}
