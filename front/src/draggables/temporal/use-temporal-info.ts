import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {computed} from 'vue';

export function useTemporalInfo() {
  const {filtered} = useScatterFilterTemporal();

  const count = computed<string>(() =>
    filtered.value.filter((f) => f).length.toString(),
  );

  return {
    count: count,
  };
}
