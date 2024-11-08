import {
  type AggregatedIndicator,
  useStorageAggregatedIndicators,
} from 'src/composables/use-storage-aggregated-indicators';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {calculateMean} from 'src/utils/math';
import {parseSelectionOption} from 'src/utils/old';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTemporal() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {from, to, reset: resetThresholds} = useTemporalThresholds();
  const {indicator: indicatorSelected, hasIndicator} = useDraggableTemporal();

  const isFiltered = (
    index: number,
    indicator: AggregatedIndicator,
    bottom: number,
    top: number,
  ): boolean => {
    if (aggregatedIndicators.value === null || !hasIndicator.value) {
      return false;
    }

    const values = indicator.values[index];
    const mean = calculateMean(values);
    const isWithin = bottom <= mean && mean < top;
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
    const {bottom, top} = getInfiniteRange(from.value, to.value);

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
