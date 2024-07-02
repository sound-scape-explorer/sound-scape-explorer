import {HeatmapScale} from 'src/common/heatmap-scale';
import {ref} from 'vue';

const flavors: HeatmapScale[] = [HeatmapScale.RdBu, HeatmapScale.Blues];
const flavor = ref<HeatmapScale>(HeatmapScale.RdBu);

export function useDraggableHeatmapsColor() {
  return {
    flavor: flavor,
    flavors: flavors,
  };
}
