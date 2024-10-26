import {useColorUser} from 'src/composables/use-color-user';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {calculateMean, mapRange} from 'src/utils/math';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const min = ref<number | null>(null);
const max = ref<number | null>(null);

export function useColorByIndicator() {
  const {scale} = useColorUser();
  const {criteriaIndex} = useColorSelection();
  const {aggregatedIndicators} = useStorageAggregatedIndicators();

  const get = (intervalIndex: number): string => {
    if (aggregatedIndicators.value === null) {
      return '';
    }

    const indicatorIndex = criteriaIndex.value;
    const values =
      aggregatedIndicators.value[indicatorIndex].values[intervalIndex];
    const mean = calculateMean(values);

    const {bottom, top} = getInfiniteRange(min.value, max.value);
    const ranged = mapRange(mean, bottom, top, 0, 1);
    return scale.value(ranged).css();
  };

  return {
    min: min,
    max: max,
    get: get,
  };
}
