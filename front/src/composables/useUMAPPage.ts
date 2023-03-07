import {onUnmounted} from 'vue';
import {RENDERING_DELAY_SLOW} from '../constants';
import {modalLoadingStore} from '../store/modal-loading.store';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {
  convertToScatterGlDataset,
} from '../utils/convert-to-scatter-gl-dataset';
import {useSelection} from './useSelection';
import {useStorage} from './useStorage';

export function useUMAPPage() {
  const {clearSelection} = useSelection();

  function resetImage() {
    selectionImageStore.image = null;
  }

  function resetSelection() {
    selectionStore.reducer = null;
    selectionStore.band = null;
    selectionStore.integration = null;
  }

  function setSelection(reducer: number, band: string, integration: string) {
    selectionStore.reducer = reducer;
    selectionStore.band = band;
    selectionStore.integration = integration;
  }

  async function fetchData(reducer: number, band: string, integration: string) {
    const {
      getFiles,
      getReducedFeatures,
      getGroupedTimestamps,
      getFilesMetas,
    } = await useStorage();

    try {
      const features = await getReducedFeatures(reducer, band, integration);
      const files = await getFiles();
      const timestamps = await getGroupedTimestamps(band, integration);
      const metas = await getFilesMetas();

      UMAPDatasetStore.dataset = convertToScatterGlDataset({
        features,
        files,
        timestamps: timestamps.flat(),
        metas,
      });
    } catch {
      UMAPDatasetStore.dataset = null;
    }
  }

  interface HandleUpdateProps {
    reducer: number;
    band: string;
    integration: string;
    callback: () => void;
  }

  async function handleUpdate({
    reducer,
    band,
    integration,
    callback,
  }: HandleUpdateProps) {
    if (
      reducer === null
      || band === null
      || integration === null
    ) {
      resetSelection();
      resetImage();
      return;
    }

    setSelection(reducer, band, integration);
    await fetchData(reducer, band, integration);

    callback();
  }

  function delayUpdate(reducer: number, band: string, integration: string) {
    modalLoadingStore.isLoading = true;

    setTimeout(async () => {
      await handleUpdate({
        reducer,
        band,
        integration,
        callback: () => modalLoadingStore.isLoading = false,
      });
    }, RENDERING_DELAY_SLOW);
  }

  onUnmounted(clearSelection);

  return {
    delayUpdate,
  };
}
