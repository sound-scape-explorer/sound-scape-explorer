import {DigesterLayout} from 'src/common/digester-layout';
import type {HeatmapRange} from 'src/common/heatmap-range';
import {heatmapRanges} from 'src/common/heatmap-range';
import {HeatmapScale} from 'src/common/heatmap-scale';
import type {Digested} from 'src/composables/use-storage-digested';
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
    switch (digested.digester.name) {
      case DigesterLayout.silhouette:
        flavor.value = HeatmapScale.RdBu;
        index.value = ranges.indexOf(heatmapRanges.min1to1);
        break;
      case DigesterLayout.overlap:
        flavor.value = HeatmapScale.Blues;
        index.value = ranges.indexOf(heatmapRanges.min0to1);
        break;
      case DigesterLayout.contingency:
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
