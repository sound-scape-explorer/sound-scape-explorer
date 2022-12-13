import {API_ROUTES} from '../constants';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {
  convertToScatterGlDataset,
} from '../utils/convert-to-scatter-gl-dataset';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';

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
    selectionStore.band = null;
    selectionStore.interval = null;
  }

  function setSelection(band: string, intervalLabel: string) {
    selectionStore.band = band;
    selectionStore.interval = intervalLabel;
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
