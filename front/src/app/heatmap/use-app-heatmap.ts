import {type Config, type Layout} from 'plotly.js-dist-min';
import {type HeatmapData} from 'src/app/heatmap/use-app-heatmap-data';
import {ref} from 'vue';

const div = ref<HTMLDivElement | null>(null);
const data = ref<HeatmapData[] | null>(null);
const layout = ref<Partial<Layout> | null>(null);
const config = ref<Partial<Config> | null>(null);

export function useAppHeatmap() {
  return {
    div: div,
    data: data,
    layout: layout,
    config: config,
  };
}
