import {DigesterImpl} from '@shared/enums';
import {type HeatmapRange, heatmapRanges} from 'src/common/heatmap-range';
import {HeatmapScale} from 'src/common/heatmap-scale';
import {type Digested} from 'src/composables/use-storage-digested';
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

  const update = (digested: Digested) => {
    switch (digested.digester.impl) {
      case DigesterImpl.silhouette:
        flavor.value = HeatmapScale.RdBu;
        index.value = ranges.indexOf(heatmapRanges.min1to1);
        break;
      case DigesterImpl.overlap:
        flavor.value = HeatmapScale.Blues;
        index.value = ranges.indexOf(heatmapRanges.min0to1);
        break;
      case DigesterImpl.contingency:
        flavor.value = HeatmapScale.Blues;
        index.value = ranges.indexOf(heatmapRanges.min0to100);
        break;
      default:
        flavor.value = HeatmapScale.RdBu;
        index.value = ranges.indexOf(heatmapRanges.auto);
        break;
    }
  };

  return {
    range: range,
    index: index,
    ranges: ranges,
    options: options,
    update: update,
  };
}
