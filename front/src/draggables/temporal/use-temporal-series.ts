import {type AcousticSeries} from 'src/composables/use-acoustic-serializer';
import {ref} from 'vue';

const series = ref<AcousticSeries[] | null>(null);

export function useTemporalSeries() {
  const reset = () => {
    series.value = null;
  };

  const set = (newData: AcousticSeries[]) => (series.value = newData);

  return {
    series,
    reset,
    set,
  };
}
