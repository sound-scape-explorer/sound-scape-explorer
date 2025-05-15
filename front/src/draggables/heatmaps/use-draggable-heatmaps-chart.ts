import {DraggableHeatmapsError} from 'src/common/Errors';
import {type MetricData, useMetricData} from 'src/composables/use-metric-data';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';
import {ref} from 'vue';

const title = ref<string>('');
const x = ref<string[]>([]);
const y = ref<string[]>([]);
const series = ref<number[][]>([]);

export function useDraggableHeatmapsChart() {
  const {a, b} = useDraggableHeatmapsLabels();
  const {coreUniques} = useTagUniques();
  const {metricData} = useMetricData();
  const {update: updateRange} = useDraggableHeatmapsRange();
  const {isPairing} = useDraggableHeatmaps();

  const updateTitle = (
    data: MetricData,
    a: string,
    b: string | null = null,
  ) => {
    if (isPairing.value) {
      title.value = `${data.metric.impl} - ${a} - ${b}`;
      return;
    }

    title.value = `${data.metric.impl} - ${a}`;
  };

  const getLabelData = (label: string) => {
    if (coreUniques.value === null) {
      throw new DraggableHeatmapsError('labels not available');
    }

    const labelProperties = Object.keys(coreUniques.value);
    const labelValues = Object.values(coreUniques.value);

    const index = labelProperties.indexOf(label);

    if (index === -1) {
      const msg = `could not find label property ${label}`;
      throw new DraggableHeatmapsError(msg);
    }

    const possibleValues = labelValues[index];

    return {
      index,
      possibleValues,
    };
  };

  const updateHeatmapData = () => {
    if (metricData.value === null || a.value === null) {
      return;
    }

    updateTitle(metricData.value, a.value);
    updateRange(metricData.value);

    const {possibleValues} = getLabelData(a.value);

    x.value = possibleValues;
    y.value = [];

    series.value = metricData.value.values;
  };

  const updateHeatmapDataPairing = () => {
    if (metricData.value === null || a.value === null || b.value === null) {
      return;
    }

    updateTitle(metricData.value, a.value, b.value);
    updateRange(metricData.value);

    const {possibleValues: aPossibleValues} = getLabelData(a.value);
    const {possibleValues: bPossibleValues} = getLabelData(b.value);

    x.value = aPossibleValues;
    y.value = bPossibleValues;
    series.value = metricData.value.values;
  };

  return {
    title,
    x,
    y,
    series,
    updateHeatmapData,
    updateHeatmapDataPairing,
  };
}
