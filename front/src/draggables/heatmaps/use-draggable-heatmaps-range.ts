import {MetricImpl} from '@shared/enums';
import {type HeatmapRange, heatmapRanges} from 'src/common/heatmap-range';
import {type MetricData} from 'src/composables/use-metric-data';
import {HeatmapScale} from 'src/constants';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {computed, ref} from 'vue';

const ranges: HeatmapRange[] = [
  heatmapRanges.auto,
  heatmapRanges.min1to1,
  heatmapRanges.min0to1,
  heatmapRanges.min0to100,
];

const index = ref<number>(ranges.indexOf(heatmapRanges.min1to1));
const range = computed(() => ranges[index.value]);

export function useDraggableHeatmapsRange() {
  const {flavor} = useDraggableHeatmapsColor();

  const options = computed(() => {
    return ranges.map((range, index) => {
      return {
        label: `[${range.min ?? 'auto'}, ${range.max ?? 'auto'}]`,
        value: index,
      };
    });
  });

  const update = (data: MetricData) => {
    switch (data.metric.impl) {
      case MetricImpl.enum.SILHOUETTE:
        flavor.value = HeatmapScale.enum.RdBu;
        index.value = ranges.indexOf(heatmapRanges.min1to1);
        break;
      case MetricImpl.enum.OVERLAP:
        flavor.value = HeatmapScale.enum.Blues;
        index.value = ranges.indexOf(heatmapRanges.min0to1);
        break;
      case MetricImpl.enum.CONTINGENCY:
        flavor.value = HeatmapScale.enum.Blues;
        index.value = ranges.indexOf(heatmapRanges.min0to100);
        break;
      default:
        flavor.value = HeatmapScale.enum.RdBu;
        index.value = ranges.indexOf(heatmapRanges.auto);
        break;
    }
  };

  return {
    range,
    index,
    ranges,
    options,
    update,
  };
}
