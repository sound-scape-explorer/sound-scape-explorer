import {useStorageReader} from 'src/composables/use-storage-reader';
import {type TrajectoryDto} from 'src/dtos';
import {ref} from 'vue';

const trajectories = ref<TrajectoryDto[] | null>(null);

export function useTrajectories() {
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
