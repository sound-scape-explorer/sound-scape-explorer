import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {calculateMean} from 'src/utils/math';
import {getInfiniteRangeFromStrings} from 'src/utils/utils';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterAcoustic() {
  const {
    fromString,
    toString,
    reset: resetThresholds,
  } = useTemporalThresholds();
  const {hasExtractor} = useDraggableTemporal();
  const {series} = useTemporalSeries();

  const isFiltered = (index: number, bottom: number, top: number): boolean => {
    if (!hasExtractor.value || series.value === null) {
      return false;
    }

    const {values} = series.value[index];
    const mean = calculateMean(values);
    const isWithin = bottom <= mean && mean < top;
    return !isWithin;
  };

  const filter = (): void => {
    if (series.value === null) {
      return;
    }

    const {bottom, top} = getInfiniteRangeFromStrings(
      fromString.value,
      toString.value,
    );

    const l = series.value.length;
    const newFiltered: boolean[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] = isFiltered(i, bottom, top);
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
