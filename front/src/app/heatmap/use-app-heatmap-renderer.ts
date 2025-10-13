import {type PlotMouseEvent} from 'plotly.js';
import Plotly from 'plotly.js-dist-min';
import {type AppHeatmapProps} from 'src/app/heatmap/app-heatmap.vue';
import {useAppHeatmap} from 'src/app/heatmap/use-app-heatmap';
import {useAppHeatmapData} from 'src/app/heatmap/use-app-heatmap-data';
import {useAppHeatmapLayout} from 'src/app/heatmap/use-app-heatmap-layout';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';

export function useAppHeatmapRenderer(props: AppHeatmapProps) {
  const {div, data, layout, config} = useAppHeatmap();
  const {buildData} = useAppHeatmapData();
  const {createLayout} = useAppHeatmapLayout();
  const {generateConfig} = useBasePlotConfig();
  const {isPairing} = useDraggableHeatmaps();
  const {a, b} = useDraggableHeatmapsLabels();
  const {updateSelection} = useTagSelection();

  const handleClick = (e: PlotMouseEvent) => {
    // single
    if (!isPairing.value) {
      if (a.value === null) {
        return;
      }

      const x = e.points[0].x as string;
      const y = e.points[0].y as string;
      const set = [...new Set([x, y])];

      updateSelection(a.value, set);

      return;
    }

    // pairing
    if (a.value === null || b.value === null) {
      return;
    }

    const x = e.points[0].x as string;
    const y = e.points[0].y as string;

    updateSelection(b.value, [y]);
    updateSelection(a.value, [x]);
  };

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

    // @ts-expect-error instantiated plotly div
    div.value.on('plotly_click', handleClick);
  };

  const render = () => {
    if (a.value === null) {
      return;
    }

    const trace = buildData({
      colorscale: props.colorscale,
      x: props.x,
      y: props.y,
      z: props.values,
      zmin: props.range.min,
      zmax: props.range.max,
      labels: [a.value, b.value],
    });

    data.value = [trace];
    layout.value = createLayout(props.title);
    config.value = generateConfig(props.exportName);
  };

  return {
    create,
    render,
  };
}
