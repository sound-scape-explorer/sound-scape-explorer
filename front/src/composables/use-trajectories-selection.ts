import {type TrajectoryDto} from '@shared/dtos';
import {useRefHistory} from '@vueuse/core';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useTrajectories} from 'src/composables/use-trajectories';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

const selected = ref<TrajectoryDto[]>([]);
const current = ref<TrajectoryDto['name'][]>([]);
const {undo, redo, canUndo, canRedo} = useRefHistory(current);

export function useTrajectoriesSelection() {
  const {extraction} = useViewSelection();

  const reset = () => {
    selected.value = [];
  };

  const render = async () => {
    const {readTrajectories} = useTrajectories();
    const {render} = useScatterRender();

    await readTrajectories();
    render();
  };

  const update = async () => {
    const names = current.value;
    selected.value =
      extraction.value?.trajectories.filter((t) => names.includes(t.name)) ??
      [];
    await render();
  };

  return {
    selected,
    current,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    update,
  };
}
