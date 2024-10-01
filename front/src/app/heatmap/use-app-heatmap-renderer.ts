import Plotly from 'plotly.js-dist-min';
import {type AppHeatmapProps} from 'src/app/heatmap/app-heatmap.vue';
import {useAppHeatmap} from 'src/app/heatmap/use-app-heatmap';
import {useAppHeatmapData} from 'src/app/heatmap/use-app-heatmap-data';
import {useAppHeatmapLayout} from 'src/app/heatmap/use-app-heatmap-layout';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';

export function useAppHeatmapRenderer(props: AppHeatmapProps) {
  const {div, data, layout, config} = useAppHeatmap();
  const {buildData} = useAppHeatmapData();
  const {createLayout} = useAppHeatmapLayout();
  const {generateConfig} = useBasePlotConfig();

  const create = async () => {
    if (
      div.value === null ||
      data.value === null ||
      layout.value === null ||
      config.value === null
    ) {
      return;
    }

    await Plotly.newPlot(div.value, data.value, layout.value, config.value);
  };

  const render = () => {
    const trace = buildData({
      colorscale: props.colorscale,
      x: props.x.map((x) => x.trim()),
      y: props.y.map((y) => y.trim()),
      z: props.values,
      zmin: props.range.min,
      zmax: props.range.max,
    });

    data.value = [trace];
    layout.value = createLayout(props.title ?? '');
    config.value = generateConfig(props.exportName);
  };

  return {
    create: create,
    render: render,
  };
}
