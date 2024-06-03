import type {Data, PlotType} from 'plotly.js-dist-min';
import {useScatterColorAlpha} from 'src/components/scatter/scatter-color-alpha';
import {useScatterColorScale} from 'src/components/scatter/scatter-color-scale';
import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScreen} from 'src/components/screen/screen';
import {useClientSettings} from 'src/composables/client-settings';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedIntervalDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useStorageReducedFeatures} from 'src/composables/storage-reduced-features';

const size2d = 5;
const size3d = 3;

export function useScatterFeatures() {
  const {labelProperties} = useStorageLabels();
  const {reducedFeatures} = useStorageReducedFeatures();
  const {aggregatedLabels} = useStorageAggregatedLabels();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {convertTimestampToIsoDate} = useDate();
  const {low, high} = useScatterColorAlpha();
  const {scale} = useScatterColorScale();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {selected} = useScreen();
  const {scatter2dGl} = useClientSettings();

  const trace = (): Data[] => {
    if (
      labelProperties.value === null ||
      reducedFeatures.value === null ||
      aggregatedLabels.value === null ||
      scale.value === null
    ) {
      return [];
    }

    const colorScale = scale.value;
    const pointsFilteredByMeta = labelFiltered.value;
    const pointsFilteredByTime = timeFiltered.value;
    const pointsSelected = selected.value;

    // TODO: improve me
    const plotlyColorscale = colorScale.map((color, index) => {
      let filteredColor = color;

      if (pointsFilteredByMeta[index] || pointsFilteredByTime[index]) {
        filteredColor = `rgba(0, 0, 0, ${low.value})`;
      }

      if (pointsSelected.indexOf(index) !== -1) {
        filteredColor = `rgba(255, 0, 0, ${high.value})`;
      }

      return [index / (colorScale.length - 1), filteredColor];
    });

    const isThreeDimensional = reducedFeatures.value[0].length === 3;
    let scatterType: PlotType;

    if (isThreeDimensional) {
      scatterType = 'scatter3d';
    } else if (!isThreeDimensional && scatter2dGl.value) {
      scatterType = 'scattergl';
    } else {
      scatterType = 'scatter';
    }

    const properties = labelProperties.value;

    const indices = reducedFeatures.value.map((_, i) => i);
    const texts = indices.map((i) => {
      if (
        aggregatedLabels.value === null ||
        aggregatedIntervalDetails.value === null
      ) {
        return 'N/A';
      }

      const labels = aggregatedLabels.value[i];

      const payload: [string, string][] = [];
      payload.push(['Interval', i.toString()]);

      const intervalDetails = aggregatedIntervalDetails.value[i];
      for (const block of intervalDetails) {
        const blockStartDate = convertTimestampToIsoDate(block.start);
        payload.push(['Date', blockStartDate.toString()]);
      }

      for (let p = 0; p < properties.length; p += 1) {
        const property = properties[p];
        const label = labels[p];

        payload.push([property, label]);
      }

      return payload;
    });

    let hoverTemplate = '';
    for (let p = 0; p < properties.length; p += 1) {
      hoverTemplate += `<br><b>%{text[${p}][0]}: </b>%{text[${p}][1]}`;
    }

    const xs = reducedFeatures.value.map((f) => f[0]);
    const ys = reducedFeatures.value.map((f) => f[1]);
    const zs = isThreeDimensional
      ? reducedFeatures.value.map((f) => f[2])
      : undefined;

    const trace: Data = {
      x: xs,
      y: ys,
      z: zs,
      name: '',
      type: scatterType,
      mode: 'markers',
      text: texts,
      hovertemplate: hoverTemplate,
      marker: {
        size: isThreeDimensional ? size3d : size2d,
        symbol: 'circle',
        opacity: high.value,
        color: indices,
        colorscale: plotlyColorscale,
        colors: plotlyColorscale,
        line: {
          color: 'rgba(0, 0, 0, 0.1)',
          width: 1,
        },
      },
    } as Data;

    return [trace];
  };

  return {
    traceFeatures: trace,
  };
}
