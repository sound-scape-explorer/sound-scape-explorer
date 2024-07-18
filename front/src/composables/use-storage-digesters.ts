import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Digester {
  index: number;
  name: string;
}

const digesters = ref<Digester[] | null>(null);

export function useStorageDigesters() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      digesters.value = await worker.readDigesters(file);
    });
  };

  return {
    digesters: digesters,
    read: read,
  };
}
