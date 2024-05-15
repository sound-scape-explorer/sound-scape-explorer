import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {onMounted, ref} from 'vue';

const version = ref<string | null>(null);
let isLoaded = false;

export function useStorageVersion() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readVersion = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      version.value = await worker.readVersion(file);
    });
  };

  onMounted(readVersion);

  return {
    version: version,
  };
}
