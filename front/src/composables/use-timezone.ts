import {TIMEZONE_DEFAULT} from '@shared/constants';
import {type TimezoneName} from 'countries-and-timezones';
import {ref} from 'vue';

const tz = ref<TimezoneName | null>(null);

export function useTimezone() {
  const set = (newTz: string) => {
    if (newTz === TIMEZONE_DEFAULT) {
      tz.value = null;
    }

    tz.value = newTz as TimezoneName;
  };

  return {
    tz,
    set,
  };
}
