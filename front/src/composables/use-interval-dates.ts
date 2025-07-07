import {useClientSettings} from 'src/composables/use-client-settings';

import {type Interval} from './use-intervals';

// todo: use this across the app
export function useIntervalDates() {
  const {timeshift} = useClientSettings();

  const getDates = (interval: Interval) => {
    const hoursInMs = timeshift.value * 3600 * 1000;
    const start = new Date(interval.start + hoursInMs);
    const end = new Date(interval.end + hoursInMs);

    return {
      start,
      end,
    };
  };

  return {
    getDates,
  };
}
