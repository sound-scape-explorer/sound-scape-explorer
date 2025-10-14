import {type PlotMouseEvent} from 'plotly.js';
import Plotly from 'plotly.js-dist-min';
import {type AppHeatmapProps} from 'src/app/heatmap/app-heatmap.vue';
import {useAppHeatmap} from 'src/app/heatmap/use-app-heatmap';
import {useAppHeatmapData} from 'src/app/heatmap/use-app-heatmap-data';
import {useAppHeatmapHighlight} from 'src/app/heatmap/use-app-heatmap-highlight';
import {useAppHeatmapLayout} from 'src/app/heatmap/use-app-heatmap-layout';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsTags} from 'src/draggables/heatmaps/use-draggable-heatmaps-tags';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';

export function useAppHeatmapRenderer(props: AppHeatmapProps) {
  const {div, data, layout, config} = useAppHeatmap();
  const {buildData} = useAppHeatmapData();
  const {createLayout} = useAppHeatmapLayout();
  const {generateConfig} = useBasePlotConfig();
  const {isPairing} = useDraggableHeatmaps();
  const {a, b} = useDraggableHeatmapsTags();
  const {updateSelection: updateTag} = useTagSelection();
  const {getShapes, updateHighlight} = useAppHeatmapHighlight();

  const handleClick = (e: PlotMouseEvent) => {
    if (a.value === null) {
      return;
    }

    const indices = e.points[0].pointIndex as unknown as [number, number];

    // single
    if (!isPairing.value) {
      const x = e.points[0].x as string;
      const y = e.points[0].y as string;
      const set = [...new Set([x, y])];

      updateTag(a.value, set);

      updateHighlight({
        row: {
          tagName: a.value,
          tagValue: x,
          tagIndex: indices[1],
        },
        col: {
          tagName: a.value,
          tagValue: y,
          tagIndex: indices[0],
        },
      });

      return;
    }

    // pairing
    if (b.value === null) {
      return;
    }

    const x = e.points[0].x as string;
    const y = e.points[0].y as string;

    updateTag(b.value, [y]);
    updateTag(a.value, [x]);

    updateHighlight({
      row: {
        tagName: a.value,
        tagValue: x,
        tagIndex: indices[1],
      },
      col: {
        tagName: b.value,
        tagValue: y,
        tagIndex: indices[0],
      },
    });
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

    config.value = generateConfig(props.exportName);

    const shapes = getShapes();
    layout.value = createLayout(props.title, shapes);

    const series = buildData({
      colorscale: props.colorscale,
      x: props.x,
      y: props.y,
      z: props.values,
      zmin: props.range.min,
      zmax: props.range.max,
      labels: [a.value, b.value],
    });

    data.value = [series];
  };

  return {
    create,
    render,
  };
}
