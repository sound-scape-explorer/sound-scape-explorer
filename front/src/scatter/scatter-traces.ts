import type {Data} from 'plotly.js-dist-min';
import {useTrajectoriesData} from 'src/composables/trajectories-data';
import {useScatterFeatures} from 'src/scatter/scatter-features';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {reactive} from 'vue';

interface ScatterTracesRef {
  value: Data[];
}

export const scatterTracesRef = reactive<ScatterTracesRef>({
  value: [],
});

// TODO: refactor
export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();
  const {traceds, isFused} = useTrajectoriesData();

  const renderTraces = () => {
    const traces: Data[] = [];
    const featuresTraces = traceFeatures();
    traces.push(...featuresTraces);

    if (traceds.value.length > 0) {
      if (isFused.value === true) {
        const averageTrace = traceAverageTrajectory(traceds.value);
        traces.push(averageTrace);
      } else {
        const trajectories = traceTrajectories(traceds.value);
        traces.push(...trajectories);
      }
    }

    scatterTracesRef.value = traces;
  };

  const resetTraces = () => {
    scatterTracesRef.value = [];
    isFused.value = false;
    traceds.value = [];
  };

  return {
    renderTraces: renderTraces,
    resetTraces: resetTraces,
  };
}
