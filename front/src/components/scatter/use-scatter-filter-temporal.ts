import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {calculateMean} from 'src/utils/calculate-mean';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTemporal() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {from, to, reset: resetThresholds} = useTemporalThresholds();
  const {indicator: indicatorSelected, hasIndicator} = useDraggableTemporal();

  const isFiltered = (index: number): boolean => {
    if (aggregatedIndicators.value === null || !hasIndicator.value) {
      return false;
    }

    const indicatorIndex = parseSelectionOption(indicatorSelected.value);

    if (indicatorIndex === null) {
      return false;
    }

    const indicatorValues =
      aggregatedIndicators.value[indicatorIndex].values[index];

    const indicatorMean = calculateMean(indicatorValues);
    const bottom = from.value === null ? -Infinity : from.value;
    const top = to.value === null ? Infinity : to.value;
    const isWithin = bottom <= indicatorMean && indicatorMean < top;
    return !isWithin;
  };

  const filter = (): void => {
    if (aggregatedIndicators.value === null) {
      return;
    }

    const l = aggregatedIndicators.value[0].values.length;
    const newFiltered: boolean[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] = isFiltered(i);
    }

    filtered.value = newFiltered;
  };

  const reset = () => {
    resetThresholds();
    filter();
  };

  return {
    filtered: filtered,
    filter: filter,
    reset: reset,
  };
}
