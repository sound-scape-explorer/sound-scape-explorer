import {type RangeDto} from '@shared/dtos';
import {useConfig} from 'src/composables/use-config';
import {RANGE_CUSTOM} from 'src/constants';
import {ref} from 'vue';

const names = ref<string[]>([]);
const name = ref<string>();

export function useTimelineRangeNames() {
  const {config} = useConfig();

  const rangeToSlug = (range: RangeDto) => {
    return `${range.index} - ${range.name}`;
  };

  const updateNames = () => {
    if (config.value === null) {
      return;
    }

    names.value = config.value.ranges.map(rangeToSlug);
  };

  const updateName = () => {
    if (!names.value || name.value) {
      return;
    }

    name.value = names.value[0];
  };

  const setCustomName = () => {
    if (name.value === RANGE_CUSTOM) {
      return;
    }

    name.value = RANGE_CUSTOM;
  };

  return {
    names,
    updateNames,
    name,
    updateName,
    setCustomName,
    rangeToSlug,
  };
}
