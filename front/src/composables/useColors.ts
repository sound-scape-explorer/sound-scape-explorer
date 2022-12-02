import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import type {Color, Scale} from 'chroma-js';
import chroma from 'chroma-js';
import type {ComputedRef} from 'vue';
import {computed} from 'vue';

interface UseColors {
    colors: ComputedRef<Scale>;
    nightColor: Color;
    dayColor: Color;
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

  const nightColor = chroma('black');
  const dayColor = colors.value(0);

  return {
    colors,
    nightColor,
    dayColor,
  };
}
