import {type Data} from 'plotly.js-dist-min';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterEmbeddings} from 'src/components/scatter/use-scatter-embeddings';
import {useScatterTrajectories} from 'src/components/scatter/use-scatter-trajectories';
import {useScatterTrajectoryAverage} from 'src/components/scatter/use-scatter-trajectory-average';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useTrajectories} from 'src/composables/use-trajectories';
import {ref} from 'vue';

const data = ref<Data[]>([]);
const isEnabled = ref<boolean>(false);

export function useScatterRender() {
  const {render: renderEmbeddings} = useScatterEmbeddings();
  const {trajectories, isFused} = useTrajectories();
  const {generateColorScale: generate} = useScatterColorScale();
  const {scale: cyclingScale} = useColorsCycling();
  const {render: renderTrajectories} = useScatterTrajectories();
  const {render: renderTrajectoryAverage} = useScatterTrajectoryAverage();

  const render = () => {
    const embeddings = renderEmbeddings();

    // trajectories
    if (trajectories.value.length > 0) {
      if (isFused.value) {
        const data = renderTrajectoryAverage(
          trajectories.value,
          cyclingScale.value,
        );

        embeddings.push(data);
      } else {
        const data = renderTrajectories(trajectories.value, cyclingScale.value);
        embeddings.push(...data);
      }
    }

    data.value = embeddings;
  };

  const reset = () => {
    data.value = [];
    isFused.value = false;
    trajectories.value = [];
  };

  return {
    isEnabled,
    data,
    generate,
    render,
    reset,
  };
}
