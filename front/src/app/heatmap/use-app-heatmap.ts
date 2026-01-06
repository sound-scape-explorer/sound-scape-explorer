import {type Config, type Layout} from 'plotly.js-dist-min';
import {type PlotlyData} from 'src/types';
import {ref} from 'vue';

const div = ref<HTMLDivElement | null>(null);
const data = ref<PlotlyData[] | null>(null);
const layout = ref<Partial<Layout> | null>(null);
const config = ref<Partial<Config> | null>(null);

export function useAppHeatmap() {
  return {
    div,
    data,
    layout,
    config,
  };
}
