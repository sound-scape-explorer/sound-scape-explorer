import Plotly, {type Data, type Layout} from 'plotly.js-dist-min';
import {type Acoustics, useAcoustics} from 'src/composables/use-acoustics';
import {useAggregations} from 'src/composables/use-aggregations';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {usePlotlyMargins} from 'src/composables/use-plotly-margins';
import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';
import {calculateMean} from 'src/utils/math';

// todo: remove me ALL
export function useHistogramsRenderer() {
  const {
    divRef,
    acousticsExtractorSlug: slug,
    over,
    fn,
  } = useDraggableHistograms();
  // const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
  // const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {aggregations} = useAggregations();
  const {getHourFromTimestamp} = useDate();
  const {scale} = useColorsCycling();
  const {plotBackground} = useClientSettings();
  const {generatePlotlyMargins} = usePlotlyMargins();
  const {filter} = useAcoustics();

  const render = async (acoustics: Acoustics) => {
    if (
      aggregations.value === null ||
      divRef.value === null ||
      slug.value === null ||
      over.value === null
    ) {
      return;
    }

    const l = aggregations.value.timestamps.length;
    const xs = new Array(l);
    const ys = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const start = aggregations.value.timestamps[i];
      const end = aggregations.value.timestamps[i + 1] ?? Infinity;
      const filtered = filter(acoustics, start, end);

      if (filtered.scalars.length === 0) {
        continue;
      }

      const mean = calculateMean(filtered.scalars);
      const hour = getHourFromTimestamp(start);

      xs[i] = start;
      ys[i] = mean;
    }

    console.log({xs, ys});

    // for (let i = 0; i < aggregations.value.timestamps.length; i += 1) {
    //   const timestamp = aggregations.value.timestamps[i];
    //   const value = indicator.values[i][0];
    //   const hour = getHourFromTimestamp(timestamp);
    //
    //   xs[i] = hour;
    //   ys[i] = value;
    // }

    const uniques = [...new Set(xs)];
    const colors = scale.value.colors(uniques.length);

    const plotData: Data[] = [
      {
        histfunc: fn.value,
        x: xs,
        y: ys,
        type: 'histogram',
        name: fn.value,
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
      yaxis: {title: fn.value, automargin: true},
      title: `${slug.value} (${fn.value} distribution over ${overLower})`,
    };

    await Plotly.newPlot(divRef.value, plotData, layout);
  };

  return {
    render,
  };
}
