import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {computed} from 'vue';

export function useViewState() {
  const {extraction, band, integration, reducer} = useViewSelectionNew();

  // TODO: maybe extract this computed
  const hasView = computed<boolean>(
    () =>
      extraction.value !== null &&
      band.value !== null &&
      integration.value !== null &&
      reducer.value !== null,
  );

  return {
    hasView,
  };
}
