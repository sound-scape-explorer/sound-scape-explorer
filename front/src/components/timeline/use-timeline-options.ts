import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {generateUniqueRangeSlug} from 'src/utils/config';
import {computed, ref} from 'vue';

const name = ref<string>();

export function useTimelineOptions() {
  const {ranges} = useStorageRanges();

  const names = computed(
    () => ranges.value?.map((r) => generateUniqueRangeSlug(r)) ?? [],
  );

  return {
    name: name,
    names: names,
  };
}
