import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {onMounted, ref} from 'vue';

export interface Range {
  index: number;
  name: string;
  start: number;
  end: number;
}

let isLoaded = false;
const ranges = ref<Range[] | null>(null);

export function useStorageRanges() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }
    isLoaded = true;

    await read(async (worker, file) => {
      ranges.value = await worker.readRanges(file);
    });
  };

  onMounted(readAll);

  return {
    ranges: ranges,
  };
}
