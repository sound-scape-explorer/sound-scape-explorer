import {type Data} from 'plotly.js-dist-min';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFeatures} from 'src/components/scatter/use-scatter-features';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {ref} from 'vue';

const traces = ref<Data[]>([]);
const isEnabled = ref<boolean>(false);

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();
  const {traceds, isFused} = useTrajectoriesData();
  const {generateColorScale: generate} = useScatterColorScale();
  const {scale: cyclingScale} = useColorsCycling();

  const render = () => {
    let newTraces: Data[] = [];

    // add features
    const featuresTraces = traceFeatures();
    newTraces = [...newTraces, ...featuresTraces];

    // add trajectories
    if (traceds.value.length > 0) {
      if (isFused.value) {
        const averageTrace = traceAverageTrajectory(
          traceds.value,
          cyclingScale.value,
        );
        newTraces = [...newTraces, averageTrace];
      } else {
        const trajectories = traceTrajectories(
          traceds.value,
          cyclingScale.value,
        );
        newTraces = [...newTraces, ...trajectories];
      }
    }

    traces.value = newTraces;
  };

  const reset = () => {
    traces.value = [];
    isFused.value = false;
    traceds.value = [];
  };

  return {
    isEnabled: isEnabled,
    traces: traces,
    generate: generate,
    renderTraces: render,
    resetTraces: reset,
  };
}
