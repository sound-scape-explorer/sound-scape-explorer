import {useColorUser} from 'src/composables/use-color-user';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {calculateMean, mapRange} from 'src/utils/math';
import {getInfiniteRange} from 'src/utils/utils';
import {ref} from 'vue';

const min = ref<string>('');
const max = ref<string>('');

export function useColorByAcoustic() {
  const {scale} = useColorUser();
  const {series} = useColorAcousticSeries();

  const get = (intervalIndex: number): string => {
    if (series.value === null) {
      return 'black';
    }

    const interval = series.value.find((s) => s.index === intervalIndex);

    if (!interval) {
      return 'black';
    }

    const mean = calculateMean(interval.values);

    const {bottom, top} = getInfiniteRange(
      Number(min.value),
      Number(max.value),
    );
    const ranged = mapRange(mean, bottom, top, 0, 1);
    return scale.value(ranged).css();
  };

  return {
    min,
    max,
    get,
  };
}
