import type {Data} from 'plotly.js-dist-min';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';

import {colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

export function useScatterFeatures() {
  const traceFeatures = (): Data[] => {
    if (
      metaPropertiesRef.value === null ||
      reducedFeaturesRef.value === null ||
      aggregatedLabelsRef.value === null ||
      colorScaleRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null
    ) {
      return [];
    }

    const traces: Data[] = [];

    const isThreeDimensional =
      typeof reducedFeaturesRef.value[0]?.[2] !== 'undefined';

    const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

    for (
      let intervalIndex = 0;
      intervalIndex < reducedFeaturesRef.value.length;
      intervalIndex += 1
    ) {
      if (
        pointsFilteredByMetaRef.value[intervalIndex] ||
        pointsFilteredByTimeRef.value[intervalIndex]
      ) {
        continue;
      }

      const features = reducedFeaturesRef.value[intervalIndex];

      let hoverTemplate = '';

      for (const [
        propertyIndex,
        property,
      ] of metaPropertiesRef.value.entries()) {
        const lineBreak = propertyIndex === 0 ? '' : '<br>';
        hoverTemplate += `${lineBreak}${property} <b>${aggregatedLabelsRef.value[intervalIndex][propertyIndex]}</b>`;
      }

      const trace: Data = {
        x: [features[0]],
        y: [features[1]],
        z: isThreeDimensional ? [features[2]] : undefined,
        name: `interval: ${intervalIndex}`,
        hovertemplate: hoverTemplate,
        type: scatterType,
        mode: 'markers',
        marker: {
          size: 4,
          symbol: 'circle',
          color: colorScaleRef.value[intervalIndex],
        },
      } as Data;

      traces.push(trace);
    }

    return traces;
  };

  return {
    traceFeatures: traceFeatures,
  };
}
