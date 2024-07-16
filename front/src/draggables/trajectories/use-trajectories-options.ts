import {type CascaderOption} from 'naive-ui';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useTrajectoriesStorage} from 'src/composables/use-trajectories-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

export function useTrajectoriesOptions() {
  const {trajectories} = useTrajectoriesStorage();
  const {current} = useTrajectoriesSelection();
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

    return current.value.length > 1;
  });

  return {
    options: options,
    isFuseable: isFuseable,
  };
}
