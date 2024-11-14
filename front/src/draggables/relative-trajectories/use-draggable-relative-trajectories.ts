import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {computed, ref} from 'vue';

const value = ref([]);

export function useDraggableRelativeTrajectories() {
  const {relativeTrajectories} = useRelativeTrajectories();

  const options = computed(() => {
    if (relativeTrajectories.value === null) {
      return [];
    }

    return relativeTrajectories.value.map((rT) => ({
      label: rT.name,
      value: rT.index,
    }));
  });

  return {
    value: value,
    options: options,
  };
}
