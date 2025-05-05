import {useRelativeTraced} from 'src/composables/use-relative-traced';
import {computed, ref} from 'vue';

const value = ref([]);

export function useDraggableRelativeTrajectories() {
  const {relativeTrajectories} = useRelativeTraced();

  const options = computed(() => {
    if (relativeTrajectories.value === null) {
      return [];
    }

    return relativeTrajectories.value.map((rT) => ({
      label: rT.trajectory.name,
      value: rT.trajectory.index,
    }));
  });

  return {
    value,
    options,
  };
}
