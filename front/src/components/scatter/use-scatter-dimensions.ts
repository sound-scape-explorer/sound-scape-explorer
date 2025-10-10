import {useReductions} from 'src/composables/use-reductions';
import {computed} from 'vue';

export function useScatterDimensions() {
  const {reductions} = useReductions();

  const is3d = computed<boolean>(() => {
    if (reductions.value === null) {
      return false;
    }

    return reductions.value[0].length === 3;
  });

  return {
    is3d,
  };
}
