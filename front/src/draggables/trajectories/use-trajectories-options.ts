import {type CascaderOption} from 'naive-ui';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useTrajectories} from 'src/composables/use-trajectories';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {convertToNaiveSelectOptions} from 'src/utils/naive';
import {computed} from 'vue';

export function useTrajectoriesOptions() {
  const {trajectories} = useTrajectories();
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
