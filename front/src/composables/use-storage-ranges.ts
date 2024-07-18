import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Range {
  index: number;
  name: string;
  start: number;
  end: number;
}

const ranges = ref<Range[] | null>(null);

export function useStorageRanges() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      ranges.value = await worker.readRanges(file);
    });
  };

  return {
    ranges: ranges,
    read: read,
  };
}
