import {reactive} from 'vue';

interface HeatmapWidthRef {
  value: number;
}

export const heatmapWidthRef = reactive<HeatmapWidthRef>({
  value: 600,
});

interface HeatmapHeightRef {
  value: number;
}

export const heatmapHeightRef = reactive<HeatmapHeightRef>({
  value: 600,
});
