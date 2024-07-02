import {type CascaderOption} from 'naive-ui';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useTrajectoriesStorage} from 'src/composables/use-trajectories-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref} from 'vue';

const selection = ref([]);

export function useDraggableTrajectories() {
  const {trajectories} = useTrajectoriesStorage();
  const {isLoading} = useScatterLoading();

  const options = computed(() => {
    if (trajectories.value === null) {
      return [];
    }

    const names = trajectories.value.map((t) => t.name);
    return convertToNaiveSelectOptions(names) as CascaderOption[];
  });

  const isFuseable = computed<boolean>(() => {
    if (isLoading.value === true) {
      return false;
    }

    return selection.value.length > 1;
  });

  return {
    selection: selection,
    options: options,
    isFuseable: isFuseable,
  };
}
