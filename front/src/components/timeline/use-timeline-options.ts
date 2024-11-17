import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {generateUniqueRangeSlug} from 'src/utils/config';
import {ref} from 'vue';

const name = ref<string>();
const names = ref<string[]>([]);

export function useTimelineOptions() {
  const {ranges} = useStorageRanges();

  const updateNames = () => {
    if (ranges.value === null) {
      return;
    }

    names.value = ranges.value.map((r) => generateUniqueRangeSlug(r));
  };

  return {
    name: name,
    names: names,
    updateNames: updateNames,
  };
}
