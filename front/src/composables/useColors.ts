import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import type {Scale} from 'chroma-js';
import chroma from 'chroma-js';
import type {ComputedRef} from 'vue';
import {computed} from 'vue';

interface UseColors {
    colors: ComputedRef<Scale>;
}

export function useColors(): UseColors {
  const colors = computed(() => {
    return chroma
      .scale(UMAPFiltersStore.colorScale)
      .domain([0, 1.001]) // TODO: tricky, make domain adapt to span of values
      .mode('hsl');
  });

  if (!colors) {
    throw new Error('Colors not defined');
  }

  return {
    colors,
  };
}
