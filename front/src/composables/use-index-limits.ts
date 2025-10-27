import {useStorageAggregatedAcousticIndices} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {useColorByIndex} from 'src/draggables/colors/use-color-by-index';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {calculateMean, truncateNumber} from 'src/utils/math';
import {unref} from 'vue';

// TODO: update me
export function useIndexLimits() {
  const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  const {criteriaIndex} = useColorSelection();
  const {min, max} = useColorByIndex();

  const detect = () => {
    if (aggregatedIndices.value === null) {
      return;
    }

    const values = aggregatedIndices.value[criteriaIndex.value].values.map(
      (v) => calculateMean(v),
    );

    min.value = truncateNumber(Math.min(...values));
    max.value = truncateNumber(Math.max(...values));
  };

  const swap = () => {
    const savedMin = unref(min.value);
    const savedMax = unref(max.value);

    min.value = savedMax;
    max.value = savedMin;
  };

  return {
    detect,
    swap,
  };
}
