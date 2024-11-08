import {useStorageDigested} from 'src/composables/use-storage-digested';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {watch} from 'vue';

export function useDraggableHeatmapsLifecycles() {
  const {digesterName, handleChange, isPairing} = useDraggableHeatmaps();
  const {a, b} = useDraggableHeatmapsLabels();
  const {digested} = useStorageDigested();
  const {updateHeatmapData, updateHeatmapDataPairing} =
    useDraggableHeatmapsChart();

  // update digester raw data
  watch([digesterName, a, b], handleChange);

  // update chart data
  watch(digested, () => {
    if (isPairing.value && a.value !== null && b.value !== null) {
      updateHeatmapDataPairing();
    } else if (!isPairing.value && a.value !== null) {
      updateHeatmapData();
    }
  });
}
