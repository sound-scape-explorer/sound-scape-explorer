import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {computed} from 'vue';

export function useLabelsInfo() {
  const {filtered} = useScatterFilterLabel();

  const count = computed<number>(() => filtered.value.filter((f) => f).length);

  return {
    count: count,
  };
}
