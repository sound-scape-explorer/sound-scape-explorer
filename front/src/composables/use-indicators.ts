import {useStorageAggregatedAcousticIndices} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {generateUniqueIndexSlug} from 'src/utils/config';
import {computed} from 'vue';

// TODO: update me
export function useIndicators() {
  const {aggregatedIndices} = useStorageAggregatedAcousticIndices();

  const names = computed(() => {
    if (aggregatedIndices.value === null) {
      return null;
    }

    return aggregatedIndices.value.map(({index}) =>
      generateUniqueIndexSlug(index),
    );
  });

  return {
    names,
  };
}
