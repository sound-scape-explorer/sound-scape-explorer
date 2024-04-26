import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref, watch} from 'vue';

export interface Trajectory {
  index: number;
  name: string;
  start: number;
  end: number;
  labelProperty: string;
  labelValue: string;
  step: number;
}

let hasReadAll = false;
const trajectories = ref<Trajectory[] | null>(null);

export function useTrajectoriesStorage() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (hasReadAll) {
      return;
    }

    hasReadAll = true;

    await read(async (worker, file) => {
      trajectories.value = await worker.readTrajectories(file);
    });
  };

  watch(isReady, readAll);

  return {
    trajectories: trajectories,
  };
}
