import {ConfigDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

const config = ref<ConfigDto | null>(null);
const isLoaded = ref<boolean>(false);

export function useConfig() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      const string = await worker.readConfigString(file);
      const json = JSON.parse(string);
      config.value = ConfigDto.parse(json);
      isLoaded.value = true;
    });
  };

  return {
    read,
    config,
    isLoaded,
  };
}
