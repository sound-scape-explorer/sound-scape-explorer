import {type Data} from 'plotly.js-dist-min';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFeatures} from 'src/components/scatter/use-scatter-features';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useTrajectories} from 'src/composables/use-trajectories';
import {
  traceAverageTrajectory,
  traceTrajectories,
} from 'src/utils/trajectories';
import {ref} from 'vue';

const traces = ref<Data[]>([]);
const isEnabled = ref<boolean>(false);

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();
  const {trajectories, isFused} = useTrajectories();
  const {generateColorScale: generate} = useScatterColorScale();
  const {scale: cyclingScale} = useColorsCycling();

  const render = () => {
    // features
    const newTraces = traceFeatures();

    // trajectories
    if (trajectories.value.length > 0) {
      if (isFused.value) {
        const averageTrace = traceAverageTrajectory(
          trajectories.value,
          cyclingScale.value,
        );

        newTraces.push(averageTrace);
      } else {
        const trajectoryTraces = traceTrajectories(
          trajectories.value,
          cyclingScale.value,
        );

        newTraces.push(...trajectoryTraces);
      }
    }

    traces.value = newTraces;
  };

  const reset = () => {
    traces.value = [];
    isFused.value = false;
    trajectories.value = [];
  };

  return {
    isEnabled,
    traces,
    generate,
    renderTraces: render,
    resetTraces: reset,
  };
}
