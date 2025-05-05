import {type MetricDto} from '@shared/dtos'; // todo: redundant
import {MetricTypeEnum} from '@shared/enums';
import {metricTypeByImpl} from 'src/common/metric-type-by-impl';
import {useMetricData} from 'src/composables/use-metric-data';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {generateUniqueMetricSlug} from 'src/utils/config';
import {computed, ref} from 'vue';

const metricSlug = ref<string | null>(null);

export function useDraggableHeatmaps() {
  const {extraction} = useViewSelectionNew();
  const {read} = useMetricData();
  const {a, b} = useDraggableHeatmapsLabels();

  const findCurrentMetric = (): MetricDto | null => {
    const metric = extraction.value?.metrics.find(
      (m) => generateUniqueMetricSlug(m) === metricSlug.value,
    );

    if (!metric) {
      return null;
    }

    return metric;
  };

  const isPairing = computed<boolean>(() => {
    const metric = findCurrentMetric();
    if (!metric) {
      return false;
    }
    const type = metricTypeByImpl[metric.impl];
    const isPairing = type === MetricTypeEnum.enum.TWO_D_PAIRING;
    return isPairing;
  });

  const isReadyForSelection = computed<boolean>(
    () => metricSlug.value !== null,
  );

  const isReadyAndSelected = computed<boolean>(() => {
    if (isPairing.value) {
      return a.value !== null && b.value !== null;
    }

    return a.value !== null;
  });

  const options = computed(() => {
    return (
      extraction.value?.metrics
        .filter((d) => metricTypeByImpl[d.impl] !== MetricTypeEnum.enum.ONE_D)
        .map((d) => generateUniqueMetricSlug(d)) ?? []
    );
  });

  const handleChange = async () => {
    const metric = findCurrentMetric();
    if (!metric) {
      return;
    }
    await read(metric, a, b);
  };

  return {
    metricSlug,
    options,
    handleChange,
    isReadyForSelection,
    isReadyAndSelected,
    isPairing,
  };
}
