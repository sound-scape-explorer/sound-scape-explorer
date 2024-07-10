import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {computed} from 'vue';

export function useTemporalInfo() {
  const {filtered} = useScatterFilterTemporal();

  const filteredCount = computed<number>(
    () => filtered.value.filter((f) => f).length,
  );

  const collectedCount = computed<number>(
    () => filtered.value.filter((f) => !f).length,
  );

  return {
    filteredCount: filteredCount,
    collectedCount: collectedCount,
  };
}
