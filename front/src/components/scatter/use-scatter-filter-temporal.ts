import {
  type AggregatedIndicator,
  useStorageAggregatedIndicators,
} from 'src/composables/use-storage-aggregated-indicators';
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

  const isFiltered = (
    intervalIndex: number,
    indicator: AggregatedIndicator,
    bottom: number,
    top: number,
  ): boolean => {
    if (aggregatedIndicators.value === null || !hasIndicator.value) {
      return false;
    }

    const indicatorValues = indicator.values[intervalIndex];

    const indicatorMean = calculateMean(indicatorValues);
    const isWithin = bottom <= indicatorMean && indicatorMean < top;
    return !isWithin;
  };

  const filter = (): void => {
    const indicatorIndex = parseSelectionOption(indicatorSelected.value);
    if (aggregatedIndicators.value === null || indicatorIndex === null) {
      return;
    }

    const results = aggregatedIndicators.value.filter(
      ({extractor}) => extractor.index === indicatorIndex,
    );

    if (results.length === 0) {
      return;
    }

    const indicator = results[0];

    const l = aggregatedIndicators.value[0].values.length;
    const bottom = from.value === null ? -Infinity : from.value;
    const top = to.value === null ? Infinity : to.value;

    const newFiltered: boolean[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] = isFiltered(i, indicator, bottom, top);
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
