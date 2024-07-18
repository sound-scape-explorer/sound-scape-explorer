import {useBandStorage} from 'src/composables/use-band-storage';
import {useExtractorStorage} from 'src/composables/use-extractor-storage';
import {useIntegrationStorage} from 'src/composables/use-integration-storage';
import {computed} from 'vue';

export function useStorageReducersReady() {
  const {bands} = useBandStorage();
  const {integrations} = useIntegrationStorage();
  const {nnExtractors} = useExtractorStorage();

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
