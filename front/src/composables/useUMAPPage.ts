import {ref} from 'vue';
import {API_ROUTES} from '../constants';
import {selectionStore} from '../store/selection.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {
  convertToScatterGlDataset,
} from '../utils/convert-to-scatter-gl-dataset';

export function useUMAPPage() {
  const image = ref<string | null>();

  function resetImage() {
    image.value = null;
  }

  function setImage(band: string, intervalLabel: string) {
    image.value = API_ROUTES.umap({
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

  async function handleUpdate(band: string, intervalLabel: string) {
    if (!band || !intervalLabel) {
      resetSelection();
      resetImage();
      return;
    }

    setSelection(band, intervalLabel);
    setImage(band, intervalLabel);
    await fetchData(band, intervalLabel);
  }

  return {
    image,
    handleUpdate,
  };
}
