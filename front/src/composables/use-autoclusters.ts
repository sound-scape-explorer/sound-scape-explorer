import {useStorageReader} from 'src/composables/use-storage-reader';
import {type AutoclusterDto} from 'src/dtos';
import {ref} from 'vue';

const autoclusters = ref<AutoclusterDto[]>([]);

// autocluster configs
export function useAutoclusters() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      autoclusters.value = await worker.readAutoclusters(file);
    });
  };

  return {
    autoclusters: autoclusters,
    read: read,
  };
}
