import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {computed} from 'vue';

export function useDraggableLabelsInfo() {
  const {filtered} = useScatterFilterLabels();

  const count = computed<number>(() => filtered.value.filter((f) => f).length);

  return {
    count: count,
  };
}
