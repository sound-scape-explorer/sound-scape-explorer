import {useBandOptions} from 'src/composables/use-band-options';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useViewState} from 'src/composables/use-view-state';
import {TIMEOUT} from 'src/constants';

let isLooping = true;

export function useDraggableView() {
  const {devAutoLoadView} = useClientSettings();
  const {hasView} = useViewState();

  const {options: reducerOptions} = useReducerOptions();
  const {options: bandOptions} = useBandOptions();
  const {options: integrationOptions} = useIntegrationOptions();
  const {options: extractorOptions} = useExtractorOptions();

  const {selected: reducerSelected} = useReducerSelection();
  const {selected: bandSelected} = useBandSelection();
  const {selected: integrationSelected} = useIntegrationSelection();
  const {selected: extractorSelected} = useExtractorSelection();

  const autoselectDev = () => {
    if (!devAutoLoadView.value || !isLooping) {
      isLooping = false;
      return;
    }

    if (reducerOptions.value.length !== 0) {
      const umap3d =
        reducerOptions.value.filter((rO) => rO.includes('umap (3d'))[0] ?? null;
      reducerSelected.value = umap3d ?? reducerOptions.value[0];
    }

    if (bandOptions.value.length !== 0) {
      bandSelected.value = bandOptions.value[0];
    }

    if (integrationOptions.value.length !== 0) {
      integrationSelected.value = integrationOptions.value[0];
    }

    if (extractorOptions.value.length !== 0) {
      extractorSelected.value = extractorOptions.value[0];
    }

    if (!hasView.value) {
      setTimeout(autoselectDev, TIMEOUT);
    }
  };

  return {
    autoselectDev: autoselectDev,
  };
}
