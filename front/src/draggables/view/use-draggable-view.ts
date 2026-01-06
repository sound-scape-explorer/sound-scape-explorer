import {useClientSettings} from 'src/composables/use-client-settings';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useViewState} from 'src/composables/use-view-state';
import {TIMEOUT} from 'src/constants';

let isLooping = true;

export function useDraggableView() {
  const {devAutoLoadView} = useClientSettings();
  const {hasView} = useViewState();
  const {
    extractions,
    extraction,
    band,
    integration,
    reducer,
    extractionSlug,
    bandSlug,
    integrationSlug,
    reducerSlug,
    extractionToSlug,
    bandToSlug,
    integrationToSlug,
    reducerToSlug,
  } = useViewSelection();

  const autoselectDev = () => {
    if (!devAutoLoadView.value || !isLooping) {
      isLooping = false;
      return;
    }

    extraction.value = extractions[0];
    band.value = extraction.value.bands[0];
    integration.value = extraction.value.integrations[0];
    reducer.value = extraction.value.reducers[0];

    extractionSlug.value = extractionToSlug(extraction.value);
    bandSlug.value = bandToSlug(band.value);
    integrationSlug.value = integrationToSlug(integration.value);
    reducerSlug.value = reducerToSlug(reducer.value);

    isLooping = false;

    if (!hasView.value) {
      setTimeout(autoselectDev, TIMEOUT);
    }
  };

  return {
    autoselectDev,
  };
}
