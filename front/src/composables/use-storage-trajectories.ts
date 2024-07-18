import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Trajectory {
  index: number;
  name: string;
  start: number;
  end: number;
  labelProperty: string;
  labelValue: string;
  step: number;
}

const trajectories = ref<Trajectory[] | null>(null);

export function useStorageTrajectories() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      trajectories.value = await worker.readTrajectories(file);
    });
  };

  return {
    trajectories: trajectories,
    read: read,
  };
}
