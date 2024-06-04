import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {computed} from 'vue';

export function useViewState() {
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useSelectExtractor();
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
