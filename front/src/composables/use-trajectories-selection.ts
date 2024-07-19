import {useRefHistory} from '@vueuse/core';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {
  type Trajectory,
  useTrajectories,
} from 'src/composables/use-trajectories';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {ref} from 'vue';

const selected = ref<Trajectory[]>([]);
const current = ref<string[]>([]); // ui option
const {undo, redo, canUndo, canRedo} = useRefHistory(current);

export function useTrajectoriesSelection() {
  const {trajectories} = useTrajectories();

  const reset = () => {
    selected.value = [];
  };

  const render = async () => {
    const {readTraced} = useTrajectoriesData();
    const {renderTraces} = useScatterTraces();

    await readTraced();
    renderTraces();
  };

  const update = async () => {
    if (trajectories.value === null) {
      return;
    }

    const names = current.value;
    selected.value = trajectories.value.filter((t) => names.includes(t.name));
    await render();
  };

  return {
    selected: selected,
    current: current,
    reset: reset,
    undo: undo,
    redo: redo,
    canUndo: canUndo,
    canRedo: canRedo,
    update: update,
  };
}
