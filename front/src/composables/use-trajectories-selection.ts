import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {
  type Trajectory,
  useTrajectoriesStorage,
} from 'src/composables/use-trajectories-storage';
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
    const {readTraced} = useTrajectoriesData();
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
