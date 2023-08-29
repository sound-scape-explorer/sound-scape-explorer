import type {Data} from 'plotly.js-dist-min';
import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {reducedFeaturesRef} from 'src/hooks/useReducedFeatures';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {tracedFusedRef, tracedRef} from 'src/hooks/useTraced';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {computed, reactive, watch, watchEffect} from 'vue';

import {colorScaleRef} from './useScatterColorScale';
import {useScatterFeatures} from './useScatterFeatures';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';

interface ScatterTracesRef {
  value: Data[];
}

export const scatterTracesRef = reactive<ScatterTracesRef>({
  value: [],
});

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();

  const scatterReadyRef = computed<boolean>(() => {
    if (
      metaPropertiesRef.value === null ||
      reducedFeaturesRef.value === null ||
      aggregatedLabelsRef.value === null ||
      colorScaleRef.value === null ||
      pointsFilteredByMetaRef.value === null ||
      pointsFilteredByTimeRef.value === null
    ) {
      return false;
    }

    return true;
  });

  const renderTraces = () => {
    if (scatterReadyRef.value === false) {
      return;
    }

    console.log('renderTraces');
    const traces: Data[] = [];
    const featuresTraces = traceFeatures();
    traces.push(...featuresTraces);

    if (tracedRef.value.length > 0) {
      if (tracedFusedRef.value === true) {
        const averageTrace = traceAverageTrajectory(tracedRef.value);
        traces.push(averageTrace);
      } else {
        const trajectories = traceTrajectories(tracedRef.value);
        traces.push(...trajectories);
      }
    }

    scatterTracesRef.value = traces;
  };

  watchEffect(renderTraces);
  // watch(pointsFilteredByMetaRef, renderTraces);
}
