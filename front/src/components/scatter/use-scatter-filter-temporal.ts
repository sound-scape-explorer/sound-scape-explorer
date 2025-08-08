import {
  type AggregatedIndex,
  useStorageAggregatedAcousticIndices,
} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {calculateMean} from 'src/utils/math';
import {parseSelectionOption} from 'src/utils/old';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

// todo: naming between filter by time and temporal??
export function useScatterFilterTemporal() {
  const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  const {from, to, reset: resetThresholds} = useTemporalThresholds();
  const {indicator: indicatorSelected, hasIndicator} = useDraggableTemporal();

  const isFiltered = (
    index: number,
    indicator: AggregatedIndex,
    bottom: number,
    top: number,
  ): boolean => {
    if (aggregatedIndices.value === null || !hasIndicator.value) {
      return false;
    }

    const values = indicator.values[index];
    const mean = calculateMean(values);
    const isWithin = bottom <= mean && mean < top;
    return !isWithin;
  };

  const filter = (): void => {
    const indexIndex = parseSelectionOption(indicatorSelected.value);

    if (aggregatedIndices.value === null || indexIndex === null) {
      return;
    }

    const results = aggregatedIndices.value.filter(
      ({index}) => index.index === indexIndex,
    );

    if (results.length === 0) {
      return;
    }

    const indicator = results[0];

    const l = aggregatedIndices.value[0].values.length;
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
    filtered,
    filter,
    reset,
  };
}
