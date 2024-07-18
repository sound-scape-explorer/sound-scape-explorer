import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

const version = ref<string | null>(null);

export function useStorageVersion() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      version.value = await worker.readVersion(file);
    });
  };

  return {
    version: version,
    read: read,
  };
}
