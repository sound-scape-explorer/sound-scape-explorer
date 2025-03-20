import {useStorageReader} from 'src/composables/use-storage-reader';
import {type DigesterDtoWithType} from 'src/dtos';
import {ref} from 'vue';

const digesters = ref<DigesterDtoWithType[] | null>(null);

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
