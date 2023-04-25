import {onUnmounted} from 'vue';
import {RENDERING_DELAY_SLOW} from '../../constants';
import {loadingStore} from '../Loading/loadingStore';
import {selectionStore} from '../Selection/selectionStore';
import {useSelection} from '../Selection/useSelection';

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

  interface HandleUpdateProps {
    reducer: number;
    band: string;
    integration: string;
  }

  async function handleUpdate({reducer, band, integration}: HandleUpdateProps) {
    if (reducer === null || band === null || integration === null) {
      resetSelection();
      return;
    }

    setSelection(reducer, band, integration);
  }

  async function delayUpdate(
    reducer: number,
    band: string,
    integration: string,
  ) {
    loadingStore.isLoading = true;

    setTimeout(async () => {
      await handleUpdate({
        reducer: reducer,
        band: band,
        integration: integration,
      });
    }, RENDERING_DELAY_SLOW);
  }

  onUnmounted(clearSelection);

  return {
    delayUpdate: delayUpdate,
  };
}
