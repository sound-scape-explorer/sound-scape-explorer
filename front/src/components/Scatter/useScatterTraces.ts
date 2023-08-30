import type {Data} from 'plotly.js-dist-min';
import {tracedFusedRef, tracedRef} from 'src/hooks/useTraced';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {reactive} from 'vue';

import {useScatterFeatures} from './useScatterFeatures';

interface ScatterTracesRef {
  value: Data[];
}

export const scatterTracesRef = reactive<ScatterTracesRef>({
  value: [],
});

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();

  const renderTraces = () => {
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

  return {
    renderTraces: renderTraces,
  };
}
