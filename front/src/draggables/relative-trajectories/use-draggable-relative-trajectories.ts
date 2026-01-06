import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {computed, ref} from 'vue';

const selected = ref([]);

export function useDraggableRelativeTrajectories() {
  const {relativeTrajectories} = useRelativeTrajectories();

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
    selected,
    options,
  };
}
