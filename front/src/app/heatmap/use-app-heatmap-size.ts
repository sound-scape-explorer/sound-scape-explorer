import {PLOTLY_SIZE} from 'src/constants';
import {ref} from 'vue';

const width = ref<number>(PLOTLY_SIZE);
const height = ref<number>(PLOTLY_SIZE);

export function useAppHeatmapSize() {
  return {
    width,
    height,
  };
}
