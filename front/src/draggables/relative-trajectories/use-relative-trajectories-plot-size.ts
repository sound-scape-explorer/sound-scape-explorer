import {PLOTLY_SIZE} from 'src/constants';
import {ref} from 'vue';

const height = ref<number>(PLOTLY_SIZE);

export function useRelativeTrajectoriesPlotSize() {
  return {
    height: height,
  };
}
