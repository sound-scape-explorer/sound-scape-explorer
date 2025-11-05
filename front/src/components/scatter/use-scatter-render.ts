import {useDebounceFn} from '@vueuse/core';
import {type Data} from 'plotly.js-dist-min';
import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterEmbeddings} from 'src/components/scatter/use-scatter-embeddings';
import {useScatterTrajectories} from 'src/components/scatter/use-scatter-trajectories';
import {useScatterTrajectoryAverage} from 'src/components/scatter/use-scatter-trajectory-average';
import {useColorScaleHoursInDay} from 'src/composables/use-color-scale-hours-in-day';
import {useTrajectories} from 'src/composables/use-trajectories';
import {DEBOUNCE_MS} from 'src/constants';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionRender} from 'src/draggables/selection/use-selection-render';
import {ref} from 'vue';

const data = ref<Data[]>([]);
const isEnabled = ref<boolean>(false);

export function useScatterRender() {
  const {generate} = useScatterColorScale();
  const {scale: hoursInDayScale} = useColorScaleHoursInDay();
  const {trajectories, isFused} = useTrajectories();
  const {render: renderEmbeddings} = useScatterEmbeddings();
  const {render: renderTrajectories} = useScatterTrajectories();
  const {render: renderTrajectoryAverage} = useScatterTrajectoryAverage();

  const {isActive: isSelectionActive} = useDraggableSelection();
  const {render: renderSelection} = useSelectionRender();

  const render = () => {
    const newData: Data[] = [];

    // trajectories
    if (trajectories.value.length > 0) {
      if (isFused.value) {
        const averageTrajectory = renderTrajectoryAverage(
          trajectories.value,
          hoursInDayScale.value,
        );

        newData.push(averageTrajectory);
      } else {
        const trajectoriesTraces = renderTrajectories(
          trajectories.value,
          hoursInDayScale.value,
        );

        newData.push(...trajectoriesTraces);
      }
    }

    // embeddings
    const embeddings = renderEmbeddings();
    newData.push(...embeddings);

    // selection
    if (isSelectionActive.value) {
      const selectionTraces = renderSelection();

      if (typeof selectionTraces !== 'undefined') {
        newData.push(...selectionTraces);
      }
    }

    data.value = newData;
  };

  const debouncedRender = useDebounceFn(render, DEBOUNCE_MS);

  const reset = () => {
    data.value = [];
    isFused.value = false;
    trajectories.value = [];
  };

  return {
    isEnabled,
    data,
    generate,
    render: debouncedRender,
    reset,
  };
}
