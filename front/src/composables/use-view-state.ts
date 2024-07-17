import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {computed} from 'vue';

export function useViewState() {
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useExtractorSelection();
  const {reducer} = useReducerSelection();

  const hasView = computed<boolean>(
    () =>
      band.value !== null &&
      integration.value !== null &&
      extractor.value !== null &&
      reducer.value !== null,
  );

  return {
    hasView: hasView,
  };
}
