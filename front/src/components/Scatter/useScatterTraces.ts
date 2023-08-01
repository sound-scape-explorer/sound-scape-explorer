import type {Data} from 'plotly.js-dist-min';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSetsRef} from 'src/hooks/useStorageMetaSets';
import {reducedFeaturesRef} from 'src/hooks/useStorageReducedFeatures';
import {trajectoriesRef} from 'src/hooks/useStorageTrajectories';
import {reactive, watchEffect} from 'vue';
import {colorsStore} from '../Colors/colorsStore';
import {chromaScaleRef} from './useScatterColorScale';
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

interface PointIndexGroupsRef {
  value: number[][] | null;
}

export const pointIndexGroupsRef = reactive<PointIndexGroupsRef>({
  value: null,
});

interface NewScatterColorScaleRef {
  value: string[];
}

export const newScatterColorScaleRef = reactive<NewScatterColorScaleRef>({
  value: [],
});

export function useScatterTraces() {
  watchEffect(() => {
    if (pointIndexGroupsRef.value === null) {
      return [];
    }

    newScatterColorScaleRef.value = chromaScaleRef.value.colors(
      pointIndexGroupsRef.value.length,
    );
  });

  // INFO: Sorting point indexes by the selected meta value
  const parsePointIndexGroups = () => {
    if (
      reducedFeaturesRef.value === null ||
      groupedMetasRef.value === null ||
      metaPropertiesRef.value === null ||
      metaSetsRef.value === null ||
      metaIndexRef.value === null
    ) {
      return;
    }

    const metaIndex = metaIndexRef.value;
    const metaSet = metaSetsRef.value[metaIndex];
    const pointIndexGroups = [];

    for (const metaValue of metaSet) {
      const pointIndexes = groupedMetasRef.value
        .map((metaValues, pointIndex) =>
          metaValues[metaIndex] === metaValue ? pointIndex : null,
        )
        .filter((p) => p !== null) as number[];

      pointIndexGroups.push(pointIndexes);
    }

    pointIndexGroupsRef.value = pointIndexGroups;
    console.log(pointIndexGroupsRef.value);
  };

  watchEffect(parsePointIndexGroups);

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
      metaSetsRef.value === null ||
      metaIndexRef.value === null ||
      reducedFeaturesRef.value === null ||
      pointIndexGroupsRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null
    ) {
      return;
    }

    const traces: Data[] = [];
    let index = 0;

    const isThreeDimensional =
      typeof reducedFeaturesRef.value[0]?.[2] !== 'undefined';

    const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

    for (const pointIndexes of pointIndexGroupsRef.value) {
      const selectedFeatures = [];

      for (const pointIndex of pointIndexes) {
        if (
          pointsFilteredByMetaRef.value[pointIndex] ||
          pointsFilteredByTimeRef.value[pointIndex]
        ) {
          continue;
        }

        selectedFeatures.push(reducedFeaturesRef.value[pointIndex]);
      }

      const trace: Data = {
        x: selectedFeatures.map((feature) => feature[0]),
        y: selectedFeatures.map((feature) => feature[1]),
        z: isThreeDimensional
          ? selectedFeatures.map((feature) => feature[2])
          : undefined,
        name: metaSetsRef.value[metaIndexRef.value][index],
        hovertemplate: metaSetsRef.value[metaIndexRef.value][index],
        type: scatterType,
        mode: 'markers',
        marker: {
          size: 2,
          symbol: 'circle',
        },
      } as Data;

      traces.push(trace);
      index += 1;
    }

    if (trajectoriesRef.value !== null) {
      const trace: Data = {
        x: trajectoriesRef.value.map((coordinates) => coordinates[0]),
        y: trajectoriesRef.value.map((coordinates) => coordinates[1]),
        z: isThreeDimensional
          ? trajectoriesRef.value.map((coordinates) => coordinates[2])
          : undefined,
        name: 'trajectories',
        type: scatterType,
        mode: 'lines',
      };

      traces.push(trace);
    }

    scatterTracesRef.value = traces;
  };

  watchEffect(parseFeaturesFromPointIndexGroups);
}
