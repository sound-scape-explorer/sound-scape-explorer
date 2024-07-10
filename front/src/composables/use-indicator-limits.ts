import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {calculateMean} from 'src/utils/calculate-mean';
import {truncateNumber} from 'src/utils/truncate-number';
import {unref} from 'vue';

export function useIndicatorLimits() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {criteriaIndex} = useColorSelection();
  const {min, max} = useColorByIndicator();

  const detect = () => {
    if (aggregatedIndicators.value === null) {
      return;
    }

    const values = aggregatedIndicators.value[criteriaIndex.value].values.map(
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
    detect: detect,
    swap: swap,
  };
}
