import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {calculateMean, truncateNumber} from 'src/utils/math';
import {unref} from 'vue';

export function useAcousticRange() {
  const {min, max} = useColorByAcoustic();
  const {series} = useColorAcousticSeries();

  const detect = () => {
    if (series.value === null) {
      return;
    }

    const values = series.value.map((s) => calculateMean(s.values));
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
