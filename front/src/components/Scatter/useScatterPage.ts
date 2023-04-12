import {onUnmounted} from 'vue';
import {RENDERING_DELAY_SLOW} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import {generateScatterDataset} from '../../utils/generate-scatter-dataset';
import {loadingStore} from '../Loading/loadingStore';
import {selectionStore} from '../Selection/selectionStore';
import {useSelection} from '../Selection/useSelection';
import {scatterDatasetStore} from './scatterDatasetStore';

export function useScatterPage() {
  const {clearSelection} = useSelection();

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

  async function fetchData(
    reducer: number,
    band: string,
    integration: string,
  ) {
    const {
      getFiles,
      getReducedFeatures,
      getGroupedTimestamps,
      getFilesMetas,
      getAutocluster,
    } = await useStorage();

    try {
      const features = await getReducedFeatures(reducer, band, integration);
      const files = await getFiles();
      const timestamps = await getGroupedTimestamps(band, integration);
      const metas = await getFilesMetas();
      const autocluster = await getAutocluster(band, integration);

      scatterDatasetStore.dataset = generateScatterDataset({
        features: features,
        files: files,
        timestamps: timestamps.flat(),
        metas: metas,
        autocluster: autocluster.flat(),
      });

      console.log(scatterDatasetStore.dataset);
    } catch {
      scatterDatasetStore.dataset = null;
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
      return;
    }

    setSelection(reducer, band, integration);
    await fetchData(reducer, band, integration);

    callback();
  }

  function delayUpdate(reducer: number, band: string, integration: string) {
    loadingStore.isLoading = true;

    setTimeout(async () => {
      await handleUpdate({
        reducer: reducer,
        band: band,
        integration: integration,
        callback: () => loadingStore.isLoading = false,
      });
    }, RENDERING_DELAY_SLOW);
  }

  onUnmounted(clearSelection);

  return {
    delayUpdate: delayUpdate,
  };
}
