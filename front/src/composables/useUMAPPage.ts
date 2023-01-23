import {onUnmounted} from 'vue';
import {API_ROUTES, RENDERING_DELAY_SLOW} from '../constants';
import {modalLoadingStore} from '../store/modal-loading.store';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {
  convertToScatterGlDataset,
} from '../utils/convert-to-scatter-gl-dataset';
import {useAPI} from './useAPI';
import {useSelection} from './useSelection';

export function useUMAPPage() {
  const {clearSelection} = useSelection();
  const {fetchUMAP} = useAPI();

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
      const data = await fetchUMAP(intervalLabel, band);

      if (!data) {
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

  function delayUpdate(band: string, interval: string) {
    modalLoadingStore.isLoading = true;

    setTimeout(async () => {
      await handleUpdate({
        band,
        interval,
        callback: () => modalLoadingStore.isLoading = false,
      });
    }, RENDERING_DELAY_SLOW);
  }

  onUnmounted(clearSelection);

  return {
    delayUpdate,
  };
}
