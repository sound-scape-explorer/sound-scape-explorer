import {type CascaderOption} from 'naive-ui';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelection} from 'src/composables/use-view-selection';
import {convertToNaiveSelectOptions} from 'src/utils/naive';
import {computed} from 'vue';

export function useTrajectoriesOptions() {
  const {extraction} = useViewSelection();
  const {current} = useTrajectoriesSelection();
  const {isLoading} = useScatterLoading();

  const options = computed(() => {
    const names = extraction.value?.trajectories.map((t) => t.name) ?? [];
    return convertToNaiveSelectOptions(names) as CascaderOption[];
  });

  const isFuseable = computed<boolean>(() => {
    if (isLoading.value === true) {
      return false;
    }

    return current.value.length > 1;
  });

  return {
    options,
    isFuseable,
  };
}
