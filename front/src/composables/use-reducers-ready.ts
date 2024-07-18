import {useBands} from 'src/composables/use-bands';
import {useExtractors} from 'src/composables/use-extractors';
import {useIntegrations} from 'src/composables/use-integrations';
import {computed} from 'vue';

export function useReducersReady() {
  const {bands} = useBands();
  const {integrations} = useIntegrations();
  const {nnExtractors} = useExtractors();

  const isReady = computed<boolean>(
    () =>
      bands.value !== null &&
      integrations.value !== null &&
      nnExtractors.value !== null,
  );

  return {
    isReady: isReady,
  };
}
