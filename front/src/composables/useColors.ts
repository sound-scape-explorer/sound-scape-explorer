import type {Color, Scale} from 'chroma-js';
import chroma from 'chroma-js';
import type {ComputedRef} from 'vue';
import {computed} from 'vue';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';

interface UseColors {
  colors: ComputedRef<Scale>;
  cyclingColors: ComputedRef<Scale>;
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

  const cyclingColors = computed(() => {
    return chroma
      .scale([
        'blue',
        'green',
        'yellow',
        'orange',
        'yellow',
        'red',
        'blue',
      ])
      .domain([0, 1.001])
      .mode('hsl');
  });

  const nightColor = chroma('black');
  const dayColor = colors.value(0);

  return {
    colors,
    cyclingColors,
    nightColor,
    dayColor,
  };
}
