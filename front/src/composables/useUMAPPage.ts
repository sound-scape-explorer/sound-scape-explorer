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
    selectionStore.band = null;
    selectionStore.umapName = null;
  }

  function setSelection(band: string, intervalLabel: string) {
    selectionStore.band = band;
    selectionStore.umapName = intervalLabel;
  }

  async function fetchData(band: string, umapName: string) {
    const {
      getStorageUmapsFeatures,
      getFiles,
      getGroupTimestamps,
      getStorageFilesTags,
      getStorageFilesMetas,
    } = await useStorage();

    try {
      const features = await getStorageUmapsFeatures(band, umapName);
      const files = await getFiles();
      const timestamps = await getGroupTimestamps(band, umapName);
      const tags = await getStorageFilesTags();
      const metas = await getStorageFilesMetas();

      UMAPDatasetStore.dataset = convertToScatterGlDataset({
        features,
        integration: 15,
        files,
        timestamps: timestamps.flat(),
        tags,
        metas,
      });
    }
    catch {
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
