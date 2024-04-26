import type {Data} from 'plotly.js-dist-min';
import {useTrajectoriesData} from 'src/composables/trajectories-data';
import {useScatterFeatures} from 'src/scatter/scatter-features';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {ref} from 'vue';

const traces = ref<Data[]>([]);

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();
  const {traceds, isFused} = useTrajectoriesData();

  const renderTraces = () => {
    const trs: Data[] = [];

    // add features
    const featuresTraces = traceFeatures();
    trs.push(...featuresTraces);

    // add trajectories
    if (traceds.value.length > 0) {
      if (isFused.value === true) {
        const averageTrace = traceAverageTrajectory(traceds.value);
        trs.push(averageTrace);
      } else {
        const trajectories = traceTrajectories(traceds.value);
        trs.push(...trajectories);
      }
    }

    traces.value = trs;
  };

  const resetTraces = () => {
    traces.value = [];
    isFused.value = false;
    traceds.value = [];
  };

  return {
    traces: traces,
    renderTraces: renderTraces,
    resetTraces: resetTraces,
  };
}
