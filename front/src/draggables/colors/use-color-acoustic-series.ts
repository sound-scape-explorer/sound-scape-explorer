import {type AcousticSeries} from 'src/composables/use-acoustic-serializer';
import {ref} from 'vue';

const series = ref<AcousticSeries[] | null>(null);

export function useColorAcousticSeries() {
  const reset = () => {
    series.value = null;
  };

  const set = (newSeries: AcousticSeries[]) => (series.value = newSeries);

  return {
    series,
    reset,
    set,
  };
}
