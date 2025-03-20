import {StorageRangesError} from 'src/common/Errors';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {type RangeDto} from 'src/dtos';
import {ref} from 'vue';

const ranges = ref<RangeDto[] | null>(null);

export function useStorageRanges() {
  const {read: readStorage} = useStorageReader();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const read = async () => {
    await readStorage(async (worker, file) => {
      if (aggregatedTimestamps.value === null) {
        throw new StorageRangesError('could not get aggregated timestamps');
      }

      const fullRange: RangeDto = {
        index: -1,
        name: '_fullRange',
        start: Math.min(...aggregatedTimestamps.value),
        end: Math.max(...aggregatedTimestamps.value),
      };

      const userRanges = await worker.readRanges(file);
      ranges.value = [fullRange, ...userRanges];
    });
  };

  return {
    ranges: ranges,
    readRanges: read,
  };
}
