import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {generateUniqueExtractorSlug} from 'src/utils/config';
import {computed} from 'vue';

export function useIndicators() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();

  const names = computed(() => {
    if (aggregatedIndicators.value === null) {
      return null;
    }

    return aggregatedIndicators.value.map(({extractor}) =>
      generateUniqueExtractorSlug(extractor),
    );
  });

  return {
    names: names,
  };
}
