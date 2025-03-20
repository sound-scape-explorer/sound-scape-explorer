import {useStorageAggregatedIndices} from 'src/composables/use-storage-aggregated-indices';
import {generateUniqueIndexSlug} from 'src/utils/config';
import {computed} from 'vue';

export function useIndicators() {
  const {aggregatedIndices} = useStorageAggregatedIndices();

  const names = computed(() => {
    if (aggregatedIndices.value === null) {
      return null;
    }

    return aggregatedIndices.value.map(({index}) =>
      generateUniqueIndexSlug(index),
    );
  });

  return {
    names: names,
  };
}
