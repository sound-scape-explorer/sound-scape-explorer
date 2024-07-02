import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {calculateMean} from 'src/utils/calculate-mean';
import {unref} from 'vue';

export function useIndicatorLimits() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {criteriaIndex} = useColorSelection();
  const {min, max} = useColorByIndicator();

  const detect = () => {
    if (aggregatedIndicators.value === null) {
      return [-Infinity, Infinity];
    }

    const values = aggregatedIndicators.value[criteriaIndex.value].values.map(
      (v) => calculateMean(v),
    );

    min.value = Number(Math.min(...values).toFixed(2));
    max.value = Number(Math.max(...values).toFixed(2));
  };

  const swap = () => {
    const savedMin = unref(min.value);
    const savedMax = unref(max.value);

    min.value = savedMax;
    max.value = savedMin;
  };

  return {
    detect: detect,
    swap: swap,
  };
}
