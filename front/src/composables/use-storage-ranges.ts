import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface AppRange {
  index: number;
  name: string;
  start: number;
  end: number;
}

const ranges = ref<AppRange[] | null>(null);

export function useStorageRanges() {
  const {read: readStorage} = useStorageReader();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const read = async () => {
    await readStorage(async (worker, file) => {
      if (aggregatedTimestamps.value === null) {
        throw new Error('could not get aggregated timestamps');
      }

      const userRanges = await worker.readRanges(file);

      const fullRange: AppRange = {
        index: -1,
        name: '_fullRange',
        start: Math.min(...aggregatedTimestamps.value),
        end: Math.max(...aggregatedTimestamps.value),
      };

      ranges.value = [fullRange, ...userRanges];
    });
  };

  return {
    ranges: ranges,
    readRanges: read,
  };
}
