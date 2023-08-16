import type {Data} from 'plotly.js-dist-min';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {tracedFusedRef, tracedRef} from 'src/hooks/useTraced';
import {interpolateArray} from 'src/utils/interpolate-array';
import {sumArraysIndexWise} from 'src/utils/sum-arrays-index-wise';
import {reactive, watchEffect} from 'vue';

import {colorsStore} from '../Colors/colorsStore';
import {colorScaleRef} from './useScatterColorScale';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

interface ScatterTracesRef {
  value: Data[];
}

export const scatterTracesRef = reactive<ScatterTracesRef>({
  value: [],
});

interface MetaIndexRef {
  value: number | null;
}

export const metaIndexRef = reactive<MetaIndexRef>({
  value: 0,
});

export function useScatterTraces() {
  watchEffect(() => {
    if (
      metaPropertiesRef.value === null ||
      !colorsStore.colorType.includes('by')
    ) {
      return;
    }

    const metaProperty = colorsStore.colorType.replace('by', '');
    const metaIndex = metaPropertiesRef.value.indexOf(metaProperty);

    if (metaIndex === -1) {
      return;
    }

    metaIndexRef.value = metaIndex;
  });

  const parseFeaturesFromPointIndexGroups = () => {
    if (
      metaPropertiesRef.value === null ||
      metaSetsRef.value === null ||
      metaIndexRef.value === null ||
      reducedFeaturesRef.value === null ||
      aggregatedLabelsRef.value === null ||
      colorScaleRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null
    ) {
      return;
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

    if (tracedRef.value.length > 0) {
      if (tracedFusedRef.value === true) {
        let axisLength = -1;
        interface IData {
          x: number[];
          y: number[];
          z: number[];
        }

        const datas: IData[] = [];

        for (const traced of tracedRef.value) {
          if (traced.data.length > axisLength) {
            axisLength = traced.data.length;
          }
        }

        for (const traced of tracedRef.value) {
          const data = {} as IData;
          data.x = traced.data.map((coords) => coords[0]);
          data.y = traced.data.map((coords) => coords[1]);
          if (isThreeDimensional) {
            data.z = traced.data.map((coords) => coords[2]);
          }

          if (data.x.length < axisLength) {
            data.x = interpolateArray(data.x, axisLength);
            data.y = interpolateArray(data.y, axisLength);
            if (isThreeDimensional) {
              data.z = interpolateArray(data.z, axisLength);
            }
          }

          datas.push(data);
        }

        const averagedTrace: Data = {
          x: sumArraysIndexWise({
            arrays: datas.map((data) => data.x),
            doAveraging: true,
          }),
          y: sumArraysIndexWise({
            arrays: datas.map((data) => data.y),
            doAveraging: true,
          }),
          z: isThreeDimensional
            ? sumArraysIndexWise({
              arrays: datas.map((data) => data.z),
              doAveraging: true,
            })
            : undefined,
          name: 'Averaged Trace',
          type: scatterType,
          mode: 'lines',
        };

        traces.push(averagedTrace);
      } else {
        for (const traced of tracedRef.value) {
          const trace: Data = {
            x: traced.data.map((coordinates) => coordinates[0]),
            y: traced.data.map((coordinates) => coordinates[1]),
            z: isThreeDimensional
              ? traced.data.map((coordinates) => coordinates[2])
              : undefined,
            name: traced.trajectory.name,
            type: scatterType,
            mode: 'lines',
          };

          traces.push(trace);
        }
      }
    }

    scatterTracesRef.value = traces;
  };

  watchEffect(parseFeaturesFromPointIndexGroups);
}
