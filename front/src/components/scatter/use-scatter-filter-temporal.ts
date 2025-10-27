import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalData} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {calculateMean} from 'src/utils/math';
import {getInfiniteRangeFromStrings} from 'src/utils/utils';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTemporal() {
  const {
    fromString,
    toString,
    reset: resetThresholds,
  } = useTemporalThresholds();
  const {hasExtractor} = useDraggableTemporal();
  const {data} = useTemporalData();

  const isFiltered = (index: number, bottom: number, top: number): boolean => {
    if (!hasExtractor.value || data.value.length === 0) {
      return false;
    }

    const {values} = data.value[index];
    const mean = calculateMean(values);
    const isWithin = bottom <= mean && mean < top;
    return !isWithin;
  };

  const filter = (): void => {
    if (data.value.length === 0) {
      return;
    }

    const {bottom, top} = getInfiniteRangeFromStrings(
      fromString.value,
      toString.value,
    );

    const l = data.value.length;
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
