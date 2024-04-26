import {
  type Trajectory,
  useTrajectoriesStorage,
} from 'src/composables/trajectories-storage';
import {useTraced} from 'src/hooks/useTraced';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {ref} from 'vue';

const selected = ref<Trajectory[]>([]);

export function useTrajectoriesSelection() {
  const {trajectories} = useTrajectoriesStorage();

  const reset = () => {
    selected.value = [];
  };

  const select = async (names: string[]) => {
    if (trajectories.value === null) {
      return;
    }

    selected.value = trajectories.value.filter((trajectory) =>
      names.includes(trajectory.name),
    );

    await render();
  };

  const render = async () => {
    const {readTraced} = useTraced();
    const {renderTraces} = useScatterTraces();

    await readTraced();
    renderTraces();
  };

  return {
    selected: selected,
    select: select,
    reset: reset,
  };
}
