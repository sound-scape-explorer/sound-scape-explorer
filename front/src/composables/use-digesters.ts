import {type DigesterName} from 'src/common/digester-name';
import {type DigesterType} from 'src/common/digester-type-map';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Digester {
  index: number;
  name: DigesterName;
  type: DigesterType;
}

const digesters = ref<Digester[] | null>(null);

export function useDigesters() {
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
