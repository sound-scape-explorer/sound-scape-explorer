import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {buildUniqueIndicatorIdentifier} from 'src/utils/build-unique-indicator-identifier';
import {computed} from 'vue';

export function useIndicators() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();

  const names = computed(() => {
    if (aggregatedIndicators.value === null) {
      return null;
    }

    return aggregatedIndicators.value.map(buildUniqueIndicatorIdentifier);
  });

  return {
    names: names,
  };
}
