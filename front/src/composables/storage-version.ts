import {useStorageReader} from 'src/composables/storage-reader';
import {onMounted, ref} from 'vue';

const version = ref<string | null>(null);
let isLoaded = false;

export function useStorageVersion() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      version.value = await worker.readVersion(file);
    });
  });

  return {
    version: version,
  };
}
