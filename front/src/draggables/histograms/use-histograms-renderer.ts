import Plotly, {type Data, type Layout} from 'plotly.js-dist-min';
import {DraggableHistogramsError} from 'src/common/Errors';
import {useAggregations} from 'src/composables/use-aggregations';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {usePlotlyMargins} from 'src/composables/use-plotly-margins';
import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';

// todo: redo me
export function useHistogramsRenderer() {
  const {divRef, name, over, fn} = useDraggableHistograms();
  // const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  // const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {aggregations} = useAggregations();
  const {getHourFromTimestamp} = useDate();
  const {scale} = useColorsCycling();
  const {plotBackground} = useClientSettings();
  const {generatePlotlyMargins} = usePlotlyMargins();

  const render = async () => {
    if (
      aggregations.value === null ||
      divRef.value === null ||
      name.value === null ||
      over.value === null
    ) {
      return;
    }

    // const results = aggregatedIndices.value.filter(
    //   ({index}) => generateUniqueIndexSlug(index) === name.value,
    // );
    const results: string[] = []; // todo: redo me

    if (results.length !== 1) {
      throw new DraggableHistogramsError(
        'could not select specified indicator',
      );
    }

    const indicator = results[0];
    const l = indicator.values.length;
    const xs = new Array(l);
    const ys = new Array(l);

    for (let i = 0; i < aggregatedTimestamps.value.length; i += 1) {
      const timestamp = aggregatedTimestamps.value[i];
      const value = indicator.values[i][0];
      const hour = getHourFromTimestamp(timestamp);

      xs[i] = hour;
      ys[i] = value;
    }

    const uniques = [...new Set(xs)];
    const colors = scale.value.colors(uniques.length);

    const data: Data[] = [
      {
        histfunc: histogramFunction.value,
        x: xs,
        y: ys,
        type: 'histogram',
        name: histogramFunction.value,
        marker: {
          color: colors,
          line: {
            color: colors,
            width: 1,
          },
        },
      },
    ];

    const overLower = over.value.toLowerCase();

    const layout: Partial<Layout> = {
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      bargap: 0.05,
      bargroupgap: 0.2,
      margin: generatePlotlyMargins(),
      xaxis: {title: overLower, automargin: true},
      yaxis: {title: histogramFunction.value, automargin: true},
      title: `${name.value} (${histogramFunction.value} distribution over ${overLower})`,
    };

    await Plotly.newPlot(divRef.value, data, layout);
  };

  return {
    render,
  };
}
