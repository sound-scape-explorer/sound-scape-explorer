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
    div.value.on('plotly_click', (e) => {
      // single
      if (!isPairing.value) {
        if (a.value === null) {
          return;
        }

        const indices = e.points[0].pointIndex as [number, number];

        updateSelection(
          a.value,
          indices.map((i) => i.toString()),
        );

        return;
      }

      // pairing
      if (a.value === null || b.value === null) {
        return;
      }

      const indices = e.points[0].pointIndex as [number, number];

      updateSelection(b.value, [indices[0].toString()]);
      updateSelection(a.value, [indices[1].toString()]);
    });
  };

  const render = () => {
    const trace = buildData({
      colorscale: props.colorscale,
      x: props.x,
      y: props.y,
      z: props.values,
      zmin: props.range.min,
      zmax: props.range.max,
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
