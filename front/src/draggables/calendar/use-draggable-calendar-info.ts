import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {computed} from 'vue';

export function useDraggableCalendarInfo() {
  const {filtered} = useScatterFilterTime();

  const excluded = computed<number>(
    () => filtered.value.filter((f) => f).length,
  );
  const collected = computed<number>(
    () => filtered.value.filter((f) => !f).length,
  );

  return {
    excluded: excluded,
    collected: collected,
  };
}
