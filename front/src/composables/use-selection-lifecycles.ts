import {useViewSelection} from 'src/composables/use-view-selection';
import {watch} from 'vue';

export function useSelectionLifecycles() {
  const {
    extraction,
    extractionSlug,
    slugToExtraction,
    band,
    bandSlug,
    slugToBand,
    integration,
    integrationSlug,
    slugToIntegration,
    reducer,
    reducerSlug,
    slugToReducer,
  } = useViewSelection();

  watch(extractionSlug, () => {
    if (extractionSlug.value === null) {
      return;
    }

    extraction.value = slugToExtraction(extractionSlug.value);
  });

  watch(bandSlug, () => {
    if (bandSlug.value === null) {
      return;
    }

    band.value = slugToBand(bandSlug.value);
  });

  watch(integrationSlug, () => {
    if (integrationSlug.value === null) {
      return;
    }

    integration.value = slugToIntegration(integrationSlug.value);
  });

  watch(reducerSlug, () => {
    if (reducerSlug.value === null) {
      return;
    }

    reducer.value = slugToReducer(reducerSlug.value);
  });
}
