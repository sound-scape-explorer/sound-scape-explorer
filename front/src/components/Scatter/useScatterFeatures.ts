import type {Data} from 'plotly.js-dist-min';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {labelsPropertiesRef} from 'src/hooks/useLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';

import {alphaHighRef, alphaLowRef, colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

export function useScatterFeatures() {
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

    const isThreeDimensional =
      typeof reducedFeaturesRef.value[0]?.[2] !== 'undefined';
    const scatterType = isThreeDimensional ? 'scatter3d' : 'scattergl';

    const indices = reducedFeaturesRef.value.map((_, i) => i);
    const texts = indices.map((i) => `${i}`);
    const hoverTemplate = '<b>%{text}</b>';

    const xs = reducedFeaturesRef.value.map((f) => f[0]);
    const ys = reducedFeaturesRef.value.map((f) => f[1]);
    const zs = isThreeDimensional
      ? reducedFeaturesRef.value.map((f) => f[2])
      : undefined;

    const trace: Data = {
      x: xs,
      y: ys,
      z: zs,
      name: 'interval',
      type: scatterType,
      mode: 'markers',
      text: texts,
      hovertemplate: hoverTemplate,
      marker: {
        size: 3,
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
