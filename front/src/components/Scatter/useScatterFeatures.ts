import type {Data} from 'plotly.js-dist-min';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {labelsPropertiesRef} from 'src/hooks/useLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';

import {aggregatedIntervalDetailsRef} from '../../hooks/useAggregatedIntervalDetails';
import {useDate} from '../../hooks/useDate';
import {alphaHighRef, alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

export function useScatterFeatures() {
  const {convertTimestampToIsoDate} = useDate();
  const size2d = 5;
  const size3d = 3;

  const traceFeatures = (): Data[] => {
    if (
      labelsPropertiesRef.value === null ||
      reducedFeaturesRef.value === null ||
      aggregatedLabelsRef.value === null ||
      colorScaleRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null
    ) {
      return [];
    }

    const colorScale = colorScaleRef.value;
    const pointsFilteredByMeta = pointsFilteredByMetaRef.value;
    const pointsFilteredByTime = pointsFilteredByTimeRef.value;

    const plotlyColorscale = colorScale.map((color, index) => {
      let filteredColor = color;

      if (
        pointsFilteredByMeta[index] === true ||
        pointsFilteredByTime[index] === true
      ) {
        filteredColor = `rgba(0, 0, 0, ${alphaLowRef.value})`;
      }

      return [index / (colorScale.length - 1), filteredColor];
    });

    const isThreeDimensional = reducedFeaturesRef.value[0].length === 3;
    const scatterType = isThreeDimensional ? 'scatter3d' : 'scattergl';
    const properties = labelsPropertiesRef.value;

    const indices = reducedFeaturesRef.value.map((_, i) => i);
    const texts = indices.map((i) => {
      if (
        aggregatedLabelsRef.value === null ||
        aggregatedIntervalDetailsRef.value === null
      ) {
        return 'N/A';
      }

      const labels = aggregatedLabelsRef.value[i];

      const payload: [string, string][] = [];
      payload.push(['Interval', i.toString()]);

      const intervalDetails = aggregatedIntervalDetailsRef.value[i];
      for (const block of intervalDetails) {
        const blockStartDate = convertTimestampToIsoDate(block.start);
        payload.push(['Block start', blockStartDate.toString()]);
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

    const xs = reducedFeaturesRef.value.map((f) => f[0]);
    const ys = reducedFeaturesRef.value.map((f) => f[1]);
    const zs = isThreeDimensional
      ? reducedFeaturesRef.value.map((f) => f[2])
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
        opacity: alphaHighRef.value,
        color: indices,
        colorscale: plotlyColorscale,
        line: {
          color: 'rgba(0,0,0,0.1)',
          width: 1,
        },
      },
    } as Data;

    return [trace];
  };

  return {
    traceFeatures: traceFeatures,
  };
}
