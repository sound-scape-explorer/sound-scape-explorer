import Plotly, {type Data, type Layout} from 'plotly.js-dist-min';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useDraggableHistograms} from 'src/draggables/histograms/use-draggable-histograms';
import {buildUniqueIndicatorIdentifier} from 'src/utils/build-unique-indicator-identifier';
import {watch} from 'vue';

export function useDraggableHistogramsLifecycles() {
  const {divRef, name, over, histogramFunction} = useDraggableHistograms();
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {getHourFromTimestamp} = useDate();
  const {scale} = useColorsCycling();

  watch([name, over, histogramFunction], async () => {
    if (
      aggregatedIndicators.value === null ||
      aggregatedTimestamps.value === null ||
      divRef.value === null ||
      name.value === null ||
      over.value === null
    ) {
      return;
    }

    const results = aggregatedIndicators.value.filter(
      (aI) => buildUniqueIndicatorIdentifier(aI) === name.value,
    );

    if (results.length !== 1) {
      throw new Error('Could not select specified indicator');
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

    const layout: Partial<Layout> = {
      bargap: 0.05,
      bargroupgap: 0.2,
      xaxis: {title: 'Hours'},
      yaxis: {title: histogramFunction.value},
      title: name.value,
      width: 600,
    };

    await Plotly.newPlot(divRef.value, data, layout);
  });
}
