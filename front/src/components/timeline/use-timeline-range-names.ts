import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {RANGE_SKIP} from 'src/constants';
import {generateUniqueRangeSlug} from 'src/utils/config';
import {ref} from 'vue';

const names = ref<string[]>([]);
const name = ref<string>();

export function useTimelineRangeNames() {
  const {ranges} = useStorageRanges();

  const updateNames = () => {
    if (ranges.value === null) {
      return;
    }

    names.value = ranges.value.map((r) => generateUniqueRangeSlug(r));
  };

  const updateName = () => {
    if (!names.value || name.value) {
      return;
    }

    name.value = names.value[0];
  };

  const setCustomName = () => {
    if (name.value === RANGE_SKIP) {
      return;
    }

    name.value = RANGE_SKIP;
  };

  return {
    names: names,
    updateNames: updateNames,
    name: name,
    updateName: updateName,
    setCustomName: setCustomName,
  };
}
