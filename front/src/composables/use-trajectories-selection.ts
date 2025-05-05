import {type TrajectoryDto} from '@shared/dtos';
import {useRefHistory} from '@vueuse/core';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

const selected = ref<TrajectoryDto[]>([]);
const current = ref<TrajectoryDto['name'][]>([]);
const {undo, redo, canUndo, canRedo} = useRefHistory(current);

export function useTrajectoriesSelection() {
  const {extraction} = useViewSelectionNew();

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
