import {PLOTLY_SIZE} from 'src/constants';
import {reactive} from 'vue';

interface HeatmapWidthRef {
  value: number;
}

export const heatmapWidthRef = reactive<HeatmapWidthRef>({
  value: PLOTLY_SIZE,
});

interface HeatmapHeightRef {
  value: number;
}

export const heatmapHeightRef = reactive<HeatmapHeightRef>({
  value: PLOTLY_SIZE,
});
