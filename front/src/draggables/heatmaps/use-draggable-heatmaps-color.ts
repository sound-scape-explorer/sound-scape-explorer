import {HeatmapScale} from 'src/constants';
import {ref} from 'vue';

const flavor = ref<HeatmapScale>(HeatmapScale.enum.RdBu);

export function useDraggableHeatmapsColor() {
  return {
    flavor,
  };
}
