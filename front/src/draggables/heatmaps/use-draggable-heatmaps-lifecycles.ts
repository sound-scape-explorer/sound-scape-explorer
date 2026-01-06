import {useMetricData} from 'src/composables/use-metric-data';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsTags} from 'src/draggables/heatmaps/use-draggable-heatmaps-tags';
import {watch} from 'vue';

export function useDraggableHeatmapsLifecycles() {
  const {metricSlug, handleChange, isPairing} = useDraggableHeatmaps();
  const {a, b, reset} = useDraggableHeatmapsTags();
  const {metricData} = useMetricData();
  const {updateHeatmapData, updateHeatmapDataPairing} =
    useDraggableHeatmapsChart();

  // reset on metricSlug change
  watch(metricSlug, reset);

  // update digester raw data
  watch([metricSlug, a, b], handleChange);

  // update chart data
  watch(metricData, () => {
    if (isPairing.value && a.value !== null && b.value !== null) {
      updateHeatmapDataPairing();
      return;
    }

    updateHeatmapData();
  });
}
